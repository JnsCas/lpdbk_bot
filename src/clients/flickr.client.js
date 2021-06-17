const Flickr = require('flickr-sdk');
const { randomNumber } = require('../util/randomNumber');
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;
const FLICKR_ENDPOINT = 'https://www.flickr.com/photos'

const auth = Flickr.OAuth.createPlugin(
  process.env.FLICKR_CONSUMER_KEY,
  process.env.FLICKR_CONSUMER_SECRET,
  process.env.FLICKR_OAUTH_TOKEN,
  process.env.FLICKR_OAUTH_TOKEN_SECRET
);

const flickr = new Flickr(auth);

module.exports = {
  uploadPhoto: (file, tag) => {
    const upload = new Flickr.Upload(auth, file, { tags: tag });
    upload.then(function (res) {
      console.log(`File ${file} added to Flickr.`);
    }).catch(function (err) {
      console.error(`Error adding file ${file} to Flickr: `, err);
    });
  },
  getPhotoRandomByTag: async (tag) => {
    const { body } = await flickr.photos.search({
      user_id: 'me',
      tags: tag
    });

    if (body.stat !== 'ok') {
      console.error(`Error getting photo by tag: ${tag}`);
      return;
    }

    const indexRandom = randomNumber(body.photos.total) - 1;
    const idPhotoRandom = body.photos.photo[indexRandom].id;
    return FLICKR_ENDPOINT + '/' + FLICKR_USER_ID + '/' + idPhotoRandom;
  }
};