import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

const {get} = Ember;
 
export default TransitionToListenerRoute.extend({
    beforeModel(){
		return this.get('session').fetch().catch(function(){});
	},
	actions:{
	    login(router){
	    	let _this = this;
	        get(this,'session').open('firebase', { provider: 'google'}).then(function(data) {
	            console.log(data);
	            let user = data.currentUser;
	            let uid = user.get('uid');
	            let isAdmin = user.get('isAdmin');
	            let isNew = user.get('isNew');isNew
	            console.log('app: isAdmin', isAdmin);
	            console.log('app: isNew', isNew);

	            // let funcao = _this.get('store').createRecord('funcao', {
	            // 	id: 1,
	            // 	title: 'Estagiário',
	            // 	slug: 'estagiario'
	            // });
	            // funcao.save().then(function() {
	            // 	console.log('funcao criada');
	            // });

	            if (isNew) {
	            	// se usuário novo, manda pra completar o cadastro/perfil
	            	_this.router.transitionTo('usuario.perfil', uid);
	            }
	            // _this.get('store').query('user', {orderBy: 'uid', equalTo: uid }).then( function(users) {
				//     let userRecord = users.get('firstObject');
				//      _this.get('store').findRecord('funcao', 6).then(function(funcao) {
				// 		 userRecord.set('funcao', funcao);
				// 		 userRecord.save().then(function() {
				// 	     	console.log('Usuário cadastrado com sucesso');
				// 	     });
				// 	 });
				// });
	        });
	    },
	    logout(){
	        get(this,'session').close();
	    }
	}
})