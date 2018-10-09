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