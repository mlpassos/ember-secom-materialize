import Ember from 'ember';

export default Ember.Route.extend({
	slug: '',
	page: '',
	meta: '',
	model(params) {
		// let tagId = params.slug;
		console.log('param: ', params.pages);
		// this.set('pages', ( params.pages == "1") ? false : params.pages);
		this.set('page', params.pageid);
		this.set('slug', params.slug);
		params.count = 10;
		return this.store.query('post', {
			tagpost: true,
			slug: params.slug,
			page: params.pageid,
			count: params.count
		}).then(post => {
			let meta = post.get('meta');
			this.set('meta', meta);
			return post;
		});
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('slug', this.get('slug'));
		if (this.get('meta').pages <= 1) {
			controller.set('page', false);	
		} else {
			controller.set('page', this.get('page'));
		}
		
	}
});