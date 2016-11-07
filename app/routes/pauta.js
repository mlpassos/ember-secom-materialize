import Ember from 'ember';

export default Ember.Route.extend({
	// slug:'',
	// model(params) {
	// 	let slug = params.slug;
	// 	// this.set('slug', id);
	// 	console.log('estamos aqui!', slug);
	// 	// switch(slug) {
	// 	//     case 'novo':
	// 	//         console.log('ADICIONAR PAUTA');
	// 	//         break;
	// 	//     case 'alterar':
	// 	//         console.log('alterar', slug);
	// 	//         break;
	// 	// 	case 'excluir':
	// 	//         console.log('excluir', slug);
	// 	//         break;		        
	// 	//     default:
	// 	//     	console.log('visualizando pauta');
	// 	//         return Ember.RSVP.hash({
	// 	// 	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	// 	// 				return pautas.get('firstObject');
	// 	// 			}),
	// 	// 		    user: this.store.findAll('user')
	// 	// 		});
	// 	// }
	// 	// return this.store.queryRecord('pauta', slug);
	// 	// return this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	// 	// 	return pautas.get('firstObject');
	// 	// });
	// },
	// equipe: [],
	// producao: [],
	// model(params) {
	// 	let slug = params.slug;
	// 	console.log('este slug é ', slug);
	// 	if (slug !== 'novo') {
	// 		return Ember.RSVP.hash({
	// 	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	// 	        	console.log('len pautas', pautas.get('length'));
	// 				return pautas.get('firstObject');
	// 			}),
	// 		    user: this.store.findAll('user')
	// 		});	
	// 	} else {
	// 		return this.store.findAll('user');
	// 	}
		
	// },
	// actions: {
	// 	savePauta(pauta) {
	// 		console.log('SAVING PAUTA', pauta.get('retranca'));
	// 		if (pauta.get('hasDirtyAttributes')) {
	// 			pauta.save().then(function() {
	// 				console.log('pauta atualizada');
	// 			});
	// 		}
	// 	},
	// 	editPauta(pauta) {
	// 		console.log('SAVING PAUTA', pauta.get('retranca'));
	// 		if (pauta.get('hasDirtyAttributes')) {
	// 			pauta.save().then(function() {
	// 				console.log('pauta atualizada');
	// 			});
	// 		}
	// 	},
	// 	addPauta(pauta) {
	// 		console.log('adding pauta', pauta);
	// 		// pauta.equipe = this.get('equipe');
	// 		let _this = this;
	// 		let equipe = this.get('equipe');
	// 		let producao = this.get('producao');
	// 		let pautaRecord = this.store.createRecord('pauta', pauta);
	// 		console.log('addEquipe', equipe);
	// 		equipe.map(function(user) {
	// 			console.log('equipe: ' + user.id);
	// 			return _this.store.findRecord('user', user.id).then(function(user){
	// 				// console.log('len', user.get('displayName'));
	// 				pautaRecord.get('equipe').addObject(user);
	// 				return pautaRecord.save().then(function() {
	// 					console.log('pauta adicionada para equipe: ' + user.get('displayName'));
	// 				});
	// 			});
	// 		});
	// 		producao.map(function(user) {
	// 			console.log('producao: ' + user.id);
	// 			return _this.store.findRecord('user', user.id).then(function(user){
	// 				// console.log('len', user.get('displayName'));
	// 				pautaRecord.get('producao').addObject(user);
	// 				return pautaRecord.save().then(function() {
	// 					console.log('pauta adicionada para producao: ' + user.get('displayName'));
	// 				});
	// 			});
	// 		});
	// 		// console.log(equipe.join());
	// 		// this.store.query('user', {id: equipe.join()}).then(function(user){
	// 		// 	console.log('len', user.get('length'));
	// 		// 	// pautaRecord.get('equipe').addObject(user);
	// 		// 	// pautaRecord.save().then(function() {
	// 		// 	// 	console.log('pauta adicionada para ' + user.get('displayName'));
	// 		// 	// });
	// 		// });
	// 	},
	// 	addUserToEquipe(user) {
	// 		console.log('adding user to equipe: ', user);
	// 		let obj = {
	// 			id: user
	// 		};
	// 		// console.log('obj', typeof obj);
	// 		let equipe = this.get('equipe');
	// 		equipe.push(obj);
	// 		console.log(equipe);
	// 	},
	// 	addUserToProducao(user) {
	// 		console.log('adding user to producao: ', user);
	// 		let obj = {
	// 			id: user
	// 		};
	// 		// console.log('obj', typeof obj);
	// 		let producao = this.get('producao');
	// 		producao.push(obj);
	// 		console.log(producao);
	// 	}
	// },
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('equipe', this.get('equipe'));
	// 	controller.set('producao', this.get('producao'));
	// 	// controller.set('dataExemplo', new Date());
	// }
});