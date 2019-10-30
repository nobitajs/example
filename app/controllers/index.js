
module.exports = (app) => {
  return {
    async index() {
      const { ctx } = this;
      const data = ctx.service.main.getName();
      ctx.body = ctx.nunjucks.render('./index.html', data);
    },

  };
};
