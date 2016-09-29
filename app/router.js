import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('noticias', {path: 'noticias/:page'}, function() {
    
  });
  this.route('tags');
  this.route('contato');
  this.route('sobre');
  this.route('downloads');
  this.route('search');
});

export default Router;
