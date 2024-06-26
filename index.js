const { checkDB, syncModels } = require("./db/index.js");
const { addRelationsToModels } = require("./db/relations.js");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./api/routes/index.js");

async function dbConnect() {
  try {
    await checkDB();
    addRelationsToModels();
    await syncModels();
  } catch (error) {
    console.log("error");
  }
}

const app = express();
const port = 3000;
app.use(cors( {origin: '*',
credentials: true}));
app.use(express.json());
app.use(morgan("dev"));


app.listen(port, async () => {
  try {
    await dbConnect();
    console.log(`Server is listening in port ${port}`);
  } catch (error) {
    console.log(error);
  }
});

app.use("/api", router);
