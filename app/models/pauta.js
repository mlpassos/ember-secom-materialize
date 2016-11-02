import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	slug: attr('string'),
	retranca: attr('string'),
	entrevistado: attr('string'),
	contato: attr('string'),
	equipe: DS.hasMany('user'),
	producao: DS.hasMany('user'),
	dataHora: attr('date'),
	local: attr('string')
});