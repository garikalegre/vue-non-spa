module.exports = {
    'User who has not confirm his email address can not login': function (browser) {
        browser
            .url(browser.launchUrl+'/login')
            .waitForElementVisible('body', 1000)
            .setValue('input[name=_username]', 'not.activated@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser
                    .waitForElementVisible('.error-message', 1000)
                    .assert.containsText('.error-message', 'Account is locked.');
            })
            .end()
    },

    'User have to use valid confirmation token': function (browser) {
        browser
            .url(browser.launchUrl+'/confirm-registration/13?token=wrong')
            .waitForElementVisible('.snack__content', 2000)
            .assert.containsText('.snack__content', 'Votre compte n\'est pas créé. Le Token est invalide')
    },

    'User allowed to confirm his email address':  function (browser) {
        browser
            .url(browser.launchUrl+'/confirm-registration/13?token=test')
            .waitForElementVisible('.snack__content', 2000)
            .assert.containsText('.snack__content', 'Votre compte est créé. Connectez-vous !')
    },

    'User can login after success email confirmation':  function (browser) {
        browser
            .setValue('input[name=_username]', 'not.activated@email.com')
            .setValue('input[name=_password]', 'qwerty123')
            .click('button[type=submit]', function (result) {
                browser.assert.urlEquals(browser.launchUrl+'/newsfeed');
            })
            .end();
    },

    after : function(browser) {
        browser.url(browser.launchUrl+'/logout');
    }
};
