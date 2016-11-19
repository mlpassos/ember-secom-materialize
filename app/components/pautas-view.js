import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		grid: null,
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
		    this.set('grid', $grid);
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
				console.log('delPauta', pauta.get('id'));
				let _this = this;
				let $grid = this.get('grid');
				let item = this.$('.item-'+pauta.get('id'));
				// pauta.destroyRecord();
				pauta.deleteRecord();
			    if (pauta.get('isDeleted')) {
			    	pauta.save().then(function() {
			    		console.log('EXCLUIDO PRA SEMPRE');
			    		$grid.isotope( 'remove', item ).isotope('layout');
			    		_this.sendAction('on-del', true);
			    	}, function() {
			    		console.log('DEU BUG AO EXCLUIR');
			    		_this.sendAction('on-del', false);
			    	});
			    }
				console.log('grid', $grid);
				console.log('item', item);
			}
		}
});