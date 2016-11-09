import Ember from 'ember';

export default Ember.Route.extend({
	equipepauta: Ember.inject.service(),
	model() {
		return this.store.findAll('user');	
	},
	deactivate() {
		let equipe = this.get('equipepauta');
		equipe.empty();
		console.log('SERVICE CLEARED');
	},
	actions: {
		addPauta(pauta) {
			let dtHora = new Date(pauta.dataHora);
			pauta.dataHora = dtHora;
			// console.log('adding pauta', pauta.dataHora);
			// console.log('adding pauta', typeof pauta.dataHora);
			// pauta.equipe = this.get('equipe');
			let _this = this;
			let equipe = this.get('equipepauta'); //this.get('equipe');
			let equipeItems = this.get('equipepauta.equipe');			
			let producaoItems = this.get('equipepauta.producao');
			let criadoPor = pauta.criado_por;
			let pautaRecord = this.store.createRecord('pauta', pauta);
			console.log('addEquipe', equipe);
			console.log('CRIADO POR', criadoPor);
			// equipe.map(function(user) {
			// 	console.log('equipe: ' + user.id);
			// 	return _this.store.findRecord('user', user.id).then(function(user){
			// 		// console.log('len', user.get('displayName'));
			// 		pautaRecord.get('equipe').addObject(user);
			// 		return pautaRecord.save().then(function() {
			// 			console.log('pauta adicionada para equipe: ' + user.get('displayName'));
			// 		});
			// 	});
			// });
			// producao.map(function(user) {
			// 	console.log('producao: ' + user.id);
			// 	return _this.store.findRecord('user', user.id).then(function(user){
			// 		// console.log('len', user.get('displayName'));
			// 		pautaRecord.get('producao').addObject(user);
			// 		return pautaRecord.save().then(function() {
			// 			console.log('pauta adicionada para producao: ' + user.get('displayName'));
			// 		});
			// 	});
			// });
			let get = Ember.RSVP.hash({
				criado_por: _this.store.findRecord('user', criadoPor).then(function(user){
					pautaRecord.set('criado_por', user);
					console.log('criado_por registrado com sucesso', user.get('displayName'));
				}),
		        equipe: equipeItems.map(function(user) {
					console.log('equipe: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('equipe').addObject(user);
						return pautaRecord.save().then(function() {
							let currentdate = new Date(); 
							let datetime = "Last Sync: " + currentdate.getDate() + "/" 
							                + (currentdate.getMonth()+1)  + "/" 
							                + currentdate.getFullYear() + " @ " 
							                + currentdate.getHours() + ":" 
							                + currentdate.getMinutes() + ":"  
							                + currentdate.getSeconds();
							console.log(datetime);
							console.log('pauta adicionada para equipe: ' + user.get('displayName'));
						});
					});
				}),
			    producao: producaoItems.map(function(user) {
					console.log('producao: ' + user.id);
					return _this.store.findRecord('user', user.id).then(function(user){
						// console.log('len', user.get('displayName'));
						pautaRecord.get('producao').addObject(user);
						return pautaRecord.save().then(function() {
							let currentdate = new Date(); 
							let datetime = "Last Sync: " + currentdate.getDate() + "/"
							                + (currentdate.getMonth()+1)  + "/" 
							                + currentdate.getFullYear() + " @ "  
							                + currentdate.getHours() + ":"  
							                + currentdate.getMinutes() + ":" 
							                + currentdate.getSeconds();
							console.log(datetime);
							console.log('pauta adicionada para producao: ' + user.get('displayName'));
						});
					});
				})
			}).then(function(data) {
				console.log('thenData', data);
				let currentdate = new Date(); 
				let datetime = "Last Sync: " + currentdate.getDate() + "/"
				                + (currentdate.getMonth()+1)  + "/" 
				                + currentdate.getFullYear() + " @ "  
				                + currentdate.getHours() + ":"  
				                + currentdate.getMinutes() + ":" 
				                + currentdate.getSeconds();
				console.log(datetime);
				console.log('FIM', data);
				// alert('Pauta adicionada');
				_this.router.transitionTo('pauta.alterar', pautaRecord.get('slug'));
				// equipe.empty();
				// console.log('SERVICE CLEARED');
			});
			// debugger;
			// get.then(function(d) {
			// 	console.log('resget', d);
			// 	let e = d.equipe;
			// 	e.map((x) => {
			// 		console.log('resequipe', x);
			// 	});
			// });
			// get.then(function() {
			// 	// LIMPAR COMPONENTE
			// 	let currentdate = new Date(); 
			// 	let datetime = "Last Sync: " + currentdate.getDate() + "/"
			// 	                + (currentdate.getMonth()+1)  + "/" 
			// 	                + currentdate.getFullYear() + " @ "  
			// 	                + currentdate.getHours() + ":"  
			// 	                + currentdate.getMinutes() + ":" 
			// 	                + currentdate.getSeconds();
			// 	console.log(datetime);
			// 	console.log('Pauta adicionada');
			// });
			// console.log(get);
			// debugger;
			// console.log(equipe.join());
			// this.store.query('user', {id: equipe.join()}).then(function(user){
			// 	console.log('len', user.get('length'));
			// 	// pautaRecord.get('equipe').addObject(user);
			// 	// pautaRecord.save().then(function() {
			// 	// 	console.log('pauta adicionada para ' + user.get('displayName'));
			// 	// });
			// });
		},
		addUserToEquipe(user) {
			console.log('adding user to equipe: ', user);
			let obj = {
				id: user
			};
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'equipe');
			console.log('items na equipe', equipepauta.equipe);
		},
		removeUserFromEquipe(user) {
			console.log('removing user from equipe: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'equipe');
			console.log('items na equipe', equipepauta.equipe);
		},
		addUserToProducao(user) {
			console.log('adding user to producao: ', user);
			let obj = {
				id: user
			};
			// console.log('obj', typeof obj);
			let equipepauta = this.get('equipepauta');
			equipepauta.add(obj, 'producao');
			console.log('items na producao', equipepauta.producao);
		},
		removeUserFromProducao(user) {
			console.log('removing user from producao: ', user);
			let equipepauta = this.get('equipepauta');
			equipepauta.remove(user, 'producao');
			console.log('items na producao', equipepauta.producao);
		}
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('equipepauta', this.get('equipepauta.equipe'));
		controller.set('producaopauta', this.get('equipepauta.producao'));
	}
});