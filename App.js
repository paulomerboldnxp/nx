
import React, { useState, useEffect } from 'react';
import { generateBitcoinPaymentRequest, validateBitcoinAddress } from './bitcoinUtils';
import QRCode from 'qrcode.react';

function App() {
  const [usdAmount, setUsdAmount] = useState(50);
  const [paymentUri, setPaymentUri] = useState('');
  const bitcoinAddress = '1BoatSLRHtKNngkdXEeobR76b53LETtpyT';
  const memo = 'Pagamento de exemplo';

  useEffect(() => {
    const generatePaymentUri = async () => {
      if (!validateBitcoinAddress(bitcoinAddress)) return;
      const uri = generateBitcoinPaymentRequest(usdAmount, bitcoinAddress, memo);
      setPaymentUri(uri);
    };
    generatePaymentUri();
  }, [usdAmount]);

  return (
    <div className="App">
      <h2>Pagamento com Bitcoin</h2>
      <p>Valor: ${usdAmount} USD</p>
      <QRCode value={paymentUri} size={200} />
      <input
        type="number"
        value={usdAmount}
        onChange={(e) => setUsdAmount(Number(e.target.value))}
        className="input-amount"
      />
    </div>
  );
}

export default App;
