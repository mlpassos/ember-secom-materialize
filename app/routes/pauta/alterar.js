import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		let slug = params.slug;
		console.log('alterando', slug);
	}
});