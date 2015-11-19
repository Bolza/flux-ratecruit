var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RoleConstants = require('../constants/RoleConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _roles = JSON.parse(localStorage.roles) || {};


function saveInLS() {
    localStorage.roles = JSON.stringify(_roles);
}
function isEmpty() {
    return Object.keys(_roles).length === 0;
}
/**
* Create a ROLE item.
* @param  {string} role The content of the ROLE
*/
function create(obj) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _roles[id] = {
        id: id,
        complete: false,
        company: obj.company || '',
        dailyrate: obj.dailyrate || 0,
        recruiter: obj.recruiter || ''
    };
    saveInLS();
}

/**
* Update a ROLE item.
* @param  {string} id
* @param {object} updates An object literal containing only the data to be
*     updated.
*/
function update(id, updates) {
    _roles[id] = assign({}, _roles[id], updates);
    saveInLS();
}

/**
* Update all of the ROLE items with the same object.
* @param  {object} updates An object literal containing only the data to be
*     updated.
*/
function updateAll(updates) {
    for (var id in _roles) {
        update(id, updates);
    }
    saveInLS();
}

/**
* Delete a ROLE item.
* @param  {string} id
*/
function destroy(id) {
    delete _roles[id];
    saveInLS();
}

/**
* Delete all the completed ROLE items.
*/
function destroyCompleted() {
    for (var id in _roles) {
        if (_roles[id].complete) {
            destroy(id);
        }
    }
    saveInLS();
}

var RoleStore = assign({}, EventEmitter.prototype, {

    /**
    * Tests whether all the remaining ROLE items are marked as completed.
    * @return {boolean}
    */
    areAllComplete: function() {
        for (var id in _roles) {
            if (!_roles[id].complete) {
                return false;
            }
        }
        return true;
    },

    /**
    * Get the entire collection of ROLEs.
    * @return {object}
    */
    getAll: function() {
        return _roles;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var role;

    switch(action.actionType) {
        case RoleConstants.ROLE_CREATE:
        role = action.role;
        if (role !== '') {
            create(role);
            console.log(role);
            RoleStore.emitChange();
        }
        break;

        case RoleConstants.ROLE_TOGGLE_COMPLETE_ALL:
        if (RoleStore.areAllComplete()) {
            updateAll({complete: false});
        } else {
            updateAll({complete: true});
        }
        RoleStore.emitChange();
        break;

        case RoleConstants.ROLE_UNDO_COMPLETE:
        update(action.id, {complete: false});
        RoleStore.emitChange();
        break;

        case RoleConstants.ROLE_COMPLETE:
        update(action.id, {complete: true});
        RoleStore.emitChange();
        break;

        case RoleConstants.ROLE_UPDATE_TEXT:
        role = action.role;
        if (role !== '') {
            update(action.id, {'role': role});
            RoleStore.emitChange();
        }
        break;

        case RoleConstants.ROLE_DESTROY:
        destroy(action.id);
        RoleStore.emitChange();
        break;

        case RoleConstants.ROLE_DESTROY_COMPLETED:
        destroyCompleted();
        RoleStore.emitChange();
        break;

        default:
        // no op
    }
});

module.exports = RoleStore;
