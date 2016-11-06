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
			goPauta(slug) {
				console.log('goPauta', slug);
				this.sendAction('on-action', slug);
			},
			editPauta(slug) {
				console.log('editPauta', slug);
				this.sendAction('on-edit', slug);
			}
		}
});