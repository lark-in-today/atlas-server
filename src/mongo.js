const conf = require('./config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;
const model = mongoose.model;

/* init */
mongoose.connect(
  conf.mongo_db, {
    useNewUrlParser: true
  }
);

/* user */
class User {
  static schema() {
    return new Schema({
      info: {
	name: String,
	tel: String,
	mail: String
      },
      groups: [{
	id: String,
	name: String,
      }]
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
      id: {
	type: String,
	unique: true
      },
      name: String,
      members: Array,
      topics: [{
	id: String,
	title: String,
      }]
    });
  }

  static model() {
    return model('group', Group.schema());
  }

  constructor() {
    this.group = Group.model();
  }

  info(id) {
    return this.group.findOne({id}).select({
      id: 1,
      name: 1,
    });
  }

  members(id) {
    return this.group.findOne({id}).select({
      id: 1,
      members: 1
    });
  }

  topics(id) {
    return this.group.findOne({id}).select({
      id: 1,
      topics: 1
    });
  }

  data(id) {
    return this.group.findOne({id}).select({
      id: 1,
      name: 1,
      topics: 1,
      members: 1
    });
  }
}

/* topic */
class Topic {
  static schema() {
    return new Schema({
      id: String,
      title: String,
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


module.exports = {
  User, Group, Topic
}
