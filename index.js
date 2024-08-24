import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/routes.js';

var allowlist = ['http://localhost:3000'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // Enable the request
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions);
}

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log('Connected to CORS-express at port ${port}');
});