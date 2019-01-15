module.exports = {
  async index() {
    const ctx = this;
    ctx.logger.error('333');
    console.log(555);
    ctx.body = ctx.nunjucks.render('index.html', { name: 'Hello Nobita' });
  }
};
