var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TextInput = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        value: ReactPropTypes.string
    },

    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    /**
    * @return {object}
    */
    render: function() /*object*/ {
        return (
            <input
            className={this.props.className}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.value}
            autoFocus={this.props.autoFocus}
            />
        );
    },


    /**
    * @param {object} event
    */
    _onChange: function(/*object*/ event) {
        this.setState({
            value: event.target.value
        });
        this.props.onChange(this.props.id, event.target.value);
    },

    /**
    * @param  {object} event
    */
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }

});

module.exports = TextInput;
