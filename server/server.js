const express = require('express');
const cors = require('cors');  // Import CORS

const app = express();
app.use(cors()); // Enable CORS

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree", "userfour"] });
});

app.listen(5001, () => console.log("Server started on port 5001"));
