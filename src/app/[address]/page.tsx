"use client";

import { useAccount } from "wagmi";

import { ChainSwitch } from "@/components/chain-switch";
import FakeSubscribe from "@/components/fake-subscribe";

interface EditorPageProps {
  params: { address: string };
}

export default function Home(params: EditorPageProps) {
  const { isConnecting, isReconnecting } = useAccount();

  console.log("Params: ", params);

  return (
    <div className="mt-10 flex flex-col gap-8">
      <div className="mx-auto flex h-10 gap-2 duration-100 fade-in">
        {!isConnecting && !isReconnecting && <ChainSwitch />}
      </div>
      <FakeSubscribe address={params.params.address} />
    </div>
  );
}
