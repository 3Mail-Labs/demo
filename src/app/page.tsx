"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";

// import { Subscribe } from "@/components/subscribe";

export default function Home() {
  const { open } = useWeb3Modal();

  useEffect(() => {
    open();
  }, [open]);

  return (
    <div>
      {/* <Subscribe
        authorizedUser="0x26FddC1C2c84e61457734a17C6818a6E063644ec"
        senderName="Yo Protocol"
      /> */}
    </div>
  );
}
