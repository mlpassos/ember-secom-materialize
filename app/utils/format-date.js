export default function formatDate(data) {
	let dt = new Date(data);
	// let dtFormatada = dt.toLocaleDateString('pt-BR', options);
	let arrMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
	    'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
	    'Novembro', 'Dezembro'];
	return dt.getDate() + ' ' + arrMeses[dt.getMonth()] + ', ' + dt.getFullYear();
}

// import Ember from 'ember';

// export default Ember.Object.extend({

// 	formatDate(data) {
// 		let dt = new Date(data);
// 		// let dtFormatada = dt.toLocaleDateString('pt-BR', options);
// 		let arrMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
// 		    'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
// 		    'Novembro', 'Dezembro'];
// 		return dt.getDate() + ' ' + arrMeses[dt.getMonth()] + ', ' + dt.getFullYear();
// 	}

// });
