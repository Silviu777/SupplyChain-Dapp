var SupplyChainContract = artifacts.require("./SupplyChain.sol");
var ManufacturerContract = artifacts.require("./Manufacturer.sol");
var RolesContract = artifacts.require("./Roles.sol");

module.exports = function (deployer) {

    deployer.deploy(ManufacturerContract);
    deployer.deploy(RolesContract);
    deployer.deploy(SupplyChainContract, { gas: 67219500 });
}
