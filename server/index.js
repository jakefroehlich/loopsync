const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/main.js"), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  });

  startServer();