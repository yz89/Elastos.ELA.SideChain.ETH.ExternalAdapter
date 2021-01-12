const RunJSON = require('./contracts/DataConsumer.json');
const Web3 = require('web3');
const web3Obj = new Web3('http://13.115.138.227:20636');

//
const ContractAddress = "0xFA0217F522217a6E279a792C5F685A52042d6243";
const privateKey = "c03b0a988e2e18794f2f0e881d7ffcd340d583f63c1be078426ae09ddbdec9f5";
const oracle = "0x71fBbce34F14c2aC9ae3e9a436046DB75bFa5507";
const jobID = "a619fa28bcff42bdba7b8fd10724e98f";
const testBtcAddress = "1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj";
const testEthAddress = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";

const Run = new web3Obj.eth.Contract(RunJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 8000000,
});

async function main() {

  const arguments = process.argv.splice(2);
  var transaction;
  if(arguments.length == 0){
    transaction = getCallMethod(0);
  }else{
    nType = parseInt(arguments[0]);
    transaction = getCallMethod(nType);
  }
  const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);

  const options = {
      to      : transaction._parent._address,
      data    : transaction.encodeABI(),
      gas     : await transaction.estimateGas({from: account.address}),
      gasPrice: await web3Obj.eth.getGasPrice() // or use some predefined value
  };


  const signed  = await web3Obj.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3Obj.eth.sendSignedTransaction(signed.rawTransaction);
  //console.log(receipt);

};


function getCallMethod(nType){

  var transaction;

  //RequestBtcScore 0
  if(nType == 0){ 
    transaction = Run.methods.RequestBtcScore(
      oracle,
      jobID,
      testBtcAddress
    );
  //RequestBtcBalance 1  
  }else if(nType == 1){
    transaction = Run.methods.RequestBtcBalance(
      oracle,
      jobID,
      testBtcAddress
    );
  //RequestBtcTimespan 2    
  }else if(nType == 2){
    transaction = Run.methods.RequestBtcTimespan(
      oracle,
      jobID,
      testBtcAddress
    );
  //RequestEthScore 3    
  }else if(nType == 3){
    //TODO
  //RequestEthBalance 4   
  }else if(nType == 4){
    transaction = Run.methods.RequestEthBalance(
      oracle,
      jobID,
      testEthAddress
    );
  //RequestEthTimespan 5   
  }else if(nType == 5){
    transaction = Run.methods.RequestEthTimespan(
      oracle,
      jobID,
      testEthAddress
    );
  }

  return transaction;

}
  
main().then(() => {
  console.log("regest OK");
}).catch((e) => {
  console.log("error", e);
});