const axios = require('axios');

const u = require('../../u');

const urls = [
"/16080/691266.html",
"/16080/635783.html",
"/16080/566485.html",
"/16080/547631.html",
"/16080/547626.html",
"/16080/547623.html",
"/16080/547608.html",
"/16080/547593.html",
"/16080/547574.html",
"/16080/547568.html",
"/16080/547564.html",
"/16080/547559.html",
"/16080/547540.html",
"/16080/547535.html",
"/16080/547534.html",
"/16080/547525.html",
"/16080/547519.html",
"/16080/547515.html",
"/16080/547503.html",
"/16080/547475.html",
"/16080/547474.html",
"/16080/547468.html",
"/16080/547460.html",
"/16080/547436.html",
"/16080/547430.html",
"/16080/547423.html",
"/16080/547402.html",
"/16080/547401.html",
"/16080/547394.html",
"/16080/547390.html",
"/16080/547378.html",
"/16080/547372.html",
"/16080/547367.html",
"/16080/547358.html",
"/16080/547353.html",
"/16080/547351.html",
"/16080/547334.html",
"/16080/547327.html",
"/16080/547319.html",
"/16080/547291.html",
"/16080/547286.html",
"/16080/547276.html",
"/16080/547275.html",
"/16080/547271.html",
"/16080/547258.html",
"/16080/547252.html",
"/16080/547234.html",
"/16080/547230.html",
"/16080/547222.html",
"/16080/547221.html",
"/16080/547213.html",
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
            p.push(download(src, `../一人之下/${title}`, {
              filename: `${i}.jpg`.toString()
            }).then(() => {console.log(`一人之下/${title}`, '下载完成')}).catch(e=>{}))
            i++;
          }

          await Promise.all(p).then()
          console.log(`${title}:完成`);
          console.log(url)
        })
      }
      console.log('一人之下:全部完成')
      ctx.body = ''
    },

    async other() {
      const { ctx } = this;
      let i = 1;
      while(i <= 180){
        let j = 1;
        const url = `https://twocomic.com/view/comic_14898.html?ch=${i}-${j}`;
        const {page} = u(j, url);
        const p = [];
        const arr = [];
        while(j <= page){
          const url = `https://twocomic.com/view/comic_14898.html?ch=${i}-${j}`;
          const {img} = u(j, url);
          arr.push({
            url: img,
            path: `../石纪元/第${i}话/`,
            page: j
          })
          j++;
        }
        await ctx.service.main.download(arr, i, page, 20)
        i++;
      }
      
      ctx.body = ''
    }
  };
};
