ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  
  Show.MissingContact = Marionette.ItemView.extend({
   template: "#missing-contact-view"
 });

  Show.Contact = Marionette.ItemView.extend({
    template: "#contact-view",
    events: {      
      "click button.js-back": "goBack",
      "click a.js-edit": "editClicked",
      'click button.js-submit': 'submitClicked',
      'click input.js-supervised':'supervises',
      'click input.js-matched':'matches'
    },
    submitClicked: function(e){
      e.preventDefault();
      console.log("edit contact");
      console.log($("#link-supervised").prop('checked'))
      console.log($("#link-matches").prop('checked'))
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },
    supervises: function(e){
      e.preventDefault(); 
      if($("#link-supervised").attr("checked") == "checked"){
        $("#link-supervised").removeAttr("checked");
        this.model.set("supervised",false)
      }else{
        $("#link-supervised").prop("checked","checked");
        this.model.set("supervised",true)
      }
      this.render();
      console.log($("#link-supervised").attr("checked"));

      
    },
    matches: function(e){
      e.preventDefault(); 
      if($("#link-matched").attr("checked") == "checked"){
        $("#link-matched").removeAttr("checked");
        this.model.set("matched",false)
      }else{
        $("#link-matched").prop("checked","checked");
        this.model.set("matched",true)
      }
      this.render();
      console.log($("#link-matched").attr("checked"));      
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
