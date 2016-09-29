import Ember from 'ember';

export default Ember.Route.extend({
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
	}
});