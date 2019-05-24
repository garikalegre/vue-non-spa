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
    'User can see their events': function (browser) {
        browser
            .url(browser.launchUrl + '/events/my')
            .waitForElementVisible('div.events-list-box', 1000)
            .end();
    },
    'User can search events': function (browser) {
        browser
            .url(browser.launchUrl + '/events')
            .waitForElementVisible('form.events-filter__form', 500)
            .setValue('input#map', 'Paris, France')
            .click('.events-filter__button')
            .waitForElementVisible('div.event-card.card', 1000)
    }

};