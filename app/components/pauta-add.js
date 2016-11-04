import Ember from 'ember';

export default Ember.Component.extend({
	// pauta: '',
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('pauta', this.get('pauta'));
	// }
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-ADD...');
	},
	actions: {
		addPauta(pauta) {
			console.log('addPauta', pauta);
			this.sendAction('on-action', pauta);
		}
	}
});
