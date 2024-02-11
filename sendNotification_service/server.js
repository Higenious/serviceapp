// receiver.js
const { ServiceBusClient } = require("@azure/service-bus");
const sendMailNotifiation = require("./emailNotifiaction");

const connectionString =
  "Endpoint=sb://useraccount.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PO4PnCTHSphb34/kfapka08wgOWFV/Y3i+ASbCgB8e0=";
const topicName = "usertopic";
const subscriptionName = "UserTopicScubscription";

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
         await receiver.completeMessage(messageBody);
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
