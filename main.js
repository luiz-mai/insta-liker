const puppeteer = require('puppeteer');

(async () => {
    const email = "xxx"
    const password = "xxx"
    const browser = await puppeteer.launch({ headless: false });
    //   const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com');
    await page.waitFor("form[method=post] button")
    await page.click("form[method=post] button")

    await page.waitFor("form#login_form")
    await page.type("form#login_form input#email", email)
    await page.type("form#login_form input#pass", password)

    await Promise.all([
        await page.click("form#login_form button[type=submit]"),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);


    await page.goto('https://instagram.com/explore');

    await browser.close();
})();