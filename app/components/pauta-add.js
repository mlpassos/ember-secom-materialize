import Ember from 'ember';
import cleanURL from '../utils/cleanurl';  

export default Ember.Component.extend({
	// equipe: [],
	// producao: [],
	// equipepauta: Ember.inject.service(),
	lat: '',
	lng: '',
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-ADD...');
	},
	actions: {
		didUpdatePlace(obj) {
			console.log('place', obj);
			this.set('lat', obj.lat);
			this.set('lng', obj.lng);
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
	}
	// ,
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('equipepauta', this.get('equipepauta.items'));
	// 	// controller.set('producao', this.get('producao'));
	// }
});
