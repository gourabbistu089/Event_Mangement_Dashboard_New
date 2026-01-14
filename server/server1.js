// My(Nikhil) personal server...

const Express= require("express")
const cors = require("cors")
const { dbConnection } = require('./config/db.js')
const authRouter = require('./routes/auth.routes.js')

const app=Express();
const PORT=8080;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server running on http://localhost:${PORT}`);
});
