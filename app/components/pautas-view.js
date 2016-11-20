import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		grid: null,
		// obs: null,
		// modelLen: Ember.computed('obs', function() {
		// 	console.log('computed'. this.get('obs').get('length'));
		// 	return this.get('obs').get('length');
		// }),
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
		    // console.log('ML', this.get('modelLen'));
		},
		didReceiveAttrs() {
		    this._super(...arguments);
		    console.log('didReceiveAttrs')
		},
		didUpdateAttrs() {
			this._super(...arguments);
			console.log('didUpdateAttrs');
		},
		// setupController(controller) {
		// 	this._super(...arguments);
		// 	controller.set('grid', this.get('grid'));
		// },
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

				// console.log('ML', this.get('modelLen'));

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
				// console.log('grid', $grid);
				// console.log('item', item);
			}
		}
});