// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from '../actions/index';

import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import Highlight from 'react-highcharts';

import Header from './Header';

class App extends Component {
	constructor(props) {
	  super(props);
	  props.selectCurrency('ETH');
  }

  render() {
    const { activeCurrency, currencies } = this.props;
    let data = [];
    let price = 0;
    if (currencies[activeCurrency].data.length) {
      price = currencies[activeCurrency].data[currencies[activeCurrency].data.length - 1].close;
      for (let i = 0; i < currencies[activeCurrency].data.length; i += 1){
	      data.push([
		      currencies[activeCurrency].data[i].time,
		      currencies[activeCurrency].data[i].close
          ])
      }
    }

    const config = {
		  chart: {
			  renderTo: 'chart',
			  resetZoomButton: false,
			  scrollbar: false,
			  print: false,
		  },
		  exporting: false,
		  xAxis: {
			  gridLineColor: "#000000",
			  type: "datetime",
		  },
		  yAxis: {
			  scalable: true,
		  },
		  rangeSelector: false,
		  plotOptions: {
			  spline: {
				  fillOpacity: 0.5,
			  },
		  },
		  series: [{
			  data: data,
			  title: false,
			  type: 'areaspline',
			  softThreshold: true,
			  color: "#2b908f",
		  }]
	  };

    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="block block--metrics decimal-2">
            <div className="container">
              <div className="row row-centered current-price">
                <div className="col-md-6 col-centered">
                  <div className="current-price__holder">
                    <span className="current-price__cur" data-coin="eth" data-coin-full="Ether">1 {activeCurrency} =</span>
                    <span className="current-price__price"><span className="cur">$</span><span className="rp">{price}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block block--graph">
            <div className="container">
              <div className="row row-centered">
                <div className="col-md-12 col-sm-12 col-xs-12 col-centered">
                  <p className="block--graph__pair">{activeCurrency}/usd</p>
                  <p className="block--graph__exchange">Exchange: Weighted Average
                  </p>
                  <div className="chart">
                    <div className="chart__container">
                      <div id="chart">
                        <ReactHighstock config={config} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		activeCurrency: state.app.activeCurrency,
		currencies: state.app.currencies,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectCurrency: (currency) => selectCurrency(currency)(dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

