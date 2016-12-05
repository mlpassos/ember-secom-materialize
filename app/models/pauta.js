import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	slug: attr('string'),
	retranca: attr('string'),
	local: attr('string'),
	lat: attr('string'),
	lng: attr('string'),
	entrevistado: attr('string'),
	contato: attr('string'),
	equipe: DS.hasMany('user'),
	producao: DS.hasMany('user'),
	dataHora: attr('date'),
	horario: attr('string'),
	encaminhamento: attr('string'),
	informacoes: attr('string'),
	sugestoes: attr('string'),
	criado_por: DS.belongsTo('user'),
	data_criado: attr('date', {
	  defaultValue() { 
	  	return new Date(); 
	  }
	})
});