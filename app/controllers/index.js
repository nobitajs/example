const axios = require('axios');
const download = require('download');
const u = require('../../u');

const urls = [
  
]

module.exports = (app) => {
  return {
    async index() {
      const { ctx } = this;
      for(const url of urls){
        await axios({
          url: `http://www.qiman6.com/${url}`,
          method: 'get',
        }).then(async (res) => {
          const title = res.data.split('<h1 class="chaptername_title">')[1].split('</h1>')[0];
          const text = res.data.split('eval(')[1].split(')\n')[0];
          eval('global.func = ' + text);
          eval(global.func);

          let i = 1;
          let p = [];
          for(let src of newImgs){
            p.push(download(src, `../鬼灭之刃/${title}`, {
              filename: `${i}.jpg`.toString()
            }).then(() => {console.log(`鬼灭之刃/${title}`, '下载完成')}).catch(e=>{}))
            i++;
          }

          await Promise.all(p).then()
          console.log(`${title}:完成`);
          console.log(url)
        })
      }
      console.log('鬼灭之刃:全部完成')
      ctx.body = ''
    },

    async other() {
      const { ctx } = this;
      let i = 31;
      while(i <= 182){
        let j = 1;
        const url = `https://twocomic.com/view/comic_10406.html?ch=${i}-${j}`;
        const {page} = u(j, url);
        const p = [];
        console.log('共',page, '页')
        while(j <= page){
          const url = `https://twocomic.com/view/comic_10406.html?ch=${i}-${j}`;
          const {img} = u(j, url);
          let page = j;
          p.push(download(img, `../一拳超人/第${i}话`, {
            filename: `${j}.jpg`.toString()
          }).then(() => {console.log(`一拳超人/第${i}话-第${page}页`, '下载完成')}).catch(e=>{}))
          j++;
        }

        await Promise.all(p).then()
        i++;
      }
      
      ctx.body = ''
    }
  };
};
