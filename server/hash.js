const {utf8ToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");

const hashMessage = (msg) => {
    const bytes = utf8ToBytes(msg);
    const hashedMessage = keccak256(byte);
    return hashedMessage;
}

module.exports = hashMessage;