const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
const regionRoutes = require('./routes/region');
const trainerRoutes = require('./routes/trainer')
app.use("/api/region",regionRoutes);
app.use("/api/trainer",trainerRoutes)

app.listen(3000,()=>console.log("App is listening"))