module.exports = (app) => {
  return {
    getName() {
      const { ctx } = this;
      return { name: 'hello Nobita' };
    }
  };
};
