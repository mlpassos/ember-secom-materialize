import Ember from 'ember';

export function pautasTotalUsers([value]) {
  let equipe = value;
  let total = equipe.get('length');
  return Ember.String.htmlSafe(total);
}

export default Ember.Helper.helper(pautasTotalUsers);