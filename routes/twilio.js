const accountSid = "AC6905d00d25382a4e34fbc5811193fa01";
const authToken = "90da94aa63cf38eb30a4712b79dfe16e";
const client = require('twilio')(accountSid, authToken);
// console.log("client:");
// console.dir(client);

module.exports = (function() {
    
    function sendText() {
        console.log("called sendText()");
        console.log("in function, num:", userNumber);
        
        // return true;
        client.messages
        .create({
           body: `Hey are you still alive? requested to open your Until After account!`,
           from: '+18474691663',
           to: '6304077258'
         })
        .then(message => console.log(message.sid))
        .done();
    }

    return {
        sendText: sendText,
    }
})();