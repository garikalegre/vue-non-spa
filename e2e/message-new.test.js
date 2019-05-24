module.exports = {
    beforeEach: function (browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl + '/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .assert.urlEquals(browser.launchUrl + '/newsfeed')
                    // .waitForElementVisible('.main-page-card form', 1000);
            })
    },
    'User can not access on create message till logged in': function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/messages/create')
            .assert.urlEquals(browser.launchUrl+'/login')
            .end();
    },
    'User can not create new empty message': function (browser) {
        browser            
            .url(browser.launchUrl+'/messages/create')
            .expect.element('button.msg_send').to.have.attribute('disabled').which.contains('true');
        browser.end();
    },
};