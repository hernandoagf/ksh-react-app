//var Color = artifacts.require("./Color.sol");
var Kshazu = artifacts.require("./KshazuMain.sol");

module.exports = function(deployer) {
    //deployer.deploy(Color);
    deployer.deploy(Kshazu);
};