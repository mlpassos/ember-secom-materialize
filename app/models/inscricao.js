import DS from 'ember-data';

export default DS.Model.extend({
	titulo: attr('string'),
	data_criado: attr('date', {
    	defaultValue() { 
    		return new Date(); 
    	}
  	})
});