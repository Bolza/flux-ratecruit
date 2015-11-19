var React = require('react');
var ReactPropTypes = React.PropTypes;
var RoleActions = require('../actions/RoleActions');

var Footer = React.createClass({

  propTypes: {
    allRoles: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allRoles = this.props.allRoles;
    var total = Object.keys(allRoles).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allRoles) {
      if (allRoles[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    RoleActions.destroyCompleted();
  }

});

module.exports = Footer;
