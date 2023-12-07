this program is designed to do automated tests on the urban routes site.

page.js has many important features to help with the testing of the program.
    in it, we setup our locators to search/access/click/edit different elements that are in the urban routes app
    it also includes many useful functions that are used in the createAnOrder.e2e.js file for easier code readability. 
        functions it includes:
        fillAddresses
        fillPhoneNumber
        submitPhoneNumber
        fillCreditCard


helper.js contains functions that auto generate phone numbers and converts objects into text so the value is accesible

wdio.conf.js is the script that runs the automation test software for the browswer
    search for 'base-url' and update it to the url you are using
    wdio also contains options for you to run the tests in headless mode if you desire

createAnOrder.e2e.js runs the test program
    in it we access all the elements we need to and fill it with test values.
    we run expect statements to make sure its returning the values we want.

to run the program open createAnOrder.e2e.js
    go to the terminal
    write in the terminal 'npm install' to install all the neccessary packages
    write in the terminal 'npm run wdio'

Congrats! you can run this program.


