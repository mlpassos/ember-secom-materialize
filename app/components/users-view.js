import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		goPerfil(uid) {
			console.log('goPerfil', uid);
			this.sendAction('on-action', uid);
		}
	}
});