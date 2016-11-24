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
		    $grid.on( 'arrangeComplete',
			  function( event, filteredItems ) {
			    console.log( 'Isotope arrange completed on ' +
			      filteredItems.length + ' items' );
			  }
			);
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
		didRender() {
			this._super(...arguments);
			console.log('RENDER PAUTA', this.get('entrou'));
			this.set('entrou', false);
		},
		actions: {
			entrouPauta(obj) {
				if (this.get('entrou') === false) {
					let $grid = this.get('grid');
					let $item = this.$('.item'+obj.id);

					console.log('LIGA ISOTOPE');

					switch(obj.status) {
					    case 'adicionado':
					        console.log('ADICIONADO');
						    // $grid.isotope( 'addItems', $item );
						    $grid.isotope( 'addItems', $item );
						    let $newItems = $grid.isotope('getItemElements');
						    console.log('elements', $newItems);
						    $grid.isotope();
						    // $grid.isotope({
						    //   itemSelector: '.isoitem',
						    //   layoutMode: 'fitRows',
						    //   percentPosition: true
						    // });
						    // $grid.imagesLoaded().progress( function() {
						    //   $grid.isotope('layout');
						    // });
						    // this.set('grid', $grid);
						    this.set('entrou', true);
					        break;
					    case 'atualizado':
					        console.log('ATUALIZADO');
					        // OK
					        $item.css('background-color', 'green');
					        $grid.isotope('layout');
					        break;
					    case 'removido':
					    	console.log('REMOVIDO');
					    	// $item.css('background-color', 'red');
					    	$grid.isotope( 'remove', $item ).isotope('layout');
					    	// debugger;
					    	this.get('model').map((pauta) => {
					    		if (pauta.get('id') === obj.id) {
						    		console.log('get pauta', pauta);
						    		console.log('isDeleted', pauta.get('isDeleted'));          // true
						    		console.log('isSaving', pauta.get('isSaving'));           // false
						    		console.log('hasDirtyAttributes', pauta.get('hasDirtyAttributes')); //
						    	}
					    	});
					    	this.set('entrou', true);
					    	break;
					    default:
					        alert('erro, sem status');
					}
					// $items.push(item[0]);
					// console.log('isoItem', item[0]);
					// $grid.isotope( 'insert', $items[0] );
					console.log('CHEGUEI AQUI');
					// this.set('entrou', true);
				} else {
					// console.log('status', obj.status);
					// console.log('SEM ISOTOPE POIS JA ENTROU');
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
				
				// _this.sendAction('on-del', pauta);
				pauta.deleteRecord();
			    if (pauta.get('isDeleted')) {
			    	pauta.save().then(function() {
			    		console.log('EXCLUIDO PRA SEMPRE', item);
			    		// console.log('pauta hasDirtyAttributes', pauta.get('hasDirtyAttributes'));
			    		console.log('isDeleted', pauta.get('isDeleted'));          // true
					    console.log('isSaving', pauta.get('isSaving'));           // false
					    console.log('hasDirtyAttributes', pauta.get('hasDirtyAttributes')); // false
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