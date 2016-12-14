import Ember from 'ember';

export function lightboxUrl([value, field]) {
  let url = 'http://www.secom.pa.gov.br/site/wp-admin/admin-ajax.php?action=cfdb-file&s='+value+'&form=I+Processo+Seletivo+Simplificado&field='+field;
  return Ember.String.htmlSafe(url);
}

export default Ember.Helper.helper(lightboxUrl);


// import Ember from 'ember';

// export function pautaMinimap([lat, lng, type]) {
//   let center = encodeURIComponent(lat + ',' + lng);
//   let size=null;
//   if (type === 'ver') {
//   	size ='640x300';
//   } else {
//   	size ='400x400';
//   }
//   let img = 'https://maps.googleapis.com/maps/api/staticmap?markers='+center+'&zoom=15&size=' + size + '&key=AIzaSyAcqXF6nzd3bfoM7LvN9Y4NloaHI-leLq0';
//   return Ember.String.htmlSafe(img);
// }

// export default Ember.Helper.helper(pautaMinimap);
