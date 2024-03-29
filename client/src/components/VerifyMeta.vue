<template>
    <div class="bg-green-100 h-screen" style="h-screen">
      <div class="pt-10 flex item-center justify-center p-64">
        <button @click="connect" v-if="metamaskEnabled" class="bg-green-200 border-gray-300">Connect Metamask</button>
        <button @click="install" v-else class="bg-red-200 border-gray-300 p-2 rounded-md">Metamask not installed, install it</button>
      </div>
    </div>
  </template>
  
  <script>
  
  import { ethers } from 'ethers';
  
  export default {

    name: 'VerifyMeta',
    data() {
      return {
        metamaskEnabled: false,
        tokenKey: 'token',
      }
    },

    mounted() {
      this.isMetaMaskEnable();
    },
  
    methods: {
  
      isMetaMaskEnable() {
        if(window.ethereum !== undefined) {
          this.metamaskEnabled = true;
        }
      },
  
      // Connect to Metamask
      async connect() {
        if (window.ethereum) {
          try {
            //if any problem with connection with metamask
            //reload the page again
            console.log('eth', window.ethereum);
            if (window.ethereum.networkVersion === null) {
              window.location.reload();
            }
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x5` }], // chainId must be in hexadecimal numbers
            });
            this.gettingAccounts();
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x5`,
                      rpcUrl: `https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          window.alert('Metamast is not installed');
          // toast(
          //   'MetaMask is not installed. Please consider installing it: https://m...content-available-to-author-only...k.io/download.html',
          //   {
          //     position: 'top-left',
          //     autoClose: 3000,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     type: 'info',
          //     className: 'alert-strong-background',
          //   }
          // );
        }
      },
      
  
      async gettingAccounts() {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          console.log('accounts', accounts);
          const walletAddress = accounts && Array.isArray(accounts) && accounts[0] ? accounts[0] : '';
          if (!walletAddress) {
            return;
          }
      
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const userAddress = await signer.getAddress();
          this.saveState(this.tokenKey, userAddress);
          console.log('userAddress', userAddress);
          window.alert('Connected to Metamask');

          this.$router.push({
            name: 'Document-Upload',
          });
  
          return userAddress;
        } catch (error) {
          return;
        }
      },

      install() {
        const metaMastChromeUrl = `https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn`;
        window.open(metaMastChromeUrl, '_blank');
      },

      getSavedState(key) {
        const state = window.localStorage.getItem(key);

        if (state) {
          return JSON.parse(state);
        }
      },

      saveState(key, state) {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    },
  }
  </script>
  
  <style scoped>
  </style>
  