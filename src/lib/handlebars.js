
const newfecha = require('date-fns');

const helpers = {};

helpers.formatDate = (newdate) => {
    const formato =  newfecha.format(newdate,'yyyy-MM-dd')
    return formato;
};

module.exports = helpers;