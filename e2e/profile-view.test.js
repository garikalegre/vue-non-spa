module.exports = {
    beforeEach : function(browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl+'/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function () {
                browser
                    .assert.urlEquals(browser.launchUrl+'/newsfeed')
            })
    },

    'User should see is profile info': function (browser) {
        browser
            .url(browser.launchUrl+'/profile/firstUser/1')
            .assert.elementPresent('.info-description')
            .end();
    },

    'User can not see profile if username AND userId are not right and he is not logged in' : function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/profile/firstUser/2')
            .assert.elementNotPresent('.info-description')
            .assert.urlEquals(browser.launchUrl+'/login')
            .end();
    },

    'User can see e if username AND userId are not right' : function (browser) {
        browser
            .url(browser.launchUrl+'/profile/firstUser/2')
            .assert.elementNotPresent('.info-description')
            .assert.urlEquals(browser.launchUrl+'/newsfeed')
            .end();
    }
};
