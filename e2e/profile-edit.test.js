module.exports = {
    beforeEach : function(browser) {
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
    },

    'User should not see any errors when open profile page': function (browser) {
        browser
            .url(browser.launchUrl+'/user/edit')
            .assert.elementNotPresent('.input-group__error')
            .end();
    },

    'User can not access his profile till logged in': function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/user/edit')
            .assert.urlEquals(browser.launchUrl+'/login')
            .end();
    },

    'User see his own data once open the profile edit page': function(browser) {
        browser
            .url(browser.launchUrl+'/user/edit')
            .assert.value('input[name=username]', 'firstUser')
            .end();
    },

    'User can select birthday': function(browser) {
        browser
            .url(browser.launchUrl+'/user/edit')
            .click('input[name=bDate]', function (result) {
                browser
                    .waitForElementVisible('div.picker.picker--date.card', 500)
            })
            .end();
    },

    'Description field can be empty and between 25-500 symbols': function (browser) {
        browser
            .url(browser.launchUrl+'/user/edit')
            .setValue('textarea[name=description]', '')
            .assert.elementNotPresent('.input-group__error')        
            .setValue('textarea[name=description]', '123')
            .waitForElementVisible('.input-group__error', 1000)        
            .setValue('textarea[name=description]', '1234567890123456789012345678901234567890')
            .waitForElementNotPresent('.input-group__error', 1000)
            .end();
    }
};
