let ethers = require('ethers')

//1. 指定私钥获取钱包
//私钥：256位，随机数种子：128位
let privateKey1 = '0xef609a157053f7a6b158cd9fb3632a60737f338930b4e8526b0785b1c01a079c'
let w1 = new ethers.Wallet(privateKey1)
console.log('w1 privateKey :', w1.privateKey)
console.log('w1 address :', w1.address)

//2. 随机创建一个新的钱包
let w2 = ethers.Wallet.createRandom()
console.log('w2 privateKey :', w2.privateKey)
console.log('w2 address :', w2.address)

//3. 给定json文件，生成钱包
let data =
{
    "address": "5e718eb7a2e08127c25a888274ffa3b7d7285597",
    "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "955fe0a2c6adfd95d015ff6f536b4d2a091131ba46eb01a3ce5d01ba15faac27",
        "cipherparams": {
            "iv": "d0fa3650f3a87fb12fd6791bda038bb8"
        },
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "n": 262144,
            "p": 1,
            "r": 8,
            "salt": "5f133469f7a51e6cc6b7368bb891293d45f8a45842f68a7664b3994d89e77828"
        },
        "mac": "8bc16eb6b50d9e5623aaaf01dd7b544e024785f71005893c947c7626fbddc335"
    },
    "id": "28e31581-7b86-4608-a69d-8f46a1780a47",
    "version": 3
};

let json = JSON.stringify(data);
let password = "1111";

ethers.Wallet.fromEncryptedJson(json, password).then(function (wallet) {
    console.log("w3 Address: " + wallet.address);
    console.log("w3 privateKey: " + wallet.privateKey);
    // "Address: 0x5e718eb7a2e08127c25a888274ffa3b7d7285597"
});

//4. 给定助记词，生成钱包
let mnemonic = 'melt trend mango decide marriage resist lecture chair rally tourist adapt father'
let path0 = "m/44'/60'/0'/0/0" //address : 0x35b51Bca6273cfe606FE00528A3b5dACC0A15F1b
let path1 = "m/44'/60'/0'/0/1" //address : 0x625983Ae2699C30988551696Eac584048E523d7a
let w4_a = ethers.Wallet.fromMnemonic(mnemonic, path0)
console.log("w4_a Address: " + w4_a.address);
console.log("w4_a privateKey: " + w4_a.privateKey);
let w4_b = ethers.Wallet.fromMnemonic(mnemonic, path1)
console.log("w4_b Address: " + w4_b.address);
console.log("w4_b privateKey: " + w4_b.privateKey);

//5. 随机创建一个助记词钱包
//私钥：256位，随机数种子：128位
let randValue = ethers.utils.randomBytes(16)
let w5_mnemonic = ethers.utils.HDNode.entropyToMnemonic(randValue)
console.log('w5助记词:', w5_mnemonic)
