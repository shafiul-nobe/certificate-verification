// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./IInstitution.sol";

error ValueCanNotBeZero();
error InvalidAddress();
error InvalidModerator();

contract Controller is Ownable {
    modifier validAddress(address _address) {
        if (_address == address(0) || _address == address(this)) {
            revert InvalidAddress();
        }
        _;
    }

    modifier validInstitutionAddress(address _address) {
        if (_address == address(0) || _address == address(this)) {
            revert InvalidAddress();
        }
        _;
    }

    modifier notZero(uint256 amount) {
        if (amount == 0) {
            revert ValueCanNotBeZero();
        }
        _;
    }

    modifier validModerator(address _address) {
        if (!moderators[_address]) {
            revert InvalidModerator();
        }
        _;
    }

    struct InstitutionInfo {
        uint256 id;
        address contractAddres;
        string name;
    }

    IInstitution public institutionSc;
    uint256 public totalInstitution = 0;

    address payable public withdrawalWallet;

    mapping(address => bool) public moderators;

    mapping(uint256 => InstitutionInfo) public institutionInfos;

    constructor() {
        withdrawalWallet = payable(msg.sender);
    }

    /// @notice Transfer balance on this contract to withdrawal address
    function withdrawETH() external onlyOwner {
        withdrawalWallet.transfer(address(this).balance);
    }

    /// @notice Set wallet address that can withdraw the balance
    /// @dev Only owner of the contract can execute this function.
    ///      The address should not be 0x0 or contract address
    /// @param _wallet Any valid address
    function setWithdrawWallet(address _wallet)
        external
        onlyOwner
        validAddress(_wallet)
    {
        withdrawalWallet = payable(_wallet);
    }

    function addInstitution(address contractAddres, string memory name)
        external
        validModerator(msg.sender)
        validAddress(contractAddres)
    {
        unchecked {
            totalInstitution++;
        }
        institutionInfos[totalInstitution] = InstitutionInfo(
            totalInstitution,
            contractAddres,
            name
        );
    }

    function addSessions(
        uint256 _startTimestamp,
        uint256 _endTimestamp,
        address _scAddress
    ) external validModerator(msg.sender) validAddress(_scAddress) {
        institutionSc = IInstitution(_scAddress);
        institutionSc.addSessions(_startTimestamp, _endTimestamp);
    }

    function addProgram(
        string memory _name,
        uint256 _duration,
        address _scAddress
    ) external validModerator(msg.sender) validAddress(_scAddress) {
        institutionSc = IInstitution(_scAddress);
        institutionSc.addProgram(_name, _duration);
    }

    function addVerifier(address _verifier, address _scAddress)
        external
        validModerator(msg.sender)
        validAddress(_scAddress)
    {
        institutionSc = IInstitution(_scAddress);
        institutionSc.addVerifier(_verifier);
    }

    function removeVerifier(address _verifier, address _scAddress)
        external
        validModerator(msg.sender)
        validAddress(_scAddress)
    {
        institutionSc = IInstitution(_scAddress);
        institutionSc.removeVerifier(_verifier);
    }

    function addModerator(address _moderator)
        external
        onlyOwner
        validAddress(_moderator)
    {
        moderators[_moderator] = true;
    }

    function removeModerator(address _moderator)
        external
        onlyOwner
        validAddress(_moderator)
    {
        moderators[_moderator] = false;
    }

    function getinstitutions()
        public
        view
        returns (InstitutionInfo[] memory datas)
    {
        InstitutionInfo[] memory datas = new InstitutionInfo[](
            totalInstitution
        );

        for (uint256 i = 0; i < totalInstitution; i++) {
            InstitutionInfo memory data = institutionInfos[i+1];
            datas[i] = data;
        }
        return datas;
    }
}
