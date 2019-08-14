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
	    name: 'The Velvet Goldmine',
	  },
	  groups: [{
	    id: '00',
	    name: 'The Velvet Goldmine',
	  }]
	}
      })
      .all('/api_v0/group/current', ctx => {
	ctx.body = {
	  id: '0303030',
	  name: 'The Velvet Goldmine',
	  members: [{
	    tel: '01',
	    name: 'David Bowie'
	  }, {
	    tel: '02',
	    name: 'Iggy Pop'
	  }, {
	    tel: '03',
	    name: 'Lou Reed'
	  }]
	}
      })
      .all('/api_v0/group/:id', ctx => {
	ctx.body = {
	  id: '0303030',
	  name: 'The Velvet Goldmine',
	  members: [{
	    tel: '01',
	    name: 'David Bowie'
	  }, {
	    tel: '02',
	    name: 'Iggy Pop'
	  }, {
	    tel: '03',
	    name: 'Lou Reed'
	  }]
	}
      })
      .all('/api_v0/group/:id/topics', ctx => {
	ctx.body = {
	  topics: [{
	    id: '00',
	    title: 'AMD lands Google, Twitter as customers with newest server chip',
	  }, {
	    id: '01',
	    title: 'GitHub Actions now supports CI/CD, free for public repositories',
	  }, {
	    id: '02',
	    title: 'Svalbard is as close as you can get to a place with open borders'
	  }]
	}
      })
      .all('/api_v0/topic/:id', ctx => {
	ctx.body = {
	  id: 'this is id',
	  title: 'topic title',
	  comments: [
	    'comments A',
	    'comments B',
	    'comments C'
	  ]
	};
      });

    return r;
  }

  static server(r) {
    const server = new Koa();
    console.log(`Server listen to ${conf.port}...`);

    server
      .use(cors())
      .use(logger())
      .use(bodyparser())
      .use(r.routes())
      .use(r.allowedMethods())
      .listen(conf.port);
  }

  static main() {
    Index.server(Index.router());
  }
}

Index.main();
