import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		let slug = params.slug;
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
				return pautas.get('firstObject');
			}),
		    user: this.store.findAll('user')
		});
	}
});