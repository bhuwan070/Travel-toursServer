const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//start the server
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
