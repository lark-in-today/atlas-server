const group = require('./mongo').Group;

function info(ctx) {
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
}

function topics(ctx) {
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
}

module.exports = {
  info, topics
}
