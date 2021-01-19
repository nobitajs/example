
module.exports = app => {
  app.router.get('/',{}, app.controllers.index.index);
  app.router.get('/other',{}, app.controllers.index.other);
  app.router.get('/a',{}, app.controllers.index.a);
};