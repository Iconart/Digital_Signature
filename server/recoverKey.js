const secp = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes, toHex} = require("ethereum-cryptography/utils");

function recoverKey(signatureHash, amount) {
    const  msgHash = toHex(keccak256(utf8ToBytes(amount.toString())));

    const signature = secp.secp256k1.Signature.fromCompact(signatureHash).addRecoveryBit(0);

    const publicKey = signature.recoverPublicKey(msgHash).toHex();

    return keccak256(publicKey.slice(1)).slice(-20);

}

module.exports = {
    recoverKey
}