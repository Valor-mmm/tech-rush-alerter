import sendGrid from "@sendgrid/mail";
import { TechRushTestProduct } from "./parseTechRush.ts";
import { getEnvValue } from "./envHandler.ts";

export const sendTechRushAlert = async (
  newProducts: TechRushTestProduct[],
): Promise<void> => {
  if (newProducts.length === 0) {
    return;
  }

  const templateId = await getEnvValue("TECH_RUSH_MAIL_TEMPLATE");
  const apiKey = await getEnvValue("TECH_RUSH_MAIL_API_KEY");
  const mailSender = await getEnvValue("TECH_RUSH_MAIL_SENDER");
  const mailReceiver = await getEnvValue("TECH_RUSH_MAIL_RECEIVER");

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
