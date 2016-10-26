import Ember from 'ember';

export default Ember.Route.extend({
	// basicTabsContent: [ 
	// 	{id: 'tab1', title: 'First', content: 'Conteúdo first...'},
 //        {id: 'tab2', title: 'Second', content: 'Conteúdo second...'},
 //        {id: 'tab3', title: 'Third', content: 'Conteúdo third...'} 
 //    ],
 //    basicTabsSelection: ['c'],
 //    setupController(controller) {
 //    	this._super(...arguments);
 //    	controller.set('basicTabsContent', this.get('basicTabsContent'));
 //    	controller.set('basicTabsSelection', this.get('basicTabsSelection'));
 //    }
    model() {
        return this.store.findAll('user');
        // return this.store.findAll('user').then(function(users) {
        //     console.log(users.get('displayName'));
        //     return users.map(function(user) {
        //         user = {
        //             displayName: user.get('displayName'),
        //             uid: user.get('uid'),
        //             email: user.get('email')
        //         }
        //         console.log(user);
        //         return user;
        //     });
        // });
    }
});