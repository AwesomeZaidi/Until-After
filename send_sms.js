const accountSid = "AC62c52c31262c48785d5208faff33c7f2";
const authToken = "e87dbfff32a60eaddb04952cee527ef1";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16304077258',
     to: '+16304077258'
   })
  .then(message => console.log(message.sid))
  .done();