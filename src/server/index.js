const express = require("express");
const os = require("os");
const axios = require("axios");

const config = require("./config.json");

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.get("/api/getTableData", async (req, res) => {
  try {
    const request = {
      headers: { Authorization: config.authToken },
    };

    const data = await axios.get(
      config.endpoint + config.organizationId,
      request
    );
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "failure" });
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
