import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		// mason:
		init() {
			this._super(...arguments);
			console.log('Iniciando componente PAUTAS-VIEW...');
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
		// didRender() {
  //   		this._super(...arguments);
		//   	alert('mudou');
		// },
		// uiSetup: function() {
		//    // do magic here...
		//    alert('mudou');
		// }.on('didInsertElement').observes('model'),
		actions: {
			verPauta(slug) {
				console.log('verPauta', slug);
				this.sendAction('on-ver', slug);
			},
			editPauta(slug) {
				console.log('editPauta', slug);
				this.sendAction('on-edit', slug);
			},
			delPauta(id) {
				console.log('delPauta', id);
				// id.destroyRecord(); 
        		// this.set('model',id);
        		// this.rerender();
				// console.log(this.get('modelLen'));
				this.sendAction('on-del', id);
			}
		}
});