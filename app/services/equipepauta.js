import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service(),
	items: [],
	log() {
		console.log(
			this.get('items')
				// .map(x => x.id)
				// .join(', ')
		);
	},
	add(item) {
		console.log('service: ' + item.id);
		item.photoURL = this.get('store').findRecord('user', item.id).then(function(user) {
			console.log('url', user.get('photoURL'));
			return user.get('photoURL');
		});
		this.get('items').addObject(item);
		this.log();
	},
	remove(item) {
		this.get('items').removeObject(item);
		this.log();
	}
});