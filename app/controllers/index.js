
module.exports = (app) => {
  return {
    index() {
      const { ctx } = this;
      ctx.helper.utils.sum();
      return ctx.body = 'index';
    }
  };
};
