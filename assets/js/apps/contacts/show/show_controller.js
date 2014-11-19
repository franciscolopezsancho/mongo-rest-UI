ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
	Show.Controller = {
		showContact: function(id){
			var contacts = ContactManager.request("contact:entities");
			var model = contacts.get(id);
			var contactView = new Show.Contact({
				model: model
			});
			contactView.on("contact:edit", function(contact){
				ContactManager.trigger("contact:edit", contact.get('id'));
			});
			ContactManager.mainRegion.show(contactView);
		}
	}
});
