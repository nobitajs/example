const ProgressBar = require('progress');
const axios = require('axios');
const chunk = require('lodash/chunk');
const fs = require('fs');


module.exports = (app) => {
  return {
    async download(arr, i, total, max) {
      const bar = new ProgressBar(`第${i}话(共${total}页): [:bar] [:percent]`, { total: +total, width: 50, clear: true });
      const { ctx } = this;
      const newArr = chunk(arr, max)
      for(const list of newArr){
        const p = list.map(({url, path, page}) => {
          let ws = fs.createWriteStream(`${path}${page}.jpg`);
          return new Promise((reslove) => {
            axios({
              url,
              method: 'get',
              responseType: "stream",
            }).then(res => {
              if(!fs.existsSync(path)){
                fs.mkdirSync(path)
              }
              res.data.pipe(ws);
              ws.on("finish", () => {
                reslove()
                bar.tick(1);  //进度步长
              })

              ws.on('error', (err) => {
                console.log(err.stack);
             });
            })
          })
        })
  
        await Promise.all(p).then() 
      }
      
    }
  };
};
