"use strict";

/**
 * Wrapper around elliptic.js implemenation of the secp256k1 curve
 *
 * @module secp256k1
 */
var BN = require('bn.js');

var crypto = require('crypto');

var elliptic = require('elliptic');

var web3Utils = require('web3-utils');
/**
 * @typedef {Object} Account
 * @property {string} privateKey hex-formatted private key
 * @property {string} publicKey hex-formatted public key (uncompressed)
 * @property {string} address ethereum address of account
 */


var secp256k1 = {};
/**
 * The elliptic.js ec object
 * @memberof module:secp256k1
 */

secp256k1.ec = new elliptic.ec('secp256k1'); // eslint-disable-line new-cap

secp256k1.curve = secp256k1.ec.curve;
/**
 * Derive an ethereum account from a private key
 * @method accountFromPrivateKey
 * @memberof module:secp256k1
 * @param privateKey hex-formatted private key
 * @return {module:secp256k1~Account} an ethereum account
 */

secp256k1.accountFromPrivateKey = function (privateKey) {
  var ecKey = secp256k1.ec.keyFromPrivate(privateKey.slice(2), 'hex');
  var publicKey = "0x".concat(ecKey.getPublic(false, 'hex').slice(2)); // remove elliptic.js encoding byte

  var publicHash = web3Utils.sha3(publicKey);
  var address = web3Utils.toChecksumAddress("0x".concat(publicHash.slice(-40)));
  return {
    privateKey: privateKey,
    publicKey: "0x".concat(ecKey.getPublic(false, 'hex')),
    address: address
  };
};
/**
 * Generate a random ethereum account
 * @method generateAccount
 * @memberof module:secp256k1
 * @return {module:secp256k1~Account} an ethereum account
 */


secp256k1.generateAccount = function () {
  return secp256k1.accountFromPrivateKey("0x".concat(crypto.randomBytes(32).toString('hex')));
};
/**
 * Get a random point on the curve
 * @method randomPoint
 * @memberof module:secp256k1
 * @returns {Point} a random point
 */


secp256k1.randomPoint = function () {
  function recurse() {
    var x = new BN(crypto.randomBytes(32), 16).toRed(secp256k1.ec.curve.red);
    var y2 = x.redSqr().redMul(x).redIAdd(secp256k1.ec.curve.b);
    var y = y2.redSqrt();

    if (y.redSqr(y).redSub(y2).cmp(secp256k1.ec.curve.a)) {
      return recurse();
    }

    return secp256k1.ec.curve.point(x, y);
  }

  return recurse();
};
/**
 * Decompress a 256-bit representation of a secp256k1 G1 element.
 *   The first variable defines the x-coordinate. The most significant bit defines whether the
 *   y-coordinate is odd
 *
 * @method decompress
 * @param {BN} compressed 256-bit compressed coordinate in BN form
 * @returns {Object.<BN, BN>} x and y coordinates of point, in BN form
 */


secp256k1.decompress = function (compressed, yBit) {
  var x = compressed.maskn(255).toRed(secp256k1.curve.red);
  var y2 = x.redSqr().redMul(x).redIAdd(secp256k1.curve.b);
  var yRoot = y2.redSqrt();

  if (yRoot.redSqr().redSub(y2).fromRed().cmpn(0) !== 0) {
    throw new Error('x^3 + 3 not a square, malformed input');
  }

  var y = yRoot.fromRed();

  if (Boolean(y.isOdd()) !== Boolean(yBit.eq(new BN(1)))) {
    y = secp256k1.curve.p.sub(y);
  }

  return {
    x: x.fromRed(),
    y: y
  };
};
/**
 * Decompress a 256-bit representation of a secp256k1 G1 element.
 *   The first variable defines the x-coordinate. The most significant bit defines whether the
 *   y-coordinate is odd
 *
 * @method decompress
 * @param {BN} compressed 256-bit compressed coordinate in BN form
 * @returns {Object.<BN, BN>} x and y coordinates of point, in BN form
 */


