import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
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
		actions: {
			// lerMais(slug) {
			// 	console.log(slug);
			// 	this.get('routing').transitionTo('noticia', slug);
			// },
			goPauta(id) {
				console.log('goPauta', id);
				this.sendAction('on-action', id);
			}
		}
});