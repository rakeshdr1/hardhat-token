const fs=require('fs')

async function main(){
    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const Token=await ethers.getContractFactory('FungReadyToken')

    const token=await Token.deploy("Fungible Ready Token","FRT")
    console.log(`Token address:${token.address}`)

    const data={
        address:token.address,
        abi:JSON.parse(token.interface.format('json'))
    }

    fs.writeFileSync('data/FungReadyToken.json',JSON.stringify(data))
}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})