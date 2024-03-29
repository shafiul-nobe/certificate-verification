// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.15;

interface IInstitution {
    function addSessions(uint256 _startTimestamp, uint256 _endTimestamp)
        external;

    function addProgram(string memory _name, uint256 _duration) external;

    function addVerifier(address _verifier) external;

    function removeVerifier(address _verifier) external;

    function applyForCertificate(
        string memory _name,
        uint256 _roll,
        uint256 _registrationNo,
        uint256 _sessionId,
        uint256 _programId,
        string memory _ipfsUrl
    ) external payable;

    function verifyCertificate(uint256 _applicationId) external;

    function resetIssuerContractAddress(address _address) external;

    function resetInstitutionWallet(address _address) external;
}
