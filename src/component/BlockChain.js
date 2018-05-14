import nebulas from "nebulas";

var dappAddress = "n1zJy81vGfBiEUtm2eNLCL4TrArci2nTKEZ";
var Account = nebulas.Account;
var neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));

var NebPay = require("nebpay");
var nebPay = new NebPay();
var serialNumber;
var intervalQuery;

export function sendToBlockChain(msg, callback) {
  var to = dappAddress;
  var value = "0";
  var callFunction = "save";
  var callArgs = msg;
  //使用nebpay的call接口去调用合约
  serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    listener: callback //设置listener, 处理交易返回信息
  });

  intervalQuery = setInterval(function() {
    funcIntervalQuery();
  }, 5000);
}

export function getStoreItems(callback) {
  var from = Account.NewAccount().getAddressString();
  var value = "0";
  var nonce = "0";
  var gas_price = "1000000";
  var gas_limit = "2000000";
  var callFunction = "getAll";
  var callArgs = "[]"; //in the form of ["args"]
  var contract = {
    function: callFunction,
    args: callArgs
  };

  neb.api
    .call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
    .then(function(resp){
        callback(resp)
    })
    .catch(function(err) {
      console.log("error:" + err.message);
    });
}

export function vote(dapp_url, callback) {
  var to = dappAddress;
  var value = "0";
  var callFunction = "vote";
  var callArgs = '["' + dapp_url + '"]';

  //使用nebpay的call接口去调用合约
  serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    listener: callback //设置listener, 处理交易返回信息
  });

  intervalQuery = setInterval(function() {
    funcIntervalQuery();
  }, 5000);
}

export function dislike(dapp_url, callback) {
  var to = dappAddress;
  var value = "0";
  var callFunction = "dislike";
  var callArgs = '["' + dapp_url + '"]';

  //使用nebpay的call接口去调用合约
  serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    listener: callback //设置listener, 处理交易返回信息
  });

  intervalQuery = setInterval(function() {
    funcIntervalQuery();
  }, 5000);
}

function funcIntervalQuery() {
  nebPay
    .queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
    .then(function(resp) {
      console.log("tx result: " + resp); //resp is a JSON string
      var respObject = JSON.parse(resp);
      if (respObject.code === 0) {
        clearInterval(intervalQuery);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function cbPush(resp) {
  console.log("response of push: " + JSON.stringify(resp));
}

function items(resp) {
  console.log("response of push: " + JSON.stringify(resp));
}
