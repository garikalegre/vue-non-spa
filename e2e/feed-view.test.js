module.exports = {
    beforeEach : function(browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl+'/login')
            .setValue('input[name=_username]', 'admin@adminpanel.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .assert.urlEquals(browser.launchUrl+'/newsfeed')
                    // .waitForElementVisible('.main-page-card form', 1000);
            })
    },

    'User can see profile on newsfeed page': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('div.user-info-box', 1000)
            .end();
    },

    'User can see friends list on newsfeed page': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('div.friends-list-card', 1000)
            .end();
    },

    'User can see suggested friends on newsfeed page': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('div.suggested-friends-card', 1000)
            .end();
    },

    'User can see suggested events on newsfeed page': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('div.suggested-events-card', 1000)
            .end();
    },

    'User can see post compose form on newsfeed page': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('div.newsfeed-post-form-card', 1000)
            .end();
    },

    'User can post GIPHy': function (browser) {
        browser
            .url(browser.launchUrl + '/newsfeed')
            .waitForElementVisible('.giphy-post-btn', 1000, true, function (result) {
                browser.click('.giphy-post-btn', function (result) {
                    browser
                .waitForElementVisible('div.giphy-block', 1000)
                });
            })
            .end();
    }
};