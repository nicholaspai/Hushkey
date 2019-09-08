import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from './Title';

// Web3 Helpers
import { getBalanceCusd } from './services/getBalance'
import { getAddresses, signTx } from './services/custody'
import { get_increase_allowance_transaction } from './services/allowance'
import { depositERC20IntoZk } from './services/zkbridge'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Chart({ chosenPath, uuid, password }) {
  const classes = useStyles();
  const [balancePublic, setBalancePublic] = useState(0);
  const [chosenAddress, setChosenAddress] = useState('');
  const [amountToDeposit, setAmountToDeposit] = useState(0);

  const getAddressFromChosenPath = async (chosenPath) => {
    let all_addresses = await getAddresses(uuid, password, chosenPath.chain, chosenPath.account)
    let chosenAddress = all_addresses.addresses[chosenPath.address_index]
    return chosenAddress
  }
  // ~ componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      let chosen_address = await getAddressFromChosenPath(chosenPath)
      setChosenAddress(chosen_address)
      let _balance = await getBalanceCusd(chosen_address)
      setBalancePublic(_balance)
    };
    fetchData();
  }, [chosenPath]);

  const handleApproveACE = async (event) => {
    event.preventDefault()
    let increaseAllowanceUnsignedTxn = get_increase_allowance_transaction()
    let result = await signTx(uuid, password, increaseAllowanceUnsignedTxn, chosenPath.chain, chosenPath.account, chosenPath.address_index)
    console.log(result)
  }

  const handleSubmitZkDeposit = async (event) => {
    event.preventDefault()
    let result = await depositERC20IntoZk(amountToDeposit, uuid, password, chosenPath.account, chosenPath.chain, chosenPath.address_index)
    console.log(result)
  }

  return (
    <React.Fragment>
      <Title>
        Take my ERC20 Private with AZTEC
      </Title>
      <form className={classes.form} noValidate onSubmit={handleApproveACE}>
        <TextField
          disabled
          variant="outlined"
          margin="normal"
          fullWidth
          id="address"
          label="Chosen address"
          name="address"
          value={chosenAddress}
        />
        <TextField
          disabled
          variant="outlined"
          margin="normal"
          fullWidth
          id="balance"
          label="ERC20"
          name="balance"
          value={balancePublic}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={balancePublic === 0}
        >
          Approve AZTEC Contract Engine to move my ERC20
        </Button>
      </form>
      <form className={classes.form} noValidate onSubmit={handleSubmitZkDeposit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="amountToDeposit"
          label="Amount of ERC20 to Privatize"
          name="amountToDeposit"
          value={amountToDeposit}
          onChange={(e) => setAmountToDeposit(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={parseFloat(amountToDeposit) > parseFloat(balancePublic)}
        >
         Deposit ERC20 into Private Form
        </Button>
      </form>
    </React.Fragment>
  );
}