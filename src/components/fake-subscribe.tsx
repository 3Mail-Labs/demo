"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FakeSubscribe() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (isConnected) {
        router.push("/subscribe");
      }
    });
  }, [router, isConnected]);

  const onConnect = async () => {
    await open();

    setTimeout(() => {
      router.push("/subscribe");
    }, 500);
  };

  return (
    <div className="mx-auto max-w-sm">
      <form className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            placeholder="My project"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="numberOfAccess" className="mb-2 block">
            Number of emails (how many emails the sender can send you)
          </Label>
          <Input
            id="numberOfAccess"
            type="number"
            autoCapitalize="none"
            autoCorrect="off"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="pricePerAccess" className="mb-2 block">
            Price per email
          </Label>
          <Input
            id="pricePerAccess"
            type="number"
            autoCapitalize="none"
            autoCorrect="off"
            step={0.01}
            disabled
          />
        </div>
        <Button type="button" onClick={() => onConnect()}>
          Connect Wallet
        </Button>
      </form>
    </div>
  );
}
