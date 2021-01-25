const ProgressBar = require('progress');
const axios = require('axios');
const download = require('download');
const chunk = require('lodash/chunk');
const fs = require('fs');
const u = require('../../u');


const urls = {

}

const url2 = [

]

module.exports = (app) => {
  return {
    async index() {
      const { ctx } = this;
      for(const url of url2){
        const host = `http://www.qiman6.com/${url}`;
        await axios({
          url: host,
          method: 'get',
          headers: {
            Referer: host
          }
        }).then(async (res) => {
          const title = res.data.split('<h1 class="chaptername_title">')[1].split('</h1>')[0];
          const text = res.data.split('eval(')[1].split(')\n')[0];
          eval('global.func = ' + text);
          eval(global.func);

          let i = 1;
          let arr = [];
          for(let src of newImgs){
            arr.push({
              url: src,
              path: `../石纪元/${title}/`,
              page: i
            })
            i++;
          }
          console.log(arr, title, newImgs.length);
          await service(arr, title, newImgs.length, 20)
          console.log(`${title}:完成`);
          console.log(url)
        })
      }
      ctx.body = ''
    },

    async other() {
      const { ctx } = this;
      let i = 0;
      while(i <= 77){
        let j = 1;
        const url = `https://twocomic.com/view/comic_7244.html?ch=${i}-${j}`;
        const {page} = u(j, url);
        const arr = [];
        while(j <= page){
          const url = `https://twocomic.com/view/comic_7244.html?ch=${i}-${j}`;
          const {img} = u(j, url);
          arr.push({
            url: img,
            path: `../出包女王/第${i}话/`,
            page: j.toString()
          })
          j++;
        }
        // console.log(arr, i, page)
        const res = await service(arr, `第${i}话`, page, 20)
        console.log(res)
        i++;
      }
      
      ctx.body = ''
    },


    async a() {
      const { ctx } = this;
      for(const id in urls){
        const host = `http://mangabz.com/m${id}`;
        const res = await axios({
          url: host,
          method: 'get',
          headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            // Referer: host
          }
        })
          console.log(host)
          const title = urls[id];
          const text = res.data.split('eval(')[1].split(')\n')[0];
          eval('global.func = ' + text);
          eval(global.func);
          let i = 1;
          let arr = [];
          for(let src of newImgs){
            arr.push({
              url: src,
              path: `../天山天下/${title}/`,
              page: i
            })
            i++;
          }
          await service(arr, title, newImgs.length, 20)
          console.log(`${title}:完成`);
      }
      ctx.body = '111'
    },
  };
};




async function service(arr, title, total, max) {
  const bar = new ProgressBar(`${title}(共${total}页): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
  const newArr = chunk(arr, max);
  console.log(newArr)
    for(const list of newArr){

          const p = list.map(({url, path, page}) => {
          url = url.indexOf('http') === -1 ? `http:${url}` : url;
          return axios({
              url,
              method: 'get',
              responseType: "arraybuffer",
              headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
                'cache-control': 'no-cache',
                accept: 'image/webp,image/apng,image/*,*/*;q=0.8'
              }
            }).then(res => {
              if(!fs.existsSync(path)){
                fs.mkdirSync(path)
              }
              fs.writeFileSync(`${path}${page}.jpg`, res.data, 'binary')
              bar.tick(1);  //进度步长
         
            }).catch(e => {
              console.log(e.message)
            })
          })
        await Promise.all(p)
      // let p = list.map(({url, path, page}) => {
      //   console.log(url);
      //   return download(url, path, {filename: `${page}.jpg`}).then(() => {;bar.tick(1)})
      // });
      // await Promise.all(p)
    }
    return title
  
}
