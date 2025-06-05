import React, { useState } from "react";
import { transferLisk } from "../lib/lisk-transactions";

const TransferButton: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleTransfer = async () => {
    const result = await transferLisk(recipient, amount);
    alert(result.success ? `Transaction ID: ${result.transactionId}` : `Error: ${result.error}`);
  };

  return (
    <div>
      <input placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleTransfer}>Send Lisk</button>
    </div>
  );
};

export default TransferButton;
