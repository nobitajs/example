const ProgressBar = require('progress');
// const axios = require('axios');
const request = require('request-promise');
const fs = require('fs');
// axios.defaults.timeout = 5000;

const urls = [

// "109197": "第141話",
// "109185": "第129話",
// "109184": "第128話",
// "109183": "第127話",
// "109182": "第126話",
// "109181": "第125話",
// "109180": "第124話",
// "109131": "第123話",
// "109130": "第122話",
// "109129": "第121話",
// "109128": "第120話",
// "109127": "第119話",
// "109126": "第118話",
// "109125": "第117話",
// "109124": "第116話",
// "109123": "第115話",
// "109122": "第114話",
// "109121": "第113話",
// "109120": "第112話",
// "109119": "第111話",
// "109118": "第110話",
// "109117": "第109話",

// ["147828", "特別短篇"],
// ["119988", "第205话"],
// ["119638", "第20卷"],
// ["119177", "第204话"],
// ["116385", "第203话"],
// ["114646", "第202话"],
// ["113884", "第201话"],
// ["113225", "第200话"],
// ["112716", "第199话"],
// ["112218", "第198话"],
// ["109169", "第197话"],
// ["105894", "第196话"],
// ["102849", "第195话"],
// ["102463", "第194话"],
// ["102080", "第193话"],
// ["101529", "第192话"],
// ["101176", "第191话"],
// ["94617", "第190话"],
// ["81727", "第189话"],
// ["80689", "第188话"],
// ["80676", "第187话"],
// ["80665", "第186话"],
// ["76629", "第185话"],
// ["76628", "第184话"],
// ["58913", "第183话"],
// ["32226", "第182话"],
// ["31594", "第181话"],
// ["31277", "第180话"],
// ["17784", "第179话"],
// ["17145", "第178话"],
// ["16553", "第177话"],
// ["15859", "第176话"],
// ["15825", "第175话"],
// ["13478", "第174话"],
// ["13470", "第173话"],
// ["13453", "第172话"],
// ["13218", "第171话"],
// ["13159", "第170话"],
// ["13158", "第169话"],
// ["12938", "第168话"],
// ["12915", "第167话"],
// ["12822", "第166话"],
// ["12821", "第165话"],
// ["10512", "第164话"],
// ["10511", "第163话"],
// ["10510", "第162话"],
// ["10509", "第161话"],
// ["10508", "第160话"],
// ["10507", "第159话"],
// ["10506", "第158话"],
// ["10505", "第157话"],
// ["10504", "第156话"],
// ["10503", "第155话"],
// ["10502", "第154话"],
// ["10501", "第153话"],
// ["10500", "第152话"],
// ["10499", "第151话"],
// ["10497", "第150话"],
// ["10498", "第149话"],
// ["10496", "第148话"],
// ["10495", "第147话"],
// ["10494", "第146话"],
// ["10493", "第145话"],
// ["10492", "第144话"],
// ["10491", "第143话"],
// ["10490", "第142话"],
// ["10489", "第141话"],
// ["10488", "第140话"],
// ["10487", "第139话"],
// ["10486", "第138话"],
// ["10485", "第137话"],
// ["10484", "第136话"],
// ["10483", "第135话"],
// ["10482", "第134话"],
// ["10481", "第133话"],
// ["10480", "第132话"],
// ["10479", "第131话"],
// ["10478", "第130话"],
// ["10477", "第129话"],
// ["10476", "第128话"],
// ["10475", "第127话"],
// ["10474", "第126话"],
// ["10473", "第125话"],
// ["10472", "第124话"],
// ["10471", "第123话"],
// ["10470", "第122话"],
// ["10469", "第121话"],
// ["10468", "第120话"],
// ["10467", "第119话"],
// ["10466", "第118话"],
// ["10465", "第117话"],
// ["10464", "第116话"],
// ["10463", "第115话"],
// ["10462", "第114话"],
// ["10461", "第113话"],
// ["10460", "第112话"],
// ["10459", "第111话"],
// ["10458", "第110话"],
// ["10457", "第109话"],
// ["10456", "第108话"],
// ["10455", "第107话"],
// ["10454", "第106话"],
// ["10453", "第105话"],
// ["10452", "第104话"],
// ["10451", "第103话"],
// ["10450", "第102话"],
// ["10449", "第101话"],
// ["10448", "第100话"],
// ["10447", "第99话"],
// ["10446", "第98话"],
// ["10445", "第97话"],
// ["10444", "第96话"],
// ["10443", "第95话"],
// ["10442", "番外6"],
// ["10441", "第94话"],
// ["10440", "第93话"],
// ["10439", "第92话"],
// ["10438", "第91话"],
// ["10437", "第90话"],
// ["10436", "第89话"],
// ["10435", "第88话"],
// ["10434", "第87话"],
// ["10433", "第86话"],
// ["10432", "第85话"],
// ["10431", "第84话"],
// ["10430", "第83话"],
// ["10429", "第82话"],
// ["10428", "第81话"],
// ["10427", "第80话"],
// ["10426", "第79话"],
// ["10425", "第78话"],
// ["10424", "第77话"],
// ["10423", "第76话"],
// ["10422", "第75话"],
// ["10421", "第74话"],
// ["10420", "第73话"],
// ["10419", "第72话"],
// ["10418", "番外5"],
// ["10417", "第71话"],
// ["10416", "第70话"],
// ["10415", "第69话"],
// ["10406", "第68话"],
// ["10405", "第67话"],
// ["10404", "第66话"],
// ["10403", "第65话"],
// ["10402", "第64话"],
// ["10401", "第63话"],
// ["10400", "第62话"],
// ["10399", "第61话"],
// ["10398", "第60话"],
// ["10397", "番外4"],
// ["10396", "第59话"],
// ["10395", "第58话"],
// ["10394", "第57话"],
// ["10393", "第56话"],
// ["10392", "第55话"],
// ["10391", "第54话"],
// ["10390", "第53话"],
// ["10389", "第52话"],
// ["10388", "第51话"],
// ["10387", "第50话"],
// ["10386", "第49话"],
// ["10385", "第48话"],
// ["10407", "第47话"],
// ["10384", "第46话"],
// ["10383", "第45话"],
// ["10382", "番外3"],
// ["10381", "第44话"],
// ["10380", "第43话"],
// ["10379", "第42话"],
// ["10378", "第41话"],
// ["10377", "第40话"],
// ["10376", "第39话"],
// ["10375", "第38话"],
// ["10374", "第37话"],
// ["10373", "第36话"],
["10372", "第35话"],
["10371", "第34话"],
["10370", "第33话"],
["10369", "第32话"],
["10368", "第31话"],
["10367", "第30话"],
["10366", "第29话"],
["10365", "第28话"],
["10359", "番外01"],
["10364", "第27话"],
["10363", "第26话"],
["10362", "第25话"],
["10361", "第24话"],
["10360", "第23话"],
["10358", "第22话"],
["10357", "第21话"],
["10356", "第20话"],
["10355", "第19话"],
["10410", "第18话"],
["10409", "第17话"],
["10408", "第16话"],
["10354", "第15话"],
["10411", "第14话"],
["10353", "第13话"],
["10412", "第12话"],
["10352", "第11话"],
["10351", "第10话"],
["10350", "第9话"],
["10349", "第8话"],
["10348", "第7话"],
["10347", "第6话"],
["10414", "第5话"],
["10413", "第4话"],
["10346", "第3话"],
["10345", "第2话"],
["10344", "第1话"],

]


