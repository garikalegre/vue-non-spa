module.exports = {
    beforeEach: function (browser) {
        //@todo move login code to a command
        browser
            .url(browser.launchUrl + '/login')
            .setValue('input[name=_username]', 'firstUser@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .assert.urlEquals(browser.launchUrl + '/newsfeed');
                    // .waitForElementVisible('.main-page-card form', 1000);
            })
    },
    'Guest can access on search friends till logged in': function (browser) {
        browser
            .url(browser.launchUrl+'/logout') //ensure user is logged out
            .url(browser.launchUrl+'/friend/search')
            .assert.urlEquals(browser.launchUrl+'/friend/search')
            .end();
    },
    'User can search friends': function (browser) {
        browser
            .url(browser.launchUrl+'/friend/search')
            .setValue('input[name=map]', 'Minsk, Belarus')
            .waitForElementVisible('div.friends-list-box', 1000)
            .waitForElementNotPresent('div.no-friends-list-box', 1000)
            .waitForElementNotPresent('div.result-loader', 1000)
            .end();
    },
    'User can see profile of searched user': function (browser) {
        browser
            .url(browser.launchUrl + '/friend/search')
            .waitForElementVisible('div.friends-list-box', 1000)
            .waitForElementVisible('div.friend-card__avatar-box a', 100)
            .click('div.friend-card__avatar-box a', function () {
                browser
                    .waitForElementVisible('div.info-description', 1000)
                    .assert.urlContains('profile')
            })
            .end();
    },
    'User can choose location to search friends': function (browser) {
        browser
            .url(browser.launchUrl+'/friend/search')
            .setValue('input[name=map]', 'F')
            .waitForElementVisible('.pac-container', 1000)
            .end();
    },
    'User can multiselect by click on "Sélectionnez des sports", kind of sport selected from multiselect, user can remove kind of sport using "X"': function (browser) {
        browser
            .url(browser.launchUrl+'/friend/search')
            .click('span.multiselect__single', function () {
                browser
                    .waitForElementVisible('div.multiselect__content-wrapper', 1000)

            })
            .click('li.multiselect__element', function () {
                browser
                    .waitForElementVisible('div.multiselect__tags-wrap span.chip', 1000)
            })
            .click('span.custom__remove', function () {
                browser
                    .assert.elementNotPresent("span.chip__content>span");
            })
            .end();
    }
};