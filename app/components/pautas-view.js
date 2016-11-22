import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		store: Ember.inject.service(),
		entrou: false,
		// mLenHolder: '',
		// mLen: '',
		// init() {
		// 	this._super(...arguments);
		// 	console.log('Iniciando componente PAUTAS-VIEW...');
		// 	this.set('mLen', this.get('model').get('length'));
		// 	console.log('MLEN INIT', this.get('mLen'));
		// },
		// setupController(controller) {
		// 	this._super(...arguments);
		// 	controller.set('mLen', this.get('mLen'));
		// },
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
		    // console.log('MLEN didReceiveAttrs no pautas', this.get('model').get('length'));
		    // this.set('mLenHolder', this.get('model').get('length'));
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
			entrouPauta(obj) {
				
				// console.log('mLenHolder', this.get('mLenHolder'));
				// if (obj.isNew === true) {
				// 	console.log('ENTROU PAUTA isNew');
				// 	return;
				// }
				// if (obj.isDeleted === true) {
				// 	console.log('ENTROU PAUTA isDeleted');
				// 	return;
				// }
				// if (mLenChild > this.get('mLenHolder')) {
				// 	console.log('ENTROU PAUTA REMOTA');
				// 	// this.set('mLenHolder', mLenChild);
				if (this.get('entrou') === false) {
					let $grid = this.get('grid');
					let item = this.$('.item'+obj.id);
					// $grid.isotope( 'addItems', item );
					let $items = [];
					$items.push(item[0]);
					console.log('isoItem', item[0]);
					$grid.isotope( 'insert', $items[0] );
					// $grid.isotope('reloadItems').isotope('layout');
					// $grid.isotope('layout');
					  // .append( item )
					  // .isotope( 'appended', item )
					  // .isotope('layout');
					// 
					this.set('entrou', true);
					console.log('status', obj.status);
					console.log('LIGA ISOTOPE');
				} else {
					console.log('status', obj.status);
					console.log('SEM ISOTOPE POIS JA ENTROU');
				}
			},
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