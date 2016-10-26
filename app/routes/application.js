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
	            let user = data.currentUser;
	            let uid = user.get('uid');
	            let isAdmin = user.get('isAdmin');
	            let isNew = user.get('isNew');isNew
	            console.log('app: isAdmin', isAdmin);
	            console.log('app: isNew', isNew);
	            if (isNew) {
	            	_this.router.transitionTo('usuario.perfil', uid);
	            }
	   //          _this.get('store').query('user', {orderBy: 'uid', equalTo: uid }).then( function(records) {
				//     if(records.get('length') === 0){
				//     	let userRecord = _this.get('store').createRecord('user', {
				//           	uid: user.uid,
				//           	email: user.email,
				//           	displayName: user.displayName,
				//             photoURL: user.photoURL
				//         });
				//         userRecord.save().then(function() {
				//         	alert('Usuário cadastrado com sucesso');
				//         });
				//     //  _this.get('store').findRecord('funcao', 6).then(function(funcao) {
				// 		//  userRecord.set('funcao', funcao);
				// 		//  userRecord.save().then(function() {
				// 	    //  	console.log('Usuário cadastrado com sucesso');
				// 	    //  });
				// 	//  });
				//     } else {
				// 		console.log('Opa, usuário já cadastrado');
				//     }
				// });
	        });
	    },
	    logout(){
	        get(this,'session').close();
	    }
	}
})