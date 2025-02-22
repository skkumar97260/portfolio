const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((error) => {
  console.error("MongoDB Connection Failed:", error);
});

app.use(express.json());


app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
