const axios = require('axios');
const path = require('path');
const fs = require('fs');

const verifyUrl = async url => {
  try {
    if (url.startsWith('http')) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch {
        return Promise.reject('invalid');
      }
    } else if (url.startsWith('/')) {
      const filePath = path.resolve(__dirname, url);
      if (fs.existsSync(filePath)) {
        return true;
      } else {
        return false;
      }
    } else {
      const httpUrl = `http://${url}`;
      const httpsUrl = `https://${url}`;
      const httpValid = await verifyUrl(httpUrl);
      const httpsValid = await verifyUrl(httpsUrl);
      return httpValid || httpsValid;
    }
  } catch (error) {
    return Promise.reject('error'); // retourne une promesse rejetée avec l'erreur
  }
}

module.exports = verifyUrl;