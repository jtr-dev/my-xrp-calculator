import React, {Component} from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush
} from 'recharts'

class SimpleLineChart extends Component {

    state = {
        historical: [
            {
                usd: 0
            }
        ]
    }

    shouldComponentUpdate(nextProps) {
        const {data} = nextProps;
        let historical = this.state.historical;
        let history = historical[historical.length - 1];
        return history !== undefined && history["usd"] !== data.usd;
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        let historical = this.state.historical;
        let history = historical[historical.length - 1];

        if (history.usd === 0 && !isNaN(data.usd)) {
            history.usd = data.usd
        }

        if (data.usd && data.usd !== history["usd"] && !isNaN(data.usd)) {
            historical = [
                ...historical, {
                    usd: data.usd
                }
            ];
            this.setState({historical})
        }
    }

    render() {
        return (
            <LineChart
                width={1100}
                height={300}
                data={this.state.historical}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}>
                <XAxis interval={100} dataKey="name"/>
                <YAxis domain={['auto', 'auto']}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Brush/>
                <Line
                    type="monotone"
                    dataKey="usd"
                    stroke="#8884d8"
                    activeDot={{
                    r: 2
                }}/>
            </LineChart>
        );
    }
}

export default SimpleLineChart;