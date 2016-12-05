import Ember from 'ember';

export default Ember.Route.extend({
	equipepauta: Ember.inject.service(),
	model() {
		// return this.store.findAll('user');
		return Ember.RSVP.hash({
			pauta: this.store.createRecord('pauta'),
			user: this.store.findAll('user')
		});
	},
	deactivate() {
		let equipe = this.get('equipepauta');
		equipe.empty();
		console.log('SERVICE CLEARED');
		// console.log('to clear');
		let pauta = this.modelFor(this.routeName).pauta;
		if (pauta.get('isNew')) {
			console.log('É NOVA');
			console.log('isNew', pauta.get('isNew'));
			console.log('isDeleted', pauta.get('isDeleted'));
			console.log('isSaving', pauta.get('isSaving'));
			console.log('hasDirtyAttributes', pauta.get('hasDirtyAttributes'));
			pauta.destroyRecord();
		} else {
			console.log('JA SALVOU');
			// faz nada, vai pro alterar
		}
	},
	actions: {
		addPauta(pauta) {
			let _this = this;

			let equipe = this.get('equipepauta'); //this.get('equipe');
			let equipeItems = this.get('equipepauta.equipe');			
			let producaoItems = this.get('equipepauta.producao');
			let criadoPor = pauta.criado_por;
			let pautaRecord = pauta; // this.store.createRecord('pauta', pauta);
			
			console.log('addEquipe', equipe);
			console.log('CRIADO POR', criadoPor);
			console.log('HORARIO PAUTA', pautaRecord.get('horario'));
			
			Ember.RSVP.hash({
				criado_por: _this.store.findRecord('user', criadoPor).then(function(user){
					pautaRecord.set('criado_por', user);
					console.log('criado_por registrado com sucesso', user.get('displayName'));
				}),
		        equipe: equipeItems.map(function(user) {
					console.log('equipe: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('equipe').addObject(user);
						// return pautaRecord.save().then(function() {
						// 	console.log('pauta adicionada para equipe: ' + user.get('displayName'));
						// });
					});
				}),
			    producao: producaoItems.map(function(user) {
					console.log('producao: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('producao').addObject(user);
						// return pautaRecord.save().then(function() {
						// 	console.log('pauta adicionada para producao: ' + user.get('displayName'));
						// });
					});
				})
			}).then(function() {
				console.log('criou na store', pautaRecord.get('isNew'));
				pautaRecord.save().then(function() {
					console.log('e agora persistiu');
					_this.router.transitionTo('pauta.alterar', pautaRecord.get('slug'));
				});
			});
		},
		addUserToEquipe(user) {
			console.log('adding user to equipe: ', user);
			let obj = {
				id: user
			};
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'equipe');
			console.log('items na equipe', equipepauta.equipe);
		},
		removeUserFromEquipe(user) {
			console.log('removing user from equipe: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'equipe');
			console.log('items na equipe', equipepauta.equipe);
		},
		addUserToProducao(user) {
			console.log('adding user to producao: ', user);
			let obj = {
				id: user
			};
			// console.log('obj', typeof obj);
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'producao');
			console.log('items na producao', equipepauta.producao);
		},
		removeUserFromProducao(user) {
			console.log('removing user from producao: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'producao');
			console.log('items na producao', equipepauta.producao);
		}
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('equipepauta', this.get('equipepauta.equipe'));
		controller.set('producaopauta', this.get('equipepauta.producao'));
	}
});