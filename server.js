const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('./dist/'));
app.use('/login', express.static('./dist/'));
app.use('/sign-up', express.static('./dist/'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});