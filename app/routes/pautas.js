import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('pauta');
	},
	afterModel() {
		// console.log('afterModel');
		// let pauta = this.store.createRecord('pauta', {
		// 	slug: 'teste-de-pauta-4',
		// 	retranca: 'Teste de pauta 4',
		// 	entrevistado: 'Sr. Teste Jr.',
		// 	contato: 'Sr. Paulo dela Pauta - Tel: 2222-2222',
		// 	dataHora: new Date(),
		// 	encaminhamento: 'Borem ipsum dolor sit amet, consectetur adipisicing elit. Itaque eum, ipsum beatae ipsam provident saepe! Odit itaque velit sapiente tempora non vero earum voluptatibus perspiciatis minima, eligendi, laboriosam veritatis maiores!',
		// 	informacoes: 'Lurem ipsum dolor sit amet, consectetur adipisicing elit. Aut, ducimus, quis. Voluptate esse placeat nostrum architecto nemo molestiae temporibus ipsam debitis dolorum et, sunt asperiores ullam nesciunt incidunt culpa voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi commodi nostrum aut dicta, repellendus officia harum dolores nisi, ullam fugit dignissimos a in aliquid, ipsam ex laudantium rerum, ab sit.',
		// 	sugestoes: 'Sugestões de perguntas, abordagens, dicas, entre outros',
		// 	local: 'Secretaria de Comunicação do Governo do Pará'
		// });
		// this.store.query('user', {orderBy: 'uid'}).then(function(users){
		// 	console.log('tamanho', users.get('length'));
		// 	let user = users.get('firstObject');
		// 	// console.log(user.get('displayName'));
		// 	// user.set('equipe')
		// 	pauta.get('equipe').addObject(user);
		// 	pauta.get('producao').addObject(user);

		// 	pauta.save().then(function() {
		// 		console.log('pauta gravada');
		// 	});
		// });
		// pauta.set('equipe', )
	},
	actions: {
		goPauta(slug) {
			// alert(id);
			console.log('goPauta slug', slug);
			this.router.transitionTo('pauta', slug);
		},
		addPauta() {
			this.router.transitionTo('pauta.adicionar', 'novo');
		},
		editPauta(slug) {
			this.router.transitionTo('pauta.alterar', slug);	
		}
	}
});