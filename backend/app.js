const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
const regionRoutes = require('./routes/region');
const trainerRoutes = require('./routes/trainer');
const pokemonRoutes = require('./routes/pokemon');
app.use("/api/region",regionRoutes);
app.use("/api/trainer",trainerRoutes);
app.use("/api/pokemon",pokemonRoutes);
app.listen(3000,()=>console.log("App is listening"))