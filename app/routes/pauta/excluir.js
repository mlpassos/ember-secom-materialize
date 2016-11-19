import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		let _this = this;
		let id = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('excluir pauta ', id);
		this.store.find('pauta', id).then(function(pauta) {
			pauta.deleteRecord();
		    if (pauta.get('isDeleted')) {
		    	pauta.save().then(function() {
		    		console.log('EXCLUIR PRA SEMPRE');
		    		_this.router.transitionTo('pautas');	
		    	});
		    } 
		});
	}	
});