const user = require('./mongo').User;

function info(ctx) {
  ctx.body = {
    tel: '18626153029',
    name: 'noreply',
    mail: 'noreply@cdr.today',
  }
}

function groups(ctx) {
  ctx.body = {
    current: {
      name: 'The Velvet Goldmine',
    },
    groups: [{
      id: '00',
      name: 'The Velvet Goldmine',
    }]
  }
}

module.exports = {
  info, groups
}
