import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	uid: attr('string'),
	displayName: attr('string'),
	email: attr('string'),
	photoURL: attr('string'),
	funcao: DS.belongsTo('funcao'),
	data_criado: attr('date', {
    	defaultValue() { 
    		return new Date(); 
    	}
  	})
	// pautas: DS.hasMany('pauta')
	// producao: DS.hasMany('pauta')
	// tags: DS.hasMany('tag')
});