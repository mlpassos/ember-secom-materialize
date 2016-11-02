import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('pauta');
	},
	afterModel() {
		console.log('afterModel');
		let pauta = this.store.createRecord('pauta', {
			slug: 'teste-de-pauta-4',
			retranca: 'Teste de pauta 4',
			entrevistado: 'Sr. Teste Jr.',
			contato: 'Sr. João d T. - Tel: 2222-2222',
			dataHora: new Date(),
			local: 'Secretaria de Comunicação do Governo do Pará'
		});
		this.store.query('user', {orderBy: 'uid', equalTo: 'pFlPGePSBENX022sETSfDc2udA73' }).then(function(users){
			console.log(users.get('length'));
			let user = users.get('firstObject');
			console.log(user.get('displayName'));
			// user.set('equipe')
			pauta.get('equipe').addObject(user);

			pauta.save().then(function() {
				console.log('pauta gravada');
			});
		});
		// pauta.set('equipe', )
		
	}
});
