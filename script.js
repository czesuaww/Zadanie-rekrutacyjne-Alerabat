const { Browser, Builder, By } = require('selenium-webdriver');
const fs = require('fs');

(async function isCodeValid() {
    const validCodes = [];

    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    const codes = ["RABAT10", "RABAT20", "DISCOUNT50", "PROMO25", "SALE30", "BONUS15", "SHOP5", "EXTRA40", "WELCOME2024", "VIPDEAL"];

    try {
        for (const code of codes) {
            await driver.get('https://dev-shop-integration.alerabat.com/');

            const input = await driver.findElement(By.className('p-2'));
            await input.clear();
            await input.sendKeys(code);
            await driver.findElement(By.className('bg-blue-500')).click();

            const successMessage = await driver.findElement(By.className('font-bold')).getText();

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