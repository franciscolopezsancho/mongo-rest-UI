ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List.Contacts({
        collection: contacts
      });

      contactsListView.on("childview:contact:show", function(childView, model){
        ContactManager.navigate("contacts/" + model.get('id'));
        ContactManager.ContactsApp.Show.Controller.showContact(model);
      });

      contactsListView.on("childview:contact:delete", function(childView, model){
        model.destroy();
      });

      ContactManager.mainRegion.show(contactsListView);
    }
  }
});
