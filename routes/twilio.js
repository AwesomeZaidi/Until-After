const accountSid = process.env.TESTTWILIOSID;
const authToken = process.env.TESTTWILIOAUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
// console.log("client:");
// console.dir(client);

module.exports = (function() {
    
    function sendText() {
        console.log("called sendText()");
        // console.log("in function, num:", userNumber);
        
        // return true;
        client.messages
        .create({
           body: `Hey are you still alive? requested to open your Until After account!`,
           from: '+18474691663',
           to: '+16304077258'
         })
        .then(message => console.log(message.sid))
        .done();
    }

    return {
        sendText: sendText,
    }
})();