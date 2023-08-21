import sendgrid from "@sendgrid/mail";
import { Client } from "@sendgrid/client"

const client = new Client();
client.setApiKey(process.env.SENDGRID_API_KEY);

async function subscribe(req, res) {

  try {
    const subscribeRes = await client.request({
      method: "PUT",
      url: "/v3/marketing/contacts",
      body: {
        contacts: [{ email: req.body.to }]
      }
    })

    const welcomeRes = await sendgrid.send({
      to: req.body.to, // Your email where you'll receive emails
      from: "exec@thelegacyproj.org", // your website email address here
      subject: "Hello from the Legacy Project, Inc.",
      html: "<h1> Welcome to the Legacy Project! </h1>You've been successfully subcribed to the Legacy Project. \
             To unsubscribe, reach out to <i>exec@thelegacyproj.org</i> directly, and we'll take you off our e-list."

    });
    
    const subscribeStatus = subscribeRes.body.job_id;
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default subscribe;