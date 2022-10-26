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

var outbuffer=[]

function outbufferread(){
    var q=''
    while (outbuffer.length!=0){
        q+=outbuffer.shift();
    }
    return q;
}

var logging=1;

escq=''

async function create_v86(){
    d={
        autostart: false,
        autostart: true,
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
        // disable_keyboard: true,
        disable_keyboard: false,


        "screen_container": typeof document!=='undefined'?document.getElementById("screen_container"):undefined,
    };
    // d={
    //     "acpi": false,
    //     "autostart": true,
    //     "bios": {
    //         "url": "bios/seabios.bin",
    //         "async": false
    //     },
    //     "boot_order": 531,
    //     "cdrom": {
    //         "url": "tinycore.iso",
    //         "async": false
    //     },
    //     "disable_speaker": false,
    //     "filesystem": {},
    //     "memory_size": 134217728,
    //     "network_relay_url": "wss://relay.widgetry.org/",
    //     "screen_container": typeof document!=='undefined'?document.getElementById("screen_container"):undefined,
    //     "vga_bios": {
    //         "url": "bios/vgabios.bin",
    //         "async": false
    //     },
    //     "vga_memory_size": 8388608,
    // }
    var v86=typeof V86Starter==='undefined'?require("./build/libv86.js").V86Starter:V86Starter;
    var e = new v86(d);
    e.add_listener("serial0-output-char",function(char){
        // console.log([char.charCodeAt(0),char]);
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
                    // console.log([escq])
                }else
                if (char=='\b'){
                    document.getElementById('log').value=document.getElementById('log').value.slice(0,-1);                    
                }else{
                    document.getElementById('log').value+=char;
                    if (char=='\n'){
                        l=document.getElementById('log');
                        l.scrollTop = l.scrollHeight;
                    }
                }
                // console.log(char);
            }
        }
    })

    logging=1;

    // q=''
    // while (1){
    //     q+=outbufferread();
    //     if (q.endsWith('\r\n~% ')){
    //         break;
    //     }
    //     await sleep(0.04);
    // }



    await e.stop();
    if (typeof document==='undefined'){
    //     var fs = require('fs');
    //     var data = fs.readFileSync('./v86state.bin');
    //     // await e.restore_state(
    //     //     // await readFileAsync(
    //     //         data
    //     //     // )
    //     // );
    }else{
        await e.restore_state(
            await readFileAsync(
                await (
                    await fetch('./v86state.bin')
                ).blob()
            )
        );
    }
    await e.run();

    // send(e,'\n');

    document.querySelector("#log").onkeydown=(ev)=>{
        // console.log(ev);
        // console.log(ev.which);

        // send(e,)
        if (ev.key=='Shift'){

        }else
        if (ev.key=='Control'){

        }else
        if (ev.key=='Alt'){

        }else
        if (ev.key=='Meta'){

        }else
        // if (ev.which==8){
        //     send(e,String.fromCharCode(8));
        //     send(e,' ');
        //     send(e,String.fromCharCode(8));
        // }else
        if (ev.key.length==1){
            send(e,ev.key);
        }else{
            send(e,String.fromCharCode(ev.which));
        }
        return false;

    }

    document.getElementById('input').onchange=()=>{
        var str=document.getElementById('input').value
        pushblob(____em,new Blob([str]),'/root/input.txt','/mnt/tmp.txt')
    }

    // await sleep(1);
    // await e.run();

    // var f = new FileReader();
    // f.onload = async function(r)
    // {
    //     await e.restore_state(r.target.result);
    //     e.run();
    // };
    // f.readAsArrayBuffer(await (await fetch('v86state.bin')).blob());

    // var q=''
    // while (1){
    //     q+=outbufferread();
    //     if (q.endsWith('\r\n~% ')){
    //         break;
    //     }
    //     await sleep(0.01);
    // }

    return e
}

function send(e,q){
    // console.log(q);
    e.serial0_send(q);
}

if (typeof module!=='undefined'){
    module.exports = {
        create_v86:create_v86,
        send:send,
    };
}

const encodeBase64 = (data) => {
    if (typeof Buffer!=='undefined'){
        return Buffer.from(data).toString('base64');
    }else{
        return window.btoa(data);
    }
}

const decodeBase64 = (data) => {
    if (typeof Buffer!=='undefined'){
        return Buffer.from(data, 'base64').toString('ascii');
    }else{
        return window.atob(data);
    }
}

async function blobToBase64(blob) {
    a=await (new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    }));
    a=a.slice(1+a.indexOf(','));
    return a;
}





input_buffer=''

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

