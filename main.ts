import {fetchPage} from "./fetchPage.ts";
import {parseTechRush} from "./parseTechRush.ts";

const main = async (): Promise<void> => {
  const pageText = await fetchPage('https://techrush.de/category/produkttests/')
  parseTechRush(pageText)

}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main()
}
