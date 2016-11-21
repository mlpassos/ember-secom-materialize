import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		store: Ember.inject.service(),
		init() {
			this._super(...arguments);
			console.log('Iniciando componente PAUTAS-VIEW...');
		},
		didInsertElement() {
			console.log('didInserElement no pautas');
		    let $grid = this.$('.isogrid').isotope({
		      itemSelector: '.isoitem',
		      layoutMode: 'fitRows',
		      percentPosition: true
		    });
		    $grid.imagesLoaded().progress( function() {
		      $grid.isotope('layout');
		    });
		    this.set('grid', $grid);
		},
		// didRender() {
		// 	this._super(...arguments);
		//     console.log('didRender no pautas', this.get('grid'));
		// },
		didReceiveAttrs() {
		    this._super(...arguments);
		    console.log('didReceiveAttrs no pautas');
		},
		didUpdateAttrs() {
			this._super(...arguments);
			console.log('didUpdateAttrs no pautas');
		},
		// didUpdateAttrs(options){
		// 	this._super(...arguments);
		//     if( options.newAttrs.myAttr !== options.oldAttrs.myAttr ){
		//     	console.log('didUpdateAttrs no pautas');
		//     }
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
				let item = this.$('.item'+pauta.get('id'));
				pauta.deleteRecord();
			    if (pauta.get('isDeleted')) {
			    	pauta.save().then(function() {
			    		console.log('EXCLUIDO PRA SEMPRE', item);
			    		$grid.isotope( 'remove', item ).isotope('layout');
			    		// _this.get('store').unloadRecord(pauta);
			    		_this.sendAction('on-del', pauta);
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