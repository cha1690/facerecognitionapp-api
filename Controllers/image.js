const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cb4e5346d1524288a30f92aad8367d68'
});

const apiHandler = (req,res) => {
  const { input } = req.body;
  // var regex = /(https?:\/\/(?:www\.|
  // (?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|
  // www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|
  // https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|
  // www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  // if (!regex.test(input)){
  //   return res.status(400).json('Incorrect URL submission')
  // }
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const imageHandler = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Error getting entries'))
}

module.exports = {
	imageHandler, apiHandler
};