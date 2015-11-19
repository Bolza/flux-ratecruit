var React = require('react');
var ReactPropTypes = React.PropTypes;
var RoleActions = require('../actions/RoleActions');
var RoleItem = require('./RoleItem.react');

var MainSection = React.createClass({

    propTypes: {
        allRoles: ReactPropTypes.object.isRequired,
        areAllComplete: ReactPropTypes.bool.isRequired
    },

    /**
    * @return {object}
    */
    render: function() {
        if (!Object.keys(this.props.allRoles).length) {
            return null;
        }

        var allRoles = this.props.allRoles;
        var roles = [];

        for (var key in allRoles) {
            roles.push(<RoleItem key={key} role={allRoles[key]} />);
        }

        return (
            <section id="main">
                <input
                    id="toggle-all"
                    type="checkbox"
                    onChange={this._onToggleCompleteAll}
                    checked={this.props.areAllComplete ? 'checked' : ''}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">{roles}</ul>
            </section>
        );
    },

    /**
    * Event handler to mark all TODOs as complete
    */
    _onToggleCompleteAll: function() {
        RoleActions.toggleCompleteAll();
    }

});

module.exports = MainSection;
