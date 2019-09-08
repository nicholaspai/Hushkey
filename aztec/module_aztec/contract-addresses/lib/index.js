"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('lodash'),
    isUndefined = _require.isUndefined;

var rinkebyAddresses = require('../addresses/rinkeby');

var ropstenAddresses = require('../addresses/ropsten');

var NetworkId = {
  Mainnet: '1',
  Ropsten: '3',
  Rinkeby: '4',
  Ganache: '1234'
};
var networkToAddresses = {
  '3': _objectSpread({}, ropstenAddresses),
  '4': _objectSpread({}, rinkebyAddresses)
};
/**
 * Used to get addresses of contracts that have been deployed to either the
 * Ethereum mainnet or a supported testnet. Throws if there are no known
 * contracts deployed on the corresponding network.
 * @param networkId The desired networkId.
 * @returns The set of addresses for contracts which have been deployed on the
 * given networkId.
 */

var getContractAddressesForNetwork = function getContractAddressesForNetwork(networkId) {
  if (isUndefined(networkToAddresses[networkId])) {
    throw new Error("Unknown network id (".concat(networkId, "). No known AZTEC contracts have been deployed on this network."));
  }

  return networkToAddresses[networkId];
};

module.exports = {
  getContractAddressesForNetwork: getContractAddressesForNetwork,
  NetworkId: NetworkId
};