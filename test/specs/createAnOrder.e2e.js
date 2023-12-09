const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => { 
    it('test 1: Set the address', async () => {
        await browser.url(`/`)
        const addressA = 'East 2nd Street, 601';
        const addressB = '1300 1st St';
        await page.fillAddresses(addressA, addressB);
        await expect (await $(page.fromField)).toBeExisting(addressA);
        await expect (await $(page.toField)).toBeExisting(addressB);

    })
    it('test 2: select supportive plan', async () => {
        const supportiveTaxi =$(page.supportiveTaxi);
        await supportiveTaxi.click();
        const activeSupportiveTaxi = $(page.activeSupportiveTaxi);
        await expect (await $(page.activeSupportiveTaxi)).toBeExisting;
    })

    //phone number modal and saving the phone number are in seperate it statements
    //because it wouldnt fill the phone information when combined as one
    it('should open phone number modal', async () => { 
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const phoneNumberButton = await $(page.phoneNumberButton); 
        await phoneNumberButton.waitForDisplayed(); 
        await phoneNumberButton.click(); 
        const phoneNumberModal = await $(page.phoneNumberModal); 
        await expect(phoneNumberModal).toBeExisting(); 
    }) 
 
    it('test 3: should save the phone', async () => { 
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const phoneNumber = helper.getPhoneNumber("+1"); 
        await page.submitPhoneNumber(phoneNumber); 
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting(); 
    })

    it('test 4: should add a credit card to the order ', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCreditCard();
        //card payment icon 
        const cardPaymentIcon = await $(page.cardPaymentIcon);
        await cardPaymentIcon.waitForDisplayed();
        await expect(await $(cardPaymentIcon)).toBeExisting();
    })
    it('test 5: Write a message', async () =>{
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageForDriverField = await $(page.commentField);
        await messageForDriverField.setValue('sing me some lullabys');
        const message = await messageForDriverField.getValue();
        await expect(message).toBe('sing me some lullabys');
    })
    it('test 6: order a blanket and handkerchiefs', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const blanketAndHandkerchiefsButton = $(page.blanketAndHandkerchiefsButton);
        const blanketAndHandkerchiefsCheck = $(page.blanketAndHandkerchiefsCheck)
        await blanketAndHandkerchiefsButton.waitForClickable();
        await blanketAndHandkerchiefsButton.click();
        await expect(blanketAndHandkerchiefsCheck).toBeChecked();
    })
    it('test 7: should add two ice creams to the order ', async () => {
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
    })

    it('test 8: should order the taxi', async () =>{
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderTaxiButton = await $(page.orderTaxiButton);
        await orderTaxiButton.waitForDisplayed;
        await orderTaxiButton.click();
        await browser.pause(5000)
        const taxiModal = await $(page.taxiModal); 
        //this test is failing. the modal shows up for a split second and dissapears so it doesnt count it as 'existing'
        await expect(taxiModal).toBeExisting(); 
    })
})
