// Anslut till Ethereum-nätverket
// OBS OBS GLÖM INTE ATT SÄTTA IN INFURA PROJECT ID DÄR DET STÅR PLACEHOLDER
const web3 = new Web3("https://sepolia.infura.io/v3/PLACEHOLDER");

// Hämta saldo för en Ethereum-adress
async function getBalance() {
    const address = document.getElementById("address").value;
    if (!web3.utils.isAddress(address)) {
        alert("Ogiltig Ethereum-adress!");
        return;
    }
    const balance = await web3.eth.getBalance(address);
    document.getElementById("balance").innerText = `Saldo: ${web3.utils.fromWei(balance, "ether")} ETH`;
}

// Skicka en transaktion
async function sendTransaction() {
    if (!window.ethereum) {
        alert("MetaMask krävs för att skicka transaktioner!");
        return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const sender = accounts[0];
    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;

    if (!web3.utils.isAddress(recipient)) {
        alert("Ogiltig mottagaradress!");
        return;
    }

    const transaction = {
        from: sender,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
        gas: 21000
    };

    try {
        const txHash = await web3.eth.sendTransaction(transaction);
        document.getElementById("transactionResult").innerText = `Transaktionshash: ${txHash.transactionHash}`;
    } catch (error) {
        document.getElementById("transactionResult").innerText = `Fel: ${error.message}`;
    }
}

// Hämta antal block i kedjan
async function getBlockNumber() {
    const blockNumber = await web3.eth.getBlockNumber();
    document.getElementById("blockNumber").innerText = `Blocknummer: ${blockNumber}`;
}
