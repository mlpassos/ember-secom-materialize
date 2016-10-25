import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		gravarUsuario() {
			this.sendAction('on-action');
		}	
	}
});