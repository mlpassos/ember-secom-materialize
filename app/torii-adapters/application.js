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
	        	// alert('Usuário cadastrado com sucesso');
	        	user.isNew = true;
	        	return user;
	        });
	    } else {
	    	// já cadastrado, pega o primeiro registro
	    	return users.get('firstObject');
	    }
	}).then(function(user) {
		if (user.isNew) {
			// ok
		} else {
			user.isNew = false;
		}
		return user.get('funcao').then(function(funcao) {
			if (funcao) {
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
    });
  }
});