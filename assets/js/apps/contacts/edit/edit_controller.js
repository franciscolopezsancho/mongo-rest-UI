ContactManager.module('ContactsApp.Edit', function(Edit,
	ContactManager, Backbone, Marionette, $, _){
	Edit.Controller = {
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
				//ContactManager.trigger("contacts:list");
			});
			contactView.on("form:save", function(data){
				//before updating will need to get rid of _id and ok.	

				model.save(data, {
					success: function (model, response) {
						console.log("success");
					},
					error: function (model, response) {
						console.log("error");
					}
				});	
				ContactManager.trigger("contacts:list");	
			});

			ContactManager.mainRegion.show(contactView);

			
		}


	};
});