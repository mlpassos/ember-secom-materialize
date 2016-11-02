import Ember from 'ember';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

const {get} = Ember;
 
export default TransitionToListenerRoute.extend({
    beforeModel(){
		return this.get('session').fetch().catch(function(){});
	},
	actions:{
	    login(){
	    	let _this = this;
	        get(this,'session').open('firebase', { provider: 'google'}).then(function(data) {
	            console.log(data);
	            let user = data.currentUser;
	            let uid = user.get('uid');
	            let isAdmin = user.isAdmin;
	            let isNew = user.isNew;
	            console.log('app: isAdmin', isAdmin);
	            console.log('app: isNew', isNew);

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
	        this.router.transitionTo('home');
	    }
	}
});