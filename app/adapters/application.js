import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://www.secom.pa.gov.br/site/api',
	urlForFindAll(modelName) {
		switch(modelName) {
			case 'tag':
				return `${this.get('host')}/get_tag_index/`;
				break;
			default:
				return this._super(...arguments);
		}
	},
	urlForFindRecord(id, modelName) {
		console.log('adapter: ', id);
		switch(modelName) {
			case 'tag':
				return `${this.get('host')}/get_tag_posts/?slug=${id}`;
				break;
			default:
				return this._super(...arguments);
		}
	}
});