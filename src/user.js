const Redis = require('ioredis');
const crypto = require('crypto');

const _r = new Redis();
const { _u, _g } = require('./mongo');

async function thum(ctx) {
  const name = ctx.params.name;
  let r = await _u.findOne({name: name});
  ctx.body = {
    name: r.name?r.name: '',
    mail: r.mail?r.mail: ''
  };
  
  return;
}

async function info(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  // if get self;
  if (id === '_') {
    ctx.body = {
      tel: '',
      name: '',
      mail: '',
      groups: ['atlas']
    }
    return;
  }

  let info = await _u.findOne({tel: id});
  ctx.body = {
    tel: info.tel,
    name: info.name?info.name: '',
    mail: info.mail?info.mail: '',
    groups: info.groups
  }
  // get user info by id;
}

function sms(ctx) {
  // const id = ctx.params.id;
  ctx.body = { msg: 'ok' };
}

async function update(ctx) {
  const id = ctx.params.id;
  const tk = ctx.request.header.token;
  const body = ctx.request.body;

  if (body.key === 'join_group')  {
    let info = await _u.findOne({ tel: id });
    let groups = info.groups;
    groups.push(body.value);

    // if not exist, create it.
    let exist = await _g.findOne({name: body.value});
    if (exist == null) {
      await _g.create({ name: body.value, owner: id});
    }

    // return;
    ctx.body = await _u.findOneAndUpdate({tel: id}, { groups: groups });
    return;
  } else if (body.key === 'quit_group') {
    let info = await _u.findOne({ tel: id });
    let groups = info.groups;
    groups = groups.filter((v, i, arr) => v !== body.value);
    r = await _u.findOneAndUpdate({tel: id}, { groups: groups });
    ctx.body = r;
  } else {
    r = await _u.findOneAndUpdate({ tel: id }, { [body.key]: body.value });
    ctx.body = r;
    return;
  }
}

async function sms_verify(ctx) {
  const tel = ctx.params.id;
  let token = await crypto.randomBytes(64);
  _r.set(tel, token.toString('hex'));

  // if user not exist create user.
  let f_res = await _u.findOne({tel: tel});
  if (f_res == null) {
    let c_res = await _u.create({
      tel: tel,
      groups: ['atlas']
    });
  }
  
  ctx.body = { msg: 'ok', token: token.toString('hex') };
}

module.exports = {
  info, sms, thum, sms_verify, update, _u
};
