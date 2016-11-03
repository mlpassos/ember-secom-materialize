import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		init() {
			this._super(...arguments);
			console.log('Iniciando componente USERS-VIEW...');
		},
		didInsertElement() {
		    let $grid = this.$('.isogrid').isotope({
		      // options
		      itemSelector: '.isoitem',
		      layoutMode: 'fitRows',
		      percentPosition: true
		    });
		    $grid.imagesLoaded().progress( function() {
		      $grid.isotope('layout');
		    });  
		},
		actions: {
			goPerfil(uid) {
				console.log('goPerfil', uid);
				this.sendAction('on-action', uid);
			}
		}
});