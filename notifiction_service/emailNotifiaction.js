const nodemailer = require("nodemailer");

exports.sendMail = async (body) => {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e8f6655f27a1e0",
        pass: "cbbeba36227a9b",
      },
    });
    
    const emailid = body.email;

    let info = await transport.sendMail({
      from: "smtp.mailtrap.io",
      subject: "First maill",
      to: `${emailid}`,
      text: "User Created Successfully",
    });
    console.log("Email Notification sent Successfully!");
    return
  } catch (error) {
    console.log("Error while sending msg", error);
  }
};

//sendMail();
