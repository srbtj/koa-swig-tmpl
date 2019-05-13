class IndexController {
  constructor () {}
  /**
   * 分页获取所有图片信息
   * @memberof IndexController
   */
  async getAllBooks (ctx) {
    return ctx.body = await ctx.render('index');
  }
}

export default IndexController;
