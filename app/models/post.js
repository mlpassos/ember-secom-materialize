import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	slug: attr('string'),
	title: attr('string'),
	content: attr('string'),
	excerpt: attr('string'),
	thumbnail: attr('string'),
	categories: DS.hasMany('category'),
	tags: DS.hasMany('tag'),
	thumbnail_images: attr()
});