import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		gravarUsuario(funcao) {
			this.sendAction('on-action', funcao);
		}	
	}
});