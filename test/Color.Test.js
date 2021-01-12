const Color = artifacts.require("./Color.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract('Color',(accounts) => {
      let contract;

      before(async () => {
        contract = await Color.deployed()
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
            assert.equal(name, 'Color')
          })
      
          it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
          })

          it('create token', async () => {
            const result = await contract.mint("#EC058E");
            const totalSupply = await contract.totalSupply();
            console.log("totSupply -> "+totalSupply);
            assert.equal(totalSupply,1);
          })
      })
  })
