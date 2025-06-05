import React, { useState } from "react";
import WalletConnectModal from "./WalletConnectModal";

const ConnectWalletButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="wallet-connect-btn">
        Connect Wallet
      </button>
      <WalletConnectModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ConnectWalletButton;
