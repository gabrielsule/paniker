const fs = require('fs');

const Ajv = require("ajv/dist/jtd");
const ajv = new Ajv();

const isJsonValid = (schema, body) => {
  const validate = ajv.compile(schema);

  const valid = validate(body);

  const res = {};

  if (valid) {
    res.validSchema = true;
    res.message = "";
  } else {
    res.validSchema = false;
    res.message = validate.errors[0].message;
  }

  return res;
};

const isFolderExist = (folder) => {
  const dir = `media/${folder}`;

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};

module.exports = {
  isJsonValid: isJsonValid,
  isFolderExist: isFolderExist,
}