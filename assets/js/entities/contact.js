ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
 Entities.Contact = Backbone.Model.extend({
  parse: function (response) {
    if (response._id) {
      response.id = response._id
    }
    return response;
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
  url: "http://54.77.180.70:3000/ml/supervisingUI?limit=2"
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
