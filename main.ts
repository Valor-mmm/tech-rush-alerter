import { fetchPage } from "./fetchPage.ts";
import { parseTechRush, TechRushTestProduct } from "./parseTechRush.ts";
import { getPreviousResult, saveResult } from "./history.ts";
import { getNewEntries } from "./techRushDiff.ts";
import { sendTechRushAlert } from "./alert.ts";

type TechRushParseResult = {
  testProducts: TechRushTestProduct[];
};

const main = async (): Promise<void> => {
  const pageText = await fetchPage(
    "https://techrush.de/category/produkttests/",
  );

  const techRushResult = parseTechRush(pageText);
  const previousResult = await getPreviousResult<TechRushParseResult>(
    "techRushTestProducts",
  );

  const newEntries = previousResult?.testProducts
    ? getNewEntries(previousResult.testProducts, techRushResult)
    : techRushResult;

  await sendTechRushAlert(newEntries);

  await saveResult<TechRushParseResult>("techRushTestProducts", {
    testProducts: techRushResult,
  });
};

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await Deno.cron(
    "Check for new products",
    { hour: { every: 5 } },
    async () => {
      console.log("Checking for new products ", new Date().toISOString());
      await main();
    },
  );
}
