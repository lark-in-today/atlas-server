const { _g, _u } = require('./mongo');

async function info(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    let r = await _g.info(id);
    ctx.body = {
      id: r.id,
      name: r.name,
    };
    return;
  }
  // get user info by id;
}

async function members(name) {
  let res = await _u.find({ 'groups' : {$in: name }});
  return res.map(e => e.name);
}

async function data(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  const _members = await members(id);
  let res = await _g.findOne({name: id});
  // if (res == null) {
  //   let _res = await _g.create({name: id});
  //   ctx.body = {
  //     name: _res.name,
  //     topics: _res.topics,
  //     members: _members
  //   } 
  //   return;
  // } 

  ctx.body = {
    name: res.name,
    topics: res.topics,
    members: _members
  }
}

module.exports = {
  info, data, _g
}
