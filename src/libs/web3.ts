import Web3 from "web3";

const isWeb3Enable = !!window.ethereum;
const web3 = new Web3(window.ethereum);

export default web3;
export {
    isWeb3Enable
};