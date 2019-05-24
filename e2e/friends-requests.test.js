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
    'User can send friend request': function (browser){
        browser            
            .url(browser.launchUrl+'/friend/search')            
            .waitForElementVisible('div.friends-list-box', 2500, true, function(result){
                browser
                    .waitForElementVisible('button.friend-card-add-btn', 2500)
                    .click('button.friend-card-add-btn')
            })            
            .end()
    },
    'User can answer on friend request': function (browser) {
        browser
            .url(browser.launchUrl+'/friends')
            .waitForElementVisible('div.no-btn', 2500, true, function (result) {
                browser
                    .click('div.no-btn', function (result) {
                        browser
                            .waitForElementVisible('div.snack', 2500)
                    })
            })
            .end()
    }
};