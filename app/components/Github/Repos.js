var React = require('react');

var Repos = React.createClass({

  render: function() {
    return (
      <div>
        REPOS <br />
        Username: {this.props.username} <br />
        Repos: {this.props.repos}
      </div>
    );
  }

});

module.exports = Repos;
