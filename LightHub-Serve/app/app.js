const Koa = require('koa');
const compose = require('koa-compose');
const MD = require('./middleware');

const app = new Koa();

app.use(compose(MD));

app.listen(3000);