
module.exports = {
  async index() {
    const ctx = this;
    ctx.body = ctx.nunjucks.render('index.html', { name: 'process.pids' });
  }

};
