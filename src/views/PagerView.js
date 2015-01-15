var React = require('react');

var PagerView = React.createClass({displayName: "PagerView",
  	getInitialState: function() {
  		return {currentPage: 1, recordsPerPage: 10, totalCount: 31/*this.props.records.totalCount*/};
  	},
  
  	componentDidMount: function() {
    	this.props.records.on('reset', function(collection) {
    		
    	}, this);
  	},

  	componentWillUnmount: function() {
    	this.props.records.off(null, null, this);
  	},

  	render: function() {
      // @todo: calculate no. of pages and cap it at 10 so we dont show too many pages
      var numPages = Math.ceil(this.state.totalCount/this.state.recordsPerPage);
      var isFirstPage = this.state.currentPage == 1;
      var isLastPage = this.state.currentPage == numPages;
      var pages = [
        React.createElement('li', {className: isFirstPage?'disabled':''}, React.createElement('a', {href: '#'}, '<<')),
        React.createElement('li', {className: isFirstPage?'disabled':''}, React.createElement('a', {href: '#'}, '<'))
      ];
      for(i = 0; i < numPages; i++)
      {
        var className = (i + 1) == this.state.currentPage?'active':'';
        pages.push(
          React.createElement('li', {key: i, className: className},
            React.createElement('a', {href: '#'}, i + 1)
          )
        );
      }
      pages.push(
        React.createElement('li', {className: isLastPage?'disabled':''}, React.createElement('a', {href: '#'}, '>')),
        React.createElement('li', {className: isLastPage?'disabled':''}, React.createElement('a', {href: '#'}, '>>'))
      );
    	return React.createElement('ul', {className: this.props.className}, pages);
  	}
});

module.exports = PagerView;
