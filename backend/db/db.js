const  mongoose= require('mongoose');

function connectToDb() {
  const dbUrl = process.env.DB_URL;
  
  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
}

module.exports=connectToDb;