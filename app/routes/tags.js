import Ember from 'ember';

export default Ember.Route.extend({
	props : {
		title: 'Tags',
		subtitle: 'Lista de tags mais usadas no site da secom',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
	},
	model() {
		// console.log('aqui');
		return this.store.findAll('tag');
		// return $.get(`http://www.instadev.com.br/ember-bootstrap-api/tags.php`).then(results => {
		// 	let json = JSON.parse(results);
		// 	let tags = json['tags'];
		// 	return tags.map(tag => {
		// 		return tag;
		// 	});						
		// });
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('props', this.get('props'));
	}
});