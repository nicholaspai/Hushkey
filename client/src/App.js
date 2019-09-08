import React, { Component } from 'react';
import './App.css';
import withRoot from './withRoot';
import PropTypes from 'prop-types';

// Material-ui
import { withStyles } from '@material-ui/core/styles';

// Core Wallet Pages + Header
// import Auth from './Auth'
import Dashboard from './Dashboard'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  page: {
    textAlign: 'center',
    paddingTop: theme.spacing(5),
  }
});

class App extends Component {
  /** ACTIONS TO PERFORM ON LOAD */
  componentDidMount = () => {
  }

  render() {

    const { 
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.main}>
            <Dashboard />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
