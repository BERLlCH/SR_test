const { JSDOM } = require("jsdom")
const request = require("request")
const fs = require("fs/promises");

function selectorService(document, selectors){

}

const createParser = (document) => (selector, transform) => {
    const data = document.querySelectorAll(selector);
    return transform(data)
}



async function bootstrap(){
    const url = "https://www.amazon.com/dp/B09YHPR8BS";
    const dom = await JSDOM.fromURL(url);
    const document = dom.window.document;
    const parser = createParser(document);

    const data = {
        asin: parser(
            '#productDetails_detailBullets_sections1 > tbody > tr > td',
            (data) => data[2].textContent.trim()),
        bestSellerRank: parser(
            "i.p13n-best-seller-badge",
            (data) => data.length) > 0,
        answeredQuestions: parser(
            "#askATFLink > span",
            (data) => Number(data[0].innerHTML.split(" ")[1])),
        images: parser(
            ".imgTagWrapper > img",
            (data) => Array.from(data).map(item => item.src)),
        variations: {
            total: parser(
                ".swatchAvailable, .swatchSelect",
                (data) => data.length),
            product: parser(
                ".swatchAvailable, .swatchSelect",
                (data) => Array.from(data.length, (item) => ({
                    asin: item.dataset.defaultasin,
                    image: item.querySelector('.imgSwatch').src,
                    price: item.querySelector('.olpMessageWrapper')
                        ? item.querySelector('.olpMessageWrapper').textContent.split("$").at(-1)
                        : "N/D"
                })))
        },
        detailed: parser(".a-span9", (data) => ({
            brand: data[0].textContent.trim(),
            color: data[1].textContent.trim(),
            formfactor: data[2].textContent.trim(),
            compatiblePhoneModels: JSON.parse(data[3].querySelector('.a-declarative')
                .getAttribute('data-a-modal'))
                .inlineContent,
            material: data[4].textContent.trim(),
        })),
        bulletPoints: parser(
            "#feature-bullets > ul > li > span",
            (data) => Array.from(data).map(item => item.innerHTML.trim())),
        productInfo: parser(
            "#productDetails_detailBullets_sections1 > tbody > tr",
            (data) => {
                const res = {}

                data.forEach((item) => {
                    const title = item.querySelector("th").textContent.replaceAll(" ", "")
                    if(title === "ItemWeight"){
                        const [val, type] = item.querySelector("td").textContent.trim().split(" ")
                        res[title] = {val, type}
                    } else if(title === "BestSellersRank"){
                        const list = item.querySelectorAll("td > span > span")
                        res[title] = Array.from(list).map((item) => ({
                            val: item.textContent.match(/^#\d+/)[0],
                            category: item.querySelector("a").textContent.trim(),
                            url: item.querySelector("a").href || "N/A"
                        }))
                    } else if(title !== "CustomerReviews"){
                        res[title] = item.querySelector("td").textContent.trim()
                    }
                })
                return res
            }),
        ratings: {
            rate: parser(
                "#averageCustomerReviews",
                (data) => Number(data[1].textContent.trim().split(" ")[0])
            ),
            maxRate: parser(
                "#averageCustomerReviews",
                (data) => Number(data[1].textContent.trim().split(" ")[3])
            ),
            totalRate: parser(
                "#averageCustomerReviews > span > a > span",
                (data) => Number(data[0].textContent.split(" ")[0].replace(",", ""))
            ),
            byStars: parser(
                "#histogramTable > tbody > tr > .a-nowrap > span > .a-link-normal",
                (data) => Array.from(data.length, (item) => ({
                    [item.attributes.title.textContent.split(" ")[0].trim()]:
                    item.attributes.title.textContent.split(" ")[3].trim(),
                })))
        },
        reviewsThatMention: parser(
            "[data-csa-c-type] > [data-reftag]",
            (data) => Array.from(data, (item) => ({
                val: item.getElementById("cr-lighthouse-term-touch_screen").textContent,
                url: item.href
            }))
        ),
        reviews: {
            total: "N/D",
            list: parser(
                "#cm-cr-dp-review-list > div",
                (data) => Array.from(data, (item) => ({
                    user:{
                        name: item.querySelector("div > div > div > a > div > span").textContent,
                        url: item.querySelector("div > div > div > .a-profile").href
                    },
                    body: {
                        title: item.querySelector(".review-title").textContent
                            .replace(/\n/g, "").trim(),
                        country: item.querySelector(".celwidget > span.review-date")
                            .textContent.match(/n [^]+ o/g)[0].slice(2, -2),
                        verified: !!item.querySelector("span.a-size-mini.a-color-state.a-text-bold"),
                        color: item.querySelector(".review-format-strip > .a-color-secondary").textContent
                            .match(/ [^]+/g)[0],
                        body: item.querySelector(".reviewText > span").textContent,
                        helpful: item.querySelector(".a-size-base.a-color-tertiary.cr-vote-text") ?
                            item.querySelector(".a-size-base.a-color-tertiary.cr-vote-text").textContent
                                .match(/[^]+ p/g)[0].split(' ')[0] :
                            "N/D"
                    }
                }))
                )
        }
    }
    // console.log(data.reviews.list)
    parser("#productDetails_detailBullets_sections1 > tbody > tr", (data) => console.log(data[0].innerHTML))
    await fs.writeFile("./result.json", JSON.stringify(data, null, 2))
}


bootstrap()

// function test(){
//     const url = "https://www.amazon.com/dp/B09YHPR8BS"
//     request(url, (err, res, body) => {
//         if (err) {
//             console.log('error: ', err);
//             return;
//         }
//         const dom = new JSDOM(body);
//         // console.log(body)
//         console.log(dom.window.document.body.children.length);
//     });
// }
// test()

// async function axiostest(){
//     const axios = require('axios'); //15k (gzipped: 5.1k)
//     const cheerio = require('cheerio');
//     const https = require('https');
//
//     let fs = require('fs');
//
//     const httpsAgent = new https.Agent({ keepAlive: true });
//
//     const page = await axios.get('https://www.amazon.com/dp/B09YHPR8BS', {
//             httpsAgent,
//             params: {
//                 cat_id: '876',
//             },
//             headers: {
//                 'Accept-Encoding': 'gzip, deflate, br',
//             },
//             //is the same as set the entire url
//     })
//
//     const dom = new JSDOM(page, { runScripts: "dangerously" });
//     console.log(dom.window.document.querySelectorAll(".a-span9")[1].textContent.trim())
//
// }
//
// axiostest()