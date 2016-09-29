import Ember from 'ember';

export function tagcloud([value]) {
  let out = value*5.3;
  if (out <= 10) {
  	out *=2;
  }
  return Ember.String.htmlSafe(out);
}

export default Ember.Helper.helper(tagcloud);