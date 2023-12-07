const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
})

describe('adding a credit card ', async() => {
    it('should add a credit card to the order ', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi =$('div=Supportive');
        await supportiveTaxi.click();
        await page.fillCreditCard();
        //card payment icon 
        const cardPaymentIcon = await $(page.cardPaymentIcon);
        await cardPaymentIcon.waitForDisplayed();
        await expect(await $(cardPaymentIcon)).toBeExisting();
    })
    it('should add a blanket and handkerchiefs to the order with a message', async () =>{
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi =$(page.supportiveTaxi);
        await supportiveTaxi.click();
        const blanketAndHandkerchiefsButton = $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForClickable();
        await blanketAndHandkerchiefsButton.click();
        const messageForDriverField = await $(page.commentField);
        await messageForDriverField.setValue('sing me some lullabys');
        const message = await messageForDriverField.getValue();
        await expect(message).toBe('sing me some lullabys');
    })
    it('should add two ice creams to the order ', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi =$(page.supportiveTaxi);
        await supportiveTaxi.click();
        const iceCreamCounterPlus = await $(page.iceCreamButton);
        await iceCreamCounterPlus.waitForClickable();
        //clicking counter twice to add 2 icecreams
        await iceCreamCounterPlus.click();
        await iceCreamCounterPlus.click();
        const iceCreamValue = await $(page.counterValue);
        await iceCreamValue.getText();
        await expect(iceCreamValue).toBeExisting(2);
        const orderTaxiButton = await $(page.orderTaxiButton);
        await orderTaxiButton.waitForDisplayed
        await orderTaxiButton.click();
        await browser.pause(50000);

    })
})
