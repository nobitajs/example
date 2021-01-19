const ProgressBar = require('progress');
const axios = require('axios');
const chunk = require('lodash/chunk');
const fs = require('fs');


module.exports = (app) => {
  return {
    async download(arr, title, total, max) {
      const { ctx } = this;
      const bar = new ProgressBar(`${title}(共${total}页): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
      const newArr = chunk(arr, max)
      for(const list of newArr){
        const p = list.map(({url, path, page}) => {
          url = url.indexOf('http') === -1 ? `http:${url}` : url;
          return  axios({
              url,
              method: 'get',
              responseType: "arraybuffer",
              timeout: 1000,
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
      }
      
    }
  };
};
