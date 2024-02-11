// sender.js
const { ServiceBusClient } = require("@azure/service-bus");

const connectionString =
  "Endpoint=sb://useraccount.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PO4PnCTHSphb34/kfapka08wgOWFV/Y3i+ASbCgB8e0="; // Replace with your Azure Service Bus connection string
const topicName = "usertopic";

exports.sendMessage = async (body) => {
  console.log(body);
  const serviceBusClient = new ServiceBusClient(connectionString);
  const sender = serviceBusClient.createSender(topicName);

  try {
    const message = {
      body: body,
      label: "greeting",
    };

    let res = await sender.sendMessages(message);
    console.log("Message sent successfully", res);
    return;
  } catch (error) {
    console.error("Error sending message:", error.message);
  } finally {
    await sender.close();
    await serviceBusClient.close();
  }
};

//sendMessage();
