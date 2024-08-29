import express from "express";

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  console.log("Auth service being called");
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
