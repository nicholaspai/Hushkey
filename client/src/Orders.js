/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {chain_names} from './chains'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

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

export default function Orders({ chain, account, setAccount, addresses, setChosenPath }) {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 10,
      label: '10',
    }
  ];

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
          {addresses.map((address,i) => (
            <TableRow key={i}>
              <TableCell>{i}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={()=> setChosenPath({chain, account, address_index:i})}
                >
                  Transact
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Slider
          onChange={(e, val)=>setAccount(val)}
          defaultValue={account}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={10}
          marks={marks}
        />
        <Typography id="discrete-slider" gutterBottom>
          Account
        </Typography>
      </div>
    </React.Fragment>
  );
}