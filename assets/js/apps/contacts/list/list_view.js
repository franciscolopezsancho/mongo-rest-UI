ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Contact = Marionette.ItemView.extend({
		tagName: "li",
		template: "#contact-list-item",
		events: {
			"click": "highlightName",
			"click button": "saveClicked"
		},
		saveClicked: function(e){
			e.stopPropagation();
			this.model.save();
		}
	});

	List.Contacts = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: List.Contact
	});
});
