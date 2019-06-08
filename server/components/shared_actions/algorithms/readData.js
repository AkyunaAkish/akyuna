const decryptString = require("../auth/decryptString");

module.exports = (objectToread, fieldsToRead) => {
  let resultBody = {};
  if (objectToread && objectToread.length > 0) {
    objectToread.forEach(item => {
      if (fieldsToRead.includes(item.name)) {
        if (item.type === "commaSeparatedList") {
          if (item.value && item.value.split(",").length > 0) {
            resultBody[item.name] = item.value.split(",");
          }
        } else if (item.type === "stringEncrypted") {
          let decryptedvalue = decryptString(item.value, true);
          resultBody[item.name] = decryptedvalue;
        } else {
          resultBody[item.name] = item.value;
        }
      }
    });
    return resultBody;
  }
};
