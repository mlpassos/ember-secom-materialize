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
	options: {
	    selector: 'textarea',
	    invalid_elements: "table,tr,td,tbody,img",
	    height: 300,
	    plugins: [
	      'advlist autolink lists link charmap print preview anchor',
	      'searchreplace visualblocks code fullscreen',
	      'insertdatetime media paste code textcolor colorpicker wordcount'
	    ],
	    plugin_insertdate_dateFormat : "%d/%m/%Y",
	    plugin_insertdate_timeFormat : "%H:%M:%S",
	    language: 'pt_BR',
	    language_url: 'http://secom.pa.gov.br/demandou/assets/js/tinymce/langs/pt_BR.js',
	    browser_spellcheck: true,
	    contextmenu: false,
	    toolbar: 'insertfile undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
	    content_css: [
	      '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
	      '//www.tinymce.com/css/codepen.min.css'
	    ]
	},
	pauta: '',
	// lat: -1.4524,
	// lng: -48.4887233,
	place: '',
	// zoom: 14,
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
	  animation: window.google.maps.Animation.DROP,
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
	didRender() {
		this._super(...arguments);
		console.log('RENDER ALTERAR');
		// let lat = this.get('pauta').get('lat');
		// let lng = this.get('pauta').get('lng');
		// let local = this.get('pauta').get('local');
		// let marker = this.get('markers').map(function(marker) {
		// 	console.log(marker.id);
		// 	marker.lat = lat;
		// 	marker.lng = lng;
		// 	marker.infoWindow.content = local;
		// 	return marker;
		// });
		// this.set('markers', marker);
		// console.log(this.get('markers'));
	},
	didReceiveAttrs() {
		this._super(...arguments);
		console.log('RECEBEU ALTERAR');
		let lat = this.get('pauta').get('lat');
		let lng = this.get('pauta').get('lng');
		let local = this.get('pauta').get('local');
		let marker = this.get('markers').map(function(marker) {
			console.log(marker.id);
			marker.lat = lat;
			marker.lng = lng;
			marker.infoWindow.content = local;
			return marker;
		});
		this.set('markers', marker);
		console.log(this.get('markers'));
	},
	didUpdateAttrs(options) {
		this._super(...arguments);
		console.log('UPDATE ALTERAR', options);
		// let lat = this.get('pauta').get('lat');
		// let lng = this.get('pauta').get('lng');
		// let local = this.get('pauta').get('local');
		// let marker = this.get('markers').map(function(marker) {
		// 	console.log(marker.id);
		// 	marker.lat = lat;
		// 	marker.lng = lng;
		// 	marker.infoWindow.content = local;
		// 	return marker;
		// });
		// this.set('markers', marker);
		// console.log(this.get('markers'));
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
			this.set('markers', markers);
			console.log(markers);
		},
		addUserToMotorista(user) {
			console.log('addUserToMotorista', user);
			this.sendAction('on-user-to-motorista', user);
		},
		removeUserFromMotorista(user) {
			console.log('removeUserFromMotorista', user);
			this.sendAction('on-user-out-motorista', user);
		},
		addUserToReporter(user) {
			console.log('addUserToReporter', user);
			this.sendAction('on-user-to-reporter', user);
		},
		removeUserFromReporter(user) {
			console.log('removeUserFromReporter', user);
			this.sendAction('on-user-out-reporter', user);
		},
		addUserToFotografo(user) {
			console.log('addUserToFotografo', user);
			this.sendAction('on-user-to-fotografo', user);
		},
		removeUserFromFotografo(user) {
			console.log('removeUserFromFotografo', user);
			this.sendAction('on-user-out-fotografo', user);
		},
		addUserToProducao(user) {
			console.log('addUserToProducao', user);
			this.sendAction('on-user-to-producao', user);
		},
		removeUserFromProducao(user) {
			console.log('removeUserFromProducao', user);
			this.sendAction('on-user-out-producao', user);
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