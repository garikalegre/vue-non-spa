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
    'Logged in User can access to cgu page but can not see the sidebar (by default)': function (browser) {
        browser
            .url(browser.launchUrl+'/cgu')
            .assert.urlEquals(browser.launchUrl+'/cgu')
            .assert.elementNotPresent('.menuopened')
            .end();
    },
    'Unlogged User can access to cgu page and do not see the sidebar': function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/cgu')
            .assert.urlEquals(browser.launchUrl+'/cgu')
            .assert.elementNotPresent('.menuopened')
            .end();
    },
};