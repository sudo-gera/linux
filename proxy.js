"use strict";

async function DecompressBlob(blob) {
    const ds = new DecompressionStream("gzip");
    const decompressedStream = blob.stream().pipeThrough(ds);
    return await new Response(decompressedStream).blob();
}

async function blob_to_b64url(blob) {
    return await (new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    }));
}

function b64url_to_b64(b64url) {
    return b64url.slice(1+b64url.indexOf(','));
}


async function blob_to_u8a(blob){
    return new Uint8Array(await blob.arrayBuffer());
}

function u8a_to_blob(u8a){
    return new Blob([u8a]);
}


function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    })
}

function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, 1000*s));
}

function outbufferread(){
    var q=''
    while (outbuffer.length!=0){
        q+=outbuffer.shift();
    }
    return q;
}

async function create_v86(){
    var d={
        autostart: false,
        // autostart: true,
        bios: {
            url: "bios/seabios.bin",
        },
        vga_bios: {
            url: "bios/vgabios.bin",
        },
        bzimage: {
            url: "images/buildroot-bzimage.bin",
            size: 5166352,
            async: false,
        },
        wasm_path: "build/v86.wasm",
        network_relay_url:"wss://relay.widgetry.org/",
        filesystem: {},
        cmdline: "tsc=reliable mitigations=off random.trust_cpu=on",
        disable_keyboard: false,
        // "screen_container": typeof document!=='undefined'?document.getElementById("screen_container"):undefined,
    };
    var v86=typeof V86Starter==='undefined'?require("./build/libv86.js").V86Starter:V86Starter;
    var e = new v86(d);
    e.add_listener("serial0-output-char",function(char){
        if (logging){
            outbuffer.push(char);
        }
        if (typeof process!=='undefined'){
            process.stdout.write(char);
        }else{
            if (logging){
                if (escq.length || char=='\x1b'){
                    escq+=char
                    if (escq.length>2 && '@QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm[\\]^_`{|}~'.indexOf(escq[escq.length-1])!=-1){
                        escq=''
                    }
                }else
                if (char=='\b'){
                    document.getElementById('log').value=document.getElementById('log').value.slice(0,-1);                    
                }else{
                    document.getElementById('log').value+=char;
                    if (char=='\n' || char == '\r'){
                        var l=document.getElementById('log');
                        l.scrollTop = l.scrollHeight;
                    }
                }
            }
        }
    })
    logging=1;
    await e.stop();
    if (typeof document==='undefined'){
    }else{
        // await e.restore_state(
        //     await readFileAsync(
        //         // await DecompressBlob(
        //             await (
        //                 await fetch('./v86statebmp.bin')
        //             ).blob()
        //         // )
        //     )
        // );
    }
    await e.run();
    // document.querySelector("#log").onkeydown=(ev)=>{
    //     if (ev.key=='Shift'){

    //     }else
    //     if (ev.key=='Control'){

    //     }else
    //     if (ev.key=='Alt'){

    //     }else
    //     if (ev.key=='Meta'){

    //     }else
    //     if (ev.key.length==1){
    //         send(e,ev.key);
    //     }else{
    //         send(e,String.fromCharCode(ev.which));
    //     }
    //     return false;

    // }
    return e
}

function send(e,q){
    e.serial0_send(q);
}

async function pushu8a(em,u8a,name){
    return new Promise((resolve)=>{
        callback=resolve;
        input_buffer=u8a;
        send(em,'lua /root/receive.lua /mnt/input.mnt "'+name+'" '+u8a.length+'\n');
        send(em,'echo "callback()" > /mnt/js.mnt\n');
    });
}

async function popu8a(em,name){
    return new Promise((resolve)=>{
        callback=()=>{
            output_buffer_shrink();
            resolve(output_buffer);
        }
        output_buffer=new Uint8Array();
        output_buffer_len=0;
        send(em,'cat "'+name+'" > /mnt/output.mnt\n');
        send(em,'echo "callback()" > /mnt/js.mnt\n');
    });
}

async function _popu8a(name){
    return await popu8a(____em,name);
}

async function _pushu8a(u8a,name){
    return await pushu8a(____em,u8a,name);
}

async function popurl(em,name){
    var u8a=await popu8a(em,name);
    return await blob_to_b64url(await u8a_to_blob(u8a));
}

async function pushblob(em,blob,name){
    blob=await blob_to_u8a(blob);
    return await pushu8a(em,blob,name);
}

async function pushurl(em,url,name){
    var text=(await( (await fetch(url)).blob()))
    return await pushblob(em,text,name);
}

async function recv(mess){
    if (mess.operation=='upload'){
        return await pushu8a(window.____em,mess.data,'/mnt/images/'+mess.name);
    }
    if (mess.operation=='create'){
        var args='/mnt/bmp32.out /mnt/images/'+mess.name+' = '+mess.way+' [ ';
        mess.argv.forEach((arg)=>{
            if (mess.args[arg][0]=='bmp'){
                args+='/mnt/images/'+mess.args[arg][1]+' ';
            }else{
                args+=mess.args[arg][1]+' ';
            }
        });
        args+='] 2>/mnt/stderr.txt\n';
        var code=Number(await new Promise((resolve)=>{
            callback=resolve;
            send(window.____em,args);
            send(window.____em,'echo "callback($?)" > /mnt/js.mnt\n');
        }))
        console.log(code);
        if(code){
            return {error:await popu8a(window.____em,'/mnt/stderr.txt')};
        }
        return {data:await popu8a(window.____em,'/mnt/images/'+mess.name)};
    }
    if (mess.operation=='command'){
        send(window.____em,mess.command);
    }
    if (mess.operation=='start'){
        window.____em=await create_v86();    
    }
}

window.onload=async function(){
    window.onmessage=async (mess)=>{
        if (mess.data.good==1){
            window.top.postMessage({good:1,value:await recv(mess.data.value)});
        }
    };

}

var outbuffer=[]
var logging=1;
var escq=''
if (typeof module!=='undefined'){
    module.exports = {
        create_v86:create_v86,
        send:send,
    };
}

async function write_proxy(a,b,c,d){
    // console.log([a,b,c,d]);
    if (a==1){
        d=new TextDecoder().decode(d);
        d=await eval(d);
        d=new TextEncoder().encode(d);
        return [a,b,c,d];
    }else
    if (a==2){
        for (var w=0;w<c;++w){
            d[w]=input_buffer[w+b];
        }
        return [a,b,c,d];
    }else
    if (a==3){
        if (output_buffer_len<b+c){
            output_buffer_resize(b+c);
        }
        for (var w=0;w<c;++w){
            output_buffer[w+b]=d[w];
        }
        return [a,b,c,d];
    }else{
        return [a,b,c,d];
    }
}

function output_buffer_resize(l){
    output_buffer_reserve(l);
    output_buffer_len=l;
}

function output_buffer_shrink(){
    output_buffer=output_buffer.slice(0,output_buffer_len);
}

function output_buffer_reserve(l){
    if (output_buffer.length<l){
        var tmp=new Uint8Array(output_buffer.length*2>l?output_buffer.length*2:l);
        tmp.set(output_buffer);
        output_buffer=tmp;
    }
}

var input_buffer=new Uint8Array();
var output_buffer=new Uint8Array();
var output_buffer_len=0;
var callback=null;

