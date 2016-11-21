import Ember from 'ember';

export function pautaClass([id]) {
   let strClass = "col l4 m6 s12 isoitem item" + id;
   return Ember.String.htmlSafe(strClass);
}

export default Ember.Helper.helper(pautaClass);