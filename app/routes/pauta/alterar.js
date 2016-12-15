import Ember from 'ember';
import dateUtil from '../../utils/format-date';
import cleanURL from '../../utils/cleanurl';

export default Ember.Route.extend({
	// equipepauta: Ember.inject.service(),
	model() {
		let slug = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('alterar esta pauta ', slug);
		console.log('isSaved', this.get('isSaved'));
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	        	console.log('len pautas', pautas.get('length'));
				let pauta = pautas.get('firstObject');
				let dth = dateUtil(pauta.get('dataHora'));
				console.log('dth', dth);
				pauta.set('dataHora', dth);
				// equipepauta.add(obj, 'motorista');
				// console.log('items na motorista', equipepauta.motorista);
				
				return pauta;
			}),
		    user: this.store.findAll('user')
		});
	},
	// afterModel(model) {
	// 	let equipepauta = this.get('equipepauta');
	// 	let motorista = model.pauta.get('motorista').map(function(user) {
	// 		equipepauta.add({id: user.get('id')}, 'motorista');
	// 		return {id: user.get('id')};
	// 	});
	// 	let reporter = model.pauta.get('reporter').map(function(user) {
	// 		equipepauta.add({id: user.get('id')}, 'reporter');
	// 		return {id: user.get('id')};
	// 	});
	// 	let fotografo = model.pauta.get('fotografo').map(function(user) {
	// 		equipepauta.add({id: user.get('id')}, 'fotografo');
	// 		return {id: user.get('id')};
	// 	});
	// 	let producao = model.pauta.get('producao').map(function(user) {
	// 		equipepauta.add({id: user.get('id')}, 'producao');
	// 		return {id: user.get('id')};
	// 	});
	// 	console.log('motorista', equipepauta.motorista);
	// 	console.log('reporter', equipepauta.reporter);
	// 	console.log('fotografo', equipepauta.fotografo);
	// 	console.log('producao', equipepauta.producao);
	// },
	isSaved: false,
	pauta: '',
	setupController(controller) {
		this._super(...arguments);
		this.set('pauta', controller.get('model.pauta'));
	},
	deactivate() {
		console.log('LIMPANDO PAUTA');
		let pauta = this.get('pauta');
		let changed = Object.keys(pauta.changedAttributes()).length;
		console.log('clean', pauta);
		if (this.get('isSaved')) {
			// se gravou, tem algo novo?
			console.log('changed isSaved', changed);
			if (changed) {
				// se tem algo novo, limpa que nao ta salvo
				pauta.rollbackAttributes();	
			}
		} else {
			console.log('changed isNotSaved', changed);
			pauta.rollbackAttributes();
		}
		this.set('isSaved', false);
	},
	actions: {
		editPauta(pauta) {
			let _this = this;
			console.log('pauta', pauta.get('local'));
			console.log('SAVING PAUTA', pauta.get('hasDirtyAttributes'));
			// let a= pauta.get('hasDirtyAttributes')
			if (pauta.get('hasDirtyAttributes')) {
				// checar quem mudou e salvar apenas estes
				let dt = new Date(pauta.get('dataHora'));
				let slug = cleanURL(pauta.get('retranca'));
				let oldSlug = pauta.get('slug');
				console.log('brslug', slug);
				pauta.set('dataHora', dt);
				pauta.set('slug', slug);
				pauta.save().then(function() {
					console.log('pauta atualizada');
					_this.set('isSaved', true);
					if (slug !== oldSlug) {
						console.log('redir...');
						_this.router.transitionTo('pauta.alterar', slug);		
					}
				}).catch(function() {
					// error
					alert('Erro ao gravar');
				});
			} else {
				console.log('sem novidades');
			}
		},
		addPauta() {
			this.router.transitionTo('pauta.adicionar', 'novo');		
		},
		addUserToMotorista(user) {
			console.log('adding user to motorista: ', user);
			let pauta = this.get('pauta');
			this.store.findRecord('user', user).then(function(user) {
				pauta.get('motorista').addObject(user);
				pauta.save().then(function() {
					console.log('sucesso ao adicionar motorista');
				}, function() {
					console.log('erro ao adicionar motorista');
				});
			});
		},
		removeUserFromMotorista(user) {
			console.log('removendo user de motorista: ', user);
			let pauta = this.get('pauta');
			pauta.get('motorista').removeObject(user);
			pauta.save().then(function() {
				console.log('sucesso ao remover motorista');
			}, function() {
				console.log('erro ao remover motorista');
			});
		},
		addUserToReporter(user) {
			console.log('adding user to reporter: ', user);
			let pauta = this.get('pauta');
			this.store.findRecord('user', user).then(function(user) {
				pauta.get('reporter').addObject(user);
				pauta.save().then(function() {
					console.log('sucesso ao adicionar reporter');
				}, function() {
					console.log('erro ao adicionar reporter');
				});
			});
		},
		removeUserFromReporter(user) {
			console.log('removendo user de reporter: ', user);
			let pauta = this.get('pauta');
			pauta.get('reporter').removeObject(user);
			pauta.save().then(function() {
				console.log('sucesso ao remover reporter');
			}, function() {
				console.log('erro ao remover reporter');
			});
		},
		addUserToFotografo(user) {
			console.log('adding user to fotografo: ', user);
			let pauta = this.get('pauta');
			this.store.findRecord('user', user).then(function(user) {
				pauta.get('fotografo').addObject(user);
				pauta.save().then(function() {
					console.log('sucesso ao adicionar fotografo');
				}, function() {
					console.log('erro ao adicionar fotografo');
				});
			});
		},
		removeUserFromFotografo(user) {
			console.log('removendo user de fotografo: ', user);
			let pauta = this.get('pauta');
			pauta.get('fotografo').removeObject(user);
			pauta.save().then(function() {
				console.log('sucesso ao remover fotografo');
			}, function() {
				console.log('erro ao remover fotografo');
			});
		},
		addUserToProducao(user) {
			console.log('adding user to producao: ', user);
			let pauta = this.get('pauta');
			this.store.findRecord('user', user).then(function(user) {
				pauta.get('producao').addObject(user);
				pauta.save().then(function() {
					console.log('sucesso ao adicionar producao');
				}, function() {
					console.log('erro ao adicionar producao');
				});
			});
		},
		removeUserFromProducao(user) {
			console.log('removendo user de producao: ', user);
			let pauta = this.get('pauta');
			pauta.get('producao').removeObject(user);
			pauta.save().then(function() {
				console.log('sucesso ao remover producao');
			}, function() {
				console.log('erro ao remover producao');
			});
		}
	}
});