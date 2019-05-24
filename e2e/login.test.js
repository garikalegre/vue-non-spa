module.exports = {
    'User can not access profile page until login': function (browser) {
        browser
            .url(browser.launchUrl+'/user/edit')
            .assert.urlEquals(browser.launchUrl+'/login')
            .end();
    },

    'User can not login with wrong password': function (browser) {
        browser
            .url(browser.launchUrl+'/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'wrong password')
            .click('button[type=submit]', function () {
                browser
                    .waitForElementVisible('.error-message', 1000)
                    .assert.containsText('.error-message', 'Invalid credentials.')
            })
            .end();
    },

    'User can login with valid login and password': function (browser) {
        browser
            .url(browser.launchUrl+'/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function () {
                browser.assert.urlEquals(browser.launchUrl+'/newsfeed');
            })
            .end();
    },
    'If user is already logged in, he is redirect to newsfeed if he want to access to /': function (browser) {
        browser
            .url(browser.launchUrl + '/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function () {
                browser
                    .assert.urlEquals(browser.launchUrl + '/newsfeed')
                    .url(browser.launchUrl)
                    .assert.urlEquals(browser.launchUrl + '/newsfeed')

                    })
    },
    after : function(browser) {
        browser.url(browser.launchUrl+'/logout');
    }
};
