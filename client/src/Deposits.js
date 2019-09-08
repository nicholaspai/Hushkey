/* eslint-disable no-script-url */

import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getBalanceEth, getBalanceEos, getBalanceTrx, getBalanceBtc } from './services/getBalance'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const getBalanceFuncMapping = {
  'ETH': getBalanceEth,
  'EOS': getBalanceEos,
  'TRX': getBalanceTrx,
  'BTC': getBalanceBtc
}

export default function Deposits({ oraclePrice, chain, addresses }) {
  const [balance, setBalance] = useState(0)

  const classes = useStyles();
    // ~ componentDidMount
    useEffect(() => {
      const fetchData = async () => {
        let getBalanceFunc = getBalanceFuncMapping[chain.toUpperCase()]
        let running_sum = 0
        for (let i = 0; i < addresses.length; i++) {
          let _balance = parseFloat(await getBalanceFunc(addresses[i])) * oraclePrice
          running_sum += _balance
        }
        setBalance(parseFloat(running_sum.toFixed(4)))
      };
      fetchData();
    }, [addresses, chain, oraclePrice]);
  
  return (
    <React.Fragment>
      <Title>{chain.toUpperCase()} Balance</Title>
      <Typography component="p" variant="h4">
        ${balance}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Last price is ${oraclePrice.toFixed(4)}
      </Typography>
      <div>
        <Link color="primary" href="https://beta.katechon.world/" target="_blank">
          View source
        </Link>
      </div>
    </React.Fragment>
  );
}