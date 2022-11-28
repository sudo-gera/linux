'use strict';


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

async function url_to_blob(url){
    return await (await fetch(url)).blob();
}

async function blob_to_u8a(blob){
    return new Uint8Array(await blob.arrayBuffer());
}

function u8a_to_blob(u8a){
    return new Blob([u8a]);
}

var ways={
    negative:{
        image:'bmp'
    },
    same:{
        image:'bmp'
    },
    scale:{
        image:'bmp',
        new_height:'int',
        new_width:'int'
    }
};

async function set_create_menu(){
    var cp=document.getElementById('creation_place');
    var images=document.getElementById('images');
    var linux=document.getElementById('linux');
    cp.innerHTML='';
    var s=document.createElement('select');
    var ssd=s.style.display;
    var l=document.getElementById('loading');
    var lsd=l.style.display;
    l.src='/loading.gif';
    l.style.width='100%';
    s.name='creator';
    s.id='creator';
    s.onchange=(ev)=>{
        while (cp.childNodes.length>1){
            cp.removeChild(cp.childNodes[1]);
        }
        if (ev.target.selectedIndex==1){
            var i=document.createElement('input');
            i.type='file';
            i.accept="image/bmp";
            cp.appendChild(i);
            var b=document.createElement('button');
            b.innerText='upload';
            b.onclick=async (ev)=>{
                if (ev.target.parentNode.childNodes[1].files.length){
                    var img=document.createElement('img');
                    var data=await blob_to_u8a(ev.target.parentNode.childNodes[1].files[0]);
                    var name="image"+images.childNodes.length;
                    img.src=await blob_to_b64url(ev.target.parentNode.childNodes[1].files[0]);
                    while (cp.childNodes.length>1){
                        cp.removeChild(cp.childNodes[1]);
                    }
                    l.style.display=lsd;
                    s.style.display='none';
                    s.selectedIndex=0;
                    var res=await send({
                        operation: 'upload',
                        data: data,
                        name: name
                    });
                    s.style.display=ssd;
                    l.style.display='none';
                    var tr=document.createElement('tr');
                    var td=document.createElement('td');
                    img.style.width="100%";
                    td.style="margin-left: auto;margin-right: auto;";
                    td.appendChild(img);
                    tr.style="border: solid;";
                    tr.appendChild(td);
                    var td=document.createElement('td');
                    td.innerText=name;
                    td.style="margin-left: auto;margin-right: auto;";
                    tr.appendChild(td);
                    images.appendChild(tr);
                }
            };
            cp.appendChild(b);
        }else
        if (ev.target.selectedIndex==2){
            var w=document.createElement('select');
            var o=document.createElement('option');
            o.selected='selected';
            o.innerText='...';
            w.appendChild(o);
            for (var q in ways){
                var o=document.createElement('option');
                o.innerText=q;
                w.appendChild(o);
            }
            w.onchange=(ev)=>{
                while (cp.childNodes.length>2){
                    cp.removeChild(cp.childNodes[2]);
                }
                if (ev.target.selectedIndex!=0){
                    var t=document.createElement('table');
                    var tr=document.createElement('tr');
                    var wn=ev.target.options[ev.target.selectedIndex].innerText;
                    for (var q in ways[wn]){
                        var td=document.createElement('td');
                        td.innerText=q;
                        tr.appendChild(td);
                        var td=document.createElement('td');
                        if (ways[wn][q]=='int'){
                            var i=document.createElement('input');
                            i.type='number';
                            td.appendChild(i);
                        }
                        if (ways[wn][q]=='bmp'){
                            var bs=document.createElement('select');
                            var o=document.createElement('option');
                            o.selected='selected';
                            o.innerText='...';
                            bs.appendChild(o);
                            for (var _q in [...images.childNodes]){
                                if (Number(_q)>1){
                                    var o=document.createElement('option');
                                    o.innerText='image'+_q;
                                    bs.appendChild(o);
                                }
                            }
                            td.appendChild(bs);
                        }
                        tr.appendChild(td);
                    }
                    t.appendChild(tr);
                    var b=document.createElement('button');
                    b.onclick=async (ev)=>{
                        var args={};
                        var e=-1;
                        var argv=[];
                        for (var q in ways[wn]){
                            e+=1;
                            if (ways[wn][q]=='int'){
                                args[q]=Number(tr.childNodes[e*2+1].childNodes[0].value);
                                if (Number.isNaN(args[q]) || args[q]<1){
                                    alert(q+' should be at least 1.');
                                    return;
                                }
                            }
                            if (ways[wn][q]=='bmp'){
                                var ind=tr.childNodes[e*2+1].childNodes[0].selectedIndex;
                                if (ind==0){
                                    alert(q+' file should be selected from uploaded files.');
                                    return;
                                }
                                args[q]=tr.childNodes[e*2+1].childNodes[0].options[ind].innerText;
                            }
                            args[q]=[ways[wn][q],args[q]];
                            argv.push(q);
                        }
                        while (cp.childNodes.length>1){
                            cp.removeChild(cp.childNodes[1]);
                        }
                        var name="image"+images.childNodes.length;
                        s.selectedIndex=0;
                        l.style.display=lsd;
                        s.style.display='none';
                        var res=await send({
                            operation: 'create',
                            way: wn,
                            args: args,
                            name: name,
                            argv: argv
                        });
                        await async function(){
                            var tr=document.createElement('tr');
                            var td=document.createElement('td');
                            var img=document.createElement('img');
                            if (res.error!=undefined){
                                alert(await window.atob(await b64url_to_b64(await blob_to_b64url(await u8a_to_blob(res.error)))));
                            }else{
                                img.src=await blob_to_b64url(await u8a_to_blob(res.data));
                            }
                            img.style.width="100%";
                            td.style="margin-left: auto;margin-right: auto;";
                            td.appendChild(img);
                            tr.style="border: solid;";
                            tr.appendChild(td);
                            var td=document.createElement('td');
                            td.innerText=name;
                            td.style="margin-left: auto;margin-right: auto;";
                            tr.appendChild(td);
                            images.appendChild(tr);
                        }();
                        s.style.display=ssd;
                        l.style.display='none';
                    };
                    b.innerText='create';
                    cp.appendChild(t);
                    cp.appendChild(b);
                }
            };
            cp.appendChild(w);
        }
    };
    var o=document.createElement('option');
    o.selected='selected';
    o.innerText='...';
    s.appendChild(o);
    var o=document.createElement('option');
    o.innerText='upload';
    s.appendChild(o);
    var o=document.createElement('option');
    o.innerText='create';
    s.appendChild(o);
    cp.appendChild(s);
    s.style.display='none';
    await send({
        operation: 'start'
    })
    s.style.display=ssd;
    l.style.display='none';
}

function send(mess){
    return new Promise((resolve)=>{
        callback=resolve;
        var linux=document.getElementById('linux');
        linux.contentWindow.postMessage({good:1,value:mess});
    });
}

window.onload=async function(){
    set_create_menu();
    window.onmessage=(mess)=>{
        if (mess.data.good==1){
            callback(mess.data.value);
        }
    }
}

var callback=null;



