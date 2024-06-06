import { DOMParser, Element, Node } from "jsr:@b-fuze/deno-dom";

// https://regex101.com/r/iBRWqe/
const titleRegex = /^.*?:\s?(?<product>.+)$/;

export interface TechRushTestProduct {
  title: string;
  href: string | null;
}

const parseTitle = (title: string): string => {
  const match = titleRegex.exec(title);

  return match?.groups?.product ?? title;
};

export const parseTechRush = (techRushHTML: string): TechRushTestProduct[] => {
  const doc = new DOMParser().parseFromString(techRushHTML, "text/html");

  const articles = doc.querySelector(".articles");

  if (!articles) {
    throw new Error("Could not find article container");
  }

  return Array.from(articles.querySelectorAll("article")).flatMap(
    (item: Node) => {
      const article = item as Element;
      const link = article.querySelector("h2 a");

      if (!link) {
        console.log("Could not find link for article ", item);
        return [];
      }

      const title = link.innerText.trim();
      const href = link.getAttribute("href");

      return [{
        title: parseTitle(title),
        href,
      }];
    },
  );
};
