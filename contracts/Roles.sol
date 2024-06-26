// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Roles {
    struct Role {
        mapping(address => bool) list;
    }

    function hasRole(
        Role storage role,
        address _account
    ) internal view returns (bool) {
        require(_account != address(0));
        return role.list[_account];
    }

    function addRole(Role storage role, address _account) internal {
        require(_account != address(0));
        require(!hasRole(role, _account));
        role.list[_account] = true;
    }

    function removeRole(Role storage role, address _account) internal {
        require(_account != address(0));
        require(hasRole(role, _account));
        role.list[_account] = false;
    }
}
