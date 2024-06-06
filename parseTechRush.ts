import { DOMParser, Element, Node } from "jsr:@b-fuze/deno-dom";

export const parseTechRush = (techRushHTML: string) => {
    const doc = new DOMParser().parseFromString(techRushHTML, 'text/html')

    const articles = doc.querySelector('.articles')

    if (!articles) {
        throw new Error('Could not find article container')
    }


    const parsedArticles = Array.from(articles.querySelectorAll('article')).flatMap((item: Node) => {
        const article = item as Element
        const link = article.querySelector('h2 a')

        if (!link) {
            console.log('Could not find link for article ', item)
            return []
        }

        const title = link.innerText.trim()
        const href = link.getAttribute('href')

        return [{
            title,
            href
        }]
    })

    console.log(parsedArticles)
}
