
module.exports = (app) => {
  return {
    index() {
      const { ctx } = this;
      ctx.body = 'Hi Nobita!';
    }
  };
};
