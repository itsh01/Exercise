/**
 * Created by itaysh on 7/22/15.
 */

define(['lodash'], function (_) {
    'use strict';

    var counter = 1,
        events = {};

    /**
     * Add an event to PubSub
     *
     * @param {String} name - the event name
     * @param {Function} cb - callback to execute when event is fired
     * @returns {number} - subscription id
     */
    function subscribe(name, cb){
        events[name] = events[name] || {};

        counter += 1;
        events[name][counter] = cb;

        return counter;
    }

    /**
     * Launch an event
     *
     * @param {String} name - the event name
     * @param {Object} data - data for callback execution
     */
    function publish(name, data){
        var event = events[name];

        if (!event){
            return;
        }

        _.forIn(event, function (callback){
            callback.apply(this, data);
        });
    }

    /**
     * Remove an event from PubSub
     *
     * @param {String} name - the event name
     * @param {number} id - subscription id
     */
    function unSubscribe(name, id){
        if (events[name]){
            delete events[name][id];
        }
    }

    return {
        subscribe: subscribe,
        publish: publish,
        unSubscribe: unSubscribe
    };

});