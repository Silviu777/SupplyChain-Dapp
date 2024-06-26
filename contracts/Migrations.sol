// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Migrations {
    address public owner;
    uint public last_migration;

    modifier restricted() {
        if (msg.sender == owner) _; // executes where it's called
    }

    constructor() public {
        owner = msg.sender;
    }

    function setCompleted(uint completed) public restricted {
        last_migration = completed;
    }
}
