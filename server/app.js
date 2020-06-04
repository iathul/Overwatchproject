const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cors         = require('cors');
const authRoute    = require('./routes/auth');
const userRoute    = require('./routes/user')
const lookoutRoute = require('./routes/lookout');
const dotenv       = require('dotenv');

const app          = express();
dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Database Connection 
mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("connected to Database");
        }
    });

// Routes
app.use('/api', authRoute);
app.use('/api', userRoute)
app.use('/api', lookoutRoute);
app.use('/api/images', express.static('upload/images')); 
app.use('/api/profile',express.static('upload/images/profile'));

app.get('/',(req,res)=>{
    res.send("Hello from overwatch server");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server running at PORT ${PORT}`);
})