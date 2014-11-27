ContactManager.module('ContactsApp.Edit', function(Edit,
	ContactManager, Backbone, Marionette, $, _){
	Edit.Contact = Marionette.ItemView.extend({
		template: "#contact-form",

		events: {
			'click button.js-submit': 'submitClicked',
			'click input.js-supervised':'supervises',
			'click input.js-matched':'matches',
			'click input.js-infringing':'infringes',
			'click button.js-back':'back',
			'click select.editorDropdown':'located',
			'input input.js-input-text':'wrote'
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
			this.save();
			this.render();			
		},
		located: function(e){
			e.preventDefault();	
			this.model.set("infringingLocation",$(".editorDropdown option:selected").val())
			this.save();						
		},
		wrote:function(e){
			e.preventDefault();	
			this.save();	
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
			this.save();
			this.render();
		},		
		infringes: function(e){
			e.preventDefault();	
			if($("#link-infringing").attr("checked") == "checked"){
				$("#link-infringing").removeAttr("checked");
				this.model.set("isInfringing",false)
			}else{
				$("#link-infringing").prop("checked","checked");
				this.model.set("isInfringing",true)
			}
			this.save();
			this.render();			
		},
		back: function(id){
			window.history.back();
		},

		check: function(event,viewLocation,modelAttribute){
			event.preventDefault();	
			if($(viewLocation).attr("checked") == "checked"){
				$("#link-matches").removeAttr("checked");
				this.model.set(modelAttribute,false)
			}else{
				$(viewLocation).prop("checked","checked");
				this.model.set(modelAttribute,true)
			}
			this.save();
			this.render();	
		},
		save: function(e){
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		}
	});
});