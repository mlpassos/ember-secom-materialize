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
	model(params) {
		let slug = params.slug;
		console.log('este slug é ', slug);
		return Ember.RSVP.hash({
	        pauta: this.store.query('pauta', {orderBy: 'slug', equalTo: slug }).then(function(pautas) {
	        	console.log('len pautas', pautas.get('length'));
				return pautas.get('firstObject');
			}),
		    user: this.store.findAll('user')
		});
	},
	actions: {
		savePauta(pauta) {
			console.log('SAVING PAUTA', pauta.get('retranca'));
			if (pauta.get('hasDirtyAttributes')) {
				pauta.save().then(function() {
					console.log('pauta atualizada');
				});
			}
		}
	}
});