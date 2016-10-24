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
  this.route('noticia', {path: 'noticia/:slug'}, function() {

  });
  this.route('tags');
  this.route('contato');
  this.route('sobre');
  this.route('downloads');
  this.route('search');
  this.route('tags', {});
  this.route('tag', {path: 'tag/:slug/:pageid'}, function() {
    //
  });
  this.route('loading');
  this.route('login');
  this.route('logout');
  this.route('perfil');
  this.route('pauta');
  this.route('pautas');
});

export default Router;