const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const publishMessage = require("./publisher");
const port = 5000;
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json())

app.post("/user", async (req, res) => {
  if (req.body.name && req.body.email) {
    const uniqueId = uuidv4();
    console.log('uniqueId-',uniqueId);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      id: uniqueId,
    };
    console.log('object', userData);
    res.status(200).send({ message: `${userData.user}'s account created Successfully! `});
    /** Publish msg for notification service */
    await publishMessage.sendMessage(userData);
  } else {
    res.status(400).send({ message: `invalid request` });
  }
});

/** Start app */
app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
