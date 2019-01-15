const accountSid = "AC6905d00d25382a4e34fbc5811193fa01";
const authToken = "90da94aa63cf38eb30a4712b79dfe16e";
const client = require('twilio')(accountSid, authToken);
// console.log("client:");
// console.dir(client);

module.exports = (function() {
    
    function sendText(userNumber, name, requesterName) {
        console.log("called sendText()");
        console.log("in function, num:", userNumber);
        
        // return true;
        client.messages
        .create({
           body: `Hey ${name} are you still alive? ${requesterName} requested to open your Until After account!`,
           from: '+18474691663',
           to: `+${userNumber}`
         })
        .then(message => console.log(message.sid))
        .done();
    }

    return {
        sendText: sendText,
    }
})();