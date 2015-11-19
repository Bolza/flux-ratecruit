var React = require('react');
var RoleActions = require('../actions/RoleActions');
var TextInput = require('./TextInput.react');

var Header = React.createClass({

    /**
    * @return {object}
    */
    render: function() {
        return (
            <header id="header">
            <h1>todos</h1>
            <TextInput
            id="new-todo"
            placeholder="What needs to be done?"
            onSave={this._onSave}
            />
            </header>
        );
    },

    /**
    * Event handler called within TextInput.
    * Defining this here allows TextInput to be used in multiple places
    * in different ways.
    * @param {string} text
    */
    _onSave: function(text) {
        if (text.trim()){
            RoleActions.create(text);
        }

    }

});

module.exports = Header;
