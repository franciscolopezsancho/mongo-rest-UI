ContactManager.module('Common.Views', function(Views, ContactManager,
	Backbone, Marionette, $, _){
	Views.Loading = Marionette.ItemView.extend({
		template: "#loading-view",

		serializeData: function(){
			return {
				title: this.options.title || "Loading Data",
				message: this.options.message || "Please wait, data is loading."
			}
		},

		onShow: function(){
			var opts = {
 // options for spin.js
};
//$('#spinner').spin(opts);
}
});
});