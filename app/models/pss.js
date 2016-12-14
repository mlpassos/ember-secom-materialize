import DS from 'ember-data';

export default DS.Model.extend({
	nome: attr('string'),
	edital: attr('string'),
	data_criado: attr('date', {
    	defaultValue() { 
    		return new Date(); 
    	}
  	})
});
