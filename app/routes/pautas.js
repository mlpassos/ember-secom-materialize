import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		console.log('MODEL HAHA');
		return this.store.findAll('pauta').then(function(pautas) {
			return pautas.map(function(item) {
				let marker = Ember.A([{
				  id: 'pautalocal-'+item.get('slug'), 
				  lat: item.get('lat'),
				  lng: item.get('lng'),
				  icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
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
		}, { reload: true });
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
		delPauta(pauta) {
			console.log('EXCLUIR PAUTA slug', pauta.get('slug'));
			pauta.refresh();
			// this.router.transitionTo('pautas');
			// pauta.deleteRecord();
			// let model = this.modelFor(this.routeName);
			// // model.reload();
			// console.log('model', model);
		    // if (pauta.get('isDeleted')) {
		    // 	console.log('SAIU DA STORE');
		    // 	pauta.save().then(function() {
		    // 		console.log('FOI EXCLUIDO');
		    // 		_this.get('model').refresh();
		    // 		// _this.router.transitionTo('pautas');		
		    // 	});
		    // }
			// this.router.transitionTo('pauta.excluir', pauta.slug);	
		}
	}
});