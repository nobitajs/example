module.exports = async (ctx, next) => {
  await next();
  if (ctx.response.status == 404) {
    console.log(ctx.request.url, ctx.response.status);
    //...
  }
};