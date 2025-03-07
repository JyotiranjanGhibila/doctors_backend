const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const connection = require("./config/db");
const { personRouter } = require("./routes/person.routes");

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",personRouter);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Person API",
  });
});

app.get('*',(req,res)=>{
  res.status(200).json({
    message:'bad request 😒'
  })
})

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to Database 🟢`);
  } catch (Err) {
    console.log(`Connection Failed 🔴: ${Err}`);
  }
  console.log(`server running on PORT ${process.env.PORT} 😜`);
});
