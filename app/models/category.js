import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	slug: attr('string'),
	title: attr('string'),
	description: attr('string'),
	parent: attr('number'),
	post_count: attr('number')
});