import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		grid: null,
		init() {
			this._super(...arguments);
			console.log('Iniciando componente USERS-VIEW...');
		},
		didInsertElement() {
			console.log('render');
		    let $grid = this.$('.isogrid').isotope({
		      // options
		      itemSelector: '.isoitem',
		      layoutMode: 'fitRows',
		      percentPosition: true
		    });
		    this.set('grid', $grid);
		    $grid.imagesLoaded().progress( function() {
		      $grid.isotope('layout');
		    });  
		},
		actions: {
			goPerfil(uid) {
				console.log('goPerfil', uid);
				this.sendAction('on-action', uid);
			},
			delUser(user) {
				console.log('delUser', user.get('id'));
				user.destroyRecord();
				let $grid = this.get('grid');
				let item = this.$('.item-'+user.get('id'));
				console.log('grid', $grid);
				console.log('item', item);
				$grid.isotope( 'remove', item ).isotope('layout');
				this.sendAction('on-del', user);	
			}
		}
});