const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hash");



app.use(cors());
app.use(express.json());

const balances = {
  "6a7116c0d6d1543d3c8b3b10184bee01efef58e3": 100, //privatekey:ad69224fd2fd591017a4d2a3aaee7046c7dee5574574190140f5ddffd3ec8140
  "67f448c50a3a3f2a660ba8f501b64be2e624dbfd": 50, //privateKey:a5ce669cda0372f1eb9ff67e0bb22c28a1f5ffdf5ffd8d74727a3007eb0b49ee
  "e3e69c71c1fc45e758418d3c288cd548df4bee22": 75, //privateKey:b57eae8b8b1523fbf535e6010ac75a4d5c68d5a3f61abfc3ac4ef4d6d7382178
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount,signedMessage, message, privateKey } = req.body;
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  const publicKey = secp.secp256k1.getPublicKey(privateKey);
  const sendAddress = toHex(keccak256(publicKey.slice(1)).slice(-20));

  const valid = secp.secp256k1.verify(signedMessage, hashMessage(message), senderAddress)
  if (valid) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else {
    res.send("This operation is not allowed from your privateKey");
  }

  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
