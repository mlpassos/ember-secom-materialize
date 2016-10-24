import Ember from 'ember';

export default Ember.Route.extend({
	// checkboxSelections: ['38', '40', '41'],
	// checkboxChoices: [{
	// 	id: 1,
	// 	label: 'teste'
	// }],
	props: {
		title: 'Perfil',
		subtitle: 'Bem-vindo ao seu perfil',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
	},
	model() {
		let uid = this.get('session.currentUser.uid');
		return Ember.RSVP.hash({
	        user: this.store.query('user', {orderBy: 'uid', equalTo: uid}).then(function(users) {
			  return users.get('firstObject');
			}).then(function(user) {
			  return user;
			}),
		    props: this.get('props')
		    // ,
		    // tags: this.store.findAll('tag')
		});
	},
	actions: {
		gravarUsuario(user) {
			let uid = user.get('uid');
			let displayName = user.get('displayName');
			let email = user.get('email');
			this.get('store').query('user', {orderBy: 'uid', equalTo: uid }).then( (user) =>{
				user.set('displayName', displayName);
			  	user.set('email', email);
			  	user.save().then(function() {
			  		alert('Dados do usuário atualizados');
			  	});
			});
		}
	}
	// ,
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('checkboxChoices', this.get('checkboxChoices'));
	// 	controller.set('checkboxSelections', this.get('checkboxSelections'));
	// }
});