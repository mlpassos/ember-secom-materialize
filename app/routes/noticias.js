import Ember from 'ember';

export default Ember.Route.extend({
	props : {
		title: 'Notícias',
		subtitle: 'Bem-vindo a área de notícias do aplicativo da SECOM',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
	},
	page: '',
	model(params) {
		console.log('page: ', params.page);
		this.set('page', params.page);
		params.count = 12;
		return this.store.query('post',{page: params.page, count: params.count}).then(post => {
			let meta = post.get('meta');
			// console.log('aqui aqui');
			return post;
		});
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('page', this.get('page'));
		controller.set('props', this.get('props'));
	}
});