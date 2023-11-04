import { IExecDataProtector } from "@iexec/dataprotector";

interface GrantEmailParams {
  provider: any;
  email: string;
  authorizedUser: string;
  numberOfAccess: number;
  pricePerAccess: number;
}

export async function grantEmailAccess({
  email,
  provider,
  authorizedUser,
  numberOfAccess,
  pricePerAccess,
}: GrantEmailParams) {
  const dataProtector = new IExecDataProtector(provider);

  const protectedEmail = await dataProtector.protectData({
    data: {
      email,
    },
  });

  console.log("Protected email", protectedEmail);

  const grantedAccess = await dataProtector.grantAccess({
    protectedData: protectedEmail.address,
    authorizedApp: "web3mail.apps.iexec.eth",
    authorizedUser,
    numberOfAccess,
    pricePerAccess,
  });

  return grantedAccess;
}
