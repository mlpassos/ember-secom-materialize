import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://www.secom.pa.gov.br/site/api',
	urlForFindAll() {
		return `${this.get('host')}/get_tag_index/`;
	},
	urlForFindRecord(id) {
		console.log('adapter: ', id);
		return `${this.get('host')}/get_tag_posts/?slug=${id}`;
	}
});