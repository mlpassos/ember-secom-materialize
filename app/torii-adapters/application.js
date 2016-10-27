import Ember from 'ember';  
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';  
export default ToriiFirebaseAdapter.extend({  
  store: Ember.inject.service(),
  firebase: Ember.inject.service(),
  open: function(authorization) {
    var uid = authorization.uid,
    	email = authorization.email,
    	displayName = authorization.displayName,
    	photoURL = authorization.photoURL,
        store  = this.get('store');
    console.log('torii', uid);
    return store.query('user', {uid: uid}).then(function(users){
    	// cadastra usuário
    	if(users.get('length') === 0){
	    	let userRecord = store.createRecord('user', {
	          	uid: uid,
	          	email: email,
	          	displayName: displayName,
	            photoURL: photoURL
	        });
	        return userRecord.save().then(function(user) {
	        	// adiciona usuário sem funcão
	        	user.isNew = true;
	        	// 
	        	// this.get('store').findRecord('funcao', 6).then(function(funcao) {
				// 		 userRecord.set('funcao', funcao);
				// 		 userRecord.save().then(function() {
				// 	     	console.log('Usuário cadastrado com sucesso');
				// 	     });
	        	return user;
	        });
	    } else {
	    	// já cadastrado, pega o primeiro registro
	    	return users.get('firstObject');
	    }
	}).then(function(user) {
		if (user.get('isNew')) {
			// ok, nao precisa da funcao ainda
			user.isAdmin = false;
			return {
		    	currentUser: user
		    };
		} else {
			// se nao for novo, já tem funcao, pegar
			user.isNew = false;
			return user.get('funcao').then(function(funcao) {
				if (funcao) {
					console.log('aqui', funcao.id);
					if (parseInt(funcao.id) == 6) {
				  		user.isAdmin = true;
				  	} else {
				  		user.isAdmin = false;
				  	}	
				} else {
					user.isAdmin = false;
				}
				return {
			    	currentUser: user
			    };
			});
		}
    });
  }
});