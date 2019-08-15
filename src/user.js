const user = require('./mongo').User;

function info(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      ctx.body = {
	tel: '',
	name: '',
	mail: '',
      }
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

function groups(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      ctx.body = {
	groups: [{
	  name: 'atlas',
	  id: '_'
	}]
      }
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

module.exports = {
  info, groups
}
