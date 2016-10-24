import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
	},
	actions: {
		getPrefs(checkboxSelections) {
			// alert(selections);
			alert('check: ' + checkboxSelections);
		}
	}
});