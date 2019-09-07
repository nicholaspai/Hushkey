/*******************************************
* MIDDLEWARE TO DISPLAY MISSING PARAMETERS *
********************************************/
const reqIsMissingParams = (request, response, requiredFields, param = false) => {
    const missingFields = [];
  
    for (let i = 0; i < requiredFields.length; i++) {
      const localField = requiredFields[i];
      let input = !param ? request.body[localField] : request.query[localField];
  
      if (input === undefined || input === '') {
        missingFields.push(localField);
      }
    }
  
    if (missingFields.length > 0) {
      const jsonResponse = {
        message: 'The following required parameters are missing or malformed',
        details: missingFields
      };
      return response.status(400).send(jsonResponse);
    } else {
      return false;
    }
  };
  
  module.exports = reqIsMissingParams;