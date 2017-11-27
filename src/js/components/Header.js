// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCurrency } from '../actions/index';

class Header extends Component {

    renderNav = () => {
        const { currencies, activeCurrency } = this.props;
        return Object.values(currencies).map(currency => {
            return (
                <li
                    className={currency.name === activeCurrency ? 'active' : ''}
                    key={currency.name}
                    onClick={() => this.props.selectCurrency(currency.name)}
                >{currency.name}</li>);
        })
    }

    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1><a href="https://ethereumprice.org">Integration-18</a></h1>
                </div>
                <div className="chart__nav">
                    <ul className="chart__menu">
                        {this.renderNav()}
                    </ul>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);