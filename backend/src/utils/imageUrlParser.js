const address = require('address');

function imageUrlParser() {
    const ip = address.ip();

    return `http://${ip}:3333/files`
}