async function _pushblob(em,text,name,tmp){
    text=await blobToBase64(text);
    outbufferread();
    send(em,'\x13');
    send(em,'tee << __EOF__ > "'+tmp+'"\n');
    var c=0;
    var l=text.length;
    while (text.length){
        var sllen=512;
        send(em,text.slice(0,sllen)+"\n")
        text=text.slice(sllen);
        if (++c==100){
            c=0;
            console.log((l-text.length)*1.0/l);
        }
        await sleep(0.01);
    }
    console.log()

    send(em,'\n__EOF__\n');
    // send(em,'\n\x04\n');

    send(em,'\x11');

    send(em,'cat "'+tmp+'" | base64 -d > "'+name+'"\n');

    console.log('waiting...');

    while(outbufferread().length==0){
        await sleep(0.1);
    }

    // logging=0;
    // logging=1;
    // outbufferread();
    // em.serial0_send('echo -n "" > "'+tmp+'"\n');
    // await sleep(0.04);
    // var l=text.length;
    // var c=0;
    // while (text.length){
    //     var sllen=256;
    //     em.serial0_send('echo -n "'+text.slice(0,sllen)+'" >> "'+tmp+'"\n');
    //     text=text.slice(sllen);
    //     if (++c==100){
    //         c=0;
    //         console.log((l-text.length)*1.0/l);
    //     }
    //     await sleep(0.04);
    // }
    // await sleep(0.04);

    console.log('done');
}
async function _pushtext(em,url,name,tmp){
    var text=(await( (await fetch(url)).blob()))
    await pushblob(em,text,name,tmp);
    // text=await blobToBase64(text);
    // outbufferread();
    // send(em,'\x13');
    // send(em,'tee > "'+tmp+'"\n');
    // var c=0;
    // var l=text.length;
    // while (text.length){
    //     var sllen=512;
    //     send(em,text.slice(0,sllen)+"\n")
    //     text=text.slice(sllen);
    //     if (++c==100){
    //         c=0;
    //         console.log((l-text.length)*1.0/l);
    //     }
    //     await sleep(0.01);
    // }
    // console.log()

    // send(em,'\n\x04\n');

    // send(em,'\x11');

    // send(em,'cat "'+tmp+'" | base64 -d > "'+name+'"\n');

    // console.log('waiting...');

    // while(outbufferread().length==0){
    //     await sleep(0.1);
    // }

    // // logging=0;
    // // logging=1;
    // // outbufferread();
    // // em.serial0_send('echo -n "" > "'+tmp+'"\n');
    // // await sleep(0.04);
    // // var l=text.length;
    // // var c=0;
    // // while (text.length){
    // //     var sllen=256;
    // //     em.serial0_send('echo -n "'+text.slice(0,sllen)+'" >> "'+tmp+'"\n');
    // //     text=text.slice(sllen);
    // //     if (++c==100){
    // //         c=0;
    // //         console.log((l-text.length)*1.0/l);
    // //     }
    // //     await sleep(0.04);
    // // }
    // // await sleep(0.04);

    // console.log('done');
}



// function create_v86(){
//     var d={
//         wasm_path: "build/v86.wasm",

//         // Uncomment to see what's going on
//         // screen_container: document.getElementById("screen_container"),

//         bios: {
//             url: "bios/seabios.bin",
//         },
//         vga_bios: {
//             url: "bios/vgabios.bin",
//         },
//         bzimage: {
//             url: "images/buildroot-bzimage.bin",
//             size: 5166352,
//             async: false,
//         },
//         // cdrom: {
//         //     url: "tinycore.iso"
//         // },
//         network_relay_url:"wss://relay.widgetry.org/",
//         filesystem: {},
//         cmdline: "tsc=reliable mitigations=off random.trust_cpu=on",
//         autostart: true,
//         disable_keyboard: true,
//     };
//     var l=require("./build/libv86.js");
//     var e = new l.V86Starter(d);
//     e.add_listener("serial0-output-char",function(char){
//         process.stdout.write(char);
//     })
//     return e;
// }
// module.exports = {
//     create_v86:create_v86
// };


// // e=create_v86();

// // setTimeout(() => {
// //     e.serial0_send(process.argv[2]+"\n");
// // }, 8000);



async function write_proxy(a,b,c,d){
    // console.log([a,b,c,d])
    if (a==1){
        d=new TextDecoder().decode(d);
        d=await eval(d);
        d=new TextEncoder().encode(d);
        return [a,b,c,d];
    }else
    if (a==2){
        d=input_buffer.slice(b,b+c);
        // d=new TextDecoder().decode(d);
        // d=await eval(d);
        d=new TextEncoder().encode(d);
        return [a,b,c,d];
    }else{
        return [a,b,c,d];
    }
}

