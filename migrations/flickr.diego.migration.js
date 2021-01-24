const flickrClient = require('../src/clients/flickr.client');
const dir = __dirname + '/../resources/images/diego'
const PHOTOS_QUANTITY = 53;

for (let i=1; i <= PHOTOS_QUANTITY; i++) {
 flickrClient.uploadPhoto(dir + `/${i}.jpg`, 'diego');
}
