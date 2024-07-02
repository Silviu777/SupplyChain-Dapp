// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Retailer {
    using Roles for Roles.Role;

    event RetailerAdded(address indexed _account);
    event RetailerRemoved(address indexed _account);

    Roles.Role private retailersList;

    constructor() public {
        retailersList.addRole(msg.sender); // adds the current retailer
        emit RetailerAdded(msg.sender);
    }

    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }

    function isRetailer(address _account) public view returns (bool) {
        return retailersList.hasRole(_account);
    }

    function addRetailer(address _account) public onlyRetailer {
        retailersList.addRole(_account);
        emit RetailerAdded(_account);
    }

    function removeRetailer() public {
        retailersList.removeRole(msg.sender);
        emit RetailerRemoved(msg.sender);
    }
}
