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

async function members(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      let r = await _g.members(id);
      ctx.body = {
	id: r.id,
	members: r.members
      };
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

async function topics(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    if (tk === '') {
      let r = await _g.topics(id);
      ctx.body = {
	id: r.id,
	topics: r.topics
      };
      return;
    }
    // get user info from token;
  }
  // get user info by id;
}

module.exports = {
  info, members, topics
}
