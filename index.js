var PubNub = require('pubnub');
var pubnub;

var subscribedChannels = [];

/* Initializes PubNub with the user's keys */
exports.initialize = function (publishKey, subscribeKey, connectedCallback) {

    console.log("Init");
    pubnub = new PubNub({
        publishKey: publishKey,
        subscribeKey: subscribeKey
    });

    // Subscribe to at least one channel
    subscribe('default');

    pubnub.addListener({
        status: function (statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                connectedCallback();
            }
        },
        message: _handleMessage.bind(this)
    })

}

function subscribe(channel, callback) {
    var listener = { channel: channel, callback: callback };

    subscribedChannels.push(listener);

    pubnub.subscribe({
        channels: subscribedChannels.map((val) => { return val.channel; })
    });
}

function publish(message, channel, callback = null) {

    var publishConfig = {
        channel: channel,
        message: message
    }

    pubnub.publish(publishConfig, callback);
}


function _handleMessage(message) {
    var channel = message.channel;

    // Get listener for channel
    var listeners = subscribedChannels.filter((val) => { return val.channel == channel });

    listeners.forEach((listener) => {
        listener.callback(message);
    })
}


exports.subscribe = subscribe;
exports.publish = publish;


