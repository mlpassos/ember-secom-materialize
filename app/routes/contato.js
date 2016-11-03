import Ember from 'ember';

export default Ember.Route.extend({
	props: {
		title: 'Contato',
		subtitle: 'Aqui você encontra endereço e adiciona aos seus contatos.',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
	},
	setupController(controller) {
		this._super(...arguments);

		controller.setProperties({ 
		  props: this.get('props'),
	      lat: -1.4255971,
	      lng: -48.4570937,
	      zoom: 16
	   //    ,
	   //    markers: Ember.A([
	   //      {
	   //        id: 'secom',  // Recommended
	   //        lat: -1.4255971, // Required
	   //        lng: -48.4570937, // Required
	   //        icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
	   //        label: '',
	   //        opacity: 0.8,
	   //        optimized: true,
	   //        // place: new google.maps.MarkerPlace(),
	   //        // position: new google.maps.LatLng(), //['-1.4255971','-48.4570937']),
	   //        // shape: new google.maps.MarkerShape(),
	   //        // click: function(event, marker) {
	   //        // 	// alert('cliked');
	   //        // },
	   //        infoWindow: {
	   //       //    content: '<div class="text-left">'+
				//       // '<h4>Secretaria de Comunicação do Estado do Pará</h4>'+
				//       // '<small>A Secretaria de Estado de Comunicação, é responsável' +
				//       // ' pela execução centralizada das atividades de jornalismo, comunicação institucional,' +
				//       // ' novas mídias, relações públicas, pesquisa de opinião, democratização do acesso à informação' +
				//       // ' e à comunicação, publicidade, propaganda e marketing.</small>' +
				//       // '</div>',
				// content: '<div>Secretaria de Comunicação do Estado do Pará</div>',
	   //          visible: false
	   //      	},
	   //        // rightclick: function(event, marker) {},
	   //        // dblclick: function(event, marker) {},
	   //        // mouseover: function(event, marker) {},
	   //        // mouseout: function(event, marker) {},
	   //        // mouseup: function(event, marker) {},
	   //        // mousedown: function(event, marker) {},
	   //        // drag: function(event, marker) {},
	   //        // dragstart: function(event, marker) {},
	   //        // dragend: function(event, marker) {},
	   //        // anchorPoint: new google.maps.Point(),
	   //        // animation: google.maps.Animation.DROP,
	   //        clickable: true,
	   //        crossOnDrag: true,
	   //        cursor: 'pointer',
	   //        draggable: true,
	   //        title: 'string',
	   //        visible: true,
	   //        zIndex: 999
	   //      }
	   //    ])
	    });
	}
});