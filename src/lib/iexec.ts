import { IExecDataProtector } from "@iexec/dataprotector";
import { IExecWeb3mail, Contact } from "@iexec/web3mail";

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

interface SendEmailParams {
  provider: any;
  subject: string;
  content: string;
  senderName: string;
}

export async function sendEmails({ provider, content, subject, senderName }: SendEmailParams) {
  const web3mail = new IExecWeb3mail(provider);

  const contacts: Contact[] = await web3mail.fetchMyContacts();

  console.log("Contacts", contacts);

  const promises = contacts.map((contact) =>
    web3mail.sendEmail({
      protectedData: contact.address,
      emailSubject: subject,
      emailContent: content,
      contentType: "text/html",
      senderName,
    }),
  );

  const sentMails = await Promise.all(promises);

  return sentMails;
}
