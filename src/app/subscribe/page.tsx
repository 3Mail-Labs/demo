"use client";

import { ChainSwitch } from "@/components/chain-switch";
import Subscribe from "@/components/subscribe";
import { WalletStatus } from "@/components/wallet/wallet-status";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col gap-8">
      <div className="mx-auto flex h-10 gap-2 duration-100 fade-in">
        <ChainSwitch />
        <WalletStatus />
      </div>
      <Subscribe
        authorizedUser="0x26FddC1C2c84e61457734a17C6818a6E063644ec"
        senderName="Yo Protocol"
      />
    </div>
  );
}
