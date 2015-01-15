var AppDispatcher = require('../dispatchers/AppDispatcher');
var Collection = require('backbone').Collection;
var Constants = require('../constants');

var RecordStore = Collection.extend({

	initialize: function (models, options) {
		var _this = this;

		// @todo: throw and exception if url option is not set
		this.url = options.url;

		this.dispatcherIndex = AppDispatcher.register(function(payload) {
			switch(payload.actionType) {
				case Constants.NAVIGATE:
					_this.navigate(payload.page);
					_this.trigger('reset');
					break;
				// add more cases for other actionTypes, like UPDATE, etc.
			}

			return true; // No errors. Needed by promise in Dispatcher.
		})
	},

	parse: function (response) {
		return response.records;
	},

	navigate: function (page) {
		console.log("Navigating to page " + page  + " ...");
	},

});

module.exports = RecordStore;
