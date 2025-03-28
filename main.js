"use strict";

var fs=require('fs');

function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, 1000*s));
}

async function create_v86(){
    var d={
        write_proxy: write_proxy,
        read_proxy: read_proxy,
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
        disable_keyboard: false,
        cdrom: {
            // url: "images/linux.iso",
        },
        "screen_container": typeof document!=='undefined'?document.getElementById("screen_container"):undefined,
    };
    var v86=typeof V86Starter==='undefined'?require("./build/libv86.js").V86Starter:V86Starter;
    var e = new v86(d);
    e.add_listener("serial0-output-char",function(char){
        process.stdout.write(char);
    })
    return e
}

function send(e,q){
    e.serial0_send(q);
}

var forwarding=fs.readFileSync('forwarding.b64','utf8');

async function write_proxy(fd,pos,len,data){
    console.log([fd,pos,len,data]);
    return [fd,pos,len,data];
}

async function read_proxy(fd,pos,len,data){
    console.log([fd,pos,len]);
    if (fd==1){
        data=forwarding.slice(pos,pos+len);
        data=new TextEncoder().encode(data);
    }
    return [fd,pos,len,data];
}

async function main(){
    var e=await create_v86();
    await sleep(2);
    send(e,'head -c '+forwarding.length+' /dev/zero > /mnt/forwarding.b64\n');
    send(e,'cp /mnt/forwarding.b64 ./\n');
    send(e,'cat forwarding.b64 | base64 -d > forwarding.out\n');
    send(e,'chmod 777 forwarding.out\n');
    send(e,'head -c 4096 /dev/zero > /mnt/input\n');
    send(e,'head -c 4096 /dev/zero > /mnt/output\n');
    send(e,'(sleep 2 ; wget -O- http://127.0.0.1:8080) &\n');
    // send(e,'mkfifo fifo\n');
    send(e,'tee | ./forwarding.out 8080\n');
}

main();