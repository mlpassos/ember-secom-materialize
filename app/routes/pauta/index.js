import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let slug = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('este slug é ', slug);
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	        	console.log('len pautas', pautas.get('length'));
				let pauta = pautas.get('firstObject');
				pauta.marker = Ember.A([{
				  id: 'pautalocal', 
				  lat: pauta.get('lat'),
				  lng: pauta.get('lng'),
				  icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
				  label: '',
				  opacity: 0.8,
				  optimized: true,
				  infoWindow: {
					content: '<div>' + pauta.get('local') + '</div>',
				    visible: false
				  },
				  animation: google.maps.Animation.DROP,
				  clickable: true,
				  crossOnDrag: true,
				  cursor: 'pointer',
				  draggable: false,
				  title: 'string',
				  visible: true,
				  zIndex: 999
				}]);
				return pauta; //s.get('firstObject');
			}),
		    user: this.store.findAll('user')
		});
	}
});