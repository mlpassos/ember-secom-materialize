import Ember from 'ember';

export default Ember.Route.extend({
	// checkboxSelections: ['38', '40', '41'],
	// checkboxChoices: [{
	// 	id: 1,
	// 	label: 'teste'
	// }],
	funcaoEscolhida: '',
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
		let isNews = usuario.get('isNew');
		let isNew = this.get('session.currentUser.isNew');
		let _this = this;
		console.log('aqui: ', uid);
		if (uid) {
			return Ember.RSVP.hash({
		        user: this.store.query('user', {orderBy: 'uid', equalTo: uid}).then(function(users) {
				  return users.get('firstObject');
				}).then(function(user) {
					// verificar se tem função
					console.log('get.isNew', isNews);
					console.log('session.isNew', isNew);
					console.log('here', typeof isNew);
					// _this.set('user', user);
					// return user;
					if (isNew) {
						_this.set('user', user);
						return user;
					}
					if (typeof isNew == 'undefined') {
						_this.set('user', user);
						return user;
					} 
					if (isNew === false) {
						console.log('nulo', user.get('funcao'));
						return user.get('funcao').then(function(funcao) {
							console.log('user funcaoId', funcao.id);
							user.funcaoid = funcao.id;
							_this.set('user', user);
							return user;
						});	
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
			let isNew = this.get('session.currentUser.isNew');
			let user = this.get('user');
			let funcaoId = parseInt(funcao);
			console.log('isNew', isNew);

			console.log('função escolhida', funcaoId);
			if (user.funcaoid) {
				console.log('função du usuário', user.funcaoid);
			} else {
				console.log('função do usuário - sem funcao ainda;')
			}
			// grava função escolhida caso seja diferente da atual
			if (funcaoId !== parseInt(user.funcaoid)) {
				this.store.findRecord('funcao', funcaoId).then(function(funcao) {
					user.set('funcao', funcao);
					user.save().then(function() {
						console.log('função do usuárioa atualizada');
					});
				});	
			}
			

			// this.get('store').findRecord('funcao', 6).then(function(funcao) {
			// 	user.set('funcao', funcao);
			// 	user.save().then(function() {
			// 		console.log('funcao atualizada');
			// 	});
			// });
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
				alert('sem novidades');
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