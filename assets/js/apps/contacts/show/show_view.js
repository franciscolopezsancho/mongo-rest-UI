ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  
  Show.MissingContact = Marionette.ItemView.extend({
   template: "#missing-contact-view"
 });

  Show.Contact = Marionette.ItemView.extend({
    template: "#contact-view",
    events: {      
      "click button.js-back": "goBack",
      "click a.js-edit": "editClicked"
    },

    highlightName: function(e){
      this.$el.toggleClass("warning");
    },

    goBack: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:list");
    },
    
    editClicked: function(e){
     e.preventDefault();
     this.trigger("contact:edit", this.model);
   }
 });
});
