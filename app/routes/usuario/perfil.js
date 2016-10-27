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
		let _this = this;
		console.log('aqui: ', uid);
		if (uid) {
			return Ember.RSVP.hash({
		        user: this.store.query('user', {orderBy: 'uid', equalTo: uid}).then(function(users) {
				  return users.get('firstObject');
				}).then(function(user) {
					// verificar se tem função

					// user.get('funcao').then(function(funcao) {
					// 	console.log('funcaoId', funcao);
					// 	return funcao;
					// 	// if (funcao) {
					// 	// 	return funcao.id;
					// 	// } else {
					// 	// 	return null;
					// 	// }
					// });
					// console.log('funcaoId', funcaoId);
				  _this.set('user', user);
				  // return user.get('funcao')
				  return user;
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
		gravarUsuario() {
			let uid = this.get('session.currentUser.uid');
			let isNew = this.get('session.currentUser.isNew');
			let user = this.get('user');
			console.log('isNew', isNew);
			// let funcao = user.get('funcao').then(function(funcao) {
			// 	console.log('e', funcao.title);	
			// });
			console.log('escolhida', this.get('funcaoEscolhida'));
			
			// let userFuncao = user.get('funcao');
			// console.log('u', userFuncao);
			// user.get('funcao').then(function(funcao) {
			// 	// se usuário já tem função cadastrada
			// 	if (funcao) {
			// 		// pegar função
			// 		console.log('tem função', funcao.id);
			// 	} else {
			// 		// sem funcao ainda, cadastrar pro usuário
			// 		// let funcaoEscolhida = this.get('funcaoEscolhida');
			// 		console.log('escolhida', funcao);
			// 		user.set('funcao', funcao);
			// 		user.save().then(function() {
			// 			console.log('funcao cadastrada no usuário');
			// 		});
			// 	}
			// 	// return funcao;
			// });

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
		// controller.set('checkboxChoices', this.get('checkboxChoices'));
		// controller.set('checkboxSelections', this.get('checkboxSelections'));
	}
});