var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var RoleStore = require('../stores/RoleStore');

/**
* Retrieve the current ROLE data from the RoleStore
*/
function getRoleState() {
    return {
        allRoles: RoleStore.getAll(),
        areAllComplete: RoleStore.areAllComplete()
    };
}

var RatecruitApp = React.createClass({

    getInitialState: function() {
        return getRoleState();
    },

    componentDidMount: function() {
        RoleStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RoleStore.removeChangeListener(this._onChange);
    },

    /**
    * @return {object}
    */
    render: function() {
        return (
            <div>
            <Header />
            <MainSection
                allRoles={this.state.allRoles} />
            <Footer allRoles={this.state.allRoles} />
            </div>
        );
    },

    /**
    * Event handler for 'change' events coming from the RoleStore
    */
    _onChange: function() {
        this.setState(getRoleState());
    }

});

module.exports = RatecruitApp;
