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
		let fid = usuario.funcaoid;
		// let isNews = usuario.get('isNew');
		let isNew = usuario.isNew;
		let _this = this;
		if (uid) {
			return Ember.RSVP.hash({
		        user: this.store.query('user', {orderBy: 'uid', equalTo: uid}).then(function(users) {
				  return users.get('firstObject');
				}).then(function(user) {
					console.log('PERFIL isNew', isNew);
					console.log('USUARIO TEM FUNCAO?', user.funcaoid);
					// if (isNew) {
						_this.set('user', user);
						return user;
					// } else {
						// console.log('USUARIO TEM FUNCAO?', usuario.funcaoid);
						// console.log('USUARIO TEM FUNCAO?', user.funcaoid);
						// if (user.funcaoid) {
						// 	console.log('user.funcaoid', user.funcaoid);
						// 	_this.set('user', user);
						// 	return user;
						// } else {
						// 	return user.get('funcao').then(function(funcao) {
						// 		console.log('f', funcao);
						// 		if (funcao) {
						// 			console.log('SIM, USUARIO TEM FUNCAO, É ', funcao.id);
						// 			user.funcaoid = funcao.id;	
						// 		} else {
						// 			console.log('NAO, USUARIO NAO TEM FUNCAO');	
						// 		}
						// 		_this.set('user', user);
						// 		return user;
						// 	});
						// }
					// }
				}),
			    props: this.get('props'),
			    funcao: this.store.findAll('funcao')
			});
		} else {
			return this.get('props');
		}
	},
	actions: {
		gravarUsuario(funcao) {
			let user = this.get('user');
			let funcaoIdEscolhida = parseInt(funcao);
			let fid = this.get('session.currentUser.funcaoid');
			let _this = this;

			// console.log('funcaoIdEscolhida', funcaoIdEscolhida);
			// console.log('user.funcaoid', user.funcaoid);
			// console.log('usuario.funcaoid', usuario.funcaoid);
			
			// atualiza funcao 
			console.log('id da escolhida', fid);
			if (fid) {
				// grava função escolhida caso seja diferente da atual
				// if (funcaoIdEscolhida !== parseInt(user.funcaoid)) {
					// console.log('atualiza?????', funcaoIdEscolhida);
					// this.store.findRecord('funcao', funcaoIdEscolhida).then(function(funcao) {
					// 	user.set('funcao', funcao);
					// 	user.save().then(function() {
					// 		console.log('função do usuário atualizada');
					// 		user.isNew = false;
					// 		_this.set('user.funcaoid', funcaoIdEscolhida);
					// 		fid = funcaoIdEscolhida;
					// 	});
					// });	
				// } else {
					// console.log('já gravou a funcao, nao atualiza');
					// fid = funcaoIdEscolhida;
				// }	
				console.log('fid da escolhida', funcaoIdEscolhida);
			} else {
				// console.log('nao escolheu funcao');
				console.log('id da escolhida', funcaoIdEscolhida);
				if (funcaoIdEscolhida) {
					this.store.findRecord('funcao', funcaoIdEscolhida).then(function(funcao) {
						user.set('funcao', funcao);
						user.save().then(function() {
							console.log('função do usuário atualizada');
							user.isNew = false;
							_this.set('user.funcaoid', funcaoIdEscolhida);
							fid = funcaoIdEscolhida;
						});
					});
				}
			}
			
			// atualiza campos normais
			
			if (user.get('hasDirtyAttributes')) {
				console.log('fid', fid);
				if (fid) {
					this.store.findRecord('funcao', fid).then(function(funcao) {
						user.set('funcao', funcao);
						user.save().then(function() {
							console.log('função do usuário atualizada II');
							user.isNew = false;
							_this.set('user.funcaoid', funcaoIdEscolhida);
							fid = funcaoIdEscolhida;
						});
					});	
				} else {
					user.save().then(function() {
						console.log('dados atualizados');
					});
				}
				
			} else {
				console.log('sem novidades no usuário');
			}
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