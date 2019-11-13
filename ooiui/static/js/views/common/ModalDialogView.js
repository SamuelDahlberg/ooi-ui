"use strict";
/*
 * ooiui/static/js/views/common/ModalDialogView.js
 * Model definitions for Arrays
 *
 * Dependencies
 * Partials
 * - ooiui/static/js/partials/ModalDialog.html
 * Libs
 * - ooiui/static/lib/underscore/underscore.js
 * - ooiui/static/lib/backbone/backbone.js
 * Usage
 */

var ModalDialogView = Backbone.View.extend({
  className: 'modal fade',
  events: {
    'hidden.bs.modal' : 'hidden',
    'click #dataupdate' : 'setDataUpdateCookie'
  },
  hide: function() {
    this.$el.modal('hide');
  },
  hidden: function(e) {
    if(this.ack) {
      this.ack();
    }
  },
  setDataUpdateCookie: function(e) {
    console.log(e);

    var date = new Date();
    date.setTime(date.getTime() + 12500*1000);

    if(e.target.checked === true){
      console.log('checked');
      Cookies.set('datanotification', 'hide', {expires: date, path: '/'});
      console.log(Cookies.get('datanotification'));
    } else {
      console.log('unchecked');
      Cookies.set('datanotification', 'show', {expires: date, path: '/'});
      console.log(Cookies.get('datanotification'));
    }

  },
  initialize: function() {
    _.bindAll(this, "render", "show", "hidden");
  },
  show: function(options) {
    if(!options) {
      options = {};
    }
    if(options && typeof options.ack == "function") {
      this.ack = options.ack.bind(this);
    }
    this.render(options);
    if(options.type && options.type == "danger") {
      this.$el.find('.modal-content').addClass('alert alert-danger');
    } else if(options.type && options.type == "success") {
      this.$el.find('.modal-content').addClass('alert alert-success');
    } else if(options.type && options.type == "info") {
      this.$el.find('.modal-content').addClass('alert alert-info');
    } else if(options.type && options.type == "warning") {
      this.$el.find('.modal-content').addClass('alert alert-warning');
    }

    this.$el.modal('show');
  },
  template: JST['ooiui/static/js/partials/ModalDialog.html'],
  render: function(options) {
    this.$el.html(this.template(options));
  }
});

