import { zodResolver } from "@hookform/resolvers/zod";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { grantEmailAccess } from "@/lib/iexec";
import { cn } from "@/lib/utils";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const subscribeSchema = z.object({
  email: z.string().email(),
  numberOfAccess: z.string().regex(/^\d+$/),
  pricePerAccess: z.string(),
});

type SubscribeData = z.infer<typeof subscribeSchema>;

interface SubscribeProps {
  authorizedUser: string;
  senderName?: string;
}

export default function Subscribe({ authorizedUser, senderName }: SubscribeProps) {
  const { open } = useWeb3Modal();
  const { connector, address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const provider = await connector?.getProvider();

    console.log("Authorized user: ", authorizedUser);
    console.log("Provider: ", provider);
    console.log("Email: ", data.email);

    try {
      const grantedAccess = await grantEmailAccess({
        provider,
        authorizedUser,
        email: data.email,
        numberOfAccess: Number(data.numberOfAccess),
        pricePerAccess: Number(data.pricePerAccess),
      });

      console.log("Granted access: ", grantedAccess);

      const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          userAddress: authorizedUser,
          numberOfAccess: Number(data.numberOfAccess),
          pricePerEmail: Number(data.pricePerAccess),
        }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      const json = await response.json();
      console.log("Response: ", json);

      reset();

      toast({
        title: "Subscribed!",
        description: `You are subcribed ${senderName ? "to " + senderName : ""}!`,
        variant: "default",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Something went wrong.",
        description: "Please retry in a few minutes",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  });

  return (
    <div className="mx-auto max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            // disabled={isLoading || isGitHubLoading}
            {...register("email")}
          />
          {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
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
            // disabled={isLoading || isGitHubLoading}
            {...register("numberOfAccess")}
          />
          {errors?.numberOfAccess && (
            <p className="px-1 text-xs text-red-600">{errors.numberOfAccess.message}</p>
          )}
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
            // disabled={isLoading || isGitHubLoading}
            {...register("pricePerAccess")}
          />
          {errors?.pricePerAccess && (
            <p className="px-1 text-xs text-red-600">{errors.pricePerAccess.message}</p>
          )}
        </div>
        {isConnected ? (
          <button
            className={cn(buttonVariants(), {
              "cursor-not-allowed opacity-60": isLoading,
            })}
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Subscribe {senderName && `to ${senderName}`}
          </button>
        ) : (
          <Button type="button" onClick={() => open()}>
            Connect Wallet
          </Button>
        )}
      </form>
    </div>
  );
}
