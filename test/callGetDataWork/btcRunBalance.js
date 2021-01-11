const RunJSON = require('./contracts/DataConsumer.json');
const Web3 = require('web3');
const web3Obj = new Web3('http://13.115.138.227:20636');

const ContractAddress = "0xe97f3512521314513eEc91F9BA788B50889e6063";
const Run = new web3Obj.eth.Contract(RunJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 8000000,
});

async function main() {


    const privateKey = "c03b0a988e2e18794f2f0e881d7ffcd340d583f63c1be078426ae09ddbdec9f5";
    const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);
    const transaction = Run.methods.RequestBtcBalance(
        "0x23549f7354fc9Fe4A21E42926053a16B0AE48e26",
        "e43d18c8cb414096b3aa5d7a1c9ceaea",
        "1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj"
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
  