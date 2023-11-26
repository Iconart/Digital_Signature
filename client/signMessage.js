import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex} from "ethereum-cryptography/utils";

async function signMessage(amount, privKey) {
    const msgHash = toHex(keccak256(utf8ToBytes(amount)));
    const signature = secp.secp256k1.sign(msgHash, privKey, {recovered: true});

    return await signature;
}

export default signMessage;