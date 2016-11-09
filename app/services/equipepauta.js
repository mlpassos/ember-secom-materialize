import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service(),
	equipe: [],
	producao: [],
	log(where) {
		console.log(
			this, where
		);
	},
	add(item, where) {
		console.log('>> ' + where + ': ' + item.id);
		let _this = this;
		this.get('store').findRecord('user', item.id).then(function(user) {
			console.log('url', user.get('photoURL'));
			item.photoURL = user.get('photoURL');
			console.log('tam', _this.get(where).length);
			let dif = true;
			if (_this.get(where).length > 0) {
				_this.get(where).map(function(element) {
					if (element.id === item.id) {
						dif = false;
						console.log('FOUND', element.id);
						console.log('FIND', item.id);
					}
				});
				if (dif) {
					_this.get(where).addObject(item);		
				}	
			} else {
				_this.get(where).addObject(item);	
			}
			_this.log(where);
		});
	},
	remove(item, where) {
		console.log('REMOVE USER: ', item);
		console.log('REMOVE WHERE: ', where);
		this.get(where).removeObject(item);
		this.log(where);
	},
	empty() {
		this.get('equipe').clear();
		this.get('producao').clear();
	}
});