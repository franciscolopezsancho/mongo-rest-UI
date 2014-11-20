ContactManager.module('ContactsApp.Edit', function(Edit,
	ContactManager, Backbone, Marionette, $, _){
	Edit.Contact = Marionette.ItemView.extend({
		template: "#contact-form",

		events: {
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

		check: function(el){
			if($(el).attr("checked") == "checked"){
				$("#link-matches").removeAttr("checked");
				this.model.set("matches",false)
			}else{
				$(el).prop("checked","checked");
				this.model.set("matches",true)
			}
			this.render();
		}
	});
});