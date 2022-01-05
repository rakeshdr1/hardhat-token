//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FungToken {
    event Transfer(address indexed _from, address indexed _to, uint256 amount);
    event Approval(
        address indexed _tokenOwner,
        address indexed _spender,
        uint256 tokens
    );

    string public name = "Fung 20 Token";
    string public symbol = "FGT";
    uint256 public totalSupply;
    address public owner;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor(uint256 _initialSupply) {
        balances[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        owner = msg.sender;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function approve(address delegate, uint256 numTokens)
        public
        returns (bool success)
    {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function transferFrom(
        address tokenOwner,
        address buyer,
        uint256 numTokens
    ) public returns (bool) {
        require(
            numTokens <= balances[tokenOwner],
            "Not enough tokens in owner account"
        );
        require(
            numTokens <= allowed[tokenOwner][msg.sender],
            "Exausted allowed tokens"
        );

        balances[tokenOwner] -= numTokens;
        allowed[tokenOwner][msg.sender] -= numTokens;
        balances[buyer] += numTokens;

        emit Transfer(tokenOwner, buyer, numTokens);
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowance(_owner, _spender);
    }
}
