const topic = require('./mongo').Topic;

function info(ctx) {
  ctx.body = {
    id: 'this is id',
    title: 'topic title',
    comments: [
      'comments A',
      'comments B',
      'comments C'
    ]
  };
}

module.exports = {
  info
}
