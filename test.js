const request = require('request-promise');
const u = require('./u');
const download = require('./download');

const urls = [
  
]


async function run(){
    console.log('===开始执行爬虫===')
    for(const item of urls){
        const [id, title] = item;
        const host = `http://mangabz.com/m${id}`;
        console.log('===发起请求===', host)
        const res = await request({
            url: host,
            timeout: 5000,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Mobile/15E148 Safari/604.1",
                // "Cookie": "__cfduid=d161af501d346187891291234a938f558f451611040011; ComicHistoryitem_zh=History=265,637466651236912874706,108995,1,0,0,0,1&ViewType=0; mangabzimgpage=108995|1:1; MANGABZ_MACHINEKEY=c5044967-7eb8-4986-a485-55bb123d8f275dc"
                // Referer: host
            }
        }).catch(e => {
            console.log('请求超时', host)
            urls.push([id, title])
            return null
        });

        console.log('接收请求', host)
        if(res){
            const text = res.split('eval(')[1].split(')\n')[0];
            eval('global.func = ' + text);
            eval(global.func);
            let i = 1;
            let arr = [];
            for(let src of newImgs){
                arr.push({
                    url: src,
                    path: `../JOJO奇妙冒险/${title}/`,
                    fileName: i
                })
                i++;
            }
            await download(arr, {title, parallel: 5})
        }else{
            console.log('请求超时', host)
        }
    }

    console.log('========全部下载完成========')
}

async function other() {
    let i = 141;
    while(i <= 141){
        let j = 1;
        const url = `https://twocomic.com/view/comic_14898.html?ch=${i}-${j}`;
        const {page} = u(j, url);
        const arr = [];
        while(j <= page){
            const url = `https://twocomic.com/view/comic_14898.html?ch=${i}-${j}`;
            const {img} = u(j, url);
            arr.push({
                url: img,
                path: `../石纪元/第${i}话/`,
                fileName: j.toString()
            })
            j++;
        }
        // console.log(arr, i, page)
        const res = await download(arr, {title: `第${i}话`, parallel: 4})
        console.log(res, '===');
        i++;
    }
}

other().then()