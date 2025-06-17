const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const regionRoutes = require('./routes/region');

app.use("/api/region",regionRoutes);


app.listen(3000,()=>console.log("App is listening"))