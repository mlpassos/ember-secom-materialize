import Ember from 'ember';

export default Ember.Component.extend({
		// routing: Ember.inject.service(),
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