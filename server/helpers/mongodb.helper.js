const mongoose = require('mongoose');

const url = 'mongodb+srv://hackathon-test:db-password@cluster0.cjlh2a2.mongodb.net/hackathon-test-db?retryWrites=true&w=majority'

mongoose.connect(url)
    .then(() => {
        console.log('mongodb connected...')
    })
    .catch((err) => {
        console.log('ERROR: ' + err.message)
    });


mongoose.connection.on('connected', () => {
    console.log('mongodb successfully connected...')
});

// handling errors after initial connection
mongoose.connection.on('error', (err) => {
    console.log('ERROR!! mongodb after initial connection error!')
});

mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected...')
});

process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit(0)
});