
module.exports = {
  async index() {
    const ctx = this;
    let res = await ctx.service.main.getName();
    ctx.body = ctx.nunjucks.render('index.html', res.data);
  }
};
