// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Manufacturer {
    using Roles for Roles.Role;

    event ManufacturerAdded(address indexed _account); // address of manufacturer will be added on blockchain
    event ManufacturerRemoved(address indexed _account);

    Roles.Role manufacturersList;

    constructor() public {
        manufacturersList.addRole(msg.sender); // adds current account to the list
        emit ManufacturerAdded((msg.sender));
    }

    modifier onlyForManufacturer() {
        require(isManufacturer(msg.sender));
        _;
    }

    // state of the contract is not modified
    function isManufacturer(address _account) public view returns (bool) {
        return manufacturersList.hasRole(_account);
    }

    function addManufacturer(address _account) public {
        manufacturersList.addRole(_account);
        emit ManufacturerAdded(_account);
    }

    function removeManufacturer() public {
        manufacturersList.removeRole(msg.sender);
        emit ManufacturerRemoved(msg.sender);
    }
}
