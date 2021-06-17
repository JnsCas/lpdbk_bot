const { randomNumberRange } = require('../../util/randomNumber');

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

module.exports = {
  getRandomFileId,
};