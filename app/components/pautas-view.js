import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		goPauta(id) {
			console.log('goPauta', id);
			this.sendAction('on-action', id);
		}
	}
});