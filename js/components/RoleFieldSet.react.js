var React = require('react');
var ReactPropTypes = React.PropTypes;
var TextInput = require('./TextInput.react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

function getClearRole() {
    return {
        company: '',
        recruiter: '',
        dailyrate: '0'
    };
}
var RoleFieldSet = React.createClass({

    getInitialState: function() {
        console.log('RoleFieldSet init', this.props.role);
        return {
            currentRole: this.props.role || getClearRole()
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ currentRole: nextProps.role || getClearRole() });
    },
    /**
    * @return {object}
    */
    render: function() /*object*/ {
        return (
            <div>
                <TextInput id="company" placeholder="company name"
                    onChange={this._onChange} value={this.state.currentRole.company}/>
                <TextInput id="recruiter" placeholder="recruiter name"
                    onChange={this._onChange} value={this.state.currentRole.recruiter}/>
                <TextInput id="dailyrate" placeholder="daily rate"
                    onChange={this._onChange} value={this.state.currentRole.dailyrate}/>
                <button onClick={this._onSave}>Save</button>
            </div>
        );
    },

    /**
    * Invokes the callback passed in as onSave, allowing this component to be
    * used in different ways.
    */
    _onSave: function() {
        this.props.onSave(this.state.currentRole);
        this.setState({ currentRole: getClearRole() });
    },
    _onChange: function(field, value) {
        this.state.currentRole[field] = value;
        this.setState({ currentRole:  this.state.currentRole});
    }
});

module.exports = RoleFieldSet;
