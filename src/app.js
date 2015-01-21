/** @jsx React.DOM */
var assign = require('object-assign');
var React = require('react');
var Constants = require('./constants');
var Actions = require('./actions');

var TableHeader = React.createClass({displayName: "TableHeader",
	onNavigate: function(evt) {
		Actions.navigate(2);
	},

	render: function() {
		return React.createElement("thead", null, 
			React.createElement('tr', null, 
				React.createElement('th', null, '#'),
				this.props.headers.map(function (header, index) {
					return React.createElement('th', {key: 'title-column-' + index}, header.get('label'))
				})
			),
			React.createElement('tr', null, 
				React.createElement('td', null, ''),
				this.props.headers.map(function (header, index) {
					var element = header.get('searchable')?'':'';
					return React.createElement('td', {key: 'search-column-' + index},
						React.createElement('input', {key: 'search-input-' + index, type: 'text', name: header.get('key')})
					)
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
					React.createElement('td', null, 
						React.createElement('a', {href: record.url(), target: '_blank'}, record.id)
					),
					this.props.headers.map(function (header, index) {
						return React.createElement('td', {key: index}, record.get(header.get('key')))
					}, this)
				)
			}, this)
		)
	}
});

var TableView = React.createClass({displayName: "TableView",
	getInitialState: function() {
		return {
			headers: this.props.headers.models,
			records: this.props.records.models
		};
	},
  
  	componentDidMount: function() {
    	this.props.records.on('reset', function(collection) {
    		this.setState({records: collection.models})
    	}, this);
  	},

  	componentWillUnmount: function() {
    	this.props.records.off(null, null, this);
  	},

  	handleSubmit: function (e) {
  		e.preventDefault();
  		// jQuery dependency
  		var searchTerms = $(this.getDOMNode()).serializeArray().reduce(function (carry, field) {
  			// only add fields that have values
  			if(!!field.value.trim())
  				carry[field.name] = field.value;
  			return carry;
  		}, {});
  		Actions.search(searchTerms);
  	},

  	render: function() {
  		return React.createElement('form', {onSubmit: this.handleSubmit},
  			React.createElement("button", {style: {position: 'absolute', left: '-9999px', width: '1px', height: '1px'}}, 'Search'),
  			React.createElement("table", {className: this.props.className},
	    		React.createElement(TableHeader, {headers: this.props.headers}),
	    		React.createElement(TableBody, {headers: this.props.headers, records: this.props.records})
	    	)
  		);
  	}
});

module.exports = TableView;
