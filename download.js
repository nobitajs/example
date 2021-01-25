const ProgressBar = require('progress');
const fs = require('fs');
const fetch = require('node-fetch');

async function newDownload(images, options = {}){
    const { title = '名称', parallel = 5, timeout = 5000 } = options;
    const total = images.length;
    const bar = new ProgressBar(`${title}(:current/:total): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
    let queue = parallel;
    let finish = null;
    function callback(){
        bar.tick(1);
        const image = images.shift();
        queue--;
        if(image){
            queue++
            downloadFile(image, timeout, callback);
        }

        // console.log(images, queue, '===queue====')
        if(queue <= 0){
            finish(`${title}下载完成`);
        }
        
    }

    return new Promise((resolve) => {
        for(let i = 0; i < parallel; i++){
            const image = images.shift();
            image && downloadFile(image, timeout, callback);
        }
        finish = resolve
    })
}

function downloadFile(image, timeout, callback){
    let { url, path = '/', fileName = createFileName(), extract = 'jpg' } = image;
    if(!url) return callback();
    url = url.indexOf('http') === -1 ? `http:${url}` : url;
    let timer = null;
    if(!fs.existsSync(path)){
        fs.mkdirSync(path, {recursive: true})
    }

    let writeStream = fs.createWriteStream(`${path}${fileName}.${extract}`);
    const timeoutCallback = () => { 
        writeStream.destroy('timeout')
    }

    let failTimeout = null;
    const failCallBack = () => { 
        downloadFile(image, timeout, callback) 
    };


    writeStream
        .on('close', () => {
            clearTimeout(timer);
            callback();
        })
        .on('error', () => {
            console.log(`${path}${fileName}.${extract} 下载错误`)
            clearTimeout(failTimeout);
            failTimeout = setTimeout(failCallBack, timeout);
        })
        .on('pipe', () => {
            clearTimeout(timer);
            timer = setTimeout(timeoutCallback, timeout);
        })
        .on('drain', () => {
            clearTimeout(timer);
            timer = setTimeout(timeoutCallback, timeout);
        })

    fetch(url, {timeout: timeout + 1000})
        .then(res => res.body.pipe(writeStream))
        .catch((err) => {
            console.log(`${path}${fileName}.${extract} 请求超时`)
            clearTimeout(failTimeout);
            failTimeout = setTimeout(failCallBack, timeout);
        })
}

async function download(arr, options = {}) {
    const { title = '名称', parallel = 5, timeout = 5000 } = options;
    const total = arr.length;
    const bar = new ProgressBar(`${title}(:current/:total): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
    let result = {
        successList: [],
        failList: [],
    };
    while(arr.length > 0){
        const getImages = arr.splice(0, parallel);
        let p = [];

        for(image of getImages){
            let { url, path = '/', fileName = createFileName(), extract = 'jpg' } = image;
            if(!url) continue;
            url = url.indexOf('http') === -1 ? `http:${url}` : url;
            p.push(new Promise((resolve, reject) => {
                let timer = null;
                if(!fs.existsSync(path)){
                    fs.mkdirSync(path, {recursive: true})
                }

                let writeStream = fs.createWriteStream(`${path}${fileName}.${extract}`);
                const timeoutCallback = () => { 
                    writeStream.destroy('timeout')
                }

                writeStream
                    .on('close', () => {
                        bar.tick(1);
                        clearTimeout(timer);
                        resolve({status: true, image});
                    })
                    .on('error', () => {
                        console.log(`${path}${fileName}.${extract} 下载错误`)
                        arr.push({url, path, fileName})
                        resolve({status: false, image});
                    })
                    .on('pipe', () => {
                        clearTimeout(timer);
                        timer = setTimeout(timeoutCallback, timeout);
                    })
                    .on('drain', () => {
                        clearTimeout(timer);
                        timer = setTimeout(timeoutCallback, timeout);
                    })
                    fetch(url, {timeout: timeout + 1000})
                    .then(res => res.body.pipe(writeStream))
                    .catch((err) => {
                        console.log(`${path}${fileName}.${extract} 请求超时`)
                        arr.push({url, path, fileName})
                        resolve({status: false, image});
                    })
            }))
        }

        const results = await Promise.all(p).catch(e => {
            console.log(e, `===========下载失败==========`)
        })

        results.forEach(({status, image}) => {
            status ? result.successList.push(image) : result.failList.push(image);
        })
    }

    return result
}

function createFileName(){
    return `${Date.now()}${Math.ceil(Math.random() * 5000 + 5000)}`;
}

module.exports = newDownload;