var AppDispatcher = require('./src/dispatchers/AppDispatcher');
var RecordStore = require('./src/stores/RecordStore');
var PagerView = require('./src/views/PagerView');
var TableView = require('./src/app');

var ReactTable = {
	AppDispatcher: AppDispatcher,
	RecordStore: RecordStore,
	PagerView: PagerView,
	TableView: TableView
}

module.exports = ReactTable;
