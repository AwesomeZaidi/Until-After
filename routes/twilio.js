const accountSid = "AC84bbe3b45291b3a4a58368eddfa9e6bb";
const authToken = "1fcca564e717fa2b4431ba0942fdb642";
const client = require('twilio')(accountSid, authToken);
// console.log("client:");
console.dir(client);

module.exports = (function() {
    
    function sendText() {
        console.log("called sendText()");
        // return true;
        client.messages
        .create({
           body: 'Hey are you still alive?',
           from: '+12244326350',
           to: `+16304077258`
         })
        .then(message => console.log(message.sid))
        .done();
    }

    return {
        sendText: sendText,
    }
})();