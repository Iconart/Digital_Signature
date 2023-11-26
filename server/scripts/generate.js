const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak")
//get the private Key
//get the public key for the private key
//convert the public to an ethereum wallet address
const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("private Key: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
console.log("public Key: ", address);