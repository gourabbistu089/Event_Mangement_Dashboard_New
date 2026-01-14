const nodemailer =require("nodemailer")

exports.Email = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nikhil05052001@gmail.com",
      pass: "npoi speb mvsw hmhj",
    },
  });
  await transporter.sendMail({
    from: `"Admin" nikhil05052001@gmail.com`,
    to,
    subject,
    html,
  });
};
