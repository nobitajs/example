module.exports = (app) => {
  return {
    async getName() {
      const ctx = this;
      return { name: 'hello Nobita' };
    }
  };
};
