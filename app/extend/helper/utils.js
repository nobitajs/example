
module.exports = (app) => {
  return {
    sum() {
      const { ctx } = this;
      console.log('utils');
      return {};
    }
  };
};
