const Group = require('./mongo').Group;
const _g = new Group();

async function info(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      let r = await _g.info(id);
      ctx.body = {
	id: r.id,
	name: r.name,
      };
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

async function data(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      let r = await _g.data(id);
      ctx.body = {
	id: r.id,
	name: r.name,
	topics: r.topics,
	members: r.members,
      };
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

module.exports = {
  info, data
}
