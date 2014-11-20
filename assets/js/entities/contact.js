ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
 Entities.Contact = Backbone.Model.extend({
  parse: function (response) {
    if (response._id) {
      response.id = response._id
      response.content=response.interaction.interaction.content
      response.link=response.interaction.interaction.link
      response.tags=response.interaction.interaction.tags
      response.type=response.interaction.interaction.type
      response.normalized_url=response.interaction.links.normalized_url
      response.url=response.interaction.links.url
      response.title=response.interaction.links.title
      response.status=response.ifpi.process.status
      response.detail=response.ifpi.process.detail
      response.date=response.ifpi.process.date
      response.matched=response.ifpi.process.match
      response.track=response.ifpi.process.track
      response.artist=response.ifpi.process.artist
      response.supervised=response.ifpi.process.supervised  

    }
    //response.unset("interaction")
    //response.unset("ifpi")
    return response;
  },
  sync: function(method, model, options) {
    if (model.bundle) {
      _.defaults(options || (options = {}), {attrs: model.bundle()});
    }
    return Backbone.sync.apply(this, [method, model, options]);
  },

   // url: "http://54.77.180.70:3000/ml/supervisingUI",
   url : function() {
     //Important! It's got to know where to send its REST calls. 
     //In this case, POST to '/donuts' and PUT to '/donuts/:id'
     return this.id ? "http://54.77.180.70:3000/ml/supervisingUI/" + this.id : "http://54.77.180.70:3000/ml/supervisingUI"; 
   } 
 });



Entities.ContactCollection = Backbone.Collection.extend({
  model: Entities.Contact,
  url: "http://54.77.180.70:3000/ml/supervisingUI?limit=100"
});

var contacts;

var initializeContacts = function(){
  contacts = new Entities.ContactCollection();
  contacts.fetch({

  });
}

var API = {
  getContactEntities: function(){
    if(contacts === undefined){
      initializeContacts();
    }
    return contacts;
  }
};

ContactManager.reqres.setHandler("contact:entities", function(){
  return API.getContactEntities();
});
});
