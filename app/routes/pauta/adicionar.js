import Ember from 'ember';

export default Ember.Route.extend({
	equipe: [],
	model() {
		return this.store.findAll('user');
	},
	actions: {
		addPauta(pauta) {
			console.log('adding pauta', pauta);
			// pauta.equipe = this.get('equipe');
			let _this = this;
			let equipe = this.get('equipe');
			let pautaRecord = this.store.createRecord('pauta', pauta);
			console.log('addEquipe', equipe);
			equipe.map(function(user) {
				console.log(user.id);
				return _this.store.findRecord('user', user.id).then(function(user){
					// console.log('len', user.get('displayName'));
					pautaRecord.get('equipe').addObject(user);
					return pautaRecord.save().then(function() {
						console.log('pauta adicionada para ' + user.get('displayName'));
					});
				});
			});
			// console.log(equipe.join());
			// this.store.query('user', {id: equipe.join()}).then(function(user){
			// 	console.log('len', user.get('length'));
			// 	// pautaRecord.get('equipe').addObject(user);
			// 	// pautaRecord.save().then(function() {
			// 	// 	console.log('pauta adicionada para ' + user.get('displayName'));
			// 	// });
			// });
		},
		addUserToEquipe(user) {
			console.log('adding user', user);
			let obj = {
				id: user
			}
			// console.log('obj', typeof obj);
			let equipe = this.get('equipe');
			equipe.push(obj);
			console.log(equipe);
		},
		addUserToProducao(user) {
			console.log('adding user', user);
		}
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('equipe', this.get('equipe'));
		// controller.set('dataExemplo', new Date());
	}
});