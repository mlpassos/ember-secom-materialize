import Ember from 'ember';

export default Ember.Route.extend({
	slug:'',
	model(params) {
		let id = params.slug;
		this.set('slug', id);
		return this.store.findRecord('post', id);	
	}
});