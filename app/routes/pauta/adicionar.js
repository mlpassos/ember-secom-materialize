import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		addPauta(pauta) {
			console.log('adding pauta');
		}
	}
});