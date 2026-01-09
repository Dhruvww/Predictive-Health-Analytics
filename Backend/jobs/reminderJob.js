const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { connectdb } = require("../dbs/connectdb");
const { ObjectId } = require("mongodb");

async function sendReminders() {
  let db = await connectdb();
  let appointmentCollection = db.collection("appointment");
  let userCollection = db.collection("user"); // assuming your user collection is named "users"

  const now = new Date();
  const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Get upcoming appointments in the next 24 hours
  const upcoming = await appointmentCollection.find({
    date: { $gte: now.toISOString().split("T")[0], $lte: next24Hours.toISOString().split("T")[0] }
  }).toArray();

  if (!upcoming.length) {
    console.log("No upcoming appointments in next 24 hours.");
    return;
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send reminder for each appointment
  for (let app of upcoming) {
    // find user email by PatientId
    const user = await userCollection.findOne({ _id: new ObjectId(app.PatientId) });

    if (!user || !user.email) {
      console.warn("No email found for patient:", app.PatientId);
      continue;
    }

    transporter.sendMail(
  {
    to: user.email,
    subject: "📅 Appointment Reminder - Health AI ",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f6f9; color: #333;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          
          <h2 style="color: #007bff; text-align: center;">Appointment Reminder</h2>
          <p>Dear <strong>${user.name}</strong>,</p>

          <p>This is a friendly reminder for your upcoming appointment:</p>

          <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Doctor</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${app.doctor}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${app.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${app.time}</td>
            </tr>
          </table>

          <p style="margin-top: 20px;">📌 Please make sure to arrive 10 minutes early.</p>

         

          <p style="margin-top: 30px; font-size: 12px; color: #777;">
            Thank you,<br/>Health Project Team
          </p>
        </div>
      </div>
    `
  },
  (err, info) => {
    if (err) {
      console.error("Email sending error:", err.message);
    } else {
      console.log("Reminder sent to:", user.email, "| Info:", info.response);
    }
  }
);

  }
}

// Run every hour
cron.schedule("* * * * *", () => {
  console.log("Running hourly reminder job...");
  sendReminders();
});
