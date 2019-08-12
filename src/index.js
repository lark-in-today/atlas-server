const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const conf = require('./config');

class Index {
  static router() {
    let r = new Router();

    r
      .all('/', ctx => { ctx.body = 'hello, world';})
      .all('/api_v0/user/:id', ctx => {
	ctx.body = {
	  tel: '18626153029',
	  name: 'noreply',
	  mail: 'noreply@cdr.today',
	}
      })
      .all('/api_v0/user/:id/groups', ctx => {
	ctx.body = {
	  current: {
	    name: 'atlas',
	  },
	  groups: [{
	    name: 'atlas',
	  }]
	}
      })
      .all('/api_v0/group/:id', ctx => { ctx.body = 'group info';})
      .all('/api_v0/group/:id/topic', ctx => { ctx.body = 'hello, world';})
      .all('/api_v0/user/:id/groups', ctx => { ctx.body = 'user info'})
      .all('/api_v0/topic/:id', ctx => { ctx.body = 'topic content';})

    return { basic: r };
  }

  static server(r) {
    const server = new Koa();
    console.log(`Server listen to ${conf.port}...`);

    server
      .use(cors())
      .use(logger())
      .use(bodyparser())
      .use(r.basic.routes())
      .use(r.basic.allowedMethods())
      // .use(midware)
      // .use(r.auth.routes())
      // .use(r.auth.allowedMethods())
      .listen(conf.port);
  }

  static main() {
    Index.server(Index.router());
  }
}

Index.main();
