const Kshazu = artifacts.require("./KshazuMain.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

  const BN = web3.utils.BN;

  contract('Kshazu',(accounts) => {
      let contract;

      before(async () => {
        contract = await Kshazu.deployed()
      })

      describe('deployment', async () => {
          it('deploys successfully', async () => {
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
          })
      
          it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Kshazu')
          })
      
          it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'KSH')
          })
      })

      describe('minting', async () => {
        it('create token', async () => {
          const result = await contract._spawnKshazu(9999999999898,accounts[0],1,2);
          const totalSupply = await contract.totalSupply();
          console.log("Kshazu totSupply -> "+totalSupply);
          
          let items = []
          let  item

          for(var i=0; i < totalSupply; i++){
            item = await contract.kshazus(i);
            items.push(item);
            console.log(item.born+" <-> "+new BN(item.genes));            
          }
          //console.log("ITEMS -> "+items);
          console.log("Jsonify -> "+JSON.stringify(items));
        })
      })
    })
