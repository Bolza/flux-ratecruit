var React = require('react');
var ReactPropTypes = React.PropTypes;
var RoleActions = require('../actions/RoleActions');
var RoleItem = require('./RoleItem.react');

var MainSection = React.createClass({

    propTypes: {
        allRoles: ReactPropTypes.object.isRequired
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
                <ul id="todo-list">{roles}</ul>
            </section>
        );
    }

});

module.exports = MainSection;
