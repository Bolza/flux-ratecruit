var React = require('react');
var RoleActions = require('../actions/RoleActions');
var TextInput = require('./TextInput.react');
var RoleFieldSet = require('./RoleFieldSet.react');

var Header = React.createClass({

    /**
    * @return {object}
    */
    render: function() {
        return (
            <header id="header">
                <h1>Roles</h1>
                <RoleFieldSet id="new-todo" onSave={this._onSave} />
            </header>
        );
    },

    /**
    * Event handler called within TextInput.
    * Defining this here allows TextInput to be used in multiple places
    * in different ways.
    * @param {string} text
    */
    _onSave: function(role) {
        RoleActions.create(role);
    }

});

module.exports = Header;
