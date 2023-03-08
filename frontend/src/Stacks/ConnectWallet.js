import React from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });
export const authOptions = {
  appDetails: {
    name: "Stacks React Starter",
    icon: window.location.origin + "/logo512.png",
  },
  redirectTo: "/",
  onFinish: () => {
    window.location.reload();
  },
  userSession,
}

function authenticate() {

  // authenticate the user

  showConnect(
    authOptions
  );
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
      </div>
    );
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export { authenticate, disconnect, ConnectWallet };
