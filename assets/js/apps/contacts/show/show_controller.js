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
		},
		editContact: function(id){
			var contacts = ContactManager.request("contact:entities");
			var model = contacts.get(id);
			var contactView = new Edit.Contact({
				model: model
			});

			contactView.on("form:submit", function(data){
			//before updating will need to get rid of _id and ok.		
				model.unset("_id");	
				model.unset("ok");		
				model.save(data, {
					success: function (model, response) {
						console.log("success");
					},
					error: function (model, response) {
						console.log("error");
					}
				});		
				ContactManager.trigger("contact:show", model.get('id'));
			});

			ContactManager.mainRegion.show(contactView);

			
		}
	}
});
