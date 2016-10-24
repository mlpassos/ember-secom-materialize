import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

const {get} = Ember;
 
export default TransitionToListenerRoute.extend({
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
	            _this.get('store').query('user', {orderBy: 'uid', equalTo: user.uid }).then( (records) =>{
				    if(records.get('length') === 0){
				    	let userRecord = _this.get('store').createRecord('user', {
				          	uid: user.uid,
				          	email: user.email,
				          	displayName: user.displayName,
				            photoURL: user.photoURL
				            // tags: {slug: 'comunicacao', title:'titulo', description:'desc', post_count:10}
				        });
				        userRecord.save().then(function() {
				        	console.log('Usuário cadastrado com sucesso');
				        });
				    } else {
						console.log('Opa, usuário já cadastrado');
				    }
				});
	        });
	    },
	    logout(){
	        get(this,'session').close();
	    }
	}
})