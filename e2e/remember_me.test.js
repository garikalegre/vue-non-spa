module.exports = {
    'If User choose Remember Me options, cookie should be presented': function (browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl + '/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('div[role=checkbox]', function (result) {
                browser.click('button[type=submit]', function (result) {
                    browser
                        .assert.urlEquals(browser.launchUrl + '/newsfeed')
                        // .waitForElementVisible('.main-page-card form', 1000)
                        .getCookie('REMEMBERME', function(result) {
                            browser.assert.ok(null !== result);
                            browser.end();
                        })
                })
            });
    }
};
