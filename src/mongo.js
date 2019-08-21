const conf = require('./config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;
const model = mongoose.model;

/* init */
mongoose.connect(conf.mongo_db, { useNewUrlParser: true });

/* user */
class User {
  static schema() {
    return new Schema({
      name: String,
      tel: {
	type: String,
	unique: true
      },
      mail: String,
      groups: []
    });
  }

  static model() {
    return model('user', User.schema());
  }

  constructor() {
    this.user = User.model();
  }
}

/* group */
class Group {
  static schema() {
    return new Schema({
      name: {
	type: String,
	unique: true
      },
      owner: String
    });
  }

  static model() {
    return model('group', Group.schema());
  }

  constructor() {
    this.group = Group.model();
  }
}

/* topic */
class Topic {
  static schema() {
    return new Schema({
      id: String,
      title: String,
      group: String,
      author: String,
      content: String,
      comments: [{
	user: {
	  id: String,
	  name: String,
	},
	content: String,
      }]
    });
  }

  static model() {
    return model('topic', Topic.schema());
  }

  constructor() {
    this.topic = Topic.model();
  }
}


const _u = new User().user;
const _g = new Group().group;
const _t = new Topic().topic;

module.exports = { _u, _g, _t };
