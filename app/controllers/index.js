
module.exports = (app) => {
  return {
    index() {
      const { ctx } = this;
      const data = ctx.service.main.getName();
      console.log(data);
      ctx.body = ctx.nunjucks.render('./index.html', data);
    }
  };
};
