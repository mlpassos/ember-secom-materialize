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
		checkUsers(dt) {
			let _this = this;
			let dtp = new Date(dt);
			// console.log('dtp', dtp);
			this.store.findAll('pauta').then((rs)=>{
				console.log(rs.get('length'));
				rs.map((res) => {
					// console.log('entrou aqui');
					if (!res.get('isNew')) {
						let dtc = res.get('dataHora');
						// console.log('dtc', dtc);
						if (dtc.getTime() === dtp.getTime()) {
							// tem pauta nesta data, verificar os usuários
							console.log('igual');
							// let result = [];
							res.get('motorista').then((user) => {
								// result.addObject(user);
								console.log('removendo motorista', user.get('displayName'));
								_this.get('currentModel.user').removeObject(user);
							});
							res.get('reporter').then((user) => {
								// result.addObject(user);
								_this.get('currentModel.user').removeObject(user);
							});
							res.get('fotografo').then((user) => {
								// result.addObject(user);
								_this.get('currentModel.user').removeObject(user);
							});
							res.get('producao').then((user) => {
								// result.addObject(user);
								_this.get('currentModel.user').removeObject(user);
							});
						} else {
							// não tem pauta nesta data, fim
							return false;
						}
					}
				});
				
			}, (error) => {
				console.log(error);
				return false;
			});
			// alert(dt);
		},
		addPauta(pauta) {
			let _this = this;
			let motoristaItems = this.get('equipepauta.motorista');		
			let reporterItems = this.get('equipepauta.reporter');
			let fotografoItems = this.get('equipepauta.fotografo');
			let producaoItems = this.get('equipepauta.producao');
			let criadoPor = pauta.criado_por;
			let pautaRecord = pauta; // this.store.createRecord('pauta', pauta);
			
			console.log(motoristaItems,reporterItems,fotografoItems,producaoItems);
			console.log('CRIADO POR', criadoPor);
			console.log('HORARIO PAUTA', pautaRecord.get('horario'));
			
			Ember.RSVP.hash({
				criado_por: _this.store.findRecord('user', criadoPor).then(function(user){
					pautaRecord.set('criado_por', user);
					console.log('criado_por registrado com sucesso', user.get('displayName'));
				}),
		        motorista: motoristaItems.map(function(user) {
					console.log('motorista: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('motorista').addObject(user);
						// return pautaRecord.save().then(function() {
						// 	console.log('pauta adicionada para equipe: ' + user.get('displayName'));
						// });
					});
				}),
				reporter: reporterItems.map(function(user) {
					console.log('reporter: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('reporter').addObject(user);
						// return pautaRecord.save().then(function() {
						// 	console.log('pauta adicionada para equipe: ' + user.get('displayName'));
						// });
					});
				}),
				fotografo: fotografoItems.map(function(user) {
					console.log('fotografo: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('fotografo').addObject(user);
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
		addUserToMotorista(user) {
			console.log('adding user to motorista: ', user);
			let obj = {
				id: user
			};
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'motorista');
			console.log('items na motorista', equipepauta.motorista);
		},
		removeUserFromMotorista(user) {
			console.log('removing user from motorista: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'motorista');
			console.log('items na motorista', equipepauta.motorista);
		},
		addUserToReporter(user) {
			console.log('adding user to reporter: ', user);
			let obj = {
				id: user
			};
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'reporter');
			console.log('items na reporter', equipepauta.reporter);
		},
		removeUserFromReporter(user) {
			console.log('removing user from reporter: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'reporter');
			console.log('items na reporter', equipepauta.reporter);
		},
		addUserToFotografo(user) {
			console.log('adding user to fotografo: ', user);
			let obj = {
				id: user
			};
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'fotografo');
			console.log('items na fotografo', equipepauta.fotografo);
		},
		removeUserFromFotografo(user) {
			console.log('removing user from fotografo: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'fotografo');
			console.log('items na fotografo', equipepauta.fotografo);
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
		controller.set('motorista', this.get('equipepauta.motorista'));
		controller.set('reporter', this.get('equipepauta.reporter'));
		controller.set('fotografo', this.get('equipepauta.fotografo'));
		controller.set('producao', this.get('equipepauta.producao'));
	}
});