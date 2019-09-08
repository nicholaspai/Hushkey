/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {chain_names} from './chains'

// Generate Order Data
function createData(index, address, transact) {
  return { index, address, transact};
}

const rows = [
  createData(0, 'address1', 'Click me'),
  createData(1, 'address2', 'Click me'),
  createData(2, 'address3', 'Click me'),
  createData(3, 'address4', 'Click me'),
  createData(4, 'address5', 'Click me'),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ chain }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Network: {chain_names[chain]}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Transact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.index}>
              <TableCell>{row.index}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">{row.transact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}