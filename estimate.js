var MetaCoin  = artifacts.require("./KshazuMain.sol");
var solc = require('solc')
var web3 = require('web3')

module.exports = function(callback) {

    MetaCoin.web3.eth.getGasPrice(function(error, result){ 
        var gasPrice = Number(result);
        console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"
        console.log(MetaCoin._json.abi);
        var MetaCoinContract = web3.eth.contract(MetaCoin._json.abi);
        var contractData = MetaCoinContract.new.getData({data: MetaCoin._json.bytecode});
        var gas = Number(web3.eth.estimateGas({data: contractData}))


        console.log("gas estimation = " + gas + " units");
        console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        console.log("gas cost estimation = " + MetaCoin.web3.fromWei((gas * gasPrice), 'ether') + " ether");

    });
};