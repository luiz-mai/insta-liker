require('dotenv').config()
const puppeteer = require('puppeteer');

(async () => {
    const email = process.env.FACEBOOK_EMAIL
    const password = process.env.FACEBOOK_PASSWORD
    const photosToLike = process.env.N_PHOTOS_TO_LIKE
    const tagToSearch = process.env.TAG_TO_SEARCH

    const instagramHomeURL = "https://instagram.com"
    const instagramExploreURL = "https://instagram.com/explore"
    const instagramTagURL = "https://www.instagram.com/explore/tags/{tag}"

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    //   const browser = await puppeteer.launch( {headless: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    await page.goto(instagramHomeURL);
    await page.waitFor("form[method=post] button")
    await page.click("form[method=post] button")

    await page.waitFor("form#login_form")
    await page.type("form#login_form input#email", email)
    await page.type("form#login_form input#pass", password)

    await Promise.all([
        await page.click("form#login_form button[type=submit]"),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    if(tagToSearch) {
        await page.goto(instagramTagURL.replace("{tag}", tagToSearch))
    } else {
        await page.goto(instagramExploreURL)
    }
    await page.waitFor("article img")
    await page.click("article img")

    let counter = 0

    for(counter = 0; counter < photosToLike; counter++){
        await page.waitFor("article button span")
        await page.click("article button span")
        await page.waitFor(500)
        await page.waitFor(".coreSpriteRightPaginationArrow")
        await page.click(".coreSpriteRightPaginationArrow")
    }

    await page.close()
    await browser.close();
})();