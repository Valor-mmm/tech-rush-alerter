import { TechRushTestProduct } from "./parseTechRush.ts";

export const getNewEntries = (
  previous: TechRushTestProduct[],
  current: TechRushTestProduct[],
): TechRushTestProduct[] =>
  current.filter((currentProduct) => {
    const currentProductInPrevious = previous.find((previousProduct) =>
      previousProduct.title === currentProduct.title
    );
    return !currentProductInPrevious;
  });
