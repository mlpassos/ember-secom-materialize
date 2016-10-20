import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	type: attr('string'),
	slug: attr('string'),
	url: attr('string'),
	status: attr('string'),
	title: attr('string'),
	title_plain: attr('string'),
	content: attr('string'),
	excerpt: attr('string'),
	categories: DS.hasMany('category'),
	tags: DS.hasMany('tag')
});
