import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";
import { Client } from "@sendgrid/client"

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const client = new Client();
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("No SendGrid API key variable in environment file.")
    }
    client.setApiKey(process.env.SENDGRID_API_KEY);

    const [subscribeRes, subscribeBody] = await client.request({
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
    
    const subscribeStatus = subscribeBody.job_id;
  } catch (error) {
      res.status(500).json(error);
  }

  res.status(200).json({ error: "" });
}

export default subscribe;