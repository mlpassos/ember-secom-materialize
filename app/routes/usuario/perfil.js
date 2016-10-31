import Ember from 'ember';

export default Ember.Route.extend({
	// checkboxSelections: ['38', '40', '41'],
	// checkboxChoices: [{
	// 	id: 1,
	// 	label: 'teste'
	// }],
	// funcaoEscolhida: '',
	user: '',
	props: {
		title: 'Perfil',
		subtitle: 'Bem-vindo ao seu perfil',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
	},
	model() {
		// check for uid
		let uid = this.get('session.currentUser.uid');
		let usuario = this.get('session.currentUser');
		// let isNews = usuario.get('isNew');
		let isNew = usuario.isNew;
		let _this = this;
		if (uid) {
			return Ember.RSVP.hash({
		        user: this.store.query('user', {orderBy: 'uid', equalTo: uid}).then(function(users) {
				  return users.get('firstObject');
				}).then(function(user) {
					console.log('PERFIL isNew', isNew);
					if (isNew) {
						_this.set('user', user);
						return user;
					} else {
						console.log('USUARIO TEM FUNCAO?', usuario.funcaoid);
						console.log('USUARIO TEM FUNCAO?', user.funcaoid);
						if (user.funcaoid) {
							console.log('user.funcaoid', user.funcaoid);
							_this.set('user', user);
							return user;
						} else {
							return user.get('funcao').then(function(funcao) {
								console.log('f', funcao);
								if (funcao) {
									console.log('SIM, USUARIO TEM FUNCAO, É ', funcao.id);
									user.funcaoid = funcao.id;	
								} else {
									console.log('NAO, USUARIO NAO TEM FUNCAO');	
								}
								_this.set('user', user);
								return user;
							});
						}
					}
				  // return user.get('funcao')
				  // return user;
				}),
			    props: this.get('props'),
			    funcao: this.store.findAll('funcao')
			    // ,
			    // tags: this.store.findAll('tag')
			});
		} else {
			return this.get('props');
		}
	},
	actions: {
		gravarUsuario(funcao) {
			let uid = this.get('session.currentUser.uid');
			let user = this.get('user');
			let funcaoIdEscolhida = parseInt(funcao);
			let usuario = this.get('session.currentUser');
			let isNew = usuario.isNew;
			let _this = this;

			console.log('função escolhida', funcaoIdEscolhida);
			if (funcaoIdEscolhida) {
				if (user.funcaoid) {
					console.log('USUARIO COM FUNCAO ATUAL ', user.funcaoid);
				} else {
					user.funcaoid = 0;
					console.log('USUARIO SEM FUNCAO ATUAL ', user.funcaoid);
				}
				// grava função escolhida caso seja diferente da atual
				if (funcaoIdEscolhida !== parseInt(user.funcaoid)) {
					this.store.findRecord('funcao', funcaoIdEscolhida).then(function(funcao) {
						user.set('funcao', funcao);
						user.save().then(function() {
							console.log('função do usuário atualizada');
							user.isNew = false;
							_this.set('user.funcaoid', funcaoIdEscolhida);
							user.funcaoid = funcaoIdEscolhida;
						});
					});	
				}	
			} else {
				console.log('nao escolheu funcao');
			}
			
			if (user.get('hasDirtyAttributes')) {
				//       _this.get('store').findRecord('funcao', 6).then(function(funcao) {
						//   userRecord.set('funcao', funcao);
						//   userRecord.save().then(function() {
				  //         	console.log('Usuário cadastrado com sucesso');
				  //         });
						// });
				user.save().then(function() {
					alert('Dados do usuário atualizados');
				});	
			} else {
				console.log('sem novidades no usuário');
			}
			// this.get('store').query('user', {orderBy: 'uid', equalTo: uid }).then( function(user) {
			// 	// console.log(user.get('hasDirtyAttributes'));
			// 	// console.log(user.changedAttributes());
			// // 	// user.set('displayName', displayName);
			// //  //  	user.set('email', email);
			//   	user.save().then(function() {
			//   		alert('Dados do usuário atualizados');
			//   	});
			// });
		}
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('user', this.get('user'));
		// let funcaoEscolhida = controller.get('funcaoEscolhida');
		// console.log(funcaoEscolhida);
		// controller.set('checkboxChoices', this.get('checkboxChoices'));
		// controller.set('checkboxSelections', this.get('checkboxSelections'));
	}
});