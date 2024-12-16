require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5522;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
