const express = require('express')
const app = express()
const port = 8000

const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const Razorpay = require('razorpay')
const crypto = require('crypto')

app.use(express.static("public"))
app.use(express.json())

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  date: String,
  adults: Number,
  children: Number,
  roomType: String,
  rooms: Number,
  rawAmount: Number,
  promo: String,
  amount: Number
});

var Book = mongoose.model('bookingDetail', bookingSchema);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/waterpark');
  console.log('mongo db connect zala ki re baba');
}

var instance = new Razorpay({
  key_id: 'rzp_test_xTmCshVEBq5XP8',
  key_secret: '1XbD83hSOxTJPrM08exxQQ1s',
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// send email
app.post('/', (req, res) => {
  console.log(req.body);

  const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kunaldhanawade7@gmail.com',
      pass: 'manishard7.'
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: 'kunaldhanawade7@gmail.com',
    subject: `Message from ${req.body.name}: ${req.body.subject}`,
    text: req.body.message
  }

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    }
    else {
      console.log('Email Sent: ' + info.response);
      res.send('success');
    }
  })
})

// send booking details to db
app.post('/bookingDetails', (req, res) => {


  let data = new Book({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    adults: req.body.n_adults,
    children: req.body.n_children,
    roomType: req.body.room_type,
    rooms: req.body.n_rooms,
    rawAmount: req.body.raw_amount,
    promo: req.body.promo,
    amount: req.body.amount
  })

  data.save().then(() => {
    console.log('data database madhe gela reee')
  }).catch(() => {
    console.log('data database madhe gela... kuch tog gadbad h kunaal')
  })
})


app.post('/create/orderId', (req, res) => {
  console.log('ata payment suru zala');

  var options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_1"
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log("Kuch toh gadbad h daya")
    }
    console.log(order);

    res.send({ orderId: order.id });

    console.log('payment suru kara... aata signature verification baaki ahe')
  });
})

app.post("/api/payment/verify", (req, res) => {
  console.log("signature verification suru zala aahe")

  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var expectedSignature = crypto.createHmac('sha256', '1XbD83hSOxTJPrM08exxQQ1s')
    .update(body.toString())
    .digest('hex');
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { "signatureIsValid": "false" }
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { "signatureIsValid": "true" }

  console.log("signature verification zala");
  console.log("ata baghuya data yetoy kaa");

  Book.find().then((result) => {
    console.log('shevti data database madhun aala ra baba')
    let ourdata = result.pop();
    console.log(ourdata);

    const transpoter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kunaldhanawade7@gmail.com',
        pass: 'manishard7.'
      }
    })
    const mailOptions = {
      from: 'kunaldhanawade7@gmail.com',
      to: ourdata.email,
      subject: `AquaLand Booking Details of ${ourdata.firstName} ${ourdata.lastName}`,
      text: `Your Booking Details are: \nBooking No. : ${ourdata._id} \nTotal Amount : ${ourdata.amount} \nDate : ${ourdata.date} \nOrder ID : ${req.body.response.razorpay_order_id} \nPayment ID : ${req.body.response.razorpay_payment_id} \n\nThankyou for reserving a day from your precious time in AquaLand. We will wait for you.`
    }
    transpoter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email Nhi gela... kuch toh gadbad h kunaal');
      }
      else {
        console.log('Email gele re baba: ' + info.response);
      }
    })

  }).catch(() => {
    console.log('database madhun data azun nhi aala...kuch toh gadbad h kunaal')
  })

});

// send cancel booking details to db
app.post('/cancelDetails', (req, res) => {
  const cancelSchema = new mongoose.Schema({
    radioOption: String,
    payorderId: String,
    bookingId: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    date: String
  });

  const Cancel = mongoose.model('cancelDetail', cancelSchema);

  let canceldata = new Cancel({
    radioOption: req.body.radioOption,
    payorderId: req.body.poid,
    bookingId: req.body.bid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date
  })

  canceldata.save().then(() => {
    console.log('database madhe data save zala ki ra baba')
  }).catch(() => {
    console.log('ata ra deva, data database madhe nhi save zala re')
  })

  Book.deleteOne({ _id: req.body.bid }).then(() => {
    console.log('database madhla data delete zala re')
  }).catch(() => {
    console.log('database madhla data delete nhi zala, bagha ata kaay karaycha te')
  })

  const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kunaldhanawade7@gmail.com',
      pass: 'manishard7.'
    }
  })
  const mailOptions = {
    from: 'kunaldhanawade7@gmail.com',
    to: req.body.email,
    subject: `AquaLand Booking Cancellation Details of ${req.body.firstName} ${req.body.lastName}`,
    text: `Your Booking Details for: \n\nBooking No. : ${req.body.bid} \nPayment/Order ID : ${req.body.poid} \nDate : ${req.body.date} \n\nhas been cancelled.\n\nYour amount will be refunded in 3 to 4 working days. Thankyou.`
  }
  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email Nhi gela... kuch toh gadbad h kunaal');
    }
    else {
      console.log('Email gele re baba: ' + info.response);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
