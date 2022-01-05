const {expect}=require("chai");

describe('FungReady Token contract',()=>{
    let Token,token, owner, addr1, addr2;

    beforeEach(async()=>{
        Token=await ethers.getContractFactory('FungReadyToken')
        token=await Token.deploy("Fungible Ready Token","FRT");
        [owner,addr1,addr2] =await ethers.getSigners()
    })

    describe('Deployment',()=>{
        it('Should set the correct symbol',async()=>{
            expect(await token.symbol()).to.equal("FRT")
        })

        it('Should assign total supply of token to owner',async()=>{
            const ownerBalance=await token.balanceOf(owner.address)
            expect(await token.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe('Transactions',()=>{
        it('Should transfer tokens between accounts',async()=>{
            await token.transfer(addr1.address,50)
            const addr1Balance=await token.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(50)

            await token.connect(addr1).transfer(addr2.address,50)
            const addr2Balance=await token.balanceOf(addr2.address)
            expect(addr2Balance).to.equal(50)
        })

        it('Should fail if sender not have enough tokens',async()=>{
            const ownerBalance=await token.balanceOf(owner.address)

            await expect(token.connect(addr1).transfer(owner.address,1)).to.be.revertedWith('ERC20: transfer amount exceeds balance');

            expect(await token.balanceOf(owner.address)).to.equal(ownerBalance)
        })
    })
})