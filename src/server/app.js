import Koa from 'koa';
import koaStatic from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import Router from 'koa-router';
import initCtrl from './controllers/initController';
import {join} from 'path';
const app = new Koa();

// 处理swig模板页面
app.context.render = co.wrap(render({
  root: join(__dirname, '../web/views'),
  autoescape: true,
  cache: false, // 开发环境:false, 生产环境: 'memory', 启动缓存
  ext: 'html',
  writeBody: false
}));

// 加载静态资源
app.use(koaStatic(join(__dirname, './public')));
// 加载路由中间件
initCtrl.getAllRouters(app, new Router());

app.listen(3000, function () {
  console.log("启动服务成功...");
});
