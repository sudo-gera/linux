function setfile(f,b,n){
    // Get a reference to our file input
    fileInput=f

    // Create a new File object
    const myFile = new File(
        [b], n, {
        type: 'file/file',
        lastModified: new Date(),
    });

    // Now let's create a DataTransfer to get a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
}

function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, 1000*s));
}

function getobj(f={}){
    d={
        isTrusted: true,
        altKey: false,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: '',
        composed: true,
        ctrlKey: false,
        defaultPrevented: true,
        detail: 0,
        eventPhase: 3,
        isComposing: false,
        key: '',
        keyCode: 0,
        location: 1,
        metaKey: false,
        repeat: false,
        returnValue: false,
        shiftKey: false,
        timeStamp: 17072.400000002235,
        type: 0,
        which: 0,
    }
    for (w in f){
        d[w]=f[w];
    }
    return d;
    // getEventListeners(window).keydown[0].listener(d);
}

function putkey(c){
    d=getobj({keyCode:c});
    getEventListeners(window).keydown[0].listener(d);
}

async function main(){
    await sleep(0.2);
    setfile(
        document.getElementById('cd_image'),
        await (await fetch("/tinycore.iso")).blob(),
        'tinycore.iso'
    );
    await sleep(0.2);
    document.getElementById('networking_proxy').value='';
    document.getElementById('start_emulation').click();
    await sleep(0.4);
    // document.getElementById('load_state_input').style=''
    // await sleep(0.1);
    setfile(
        document.getElementById('load_state_input'),
        await (await fetch("/v86state.bin")).blob(),
        'v86state.bin'
    );
    await sleep(0.2);
    document.getElementById('load_state_input').onchange();
    await sleep(0.2);
}


function keylog(k,l){
    // d=getobj();
    // f={}
    // for (w in d){
    //     if (d[w]!==k[w]){
    //         f[w]=k[w]
    //     }
    // }
    f=k
    f.__line=l
    window.___a.push(f);
}


window.___a=[]
window.___keylog=keylog;

main();

function getsc(){
    t=document.getElementById('screen').innerText.split(' ');
    w=0;
    l=0
    while(l<300){
        l=parseInt(t[w]);
        t[w]=l;
        w+=1;
    }
    t=t.slice(0,w-1);
    return t;
}

async function popen(com){
    a=[]
    for (w in com){
        a.push(com[w].charCodeAt(0));
    }
    a=a.join(' ');
    a='aout '+a
    for (w in a){
        putkey(a[w].toUpperCase().charCodeAt(0));
    }
    putkey(13);
    await sleep(0.4);
    a=getsc();
    for (w in a){
        a[w]=String.fromCharCode(a[w]);
    }
    a=a.join('');
    return a;
}


// setTimeout(main,2000);