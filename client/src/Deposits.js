/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ oraclePrice }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
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