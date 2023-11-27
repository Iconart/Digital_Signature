import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp  from "ethereum-cryptography/secp256k1";

const HashMessage = (message) => {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

const SignMessage = async (msg, privateKey) => {
    const hashed_message = HashMessage(msg);
    const signed_message = await secp.secp256k1.sign(hashed_message, privateKey, {recovered: true});
    return signed_message
}

export default SignMessage;