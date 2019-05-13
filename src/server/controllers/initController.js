import IndexCtrl from './IndexController';
const indexCtrl = new IndexCtrl();

const initCtrl = {
  getAllRouters (app, router) {
    router
      .get('/', indexCtrl.getAllBooks);

    app
      .use(router.routes())
      .use(router.allowedMethods());
  }
};

export default initCtrl;
