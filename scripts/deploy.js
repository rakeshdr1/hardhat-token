const fs=require('fs')

async function main(){
    const [deployer]=await ethers.getSigners();
    console.log(`Deploying contract with the account: ${deployer.address}`)

    const balance= await deployer.getBalance()
    console.log(`Account Balance:${balance.toString()}`)

    const Token=await ethers.getContractFactory('FungToken')

    const token=await Token.deploy(10000000)
    console.log(`Token address:${token.address}`)

    const data={
        address:token.address,
        abi:JSON.parse(token.interface.format('json'))
    }

    fs.writeFileSync('data/FungToken.json',JSON.stringify(data))
}

main().then(()=>process.exit(0)).catch(error=>{
    console.error(error)
    process.exit(1)
})