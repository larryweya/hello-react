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
				case Constants.SEARCH:
					_this.search(payload.terms);
					break;
				case Constants.NAVIGATE:
					_this.navigate(payload.page);
					break;
			}

			return true; // No errors. Needed by promise in Dispatcher.
		})
	},

	parse: function (response) {
		return response.results;
	},

	search: function (terms) {
		// compose the query
		this.fetch({reset: true, data: terms});
	},

	navigate: function (page) {
		console.log("Navigating to page " + page  + " ...");
	},

});

module.exports = RecordStore;
