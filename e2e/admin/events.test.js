module.exports = {
    beforeEach: function (browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl + '/login')
            .setValue('input[name=_username]', 'admin@adminpanel.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .assert.urlEquals(browser.launchUrl + '/newsfeed')
                    // .waitForElementVisible('.main-page-card form', 1000);
            })
    },

    "Admin able to see the list of events in the admin panel": function (browser) {
        browser
            .url(browser.launchUrl + '/admin/app/event/list')
            .assert.containsText('body', 'football play')
            .end();
    }
};
