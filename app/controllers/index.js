
module.exports = {
  async index() {
    const ctx = this;
    // console.log(123, process.messenger.send)
    // process.messenger.send({ type: 'sendTo', action: 'test', toPid: process.pids[1], data: { name: 123 } });
    ctx.body = ctx.nunjucks.render('index.html', { name: 'process.pids' });
  }

};
