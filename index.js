const express = require('express');
const app = express();
const port = process.env.NODE_ENV || 3000;


app.use(express.urlencoded({ extended: true}));
app.use(require('./routes/filter'));

app.listen(port, () => {
    console.log('server running on port', port);
});

module.exports = app;