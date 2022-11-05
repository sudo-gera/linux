"use strict";

function encodeBase64 (data) {
    if (typeof Buffer!=='undefined'){
        return Buffer.from(data).toString('base64');
    }else{
        return window.btoa(data);
    }
}

function decodeBase64 (data) {
    if (typeof Buffer!=='undefined'){
        return Buffer.from(data, 'base64').toString('ascii');
    }else{
        return window.atob(data);
    }
}

async function blobToBase64(blob) {
    var a=await (new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    }));
    a=a.slice(1+a.indexOf(','));
    return a;
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
    console.log(0);
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
        "screen_container": typeof document!=='undefined'?document.getElementById("screen_container"):undefined,
    };
    console.log(0);
    var v86=typeof V86Starter==='undefined'?require("./build/libv86.js").V86Starter:V86Starter;
    console.log(0);
    var e = new v86(d);
    console.log(0);
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
    console.log(0);
    logging=1;
    console.log(0);
    await e.stop();
    console.log(0);
    if (typeof document==='undefined'){
    }else{
        await e.restore_state(
            await readFileAsync(
                await (
                    await fetch('./v86state.bin')
                ).blob()
            )
        );
    }
    console.log(0);
    await e.run();
    console.log(0);
    document.querySelector("#log").onkeydown=(ev)=>{
        if (ev.key=='Shift'){

        }else
        if (ev.key=='Control'){

        }else
        if (ev.key=='Alt'){

        }else
        if (ev.key=='Meta'){

        }else
        if (ev.key.length==1){
            send(e,ev.key);
        }else{
            send(e,String.fromCharCode(ev.which));
        }
        return false;

    }
    console.log(0);
    document.getElementById('input').onchange=()=>{
        var str=document.getElementById('input').value
        pushblob(____em,new Blob([str]),'/root/input.txt','/mnt/tmp.txt')
    }
    console.log(0);
    return e
}

function send(e,q){
    e.serial0_send(q);
}

async function pushb64(em,text,name,tmp){
    input_buffer=text
    send(em,'lua /root/receive.lua /mnt/input.mnt "'+tmp+'" '+text.length+'\n');
    send(em,'cat "'+tmp+'" | base64 -d > "'+name+'"\n');
}

async function pushblob(em,text,name,tmp){
    text=await blobToBase64(text);
    await pushb64(em,text,name,tmp);
}

async function pushtext(em,url,name,tmp){
    var text=(await( (await fetch(url)).blob()))
    await pushblob(em,text,name,tmp);
}

async function write_proxy(a,b,c,d){
    if (a==1){
        d=new TextDecoder().decode(d);
        d=await eval(d);
        d=new TextEncoder().encode(d);
        return [a,b,c,d];
    }else
    if (a==2){
        d=input_buffer.slice(b,b+c);
        d=new TextEncoder().encode(d);
        return [a,b,c,d];
    }else{
        return [a,b,c,d];
    }
}

window.onload=async function(){
    window.____em=await create_v86();

    document.getElementById("save_file").onclick = async function(){
        const new_state = await window.____em.save_state();
        var a = document.createElement("a");
        a.download = "v86state.bin";
        a.href = window.URL.createObjectURL(new Blob([new_state]));
        a.dataset.downloadurl = "application/octet-stream:" + a.download + ":" + a.href;
        a.click();
        this.blur();
    };

    document.getElementById("restore_file").onchange = function(){
        if(this.files.length)
        {
            var filereader = new FileReader();
            window.____em.stop();

            filereader.onload = async function(e)
            {
                await window.____em.restore_state(e.target.result);
                window.____em.run();
            };

            filereader.readAsArrayBuffer(this.files[0]);

            this.value = "";
        }

        this.blur();
    };

    document.getElementById("mnt_uploads").onchange = async function(){
        if(this.files.length)
        {

            var r=await blobToBase64(this.files[0]);

            pushb64(window.____em,r,'/mnt/uploads/'+this.files[0].name,'/mnt/tmp.txt')

            this.value = "";
        }

        document.getElementById("clear_log").onclick = async function()
        {
            document.getElementById('log').value='';
            

        };
        this.blur();
    };

    document.getElementById("get_window").onchange = function(){
        return window;
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
var input_buffer=''

