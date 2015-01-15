var Constants = require('./constants');
var AppDispatcher = require('./dispatchers/AppDispatcher');

var Actions = {

	/**
	 * @param  {integer} page
	 */
	navigate: function(page) {
		AppDispatcher.dispatch({
			actionType: Constants.NAVIGATE,
			page: page
		});
	},

	/**
	 * Run a search with the provided terms as criteria
	 * 
	 * @param {array} searchTerms
	 */
	search: function(searchTerms) {
		AppDispatcher.dispatch({
			actionType: Constants.SEARCH,
			terms: searchTerms
		});
	}

};

module.exports = Actions;
