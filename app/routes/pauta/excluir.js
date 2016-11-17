import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let _this = this;
		let id = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('excluir pauta ', id);
		this.store.find('pauta', id).then(function(pauta) {
			// let pauta = pautas.get('firstObject');
			pauta.deleteRecord();
		    if (pauta.get('isDeleted')) {
		    	console.log('SAI DA STORE');
		    	pauta.save().then(function() {
		    		console.log('EXCLUIDO');
		    		_this.router.transitionTo('pautas');		
		    	});
		    } 
		});
	}
});