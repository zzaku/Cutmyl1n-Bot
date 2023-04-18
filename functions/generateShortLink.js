const crypto = require('crypto');

module.exports = () =>  {
    const bytes = crypto.randomBytes(3); // 3 bytes = 24 bits = 2^24 possibilités
    const shortUrl = bytes.toString('hex');
    return shortUrl;
}