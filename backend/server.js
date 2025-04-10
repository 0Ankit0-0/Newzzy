const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const cors = require("cors");
app.use(cors());


dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
