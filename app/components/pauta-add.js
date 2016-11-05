import Ember from 'ember';
import cleanURL from '../utils/cleanurl';  

export default Ember.Component.extend({
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('pauta', this.get('pauta'));
	// },
	// equipe: [],
	init() {
		this._super(...arguments);
		console.log('Iniciando componente PAUTA-ADD...');
		console.log(new Date());
	},
	actions: {
		addPauta() {
			// console.log(cleanURL(this.get('retranca')));
			let pauta = {
				retranca: this.get('retranca'),
				slug: cleanURL(this.get('retranca')),
				dataHora: this.get('dataHora'),
				local: this.get('local'),
				entrevistado: this.get('entrevistado'),
				contato: this.get('contato'),
				encaminhamento: this.get('encaminhamento'),
				informacoes: this.get('informacoes'),
				sugestoes: this.get('sugestoes')
			};
			console.log('addPauta', pauta.retranca);
			this.sendAction('on-action', pauta);
		},
		addUserToEquipe(user) {
			console.log('addUserToEquipe', user);
			this.sendAction('on-user-to-equipe', user);
			// let equipe = this.get('equipe');
			// equipe.push(user);
		},
		addUserToProducao(user) {
			console.log('addUserToProducao', user);
			this.sendAction('on-user-to-producao', user);
		}
	}
	// ,
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('equipe', this.get('equipe'));
	// }
});
