const path = require("path");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider("<MNEMONIC>", "http://127.0.0.1:7545", MetaMaskAccountIndex )
      },  
      network_id: 5777
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider("<MNEMONIC>", "https://goerli.infura.io/v3/49674ad7ac0d4072b7ebe7afe5f4e305", MetaMaskAccountIndex )
      },  
      network_id: 5
    },
    ropsten_infura: {
      networkCheckTimeout: 100000,
      provider: function() {
        return new HDWalletProvider("<MNEMONIC>", "wss://ropsten.infura.io/ws/v3/49674ad7ac0d4072b7ebe7afe5f4e305", MetaMaskAccountIndex )
      },  
      network_id: 3
    },
    core_poa: {
      networkCheckTimeout: 100000,
      provider: function() {
        return new HDWalletProvider("<MNEMONIC>", "https://core.poa.network", MetaMaskAccountIndex )
      },  
      network_id: 99
    },
    core_poa2: {
      networkCheckTimeout: 100000,
      provider: function() {
        return new HDWalletProvider("<MNEMONIC>", "https://core-archive.blockscout.com", MetaMaskAccountIndex )
      },  
      network_id: 99
    },
    xdai: {
      provider: function() {
            return new HDWalletProvider("<MNEMONIC>","https://dai.poa.network", MetaMaskAccountIndex)
      },
      network_id: 100
    }          
  },
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  }     
};
