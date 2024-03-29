import { ethers } from 'ethers';
import InstituteABI from '../InstituteABI.json';

export default async function getInstituteContract() {
	
	const contractABI = InstituteABI;
	
	const contractAddress = "0x903b9ed92965A99Fe6DCc9EB078873772e4d062F"; // need to get it by parameter
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	const contractInstance = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);
	
	return contractInstance;
}