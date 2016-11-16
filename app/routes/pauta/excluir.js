import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		let _this = this;
		let slug = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('excluir pauta ', slug);
		this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
			let pauta = pautas.get('firstObject');
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