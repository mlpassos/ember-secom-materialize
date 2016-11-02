import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://www.secom.pa.gov.br/site/api',
	urlForFindAll(modelName) {
		switch(modelName) {
			case 'tag':
				return `${this.get('host')}/get_tag_index/`;
			default:
				return this._super(...arguments);
		}
	},
	urlForFindRecord(id, modelName) {
		console.log('adapter: ', id);
		switch(modelName) {
			case 'tag':
				return `${this.get('host')}/get_tag_posts/?slug=${id}`;
			case 'page':
				return `${this.get('host')}/get_page/`;
			default:
				return this._super(...arguments);
		}
	}
});