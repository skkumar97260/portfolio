const Contactme = require('../model/contactme');
const { transporter } = require('../middleware/commonResponseHandler');

exports.addContactme = async (req, res) => {
  try {
    const { name, email, mobileNumber, message,dateTime } = req.body;
    const newContactme = new Contactme({ name, email, mobileNumber, message ,dateTime});
    await newContactme.save();

    const mailOptions = {
      from: email,
      to: "skkumar97260@gmail.com",
      subject: "Portfolio Contact Request",
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Mobile Number: ${mobileNumber}</p>
        <p>Message: ${message}</p>
        <p>DateTime: ${dateTime}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error+++' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ result: info.response, message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error===' });
  }
};

exports.getContactme = async (req, res) => {
  try {
    const contactme = await Contactme.find();
    res.status(200).json({ result: contactme, message: 'Contactme fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteContactme = async (req, res) => {
  try {
    const contactme = await Contactme.findByIdAndDelete({ _id: req.query._id });
    res.status(200).json({ result: contactme, message: 'Contactme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}