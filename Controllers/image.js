const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cb4e5346d1524288a30f92aad8367d68'
});

const apiHandler = (req,res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
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