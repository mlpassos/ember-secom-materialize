import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

const {get} = Ember;
 
export default TransitionToListenerRoute.extend({
	// isAdmin: false,
    beforeModel(){
	    return this.get('session').fetch().catch(function(){});
	},
	model(){
	    // return this.store.findAll('post');
	},
	actions:{
	    login(){
	    	let _this = this;
	        get(this,'session').open('firebase', { provider: 'google'}).then(function(data) {
	            console.log(data);
	            let user = data.currentUser;
	            _this.get('store').query('user', {orderBy: 'uid', equalTo: user.uid }).then( function(records) {
				    if(records.get('length') === 0){
				    	let userRecord = _this.get('store').createRecord('user', {
				          	uid: user.uid,
				          	email: user.email,
				          	displayName: user.displayName,
				            photoURL: user.photoURL
				        });
				  //       _this.get('store').findRecord('funcao', 6).then(function(funcao) {
						//   userRecord.set('funcao', funcao);
						//   userRecord.save().then(function() {
				  //         	console.log('Usuário cadastrado com sucesso');
				  //         });
						// });
				    } else {
				    	let record = records.map(function(record) {
				    		return record.get('funcao.id');
				    	});
						// admin
						// console.log(typeof record[0]);
				    	if (parseInt(record[0]) == 6) {
				    		_this.set('session.currentUser.isAdmin', true);
				    		// console.log('route: ', _this.get('session.currentUser.isAdmin'));
				    	}
						console.log('Opa, usuário já cadastrado');
				    }
				});
	        });
	    },
	    logout(){
	        get(this,'session').close();
	    }
	}
	// ,
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('isAdmin', this.get('isAdmin'));
	// }
})