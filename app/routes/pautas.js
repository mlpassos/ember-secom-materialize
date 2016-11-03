import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('pauta');
	},
	afterModel() {
		// console.log('afterModel');
		// let pauta = this.store.createRecord('pauta', {
		// 	slug: 'teste-de-pauta-4',
		// 	retranca: 'Teste de pauta 4',
		// 	entrevistado: 'Sr. Teste Jr.',
		// 	contato: 'Sr. Paulo dela Pauta - Tel: 2222-2222',
		// 	dataHora: new Date(),
		// 	encaminhamento: 'Borem ipsum dolor sit amet, consectetur adipisicing elit. Itaque eum, ipsum beatae ipsam provident saepe! Odit itaque velit sapiente tempora non vero earum voluptatibus perspiciatis minima, eligendi, laboriosam veritatis maiores!',
		// 	informacoes: 'Lurem ipsum dolor sit amet, consectetur adipisicing elit. Aut, ducimus, quis. Voluptate esse placeat nostrum architecto nemo molestiae temporibus ipsam debitis dolorum et, sunt asperiores ullam nesciunt incidunt culpa voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi commodi nostrum aut dicta, repellendus officia harum dolores nisi, ullam fugit dignissimos a in aliquid, ipsam ex laudantium rerum, ab sit.',
		// 	sugestoes: 'Sugestões de perguntas, abordagens, dicas, entre outros',
		// 	local: 'Secretaria de Comunicação do Governo do Pará'
		// });
		// this.store.query('user', {orderBy: 'uid'}).then(function(users){
		// 	console.log('tamanho', users.get('length'));
		// 	let user = users.get('firstObject');
		// 	// console.log(user.get('displayName'));
		// 	// user.set('equipe')
		// 	pauta.get('equipe').addObject(user);
		// 	pauta.get('producao').addObject(user);

		// 	pauta.save().then(function() {
		// 		console.log('pauta gravada');
		// 	});
		// });
		// pauta.set('equipe', )
	},
	setupController(controller) {
		this._super(...arguments);
		controller.setProperties({ 
		  props: this.get('props'),
	      lat: -1.4529805,
	      lng: -48.4958574,
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