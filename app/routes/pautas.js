import Ember from 'ember';

export default Ember.Route.extend({
	// modelChanged: Ember.observer('modelLen', function() {
	//     // deal with the change
	//     console.log('MODEL MUDOU');
	// }),
	// model: null,
	// model: null,
	// modelLen: Ember.computed('model', function() {
	// 	// return this.modelFor(this.routeName).length;
	// 	console.log('modelLen UPDATED');
	// 	// if (this.get('model')) {
	// 	return this.get('model').length;
	// 	// } else {
	// 	// 	console.log('sem tamanho');
	// 	// 	return null;
	// 	// }
	// }),
	model() {
		console.log('MODEL HAHA');
		return this.store.findAll('pauta', { reload:true }).then(function(pautas) {
			return pautas.map(function(item) {
				let marker = Ember.A([{
				  id: 'pautalocal-'+item.get('slug'), 
				  lat: item.get('lat'),
				  lng: item.get('lng'),
				  icon: 'https://maps.google.com/mapfiles/ms/icons/red.png',
				  label: '',
				  opacity: 0.8,
				  optimized: true,
				  infoWindow: {
					content: '<div>' + item.get('local') + '</div>',
				    visible: false
				  },
				  animation: window.google.maps.Animation.DROP,
				  clickable: true,
				  crossOnDrag: true,
				  cursor: 'pointer',
				  draggable: false,
				  title: 'string',
				  visible: true,
				  zIndex: 999
				}]);
				item.set('marker', marker);
				return item;
			});
		});
	},
	afterModel() {
		// this.set('model', model);
		// console.log('this.model', model);
		// console.log('modelLen', this.get('modelLen'));
		// model.addObserver(function() {
		// 	console.log('MUDOU MUDOU');
		// });
	},
	// setupController
	deactivate() {
		// this.set('modelLen', null);
	},
	actions: {
		verPauta(slug) {
			console.log('VER PAUTA slug', slug);
			this.router.transitionTo('pauta', slug);
		},
		addPauta() {
			console.log('ADICIONAR NOVA PAUTA');
			this.router.transitionTo('pauta.adicionar', 'novo');
		},
		editPauta(slug) {
			console.log('ALTERAR PAUTA slug', slug);
			this.router.transitionTo('pauta.alterar', slug);	
		},
		delPauta(id) {
			let _this = this;
			// let pauta = id;
			console.log('EXCLUIR PAUTA id', id);
			console.log('excluir pauta ', id);
			// let localCopy = this.get('model');
		    // id.destroyRecord(); 
		    // this.set('model',id);
			// console.log(this.get('modelLen'));
			// id.deleteRecord();
			// id.destroyRecord();
			// this.store.findRecord('pauta', id, { reload: true }).then(function(pauta) {
			// 	pauta.deleteRecord();
			//     if (pauta.get('isDeleted')) {
			//     	pauta.save().then(function() {
			//     		console.log('EXCLUIR PRA SEMPRE');
			//  //    		_this.set('model',)
			//  //    		// _this.get('tam').reload();
			//  //    		// console.log('modelLenUpdated', _this.get('modelLen'));
			//     		// _this.router.transitionTo('pautas');	
			//     	});
			//     } 
			// });
			this.router.transitionTo('pauta.excluir', id);
		}
	}
});