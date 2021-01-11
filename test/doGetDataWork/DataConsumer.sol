pragma solidity 0.4.24;

//ethereum 
//import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.4/ChainlinkClient.sol";
//ela
import "https://github.com/elastos/Elastos.ELA.SideChain.ETH.Chainlink/evm-contracts/src/v0.4/ChainlinkClient.sol";
import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.4/vendor/Ownable.sol";

contract DataConsumer is ChainlinkClient, Ownable {

  uint256 constant private ORACLE_PAYMENT = 1 * 10**15;

  constructor() public Ownable() {
    setPublicChainlinkToken();
  }

  //----BTC
  /// RequestBtcBalance
  uint256 public btcBalance;
  event RequestBtcBalanceFulfilled(
    bytes32 indexed requestId,
    uint256 indexed btcBalance
  );

  function RequestBtcBalance(address _oracle, string _jobId,string _address)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillBtcBalance.selector);
    req.add("get", strConcat("http://47.52.148.190:8090/balance/btc/?address=" ,_address));
    req.add("path", "data");
    req.addInt("times",1);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function fulfillBtcBalance(bytes32 _requestId, uint256 _btcBalance)
    public
    recordChainlinkFulfillment(_requestId)
  {
   
    emit RequestBtcBalanceFulfilled(_requestId, _btcBalance);
    btcBalance = _btcBalance;
  }

  /// RequestBtcTimespan
  uint256 public btcTimpspan;
  event RequestBtcTimespanFulfilled(
    bytes32 indexed requestId,
    uint256 indexed btcTimespan
  );

  function RequestBtcTimespan(address _oracle, string _jobId,string _address)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillBtcTimespan.selector);
    req.add("get", strConcat("http://47.52.148.190:8090/rawaddr/btc?address=" ,_address));
    req.add("path", "data");
    req.addInt("times",1);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function fulfillBtcTimespan(bytes32 _requestId, uint256 _btcTimeSpan)
    public
    recordChainlinkFulfillment(_requestId)
  {
   
    emit RequestBtcTimespanFulfilled(_requestId, _btcTimeSpan);
    btcTimpspan = _btcTimeSpan;
  }


  //----ETH
  /// RequestETHBalance
  uint256 public ethBalance;
  event RequestEthBalanceFulfilled(
    bytes32 indexed requestId,
    uint256 indexed ethBalance
  );

  function RequestEthBalance(address _oracle, string _jobId,string _address)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthBalance.selector);
    req.add("get", strConcat("http://47.52.148.190:8090/balance/eth/?address=" ,_address));
    req.add("path", "data");
    req.addInt("times",1);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function fulfillEthBalance(bytes32 _requestId, uint256 _ethBalance)
    public
    recordChainlinkFulfillment(_requestId)
  {
   
    emit RequestEthBalanceFulfilled(_requestId, _ethBalance);
    ethBalance = _ethBalance;
  }

  /// RequestEthTimespan
  uint256 public ethTimpspan;
  event RequestEthTimespanFulfilled(
    bytes32 indexed requestId,
    uint256 indexed ethTimespan
  );

  function RequestEthTimespan(address _oracle, string _jobId,string _address)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthTimespan.selector);
    req.add("get", strConcat("http://47.52.148.190:8090/rawaddr/eth?address=" ,_address));
    req.add("path", "data");
    req.addInt("times",1);
    sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
  }

  function fulfillEthTimespan(bytes32 _requestId, uint256 _ethTimpspan)
    public
    recordChainlinkFulfillment(_requestId)
  {
   
    emit RequestEthTimespanFulfilled(_requestId, _ethTimpspan);
    ethTimpspan = _ethTimpspan;
  }

  ///
  function strConcat(string a, string b) internal pure returns (string) {
      return string(abi.encodePacked(a, b));
  }
  
  
  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  function cancelRequest(
    bytes32 _requestId,
    uint256 _payment,
    bytes4 _callbackFunctionId,
    uint256 _expiration
  )
    public
    onlyOwner
  {
    cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
  }

  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }

}