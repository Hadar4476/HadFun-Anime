const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://hadrame:hadar123456@animeprojectcluster.tqpf0.mongodb.net/users?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Connected to mongodb database: anime, successfully.');
  })
  .catch((error) => console.log(error));

app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3007;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});

//https://hadfun-anime.herokuapp.com/api
//http://localhost:3007/api

//heroku git:remote -a hadfun-anime
//git remote add origin https://github.com/Hadar4476/Hadfun-Anime.git
//git branch -M main
//git push -u origin main
