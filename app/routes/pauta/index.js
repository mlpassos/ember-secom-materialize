import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let slug = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('este slug é ', slug);
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	        	console.log('len pautas', pautas.get('length'));
				return pautas.get('firstObject');
			}),
		    user: this.store.findAll('user')
		});
	}
});