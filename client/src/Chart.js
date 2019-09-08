import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

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

export default function Chart() {
  return (
    <React.Fragment>
      <Title>
        Hushkey is custody as a service, enabling dApp developers 
        and especially crypto novices to sign blockchain transactions without
        their private keys ever being exposed to networks or leaving the server. The Hushkey servers generate a 
        secure hierarchical deterministic wallet (implementing BIP32+44+39) for each
        unique user. The wallet is essentially a master seed phrase that we securely store. 
        The generation of individual keys is deterministically derived from this master seed,
        so that users can recover their keys in case of wallet loss. Additionally,
        the private keys of the wallet should be organized under an access hierarchy. Each element of the hierarchy corresponds to a group of users and a
        pair of signing keys associated with them. The privileges of a group of users depend on their
        level in the hierarchy. Users with higher privileges should be able
        to derive the keys of users on lower levels and in turn to sign messages (i.e., transactions) on
        their behalf. Users on lower levels, however, should not be able to escalate their privileges to
        the higher levels of the hierarchy, not even when colluding with others. Finally, we add in features
        that enhance security and privacy for the user using AZTEC for disguising Ethereum transactions,
        whitelisting to restrict contract interactions with trusted addresses only, and transfer limits
        to reduce worst-case loss scenarios. End users can sign arbitrary blockchain transactions via the Hushkey API interface. 
        Crucially, the only data that leaves the Hushkey server are signed transactions, not keys.
        </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}