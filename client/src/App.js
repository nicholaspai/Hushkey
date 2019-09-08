import React, { Component } from 'react';
import './App.css';
import withRoot from './withRoot';
import PropTypes from 'prop-types';

// Material-ui
import { withStyles } from '@material-ui/core/styles';

// Redux state
import { connect } from "react-redux";
import { PAGES } from "./store/globalActions";

// Core Wallet Pages + Header
import Auth from './Auth'
import Dashboard from './Dashboard'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  page: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
  }
});

// Redux mappings
const mapState = state => ({
  page: state.global.page,
});

const mapDispatch = dispatch => ({
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  /** ACTIONS TO PERFORM ON LOAD */
  componentDidMount = async () => {
  }

  render() {

    const { 
      classes,
      page 
    } = this.props;

    return (
      <div className={classes.root}>
        { page === PAGES.AUTH ? (
          <div className={classes.main}>
            <Auth />
          </div>
        ): ("")}
        { page === PAGES.DASHBOARD ? (
          <div className={classes.main}>
            <Dashboard />
          </div>
        ): ("")}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(connect(mapState, mapDispatch)(withStyles(styles)(App)));
