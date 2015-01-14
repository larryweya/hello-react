/** @jsx React.DOM */
var React = require('react');

var TableHeader = React.createClass({displayName: "TableHeader",
	render: function() {
		return React.createElement("thead", null, 
			React.createElement('tr', null, 
				React.createElement('th', {"colspan": 2}, "Refresh")
			),
			React.createElement('tr', null, 
				React.createElement('th', null, "Name"),
				React.createElement('th', null, "Age")
			)
		);
	}
});

var TableBody = React.createClass({displayName: "TableBody",
	render: function () {
		return React.createElement("tbody", null,
			this.props.store.map(function (record, index) {
				return React.createElement('tr', {key: record.id},
					this.props.headers.map(function (header, index) {
						return React.createElement('td', {key: record.id + '-' + index}, record.get(header.id))
					}, this)
				)
			}, this)
		)
	}
});

var TableView = React.createClass({displayName: "HelloMessage",
	getInitialState: function() {
		return {headers: this.props.headers.models, records: this.props.store.models};
	},
  
  	componentDidMount: function() {
    	this.props.store.on('reset', function(collection) {
    		this.setState({records: collection.models})
    	}, this);
  	},

  	componentWillUnmount: function() {
    	this.props.store.off(null, null, this);
  	},

  	render: function() {
    	return React.createElement("table", {className: "table table-bordered"},
    		React.createElement(TableHeader, {headers: this.props.headers}),
    		React.createElement(TableBody, {headers: this.props.headers, store: this.props.store})
    	);
  	}
});

module.exports = TableView;
