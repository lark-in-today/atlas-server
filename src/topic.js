const _t = require('./mongo')._t;
const ObjectId = require('mongoose').Types.ObjectId;

async function info(ctx) {
  const id = ctx.params.id;
  let res = await _t.findOne({_id: id});
  
  ctx.body = {
    id: res._id,
    title: res.title,
    content: res.content,
    comments: res.comments
  };
}

module.exports = { info };
