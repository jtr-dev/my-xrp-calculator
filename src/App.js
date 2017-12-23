import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {BitcoinAPI} from './BitcoinAPI'

class App extends Component {

  state = {
    coins: [
      "btc", "eth", "ltc", "xrp"
    ],
    time: 0,
    progressBar: 0
  }

  componentDidMount() {
    this
      .state
      .coins
      .forEach((coin, i) => {
        BitcoinAPI.compareCoins(coin.toUpperCase(), "BTC").then(c => {
          let coins = this.state.coins;
          coins[i] = c;
          coins[i].name = coin.toUpperCase();

          this.setState({coins})
        })
      })

    this.interval = setInterval(() => {
      this
        .state
        .coins
        .forEach((coin, i) => {
          BitcoinAPI
            .compareCoins(coin.name, "BTC")
            .then(c => {
              let coins = this.state.coins;
              coins[i] = c;
              coins[i].name = coin.name;

              this.setState({coins})
            })
        })
      this.setState({progressBar: 0})
      this.setState({
        time: Date.now()
      })
    }, 15000);

    this.loadingTimer = setInterval(() => {
      this.setState({
        progressBar: this.state.progressBar + .333
      })
    }, 50);
  }

  // componentDidMount() { }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.loadingTimer);
  }

  shouldComponentUpdate() {
    let date = Date.now();
    return this.state.time !== date;
  }

  render() {
    let coins = this.state.coins;
    let ltc = coins.find(x => x.name === "LTC");
    let eth = coins.find(x => x.name === "ETH");
    // let xrp = coins.find(x => x.name === "XRP");

    const gatherTotalCoins = () => {
      return (eth && ltc)
        ? (eth.BTC + ltc.BTC)
        : 0;
    }

    const convertToRipple = () => {
      let totalCoins = gatherTotalCoins();

      if (!totalCoins && !btc) {
        return;
      }
      return (totalCoins)
        ? ((btc().USD * totalCoins) / xrp().USD)
        : 0;
    }

    const btc = () => {
      let coin = coins.find(x => x.name === "BTC");
      return (coin)
        ? coin
        : 0;
    }

    const xrp = () => {
      let coin = coins.find(x => x.name === "XRP");
      return (coin)
        ? coin
        : 0;
    }

    return (
      <div className="App row container">
        <div>
          <table className="table">
            <tr>
              <th></th>
              {this
                .state
                .coins
                .map(coin => (
                  <th>{coin.name}</th>
                ))}
            </tr>
            <tr>
              <th>
                BTC
              </th>
              {this
                .state
                .coins
                .map(coin => (
                  <td>{coin.BTC}</td>
                ))}
            </tr>
            <tr>
              <th>
                USD
              </th>
              {this
                .state
                .coins
                .map(coin => (
                  <td>${coin.USD}</td>
                ))}
            </tr>
          </table>

          <hr></hr>
          <div>
            <div className="progress">
              <progress value={this.state.progressBar} max="100"></progress>
            </div>
          </div>
          <hr></hr>

        </div>

        <div className="jumbotron">
          <p>
            ETH + LTC =
            <b>
              {gatherTotalCoins()}</b>
          </p>
          <p>
            Gathered Coins (1 LTC + 1 ETH) with the current BTC Market Rate of XRP ({xrp().BTC}) is:
          </p>
          <div>
            <label>
              <h3>
                Ripples
              </h3>
              <h2>
                <b>
                  {convertToRipple()}
                </b>
              </h2>
            </label>
            <br></br>
          </div>
          <div className="row col-md-6">
            <label>
              Coinbase Holdings
              <p>
                0.011 BTC =
                <b>
                  {(btc().USD * 0.011) / xrp().USD}
                </b>
              </p>
              <p>
                <b>
                  {convertToRipple() - (0.001 * convertToRipple())}
                </b>
                estimate after fees</p>
            </label>
          </div>
          <div className="row">
            <div className="formula col-md-6">
              <label>
                Formula
                <p>
                  ({btc().USD}
                  * {gatherTotalCoins()}) / {xrp().USD}
                </p>
                <p>
                  (Bitcoin * TotalCoins) / XRP
                </p>
              </label>
            </div>
          </div>
        </div>
        <footer className="footer">
          <a href="https://github.com/teachtyler" target="_blank"> teachtyler </a>
          <br></br>
          {new Date(this.state.time).toLocaleTimeString('en')}
        </footer>
      </div>
    );
  }
}

export default App;
