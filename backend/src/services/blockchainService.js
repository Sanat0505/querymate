const Web3 = require("web3");
const web3 = new Web3("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const contractAddress = "0xYourContractAddress";
const abi = [
  /* ABI array from Remix or Truffle */
];

const contract = new web3.eth.Contract(abi, contractAddress);

const storeQueryOnBlockchain = async (queryHash, status) => {
  const accounts = await web3.eth.getAccounts();
  const tx = contract.methods.storeQuery(queryHash, status);
  const gas = await tx.estimateGas({ from: accounts[0] });

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: tx.encodeABI(),
      gas: gas,
    },
    "YOUR_PRIVATE_KEY"
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

module.exports = { storeQueryOnBlockchain };
