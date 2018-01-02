import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './chart'
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

      // var history = {   Ripple: this.convertToRipple() }; let historical =
      // this.state.historical; historical.push(history); this.setState({historical});

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
    const totalXRP = 1054.94;
    let coins = this.state.coins;
    let ltc = coins.find(x => x.name === "LTC");
    let eth = coins.find(x => x.name === "ETH");
    // let xrp = coins.find(x => x.name === "XRP");

    const gatherTotalCoins = () => {
      return (ltc)
        ? (ltc.BTC + 0.06039446 + (191.80800000 * xrp().BTC))
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
      <div className="App row">
        <div className="col-md-8">
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

        <div className="jumbotron col-md-8">
          <div>
            <label>
              <h3>
                Ripples
              </h3>
              <h3>
                <b>
                  1,054.944
                </b>
              </h3>
              <h3>${totalXRP * xrp().USD}</h3>
            </label>
            <br></br>
          </div>
        </div>

        <div className="row">
          <div className="pull-right">
            <div className="col-md-9">
              <h4>Initial Investment</h4>
              <div>ETH: $714</div>
              <div>LTC: $309</div>
              <div>BTC: $200</div>
              <div>BTC: $167</div>
              <hr></hr>
              $1390
              <br/>
              <hr></hr>
              Current Profit: ${((totalXRP * xrp().USD) - 1390).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="col-md-8">

          <SimpleLineChart
            data={{
            usd: totalXRP * xrp().USD
          }}/>

        </div>

        <footer className="footer col-md-8">
          <a href="https://github.com/teachtyler" target="_blank">
            teachtyler
          </a>
          <br></br>
          {new Date(this.state.time).toLocaleTimeString('en')}
        </footer>
      </div>
    );
  }
}

export default App;
