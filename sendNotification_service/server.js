// receiver.js
const { ServiceBusClient } = require("@azure/service-bus");
const sendMailNotifiation = require("./emailNotifiaction");


const connectionString = process.env.CONNECTION_STRING
const topicName = process.env.TOPICNAME;
const subscriptionName = process.env.SUBSCRIPTION_NAME;

async function receiveMessages() {
  const serviceBusClient = new ServiceBusClient(connectionString);

  const entityPath = `${topicName}/Subscriptions/${subscriptionName}`;
  const receiver = serviceBusClient.createReceiver(entityPath);

  try {
    const messages = await receiver.receiveMessages(10);
    for (const message of messages) {
      const messageBody =  message?.body;
      console.log("Received message in email Notifiation svc:", messageBody);
      if (message.body) {
         await sendMailNotifiation.sendMail(messageBody);
         await receiver.completeMessage(message);
      }
    }
  } catch (error) {
    console.error("Error receiving messages:", error.message);
  } finally {
    await receiver.close();
    await serviceBusClient.close();
  }
}

receiveMessages();
