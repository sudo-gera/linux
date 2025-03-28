'use strict'
const readline = require('readline');
var http = require('http');

var on_data=null;

function http_f(){
    var options = {
        host: '127.0.0.1',
        port: +process.argv[2],
        path: '/',
    };

    var req = http.get(options, function(res) {

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
    }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        if (body.length){
            if (on_data !== null){
                on_data(body);
            }
        }
        // ...and/or process the entire body here.
        http_f();
    })
    });

    req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
    });
}

http_f();

let WebSocket_ = 0;

function socket(url){
    this.$socket = new WebSocket_(url);
    this.readyState = 1;
    this.send = (q)=>{
        // console.log(q);
        if (this.$socket.readyState === 1){
            this.$socket.send(q);
        }
    }
    this.$socket.onmessage = (q)=>{
        // console.log(new Uint8Array(q.data));
        this.onmessage(q);
    }
    return this;
}

var v86=require('./build/libv861.js');
const { randomInt } = require('crypto');
async function main() {
    if ("undefined" === typeof WebSocket) {
        const { default: WebSocket } = await import("ws");
        WebSocket_ = WebSocket;
    }
    var emulator = new v86.V86Starter({
        wasm_path: "./build/v86.wasm",
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        // screen_container: document.getElementById("screen_container"),
        screen_dummy: true,
        bios: {
            url: "./bios/seabios.bin",
        },
        vga_bios: {
            url: "./bios/vgabios.bin",
        },
        cdrom: {
            // url: "./images/linux.iso",
            url: "./tinycore.iso",
            // url: "./alpine.iso",
        },
        // bzimage: {
        //     url: "images/buildroot-bzimage.bin",
        //     size: 5166352,
        //     async: false,
        // },
        autostart: true,
        // network_relay_url:"wss://relay.widgetry.org/",
        network_relay_url:"ws://localhost:8180/",
        filesystem: {},
        injection: {
            screen_event: screen_event,
            WebSocket: WebSocket_,
        }
    });
    on_data=data=>{
        // screen_event('console-print',data);
        if (typeof emulator.injection.send_input !== 'undefined'){
            emulator.injection.send_input(+data);
        }
    };
    // set_symbol([0,0,48]);
    // for (var q=0;q<64;++q){
        // await set_cursor([q,q]);
    // conlog(q);
    // }
}

// var _q=0;
// setInterval(() => {
//     // set_cursor([randomInt(0,20),randomInt(0,20)])
//     set_symbol([randomInt(0,80),randomInt(0,80),randomInt(32,126)]);
//     // _q+=1;
// }, 1);

async function conlog(q){
    await screen_event('console-print',q);
}

async function print_cursor(v){
    v[0]=+v[0];
    v[1]=+v[1];
    process.stdout.write('\x1b['+(v[0]+1)+';'+(v[1]+1)+'H');
}

var data1={};
var data2={};
var cursor=[0,0];
var screen=[0,0];
// var cursor2=[0,0];

// var _a=[];
// setInterval(() => {
//     conlog(JSON.stringify(_a));
//     _a=[];
// }, 4000);

var last_update=0;
var delay=100;
async function update(){
    // await conlog('--- '+Date.now());
    if (last_update!==undefined){
        var l=last_update;
        last_update=undefined;
        t=Date.now();
        setTimeout(async _=>{
            // await conlog('+++ '+Date.now());
            for (var q in data1){
                if (data2[q]===undefined){
                    data2[q]={};
                }
                for (var w in data1[q]){
                    if (data1[q][w]!==data2[q][w]){
                        // _a.push([q,w]);
                        // await conlog('['+q+','+w+']');
                        await print_cursor([q,w]);
                        process.stdout.write(String.fromCharCode(data1[q][w]));
                        data2[q][w]=data1[q][w];
                    }
                }
            }
            await print_cursor(cursor);
            last_update=Date.now();
        },(l+delay>t?l+delay:t)-t);
    }
}

async function set_cursor(v){
    cursor=v;
    await update();
}

async function set_symbol(v){
    if (0<=v[0] && v[0]<screen[1]){
        if (0<=v[1] && v[1]<screen[0]){
            if (data1[v[0]]===undefined){
                data1[v[0]]={};
            }
            data1[v[0]][v[1]]=v[2];
            await update();
        }
    }
}

// var cursor=[0,0];
// async function update_cursor(v){
//     process.stdout.write('\x1b['+(v[0]+1)+';'+(v[1]+1)+'H');
// }
var ci=-1;

var loglen=20;
for (var t=0;t<loglen;++t){
    screen_event('console-print','');
}


async function screen_event(n,v){
    if (n==='console-print'){
        print_cursor([ci,100]);
        process.stdout.write('   ');
        ci+=1;
        ci%=loglen;
        t='-> '+v;
        print_cursor([ci,100]);
        [...t].map(_=>{
            process.stdout.write(' ');
        });
        process.stdout.write(' ');
        print_cursor([ci,100]);
        process.stdout.write('-> ');
        console.log(v);
        print_cursor(cursor);
    }else
    if (n==='screen-update-cursor'){
        await set_cursor(v);
    }else
    if (n==='screen-put-char'){
        await set_symbol(v);
    }else
    if (n==='screen-set-size-text'){
        screen = v;
    }else
    {
        // conlog([n,v]);
    }
    // if (n==='screen-put-char'){

    // }
}


main();
