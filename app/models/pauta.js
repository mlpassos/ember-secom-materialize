import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	slug: attr('string'),
	retranca: attr('string'),
	local: attr('string'),
	entrevistado: attr('string'),
	contato: attr('string'),
	equipe: DS.hasMany('user'),
	producao: DS.hasMany('user'),
	dataHora: attr('date'),
	encaminhamento: attr('string'),
	informacoes: attr('string'),
	sugestoes: attr('string'),
	data_criado: attr('date', {
	  defaultValue() { 
	  	return new Date(); 
	  }
	})
});