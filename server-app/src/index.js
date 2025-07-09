const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Community Clinic!');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});