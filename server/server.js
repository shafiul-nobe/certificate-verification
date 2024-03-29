require('dotenv').config();
require('./helpers/mongodb.helper');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
});