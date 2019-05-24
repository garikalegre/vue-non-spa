module.exports = {
    'User able to open the Landing page' : function (browser) {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('body', 1000);
    },

    'User see the login button and able to follow by it': function (browser) {
        browser
            .click('a[href="/login"]')
            .assert.urlEquals(browser.launch_url+'/login');
    },

    'User able to choose from social login and regular login form' : function (browser) {
        browser
            .assert.elementPresent('a.facebook')
            .assert.elementPresent('a.google')
            .assert.elementPresent('form[action="/login"]')
            .end();
    },

    'Logged in user has to be redirected to his newsfeed page': function (browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl+'/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .assert.urlEquals(browser.launchUrl+'/newsfeed')
                    // .waitForElementVisible('.main-page-card form', 1000);
            })
            .url(browser.launchUrl)
            .assert.urlEquals(browser.launchUrl+'/newsfeed')
            .end();

    }
};
