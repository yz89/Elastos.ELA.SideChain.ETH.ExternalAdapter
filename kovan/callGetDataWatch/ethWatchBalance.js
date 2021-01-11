const RunJSON = require('./contracts/DataSubscriber.json');
const Web3 = require('web3');
const web3Obj = new Web3('https://kovan.infura.io/v3/7e31d49d7c8a48f4a4539aff9da768e7');

const ContractAddress = "0x6aE7b707896291B5E1e2909d17ED4d5938ad0127";
const Run = new web3Obj.eth.Contract(RunJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 8000000,
});

async function main() {


    const privateKey = "c03b0a988e2e18794f2f0e881d7ffcd340d583f63c1be078426ae09ddbdec9f5";
    const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);
    const transaction = Run.methods.RequestEthBalance(
      "0x90688d075506b69EB5fDbF7f01CfDb27130c85B2",
      "6372a99d778147a09f039e56d30f61ba"
    );

    const options = {
        to      : transaction._parent._address,
        data    : transaction.encodeABI(),
        gas     : await transaction.estimateGas({from: account.address}),
        gasPrice: await web3Obj.eth.getGasPrice() // or use some predefined value
    };
    const signed  = await web3Obj.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3Obj.eth.sendSignedTransaction(signed.rawTransaction)
    //console.log(receipt["logs"]);

  
  };


  
main().then(() => {
  
}).catch((e) => {
    console.log("error", e);


});
  