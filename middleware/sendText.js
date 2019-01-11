var client = require('twilio')('AC84bbe3b45291b3a4a58368eddfa9e6bb', '1fcca564e717fa2b4431ba0942fdb642');

module.exports = (req, res, next) => {
    function sendText() {
        // Use this convenient shorthand to send an SMS:
        client.sendSms({
          to:'+12244326350',
          from:'+16304077258',
          body:'ahoy hoy! Testing Twilio and node.js'
        }, function(error, message) {
          if (!error) {
              console.log('Success! The SID for this SMS message is:');
              console.log(message.sid);
              console.log('Message sent on:');
              console.log(message.dateCreated);
              next();
              return true;
          } else {
              console.log('Oops! There was an error.');
          }
        });
      }
}