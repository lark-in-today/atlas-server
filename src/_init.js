const Group = require('./mongo').Group;
const g = new Group().group;

// main
;(function(){
  g.exists({
    id: '_'
  }).then(r => {
    if(!r) {
      console.log('hello');
      g.create({
	id: '_', name: 'atlas'
      })
    }
  });
})();
