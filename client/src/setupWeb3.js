import Web3 from "web3";

const connectWeb3 = () =>
    new Promise((resolve, reject) => {
        // Waiting for the web page to be fully loaded before injecting the Web3 library
        window.addEventListener("load", async () => {
            // window.ethereum (provided by Metamask in this project) allows communication between the browser and the Ethereum blockchain
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    // requests user access to its Ethereum account(s)
                    await window.ethereum.enable();
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            }

            // in case browser env doesn't support the modern Ethereum provider API 
            else if (window.web3) {
                const web3 = window.web3;
                console.log("Injected web3 service!");
                resolve(web3);
            }

            else {
                const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RPC);
                const web3 = new Web3(provider);

                console.log("No Web3 instance injected, will use local Web3!")
                resolve(web3);
            }
        })
    });

export default connectWeb3;
