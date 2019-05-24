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
    'User can not access on create event till logged in': function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/event/create')
            .assert.urlEquals(browser.launchUrl+'/login')
            .end();
    },
    'User should see errors when submit empty create event form': function (browser) {
        browser
            .url(browser.launchUrl+'/event/create')
            .click('button.button_submit', function (result) {
                browser
                    .assert.elementPresent('.input-group__error')
            })
            .end();
    },

    'User should see location choice': function (browser) {
        browser
            .url(browser.launchUrl+'/event/create')
            .setValue('input[name=map]', 'F')
            .waitForElementVisible('.pac-container', 1000)
            .end();
    },

};