var React = require('react');
var ReactPropTypes = React.PropTypes;
var RoleActions = require('../actions/RoleActions');
var TextInput = require('./TextInput.react');
var RoleFieldSet = require('./RoleFieldSet.react');

var classNames = require('classnames');

var RoleItem = React.createClass({

    propTypes: {
        role: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isEditing: false
        };
    },

    /**
    * @return {object}
    */
    render: function() {
        var role = this.props.role;

        var input;
        if (this.state.isEditing) {
            input = <RoleFieldSet className="edit" onSave={this._onSave} role={role} />;
        }

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().

        return (
            <li
            className={classNames({
                'completed': role.complete,
                'editing': this.state.isEditing
            })}
            key={role.id}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                        checked={role.complete} onChange={this._onToggleComplete} />
                    <div className="box" onDoubleClick={this._onDoubleClick}>
                        <span > {role.company} </span>
                        <span > {role.recruiter} </span>
                        <span > {role.dailyrate} </span>
                    </div>
                    <button className="destroy" onClick={this._onDestroyClick} />
                </div>
                {input}
            </li>
        );
    },

    _onToggleComplete: function() {
        RoleActions.toggleComplete(this.props.role);
    },

    _onDoubleClick: function() {
        this.setState({isEditing: true});
    },

    /**
    * Event handler called within TextInput.
    * Defining this here allows TextInput to be used in multiple places
    * in different ways.
    * @param  {string} text
    */
    _onSave: function(text) {
        RoleActions.updateText(this.props.role.id, text);
        this.setState({isEditing: false});
    },

    _onDestroyClick: function() {
        RoleActions.destroy(this.props.role.id);
    }

});

module.exports = RoleItem;
