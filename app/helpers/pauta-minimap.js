import Ember from 'ember';

export function pautaMinimap([lat, lng]) {
  let center = encodeURIComponent(lat + ',' + lng);
  let img = 'https://maps.googleapis.com/maps/api/staticmap?markers='+center+'&zoom=15&size=200x200&key=AIzaSyAcqXF6nzd3bfoM7LvN9Y4NloaHI-leLq0';
  return Ember.String.htmlSafe(img);
}

export default Ember.Helper.helper(pautaMinimap);
