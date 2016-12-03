import Ember from 'ember';

export function pautaClass([id, isDeleted]) {
   let strClass = '';
   if (isDeleted === true) {
   	// console.log('PAUTA DELETADA');
   	strClass = 'pauta-deleted ';
   } 
   strClass += "col l4 m6 s12 isoitem item" + id;
   return Ember.String.htmlSafe(strClass);
}

export default Ember.Helper.helper(pautaClass);