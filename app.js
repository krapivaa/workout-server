require('dotenv').config();
let express = require('express');
let app = express();

let sequelize = require('./db');
let log = require('./controllers/logcontroller')
let user = require('./controllers/usercontroller');

// app.use('/test', function(req, res) {
//     res.send('This is a message from the test endpoint on the server')
// })
sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));


app.use('/api', user);
app.use('/api/log', log);



app.listen(3001, function() {
    console.log('App is listening on port 3001');
}); 
