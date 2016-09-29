import Ember from 'ember';

let props = {
	title: 'Notícias',
	subtitle: 'Bem-vindo a área de notícias do aplicativo da SECOM',
	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
};

export default Ember.Route.extend({
	model() {
		return props;
	}
});
