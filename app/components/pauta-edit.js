import Ember from 'ember';

export default Ember.Component.extend({
	_getPhotoUrl : function(place) {
		if (place.photos) {
			return place.photos.map(function(item) {
				console.log(item);
				return item.getUrl({
					maxWidth: 100,
					maxHeight: 100
				});
			})[0];			
		} else {
			return "http://placehold.it/100x100";
		}
	},
	pauta: '',
	lat: -1.4524,
	lng: -48.4887233,
	place: '',
	zoom: 14,
	markers: Ember.A([
	{
	  id: 'pautalocal', 
	  icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
	  label: '',
	  opacity: 0.8,
	  optimized: true,
	  infoWindow: {
		content: '',
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
	}]),
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-EDIT...');
	},
	actions: {
		editPauta(pauta) {
			console.log('editPauta', pauta);
			this.sendAction('on-edit', pauta);
		},
		addPauta() {
			this.sendAction('on-add');
		},
		didUpdatePlace(obj) {
			this.set('place', obj.place);
			this.set('pauta.lat', obj.lat);
			this.set('pauta.lng', obj.lng);
			this.set('pauta.local', obj.place.name);
			// console.log('place', obj.place);
			let getPhotoUrl = this.get('_getPhotoUrl');
			let phone = (obj.place.formatted_phone_number) ? obj.place.formatted_phone_number : 'Sem telefone';
			let website = (obj.place.website) ? "<a target='_blank' href='" + obj.place.website + "'>" + obj.place.website + "</a>" : 'sem website';
			let markers = this.get('markers').map(function(item) {
				console.log(item.id);
				item.lat = obj.lat;
				item.lng = obj.lng;
				item.infoWindow.content = '<div>' +
					'<h6>' + obj.place.name + '</h6>' +
					'<hr>' +
					'<div style="float:left;">' +
					'<img style="margin-right:5px;margin-bottom:5px;" src="' + getPhotoUrl(obj.place) + '" alt="foto do local">' +
					'</div>' +
					'<div style="float:right;margin-top:-15px;">' +
					'<p>'	+ obj.place.adr_address +
					'<br>' +
					phone +
					'<br>' +
					website + '</p>' +
				    '</div>' +
					'</div>' +
					'</div>';
				// item.place = obj.place;
				return item;
			});
			this.set('pauta.marker', markers);
			console.log(markers);
		}
	},
	setupController(controller) {
		this._super(...arguments);
		this.set('pauta', controller.get("pauta"));
		controller.set('lat', this.get('lat'));
		controller.set('lng', this.get('lng'));
		controller.set('zoom', this.get('zoom'));
		controller.set('place', this.get('place'));
		controller.set('markers', this.get('markers'));
		// controller.set('producao', this.get('producao'));
	}
});