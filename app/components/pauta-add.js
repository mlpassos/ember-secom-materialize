import Ember from 'ember';
import cleanURL from '../utils/cleanurl';  

export default Ember.Component.extend({
	// equipe: [],
	// producao: [],
	// equipepauta: Ember.inject.service(),
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
	lat: -1.4524,
	lng: -48.4887233,
	place: '',
	zoom: 14,
	markers: Ember.A([
	{
	  id: 'pautalocal',  // Recommended
	  // lat: -1.4255971, // Required
	  // lng: -48.4570937, // Required
	  icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
	  label: '',
	  opacity: 0.8,
	  optimized: true,
	  //place: '',//new google.maps.MarkerPlace(),
	  // position: new google.maps.LatLng(), //['-1.4255971','-48.4570937']),
	  // shape: new google.maps.MarkerShape(),
	  // click: function(event, marker) {
	  // 	// alert('cliked');
	  // },
	  infoWindow: {
	 //    content: '<div class="text-left">'+
		      // '<h4>Secretaria de Comunicação do Estado do Pará</h4>'+
		      // '<small>A Secretaria de Estado de Comunicação, é responsável' +
		      // ' pela execução centralizada das atividades de jornalismo, comunicação institucional,' +
		      // ' novas mídias, relações públicas, pesquisa de opinião, democratização do acesso à informação' +
		      // ' e à comunicação, publicidade, propaganda e marketing.</small>' +
		      // '</div>',
		content: '',
	    visible: false
	   },
	  // rightclick: function(event, marker) {},
	  // dblclick: function(event, marker) {},
	  // mouseover: function(event, marker) {},
	  // mouseout: function(event, marker) {},
	  // mouseup: function(event, marker) {},
	  // mousedown: function(event, marker) {},
	  // drag: function(event, marker) {},
	  // dragstart: function(event, marker) {},
	  // dragend: function(event, marker) {},
	  // anchorPoint: new google.maps.Point(),
	  animation: google.maps.Animation.DROP,
	  clickable: true,
	  crossOnDrag: true,
	  cursor: 'pointer',
	  draggable: false,
	  title: 'string',
	  visible: true,
	  zIndex: 999
	}
	]),
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-ADD...');
	},
	actions: {
		myZoomChanged(zoom) {
			console.log(zoom);
		},
		didUpdatePlace(obj) {
			this.set('place', obj.place);
			this.set('lat', obj.lat);
			this.set('lng', obj.lng);
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
		addPauta() {
			// console.log(cleanURL(this.get('retranca')));
			console.log('ID USER CRIADOR: ' + this.get('session.currentUser.id'));
			let data = new Date(this.get('dataHora'));
			// let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			// let dataFormatada = data.toLocaleDateString('pt-BR', options);
			// let dataFormatada = ("0" + data.getDate()).substr(-2) + "/" 
   //  			+ ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
			// console.log(dataFormatada);
			let pauta = {
				retranca: this.get('retranca'),
				slug: cleanURL(this.get('retranca')),
				dataHora: data,
				local: this.get('place.name'),
				lat: this.get('lat'),
				lng: this.get('lng'),
				entrevistado: this.get('entrevistado'),
				contato: this.get('contato'),
				encaminhamento: this.get('encaminhamento'),
				informacoes: this.get('informacoes'),
				criado_por: this.get('session.currentUser.id'),
				sugestoes: this.get('sugestoes')
			};
			console.log('addPauta', pauta.retranca);
			this.sendAction('on-action', pauta);
		},
		addUserToEquipe(user) {
			console.log('addUserToEquipe', user);
			this.sendAction('on-user-to-equipe', user);
		},
		removeUserFromEquipe(user) {
			console.log('removeUserFromEquipe', user);
			this.sendAction('on-user-out-equipe', user);
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
		controller.set('lat', this.get('lat'));
		controller.set('lng', this.get('lng'));
		controller.set('zoom', this.get('zoom'));
		controller.set('place', this.get('place'));
		controller.set('markers', this.get('markers'));
		// controller.set('producao', this.get('producao'));
	}
});
