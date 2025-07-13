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
// app.use((err,req,res,next)=>{
//     console.error('Global Error:',err);

//     res.status(err.status || 500).json({
//         success:false,
//         message:err.message || 'Internal Server Error'
//     })
// })
app.listen(3000,()=>console.log("App is listening"))