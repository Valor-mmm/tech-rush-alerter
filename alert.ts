import sendGrid from "@sendgrid/mail";
import { load } from "@std/dotenv";
import { TechRushTestProduct } from "./parseTechRush.ts";

export const sendTechRushAlert = async (
  newProducts: TechRushTestProduct[],
): Promise<void> => {
  if (newProducts.length === 0) {
    return;
  }

  const env = await load();

  const templateId = env.TECH_RUSH_MAIL_TEMPLATE;
  const apiKey = env.TECH_RUSH_MAIL_API_KEY;
  const mailSender = env.TECH_RUSH_MAIL_SENDER;
  const mailReceiver = env.TECH_RUSH_MAIL_RECEIVER;

  sendGrid.setApiKey(apiKey);

  const msg = {
    to: mailReceiver,
    from: mailSender,
    templateId: templateId,
    dynamicTemplateData: {
      products: newProducts,
    },
  };

  sendGrid
    .send(msg)
    .then(() => {
      console.log(`Email sent with ${newProducts.length} products.`);
    })
    .catch((error: any) => {
      throw error;
    });
};