async function service(arr, title, total, max) {
    // const bar = new ProgressBar(`${title}(共${total}页): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
    while(arr.length > 0){
        const getImages = arr.splice(0, 5);
        // console.log('发起下载请求', getImages)
        let p = [];

        for(item of getImages){
            let { url, path, page } = item;
            url = url.indexOf('http') === -1 ? `http:${url}` : url;

           
            p.push(new Promise((resolve, reject) => {
                let timer = null;
                if(!fs.existsSync(path)){
                    fs.mkdirSync(path)
                }

                let writeStream = fs.createWriteStream(`${path}${page}.jpg`);
                const timeoutCallback = () => { 
                    console.log(`${path}${page}.jpg 下载超时`)
                    writeStream.destroy()
                    arr.push({url, path, page})
                    resolve(false);
                }

                timer = setTimeout(timeoutCallback, 10000);

                writeStream.on('close', (e) => {
                    console.log(`${path}${page}.jpg 下载完成`)
                    clearTimeout(timer);
                    resolve(true);
                })

                writeStream.on('error', () => {
                    console.log(`${path}${page}.jpg error`)
                })

                writeStream.on('pipe', () => {
                    console.log(`${path}${page}.jpg pipe`)
                    clearTimeout(timer);
                    timer = setTimeout(timeoutCallback, 10000);
                })

                writeStream.on('unpipe', () => {
                    console.log(`${path}${page}.jpg unpipe`)
                })

                writeStream.on('drain', () => {
                    console.log(`${path}${page}.jpg drain`)
                    clearTimeout(timer);
                    timer = setTimeout(timeoutCallback, 10000);
                })
                
                request
                    .get(url, {timeout: 10000})
                    .on('error', function(err) {
                        console.log(`${path}${page}.jpg 请求超时`)
                        arr.push({url, path, page})
                        resolve(false);
                    })
                    .pipe(writeStream)

                
                // axios({
                //     url,
                //     method: 'get',
                //     // responseType: "arraybuffer",
                //     responseType: "stream",
                //     timeout: 3000,
                // }).then((res) => {
                //     let timer = null;
                //     if(!fs.existsSync(path)){
                //         fs.mkdirSync(path)
                //     }

                //     let writeStream = fs.createWriteStream(`${path}${page}.jpg`);
                //     res.data.pipe(writeStream)

                //     res.data.on('error', () => {
                //         console.log(`${path}${page}.jpg res.data.error`)
                //     })

                //     res.data.on('pause', () => {
                //         console.log(`${path}${page}.jpg res.data.pause`)
                //     })

                //     console.log('接收下载请求', `${path}${page}.jpg`)

                //     timer = setTimeout(() => { 
                //         console.log(`${path}${page}.jpg 下载超时`)
                //         writeStream.destroy()
                //         arr.push({url, path, page})
                //         resolve(false);
                //     }, 10000);

                //     writeStream.on('close', (e) => {
                //         console.log(`${path}${page}.jpg 下载完成`)
                //         clearTimeout(timer);
                //         resolve(true);
                //     })

                //     // writeStream.on('finish', () => {
                //     //     console.log(`${path}${page}.jpg finish`)
                //     // })

                //     writeStream.on('error', () => {
                //         console.log(`${path}${page}.jpg error`)
                //     })

                //     writeStream.on('pipe', () => {
                //         console.log(`${path}${page}.jpg pipe`)
                //     })

                //     // writeStream.on('unpipe', () => {
                //     //     console.log(`${path}${page}.jpg unpipe`)
                //     // })

                //     writeStream.on('drain', () => {
                //         console.log(`${path}${page}.jpg 下载中`)
                //         clearTimeout(timer);
                //         timer = setTimeout(() => { 
                //             console.log(`${path}${page}.jpg 下载超时`)
                //             writeStream.destroy()
                //             arr.push({url, path, page})
                //             resolve(false);
                //         }, 10000);
                //     })
                // }).catch(e => {
                //     console.log(`${path}${page}.jpg 请求超时`)
                //     arr.push({url, path, page})
                //     resolve(false);
                // })
            }))
        }

        await Promise.all(p).catch(e => {
            console.log(e, `===========下载失败==========`)
        })
    }

    return title
    
}

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
            console.log('请求超时1', host)
            urls.push([id, title])
            return null
        });

        // const res = await axios.get(host, {
        //     timeout: 5000,
        //     headers: {
        //         "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Mobile/15E148 Safari/604.1",
        //         // "Cookie": "__cfduid=d161af501d346187891291234a938f558f451611040011; ComicHistoryitem_zh=History=265,637466651236912874706,108995,1,0,0,0,1&ViewType=0; mangabzimgpage=108995|1:1; MANGABZ_MACHINEKEY=c5044967-7eb8-4986-a485-55bb123d8f275dc"
        //         // Referer: host
        //     }
        // }).catch(e => {
        //     console.log('请求超时1', host)
        //     urls.push([id, title])
        //     return null
        // });

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
                    path: `../鬼灭之刃/${title}/`,
                    page: i
                })
                i++;
            }
            await service(arr, title, newImgs.length, 10)
            console.log(`${title}:完成`);
        }else{
            console.log('请求超时', host)
        }
    }


}
run().then()