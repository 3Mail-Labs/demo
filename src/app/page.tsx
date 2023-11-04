"use client";

import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { grantEmailAccess, sendEmails } from "@/lib/iexec";

export default function Home() {
  const { connector } = useAccount();

  const onSubscribe = async () => {
    const provider = await connector?.getProvider();
    const grantedAccess = await grantEmailAccess({
      provider,
      authorizedUser: "0x8d960334c2EF30f425b395C1506Ef7c5783789F3",
      email: "mattiapomelli@gmail.com",
      numberOfAccess: 1,
    });

    console.log("Granted access: ", grantedAccess);
  };

  const sendEmail = async () => {
    const sentEmails = await sendEmails({
      privateKey: "8b627bd03db5a0f05cfd2154361e2468db36cfae67986252c55e13e351f2d1e2",
      content: "Hello from iExec",
      subject: "Subject",
      senderName: "3mail",
    });

    console.log("Sent emails: ", sentEmails);
  };

  return (
    <div>
      <Button onClick={onSubscribe} className="mt-10">
        Subscribe
      </Button>
      <Button onClick={sendEmail} className="mt-10">
        Send email
      </Button>
    </div>
  );
}
