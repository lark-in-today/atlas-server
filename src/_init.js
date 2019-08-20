const User = require('./mongo').User;
const Group = require('./mongo').Group;
const g = new Group().group;
const u = new User().user;

// main
;(function(){
  g.exists({
    id: '_'
  }).then(r => {
    if(!r) {
      g.create({ name: 'atlas'})
    }
  });

  u.create({
    tel: '18626153029',
    groups: [
      'atlas'
    ]
  })
})();
