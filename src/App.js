import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './chart'
import {BitcoinAPI} from './BitcoinAPI'

class App extends Component {

  state = {
    coins: [
      "btc", "eth", "ltc", "xrp", "poe"
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
    const totalPOE = 1323.404;

    const totalInvestment = 1540;
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

    const poe = () => {
      let coin = coins.find(x => x.name === "POE");
      return (coin)
        ? coin
        : 0;
    }

    const totalProfits = () => {
      let xrpProfit = (totalXRP * xrp().USD)
      let poeProfit = (totalPOE * poe().USD)

      return (xrpProfit + poeProfit) - totalInvestment
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
                ETH
              </th>
              {this
                .state
                .coins
                .map(coin => (
                  <td>{coin.ETH}</td>
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
            <div className="col-md-6">
              <label>
                <h3>
                  Ripples
                </h3>
                <h3>
                  <b>
                    {totalXRP}
                  </b>
                </h3>
                <h3>${totalXRP * xrp().USD}</h3>
              </label>
            </div>

            <div className="col-md-6">
              <label>
                <h3>
                  POE
                </h3>
                <h3>
                  <b>
                    {totalPOE}
                  </b>
                </h3>
                <h3>${totalPOE * poe().USD}</h3>
              </label>
            </div>

            <br></br>
          </div>
        </div>

        <div className="row">
          <div className="pull-right">
            <div className="col-md-9">
              <h4>Investments</h4>
              <div>ETH: $714</div>
              <div>LTC: $309</div>
              <div>BTC: $200</div>
              <div>BTC: $167</div>
              <div>ETH: $150</div>
              <hr></hr>
              $1540
              <br/>
              <hr></hr>
              Current Profit: ${totalProfits()}
            </div>
          </div>
        </div>

        <div className="col-md-8">

          <SimpleLineChart data={{
            usd: totalProfits()
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
