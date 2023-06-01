// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CreditSystem {

    mapping(address => uint256) private balances;

    uint256 private totalSupply;
    string private _name;
    string private _symbol;
    address admin;

    constructor() {
        admin = msg.sender;
        balances[admin] = 1000;
        _name = "CreditToken";
        _symbol = "C";
    }

    modifier onlyAdmin(){
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function transferCredits(address recipient, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    function mint(address account, uint256 amount) external onlyAdmin(){
        require(account != address(0), "ERC20: mint to the zero address");
        totalSupply += amount;
        balances[account] += amount;
    }

}
