import Ember from 'ember';

export default Ember.Component.extend({
		// routing: Ember.inject.service(),
		// _getPhotoUrl : function(place) {
		// 	if (place.photos) {
		// 		return place.photos.map(function(item) {
		// 			console.log(item);
		// 			return item.getUrl({
		// 				maxWidth: 100,
		// 				maxHeight: 100
		// 			});
		// 		})[0];			
		// 	} else {
		// 		return "http://placehold.it/100x100";
		// 	}
		// },
		init() {
			this._super(...arguments);
			console.log('Iniciando componente PAUTA-VIEW...');
		},
		actions: {
			savePauta(pauta) {
				console.log('savePauta', pauta);
				this.sendAction('on-action', pauta);
			}
		}
});