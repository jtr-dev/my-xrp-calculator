// const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD';
const url = 'https://min-api.cryptocompare.com/data';


let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json'
}

const bitcoinApi = {

    compareCoins: (from, to) => 
        fetch(`${url}/price?fsym=${from}&tsyms=${to},USD`, {headers})
            .then(res => res.json())
            .then(data => data)
            
}

export const BitcoinAPI = bitcoinApi;