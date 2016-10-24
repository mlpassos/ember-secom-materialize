import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	uid: attr('string'),
	displayName: attr('string'),
	email: attr('string'),
	photoURL: attr('string')
	// tags: DS.hasMany('tag')
});