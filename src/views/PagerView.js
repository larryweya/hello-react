var React = require('react');

var PagerView = React.createClass({displayName: "PagerView",
  	getInitialState: function() {
  		return {recordsPerPage: 10, totalCount: 31/*this.props.records.totalCount*/};
  	},
  
  	componentDidMount: function() {
    	this.props.records.on('reset', function(collection) {
    		
    	}, this);
  	},

  	componentWillUnmount: function() {
    	this.props.records.off(null, null, this);
  	},

  	render: function() {
      var pages = [];
      // @todo: calculate no. of pages and cap it at 10 so we dont show so many pages
      var numPages = Math.ceil(this.state.totalCount/this.state.recordsPerPage);
      for(i = 0; i < numPages; i++)
        pages.push(
          React.createElement('li', {key: i}, i + 1)
        );
    	return pages;
  	}
});

module.exports = PagerView;
