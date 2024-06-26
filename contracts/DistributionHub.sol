// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract DistributionHub {
    using Roles for Roles.Role;

    event DistributionHubAdded(address indexed _account);
    event DistributionHubRemoved(address indexed _account);

    Roles.Role private distributionHubsList;

    constructor() public {
        distributionHubsList.addRole(msg.sender);
        emit DistributionHubAdded(msg.sender);
    }

    modifier onlyDistributionHub() {
        require(isDistributionHub(msg.sender));
        _;
    }

    //expected to be an Ethereum address that will be checked to determine if it belongs to a distribution hub (_account - function parameter)
    function isDistributionHub(address _account) public view returns (bool) {
        return distributionHubsList.hasRole(_account);
    }

    function addDistributionHub(address _account) public onlyDistributionHub {
        distributionHubsList.addRole(_account);
        emit DistributionHubAdded(_account);
    }

    function removeDistributionHub() public {
        distributionHubsList.removeRole(msg.sender);
        emit DistributionHubRemoved(msg.sender);
    }
}
