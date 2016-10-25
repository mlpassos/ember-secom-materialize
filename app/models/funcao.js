import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	user: DS.belongsTo('user'),
	title: attr('string'),
	slug: attr('string')
});