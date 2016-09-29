import Ember from 'ember';

export default Ember.Component.extend({
	prev: '',
	next: '',
	res: '',
	init() {
		this._super(...arguments);
		let current = parseInt(this.get('current'));
		let total = parseInt(this.get('total'));
		let res = new Array();
		let prev = parseInt(current - 1);
		let next = parseInt(current + 1);
		this.set('prev', ( prev == 0 ) ? total : prev );
		this.set('next', ( next == total + 1 ) ? 1 : next );
		for (var i = 1; i <= total; i++) {
			res.push(i);
			// this.$('ul.pagination')
			// 	.children('li:first-of-type')
			// 	.after('<li><a href="/noticias/' + i + '">' + i + '</a></li>');
				// .after('{{link-to noticias ' + i + '}}');
		}
		this.set('res', res);
		console.log('res: ', res);
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('prev', this.get('prev'));
		controller.set('next', this.get('next'));
		controller.set('res', this.get('res'));
	}
});