# A simple connector for PubNub
A node library to simplify the connection to PubNub and send / receive messages.

# Usage

You'll need your publish and subscribe keys from your account. With that, initialize PubNub and sent messages as follows:

```js
var pn = require('./index.js');

pn.initialize('<pub-key>', '<sub-key>', pnConnected);

function pnConnected() {
    console.log("Connected");

    pn.publish({ value: 1024 }, "sensors", messageSent);
}

function messageSent(response) {
    if (!response.error)
        console.log("Message succesfully sent");
}
```