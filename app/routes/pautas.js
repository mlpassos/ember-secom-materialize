import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		console.log('MODEL HAHA');
		return this.store.findAll('pauta', { reload:true } );
	},
	// setupController(controller, model) {
	// 	this._super(...arguments);
	// 	console.log('controller model', model.get('length'));
	// 	controller.set('len', model.get('length'));
	// },
	actions: {
		verPauta(slug) {
			console.log('VER PAUTA slug', slug);
			this.router.transitionTo('pauta', slug);
		},
		addPauta() {
			console.log('ADICIONAR NOVA PAUTA');
			this.router.transitionTo('pauta.adicionar', 'novo');
		},
		editPauta(slug) {
			console.log('ALTERAR PAUTA slug', slug);
			this.router.transitionTo('pauta.alterar', slug);	
		},
		delPauta(result) {
			// console.log((result === true) ? 'excluído do backend' : 'deu algum problema');
			if (result === false) {
				console.log('erro');
			} else {
				console.log('unloaded record', result.get('retranca'));
				// this.store.unloadRecord(result);
				// result.destroyRecord();
				// .then(function() {
				// 	console.log('RECORD UNLOADED');
				// });	
			}
		}
	}
});