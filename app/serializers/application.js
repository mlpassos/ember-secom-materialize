import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	modelNameFromPayloadKey: function(payloadKey) {
		console.log('tag.key: ', payloadKey);
		return this._super(payloadKey);
	},
	normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		let target = primaryModelClass.modelName;
		switch(requestType) {
			case 'findAll':
				console.log('tag.findAll: ', target);
				payload = payload.tags;
				payload = {tag: payload};
				break;
			default:
				console.log('default no tag');
		}
		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});