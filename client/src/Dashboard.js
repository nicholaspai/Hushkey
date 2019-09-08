import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { chains } from './chains';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

// Crypto Icons
import EthIcon from './assets/eth.svg'
import BtcIcon from './assets/btc.svg'
import TrxIcon from './assets/trx.svg'
import EosIcon from './assets/eos.svg'

// Hushkey API Services
import { getAddresses } from './services/custody'
import { getQuote } from './services/pricefeed'
import { dripCusd, dripEth } from './services/faucet'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState('picholaspi')
  const [password, setPassword] = useState('password15!')
  const [chain, setChain] = useState(chains[0])
  const [account, setAccount] = useState(0)
  const [oracle, setOracle] = useState(0)
  const [faucet, setFaucet] = useState(false)
  const [addressDripEth, setAddressDripEth] = useState('')
  const [addressDripCusd, setAddressDripCusd] = useState('')
  const [pendingHashCusd, setPendingHashCusd] = useState('')
  const [pendingHashEth, setPendingHashEth] = useState('')
  const [addresses, setAddresses] = useState([])
  const [chosenPath, setChosenPath] = useState({chain, account, address_index:0})

  // ~ componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      let _addresses = await getAddresses(uuid, password, chain, account)
      setAddresses(_addresses.addresses)
    };
    fetchData();
  }, [uuid, password, chain, account]);
  // Load price
  useEffect(() => {
    const fetchData = async () => {
      let base = chain.toUpperCase()
      let quote = (base === 'TRX' ? 'USDT' : 'CUSD')
      const pricefeed = await getQuote(base, quote)
      setOracle(pricefeed.price)
    };
    fetchData();
  }, [chain])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleRefresh = async () => {
      let _addresses = await getAddresses(uuid, password, chain, account)
      setAddresses(_addresses.addresses)
  }
  const handleDripCusd = async (event) => {
    event.preventDefault()
    let dripped = await dripCusd(50, addressDripCusd)
    setPendingHashCusd(dripped.pending_hash)
  }
  const handleDripEth = async (event) => {
    event.preventDefault()
    let dripped = await dripEth(0.5, addressDripEth)
    setPendingHashEth(dripped.pending_hash)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hushkey
          </Typography>
          <IconButton 
            color="inherit"
            onClick={handleRefresh}
          >
            <AutorenewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => {
            setChain(chains[0])
            setFaucet(false)
          }}>
            <ListItemIcon>
              <Icon className={classes.iconRoot}>
                <img className={classes.imageIcon} src={EthIcon} alt="eth"/>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Ethereum" />
          </ListItem>
          <ListItem button onClick={() => {
            setChain(chains[1])
            setFaucet(false)
          }}>
            <ListItemIcon>
              <Icon className={classes.iconRoot}>
                <img className={classes.imageIcon} src={EosIcon} alt="eos"/>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="EOS" />
          </ListItem>
          <ListItem button onClick={() => {
            setChain(chains[2])
            setFaucet(false)
          }}>
            <ListItemIcon>
              <Icon className={classes.iconRoot}>
                <img className={classes.imageIcon} src={TrxIcon} alt="trx"/>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Tron" />
          </ListItem>
          <ListItem button onClick={() => {
            setChain(chains[3])
            setFaucet(false)
          }}>
            <ListItemIcon>
              <Icon className={classes.iconRoot}>
                <img className={classes.imageIcon} src={BtcIcon} alt="btc"/>
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Bitcoin" />
          </ListItem>
          <ListItem button onClick={() => setFaucet(true)}>
            <ListItemIcon>
              <AttachMoneyIcon>
              </AttachMoneyIcon>
            </ListItemIcon>
            <ListItemText primary="Ropsten Faucet" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {!faucet && (<Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart chosenPath={chosenPath} uuid={uuid} password={password}/>
              </Paper>
            </Grid>
            {/* Balance */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits oraclePrice={oracle} chain={chain} addresses={addresses}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders chain={chain} account={account} setAccount={setAccount} addresses={addresses} setChosenPath={setChosenPath}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>)}
        {faucet && (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Drip CUSD */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <form className={classes.form} noValidate onSubmit={handleDripCusd}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Enter address"
                      name="address"
                      autoComplete="username"
                      value={addressDripCusd}
                      onChange={e => setAddressDripCusd(e.target.value)}
                    />
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="hash"
                      label="Pending hash"
                      name="hash"
                      value={pendingHashCusd}
                      onChange={e => setAddressDripCusd(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={!addressDripCusd}
                    >
                      Get 50 ERC20
                    </Button>
                  </form>
                </Paper>
              </Grid>
              {/* Drip ETH */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <form className={classes.form} noValidate onSubmit={handleDripEth}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Enter address"
                      name="address"
                      autoComplete="username"
                      value={addressDripEth}
                      onChange={e => setAddressDripEth(e.target.value)}
                    />
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="hash"
                      label="Pending hash"
                      name="hash"
                      value={pendingHashEth}
                      onChange={e => setAddressDripEth(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={!addressDripEth}
                    >
                      Get 0.5 ETH
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
    </div>
  );
}