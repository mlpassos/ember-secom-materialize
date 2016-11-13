import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		// mason:
		init() {
			this._super(...arguments);
			console.log('Iniciando componente PAUTAS-VIEW...');
		},
		didInsertElement() {
		    let $grid = this.$('.isogrid').isotope({
		      // options
		      itemSelector: '.isoitem',
		      layoutMode: 'fitRows',
		      percentPosition: true
		    });
		    $grid.imagesLoaded().progress( function() {
		      $grid.isotope('layout');
		    });  
		},
		actions: {
			verPauta(slug) {
				console.log('verPauta', slug);
				this.sendAction('on-ver', slug);
			},
			editPauta(slug) {
				console.log('editPauta', slug);
				this.sendAction('on-edit', slug);
			},
			delPauta(pauta) {
				// let _this = this;
				console.log('delPauta', pauta.get('slug'));
				// let model = Ember.get(this.modelFor('pautas'));
				// console.log('model', model);
				// pauta.deleteRecord();
			 //    if (pauta.get('isDeleted')) {
			 //    	console.log('SAIU DA STORE');
			 //    	pauta.save().then(function() {
			 //    		console.log('FOI EXCLUIDO');
			 //    		_this.sendAction('on-del', pauta);
			 //    		_this.$('.isogrid').isotope('layout');		
			 //    	});
			 //    }
				this.sendAction('on-del', pauta);
			}
		}
});