const { _g, _u, _t } = require('./mongo');

/* funcs */
async function info(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;

  if (id === '_') {
    let r = await _g.info(id);
    ctx.body = {
      id: r.id,
      name: r.name,
    };
    return;
  }
}

async function data(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  const _members = await members(id);
  const _topics = await get_topics(id);
  
  let res = await _g.findOne({name: id});
  
  ctx.body = {
    name: res.name,
    topics: _topics,
    members: _members
  }
}

async function topic(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  const body = ctx.request.body;

  let res = await _t.create({
    title: body.title,
    content: body.content,
    group: id,
    author: body.author
  });

  ctx.body = { msg: 'ok' };
}

/* utils */
async function members(name) {
  let res = await _u.find({ 'groups' : {$in: name }});
  return res.map(e => e.name);
}

async function get_topics(group) {
  let res = await _t.find({ 'group': group })
  return res.map(e => {
    return { title: e.title, id: e._id };
  });
}

module.exports = { info, data, topic };
