var express = require('express');
const axios = require('axios');
const { create, all } = require('mathjs');
const e = require('express');
var app = express();
const token = "xx";

app.use(express.json());
const port = 3000;

function sendFacebookMessage(token, recipientId, msg) {
  const url = 'https://graph.facebook.com/v21.0/xx/messages';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientId,
    type: 'text',
    text: {
    body: msg
  }
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    });
}

function sendFacebookAudio(token, recipientId, audioID) {
  const url = 'https://graph.facebook.com/v21.0/xx/messages';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientId,
    type: 'audio',
    audio: {
    id: audioID
  }
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    });
}


const math = create(all);

function evaluateEquation(equation) {
  try {
    return math.evaluate(equation);
  } catch (error) {
    console.error('Error evaluating equation:', error.message);
    return null;
  }
}
app.post('/*', function (req, res) {
  // check if the request is a message
  if (!req.body.entry[0].changes[0].value.messages) {
    res.status(200).json({ message: "Thank you for the message" });
    return;
  }
  // console.log("-------------- New Request POST --------------");
  console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
  console.log("Body:"+ JSON.stringify(req.body, null, 3));
  
  const recipientId = req.body.entry[0].changes[0].value.messages[0].from;

  if (req.body.entry[0].changes[0].value.messages[0].type === 'audio') {
    sendFacebookAudio(token, recipientId, '1634576394157569');
  }
  else {
  const msg = evaluateEquation(req.body.entry[0].changes[0].value.messages[0].text.body);
  if (msg === null) {
    sendFacebookMessage(token, recipientId, "Please write an equation.");
  }else{
    sendFacebookMessage(token, recipientId, msg);
  }
}
  res.status(200).json({ message: "Thank you for the message" });
})

// Add support for GET requests to Facebook webhook
app.get("/*", (req, res) => {
  // Parse the query params
  var mode = req.query["hub.mode"];
  var token = req.query["hub.verify_token"];
  var challenge = req.query["hub.challenge"];

  console.log("-------------- New Request GET --------------");
  console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
  console.log("Body:"+ JSON.stringify(req.body, null, 3));

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "12345") {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      console.log("Responding with 403 Forbidden");
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    console.log("Replying Thank you.");
    res.json({ message: "Thank you for the message" });
  }
});

app.listen(port, function () {
   console.log(`Example Facebook app listening at ${port}`)
})