secp256k1.decompressHex = function (compressed) {
  if (compressed.length !== 66) {
    throw new Error("expected compressed secp256k1 element ".concat(compressed, " to have length 66"));
  }

  var x = new BN(compressed.slice(0, 64), 16).toRed(secp256k1.curve.red);
  var yBit = new BN(compressed.slice(64, 66), 16);
  var y2 = x.redSqr().redMul(x).redIAdd(secp256k1.curve.b);
  var yRoot = y2.redSqrt();

  if (yRoot.redSqr().redSub(y2).fromRed().cmpn(0) !== 0) {
    throw new Error('x^3 + 3 not a square, malformed input');
  }

  var y = yRoot.fromRed();

  if (Boolean(y.isOdd()) !== Boolean(yBit.eq(new BN(1)))) {
    y = secp256k1.curve.p.sub(y);
  }

  return secp256k1.curve.point(x.fromRed(), y);
};
/**
 * Compress a secp256k1 point into 33 bytes.
 *
 * @method compress
 * @param {Point} point secp256k1 group element
 * @returns {string} hex-formatted compressed point
 */


secp256k1.compress = function (point) {
  var compressed = web3Utils.padLeft(point.x.fromRed().toString(16), 64);

  if (point.y.fromRed().testn(0)) {
    return "0x".concat(compressed, "01");
  }

  return "0x".concat(compressed, "00");
};

secp256k1.ecdsa = {};
/**
 * Convert an Ethereum public key into an address
 *
 * @method accountFromPublicKey
 * @memberof module:secp256k1.ecdsa
 * @param {string} publicKey hex-string formatted public key (uncompressed)
 * @returns {string} address
 */

secp256k1.ecdsa.accountFromPublicKey = function (publicKey) {
  var publicHash;

  if (typeof publicKey === 'string') {
    publicHash = web3Utils.sha3("0x".concat(publicKey.slice(4)));
  } else {
    var ecKey = secp256k1.ec.keyFromPublic(publicKey);
    var publicKeyHex = "0x".concat(ecKey.getPublic(false, 'hex').slice(2));
    publicHash = web3Utils.sha3(publicKeyHex);
  }

  var address = web3Utils.toChecksumAddress("0x".concat(publicHash.slice(-40)));
  return address;
};
/**
 * Sign a message hash with a given private key
 *
 * @method signMessage
 * @memberof module:secp256k1.ecdsa
 * @param {string} hash hex-string formatted message hash
 * @param {string} privateKey hex-string formatted private key
 * @returns {string[]} ECDSA signature parameters [v, r, s], formatted as 32-byte wide hex-strings
 */


secp256k1.ecdsa.signMessage = function (hash, privateKey) {
  var signature = secp256k1.ec.keyFromPrivate(Buffer.from(privateKey.slice(2), 'hex')).sign(Buffer.from(hash.slice(2), 'hex'), {
    canonical: true
  });
  return ["0x".concat(web3Utils.padLeft(Number(27 + Number(signature.recoveryParam)).toString(16), 64)), "0x".concat(web3Utils.padLeft(signature.r.toString(16), 64)), "0x".concat(web3Utils.padLeft(signature.s.toString(16), 64))];
};
/**
 * Verify an ECDSA signature against a publickey
 *
 * @method verifyMessage
 * @memberof module:secp256k1.ecdsa
 * @param {string} hash hex-string formatted message hash
 * @param {string} r hex-string formatted ECDSA parameter r
 * @param {string} s hex-string formatted ECDSA parameter s
 * @param {string} publicKey hex-string formatted public key (uncompressed)
 * @returns {bool} true if signature signed by publicKey, false otherwise
 */


secp256k1.ecdsa.verifyMessage = function (hash, r, s, publicKey) {
  var rBn = new BN(r.slice(2), 16);
  var sBn = new BN(s.slice(2), 16);
  return secp256k1.ec.verify(hash.slice(2), {
    r: rBn,
    s: sBn
  }, secp256k1.ec.keyFromPublic(publicKey.slice(2), 'hex'));
};
/**
 * Recover the signing key of an ECDSA signature
 *
 * @method recoverPublicKey
 * @memberof module:secp256k1.ecdsa
 * @param {string} hash hex-string formatted message hash
 * @param {string} r hex-string formatted ECDSA parameter r
 * @param {string} s hex-string formatted ECDSA parameter s
 * @param {string} vn hex-string ECDSA parameter v
 * @returns {Object} elliptic.js public key object of message signer
 */


secp256k1.ecdsa.recoverPublicKey = function (hash, r, s, v) {
  var rBn = new BN(r.slice(2), 16);
  var sBn = new BN(s.slice(2), 16);
  var vn = new BN(v.slice(2), 16).toNumber();
  var ecPublicKey = secp256k1.ec.recoverPubKey(Buffer.from(web3Utils.padLeft(hash.slice(2), 64), 'hex'), {
    r: rBn,
    s: sBn
  }, vn < 2 ? vn : 1 - vn % 2);
  return ecPublicKey;
};

module.exports = secp256k1;