import Ember from 'ember';

export default Ember.Component.extend({
		routing: Ember.inject.service(),
		grid: null,
		init() {
			this._super(...arguments);
			console.log('Iniciando componente USERS-VIEW...');
		},
		didInsertElement() {
			this._super(...arguments);
			console.log('InsertElement');
		    let $grid = this.$('.isogrid').isotope({
		      // options
		      itemSelector: '.isoitem',
		      layoutMode: 'fitRows',
		      percentPosition: true
		    });
		    $grid.imagesLoaded().progress( function() {
		      $grid.isotope('layout');
		    });
		    // this.set('grid', $grid);
		},
		didRender() {
			this._super(...arguments);
			console.log('RENDER USERS-VIEW');
			let $grid = this.$('.isogrid');//.data('isotope');
			// // access Isotope properties
			this.set('grid', $grid);
			console.log( Object.keys($grid.isotope('getItemElements')).length + ' filtered items'  );
			// console.log('tamanho atual', Object.keys($grid.isotope('getItemElements')).length)
		},
		willDestroyElement() {
		  this._super(...arguments);
		  // this.$().off('animationend');
		  this.$('.isogrid').isotope('destroy');
		  console.log('ISOTOPE OFF');
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