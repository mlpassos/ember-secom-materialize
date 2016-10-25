import Ember from 'ember';

export default Ember.Service.extend({
  admins: null,
  init() {
    this._super(...arguments);
    this.set('admins', []);
    // add admins via ajax
    this.add('marciopassosbel@gmail.com');
  },
  add(item) {
    this.get('admins').pushObject(item);
  },
  remove(item) {
    this.get('admins').removeObject(item);
  },
  empty() {
    this.get('admins').setObjects([]);
  },
  check(item) {
  	this.get('admins').filter(function(el) {
  		console.log(el);
  	});
  }
});