"use client";

import { ChainSwitch } from "@/components/chain-switch";
import Subscribe from "@/components/subscribe";
import { WalletStatus } from "@/components/wallet/wallet-status";

interface EditorPageProps {
  params: { address: string };
}

export default function Home(params: EditorPageProps) {
  console.log("Params: ", params);

  return (
    <div className="mt-10 flex flex-col gap-8">
      <div className="mx-auto flex h-10 gap-2 duration-100 fade-in">
        <ChainSwitch />
        <WalletStatus />
      </div>
      <Subscribe authorizedUser={params.params.address} senderName="" />
    </div>
  );
}
