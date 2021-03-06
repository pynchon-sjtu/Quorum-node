/*
A Java script template to write data into an existing contract by the Customer
It is called in the "run.sh":
geth --exec "loadScript(\"write_exist_contract.js\") ..."
which utilizes geth command to attach the node IPC and execute the script
*/

var mess = "<Audit_Data>";
var contract_id = "<Storage_Address>";
// Public key of Audit Team for encryption
var pubkey = "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=";

web3.eth.defaultAccount = eth.accounts[0];
// The ABI of a contract can be compiled by solc command. More details see README.md
var abi = [{"constant":true,"inputs":[{"name":"idx","type":"uint256"}],"name":"get_record","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_num","outputs":[{"name":"num","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"record","type":"string"}],"name":"put","outputs":[{"name":"retVal","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_info","outputs":[{"name":"info","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_customer","outputs":[{"name":"customer","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"info","type":"string"},{"name":"customer","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.at(contract_id);

// This data can only be accessed by Audit Team and this Customer
simple.put(mess, {from:eth.coinbase, privateFor: [pubkey]});
console.log(simple.address);
