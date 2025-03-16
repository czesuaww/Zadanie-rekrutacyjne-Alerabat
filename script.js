const { Browser, Builder, By } = require('selenium-webdriver');
const fs = require('fs');

(async function isCodeValid() {
    const validCodes = [];

    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    const codes = ["RABAT10", "RABAT20", "DISCOUNT50", "PROMO25", "SALE30", "BONUS15", "SHOP5", "EXTRA40", "WELCOME2024", "VIPDEAL"];

    try {
        for (const code of codes) {
            await driver.get('https://dev-shop-integration.alerabat.com/');

            const divContainer = await driver.findElement(By.css("main > div:nth-of-type(2)"));
            const input = await divContainer.findElement(By.css('input'));

            await input.clear();
            await input.sendKeys(code);
            await divContainer.findElement(By.css('button')).click();

            const successMessage = await divContainer.findElement(By.css('p:nth-of-type(2)')).getText();
            if (!successMessage.includes('Do zapłaty: 100 zł')) validCodes.push(code);
        }
    }
    catch (error) {
        console.error('Something went wrong:', error);
    }
    finally {
        fs.writeFileSync('valid_codes.txt', validCodes.join('\n'));
    }
})();