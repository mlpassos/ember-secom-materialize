import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-EDIT...');
	},
	actions: {
		editPauta(pauta) {
			console.log('editPauta', pauta);
			this.sendAction('on-edit', pauta);
		},
		addPauta() {
			this.sendAction('on-add');
		},
	}
});