// import Ember from 'ember';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

export default TransitionToListenerRoute.extend({
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
    },
    actions: {
        goPerfil(uid) {
            // alert(uid);
            this.router.transitionTo('usuario.perfil', uid);
        },
        delUser(user) {
            console.log('deleted');
        }
    }
});