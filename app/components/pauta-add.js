import Ember from 'ember';
import cleanURL from '../utils/cleanurl';  

export default Ember.Component.extend({
	// equipe: [],
	// producao: [],
	// equipepauta: Ember.inject.service(),
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
	  // place: new google.maps.MarkerPlace(),
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
		content: '<div>Secretaria de Comunicação do Estado do Pará</div>',
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
		didUpdatePlace(obj) {
			// console.log('place', obj);
			let _this = this;
			this.set('lat', obj.lat);
			this.set('lng', obj.lng);
			this.set('place', obj.place);
			
			let markers = this.get('markers');
			// let marker = markers.get('firstObject');
			let update = markers.map(function(item) {
				console.log(item.id);
				item.lat = obj.lat;
				item.lng = obj.lng;
				item.place = obj.place;
				return item;
			});
			this.set('markers', update);
			// this.set(marker.get('lat'), obj.lat);
			// this.set(marker.get('lng'), obj.lng);
			console.log(markers);
			
		},
		addPauta() {
			// console.log(cleanURL(this.get('retranca')));
			console.log('ID USER CRIADOR: ' + this.get('session.currentUser.id'));
			let pauta = {
				retranca: this.get('retranca'),
				slug: cleanURL(this.get('retranca')),
				dataHora: this.get('dataHora'),
				local: this.get('local'),
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
			
			// console.log('adding user to equipe: ', user);
			// let obj = {
			// 	id: user
			// };
			// // console.log('obj', typeof obj);
			// let equipe = this.get('equipe');
			// equipe.push(obj);
			// console.log(equipe);

		},
		removeUserFromEquipe(user) {
			console.log('removeUserFromEquipe', user);
			this.sendAction('on-user-out-equipe', user);
		},
		addUserToProducao(user) {
			console.log('addUserToProducao', user);
			this.sendAction('on-user-to-producao', user);
			// console.log('adding user to producao: ', user);
			// let obj = {
			// 	id: user
			// };
			// // console.log('obj', typeof obj);
			// let producao = this.get('producao');
			// producao.push(obj);
			// console.log(producao);
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
