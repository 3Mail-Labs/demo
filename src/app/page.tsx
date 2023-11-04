"use client";

// import { useAccount } from "wagmi";

// import { Subscribe } from "@/components/subscribe";
// import { Button } from "@/components/ui/button";
// import { sendEmails } from "@/lib/iexec";

export default function Home() {
  // const { connector } = useAccount();

  // const sendEmail = async () => {
  //   const provider = await connector?.getProvider();

  //   const sentEmails = await sendEmails({
  //     provider,
  //     content: "Hello from iExec!!",
  //     subject: "Subject",
  //     senderName: "3mail",
  //   });

  //   console.log("Sent emails: ", sentEmails);
  // };

  return (
    <div>
      {/* <Subscribe authorizedUser="0x0F45421E8DC47eF9edd8568a9D569b6fc7Aa7AC6" senderName="AAVE" /> */}
      {/* <Button onClick={sendEmail} className="mt-10">
        Send email
      </Button> */}
    </div>
  );
}
