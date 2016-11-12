import Ember from 'ember';
import dateUtil from '../../utils/format-date';
import cleanURL from '../../utils/cleanurl';

export default Ember.Route.extend({
	model() {
		let slug = Ember.get(this.modelFor('pauta'), 'slug');
		console.log('alterar esta pauta ', slug);
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	        	console.log('len pautas', pautas.get('length'));
	        	// console.log('dataPauta', pautas.get('firstObject').get('dataHora'));
				let pauta = pautas.get('firstObject');
				let dth = dateUtil(pauta.get('dataHora'));
				console.log('dth', dth);
				pauta.set('dataHora', dth);

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

				return pauta;
			}),
		    user: this.store.findAll('user')
		});
	},
	// pauta: '',
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	this.set('pauta', controller.get('pauta'));
	// },
	// deactivate() {
	// 	console.log('LIMPANDO PAUTA');
	// 	let pauta = this.get('pauta');
	// 	console.log('clean', pauta);
	// 	pauta.empty();
	// },
	actions: {
		editPauta(pauta) {
			let _this = this;
			console.log('pauta', pauta.get('local'));
			console.log('SAVING PAUTA', pauta.get('hasDirtyAttributes'));
			// let a= pauta.get('hasDirtyAttributes')
			if (pauta.get('hasDirtyAttributes')) {
				// checar quem mudou e salvar apenas estes
				let dt = new Date(pauta.get('dataHora'));
				let slug = cleanURL(pauta.get('retranca'));
				let oldSlug = pauta.get('slug');
				console.log('brslug', slug);
				pauta.set('dataHora', dt);
				pauta.set('slug', slug);
				pauta.save().then(function() {
					console.log('pauta atualizada');
					if (slug !== oldSlug) {
						console.log('redir...');
						_this.router.transitionTo('pauta.alterar', slug);		
					}
				});
			} else {
				console.log('sem novidades');
			}
		},
		addPauta() {
			this.router.transitionTo('pauta.adicionar', 'novo');		
		}
		// ,
		// addPauta(pauta) {
		// 	console.log('adding pauta', pauta);
		// 	// pauta.equipe = this.get('equipe');
		// 	let _this = this;
		// 	let equipe = this.get('equipe');
		// 	let producao = this.get('producao');
		// 	let pautaRecord = this.store.createRecord('pauta', pauta);
		// 	console.log('addEquipe', equipe);
		// 	equipe.map(function(user) {
		// 		console.log('equipe: ' + user.id);
		// 		return _this.store.findRecord('user', user.id).then(function(user){
		// 			// console.log('len', user.get('displayName'));
		// 			pautaRecord.get('equipe').addObject(user);
		// 			return pautaRecord.save().then(function() {
		// 				console.log('pauta adicionada para equipe: ' + user.get('displayName'));
		// 			});
		// 		});
		// 	});
		// 	producao.map(function(user) {
		// 		console.log('producao: ' + user.id);
		// 		return _this.store.findRecord('user', user.id).then(function(user){
		// 			// console.log('len', user.get('displayName'));
		// 			pautaRecord.get('producao').addObject(user);
		// 			return pautaRecord.save().then(function() {
		// 				console.log('pauta adicionada para producao: ' + user.get('displayName'));
		// 			});
		// 		});
		// 	});
		// 	// console.log(equipe.join());
		// 	// this.store.query('user', {id: equipe.join()}).then(function(user){
		// 	// 	console.log('len', user.get('length'));
		// 	// 	// pautaRecord.get('equipe').addObject(user);
		// 	// 	// pautaRecord.save().then(function() {
		// 	// 	// 	console.log('pauta adicionada para ' + user.get('displayName'));
		// 	// 	// });
		// 	// });
		// },
		// addUserToEquipe(user) {
		// 	console.log('adding user to equipe: ', user);
		// 	let obj = {
		// 		id: user
		// 	};
		// 	// console.log('obj', typeof obj);
		// 	let equipe = this.get('equipe');
		// 	equipe.push(obj);
		// 	console.log(equipe);
		// },
		// addUserToProducao(user) {
		// 	console.log('adding user to producao: ', user);
		// 	let obj = {
		// 		id: user
		// 	};
		// 	// console.log('obj', typeof obj);
		// 	let producao = this.get('producao');
		// 	producao.push(obj);
		// 	console.log(producao);
		// }
	}
});