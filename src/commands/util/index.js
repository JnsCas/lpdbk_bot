const { randomNumberRange } = require('../../util/randomNumber');
const { getCollectionByName } = require('../../db');

const getRandomFileId = ({ fileIds, lastFileIdSent }) => {
  const pickFileId = (fileIds) => {
    const indexRandom = randomNumberRange(0, fileIds.length - 1);
    return fileIds[indexRandom];
  }

  let fileIdSelected = pickFileId(fileIds);
  if (fileIds.length > 1 && lastFileIdSent && lastFileIdSent === fileIdSelected) {
    while (fileIdSelected === lastFileIdSent) {
      fileIdSelected = pickFileId(fileIds);
    }
  }
  return fileIdSelected;
};

const getPhotosElement = async (chatId, category) => {
  const photoCollection = await getCollectionByName('photos');
  const photoRecord = await photoCollection.findOne({ chatId: chatId });
  const photosIndex = photoRecord.photos.findIndex((photo) => photo.category === category);
  if (photosIndex < 0) {
    return;
  }

  return {
    photosObject: photoRecord.photos[photosIndex],
    photosIndex
  };
};

module.exports = {
  getRandomFileId,
  getPhotosElement
};