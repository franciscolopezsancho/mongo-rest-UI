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
      response.isInfringing=response.ifpi.status == "infringing" ? true : ((response.ifpi.process.isInfringing != undefined) ? response.ifpi.process.isInfringing : false)
      response.infringingCause=  response.ifpi.infringingCause != undefined ?  response.ifpi.infringing.cause : ""
      response.infringingLocation=(response.ifpi.process.infringingLocation != undefined) ? response.ifpi.process.infringingLocation : ""
    }
    return response;
  },
  
  sync: function(method, model, options) {
    if (model.bundle) {
      _.defaults(options || (options = {}), {attrs: model.bundle()});
    }
    model.attributes.interaction.interaction.content=model.attributes.content
    model.attributes.interaction.interaction.link=model.attributes.link
    model.attributes.interaction.interaction.tags=model.attributes.tags
    model.attributes.interaction.interaction.type=model.attributes.type
    model.attributes.interaction.links.normalized_url=model.attributes.normalized_url
    model.attributes.interaction.links.url=model.attributes.url
    model.attributes.interaction.links.title=model.attributes.title
    model.attributes.ifpi.process.status=model.attributes.status
    model.attributes.ifpi.process.detail=model.attributes.detail
    model.attributes.ifpi.process.date=model.attributes.date
    model.attributes.ifpi.process.match=model.attributes.matched
    model.attributes.ifpi.process.track=model.attributes.track
    model.attributes.ifpi.process.artist=model.attributes.artist
    model.attributes.ifpi.process.supervised=model.attributes.supervised
    model.attributes.ifpi.process.isInfringing=model.attributes.isInfringing
    model.attributes.ifpi.process.infringingLocation=model.attributes.infringingLocation
    var clone = model.clone()
    //model.unset("content","silent")
    clone.unset("matched","silent")
    clone.unset("track","silent")
    clone.unset("artist","silent")
    clone.unset("supervised","silent")
    clone.unset("detail","silent")
    clone.unset("title","silent")
    clone.unset("url","silent")
    clone.unset("normalized_url","silent")
    clone.unset("type","silent")
    clone.unset("tags","silent")
    clone.unset("link","silent")
    clone.unset("status","silent")
    clone.unset("date","silent")
    //clone.unset("id","silent")
    clone.unset("content","silent")

    return Backbone.sync.apply(this, [method, clone, options]);
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
