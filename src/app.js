/** @jsx React.DOM */
var assign = require('object-assign');
var React = require('react');

var Constants = {
	NAVIGATE: 'refresh'
};

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

};

var TableHeader = React.createClass({displayName: "TableHeader",
	onNavigate: function(evt) {
		Actions.navigate(2);
	},

	render: function() {
		return React.createElement("thead", null, 
			React.createElement('tr', null, 
				this.props.headers.map(function (header, index) {
					return React.createElement('th', {key: index}, header.get('name'))
				})
			)
		);
	}
});

var TableBody = React.createClass({displayName: "TableBody",
	render: function () {
		return React.createElement("tbody", null,
			this.props.records.map(function (record, index) {
				return React.createElement('tr', {key: record.id},
					this.props.headers.map(function (header, index) {
						return React.createElement('td', {key: record.id + '-' + index}, record.get(header.id))
					}, this)
				)
			}, this)
		)
	}
});

var TableView = React.createClass({displayName: "TableView",
	getInitialState: function() {
		return {headers: this.props.headers.models, records: this.props.records.models};
	},
  
  	componentDidMount: function() {
    	this.props.records.on('reset', function(collection) {
    		this.setState({records: collection.models})
    	}, this);
  	},

  	componentWillUnmount: function() {
    	this.props.records.off(null, null, this);
  	},

  	render: function() {
    	return React.createElement("table", {className: this.props.className},
    		React.createElement(TableHeader, {headers: this.props.headers}),
    		React.createElement(TableBody, {headers: this.props.headers, records: this.props.records})
    	);
  	}
});

module.exports = TableView;
