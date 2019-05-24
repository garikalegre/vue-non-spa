module.exports = {
    'User allowed to open registration form' : function (browser) {
        browser
            .url(browser.launchUrl+'/register')
            .waitForElementVisible('body', 1000);
    },

    'User can fill the registration form' : function (browser) {
        browser
            .waitForElementVisible('input[name=_username]', 1000)
            .setValue('input[name=_username]', 'sportman@sportialize.com')
            .setValue('input[name=_password]', 'welcome')
            .setValue('input[name=_password_repeat]', 'welcome')
            .click('button.btn.btn--large.indigo', function (result) {
                browser
                    .waitForElementVisible('.main-page-card', 10000)
                    //.assert.containsText('body', 'Merci de confirmer votre adresse email.');
                    .assert.urlEquals(browser.launchUrl+'/user/edit')

            })
            .end();
    },
    
    'User fills registration form with errors (email is required)': function (browser) {
        browser
            .url(browser.launchUrl+'/register')
            .waitForElementVisible('input[name=_username]', 1000)
            .setValue('input[name=_password]', 'test')
            .click('button.btn.btn--large.indigo', function (result) {
                browser
                    .waitForElementVisible('.input-group__error', 1000)
                    .assert.containsText('body', 'L\'email est requis.');
            })
            .end();
    },

    'User fills registration form with errors (password is required)': function (browser) {
        browser
            .url(browser.launchUrl+'/register')
            .waitForElementVisible('input[name=_username]', 1000)
            .setValue('input[name=_username]', 'sportman@sportialize.com')
            .click('button.btn.btn--large.indigo', function (result) {
                browser
                    .waitForElementVisible('.input-group__error', 1000)
                    .assert.containsText('body', 'Le mot de passe est requis.');
            })
            .end();
    },

    'User fills registration form with errors (passwords does not match)': function (browser) {
        browser
            .url(browser.launchUrl+'/register')
            .waitForElementVisible('input[name=_username]', 1000)
            .setValue('input[name=_username]', 'sportman@sportialize.com')
                    .setValue('input[name=_password]', 'one')
                    .setValue('input[name=_password_repeat]', 'two')
            .click('button.btn.btn--large.indigo', function (result) {
                browser
                    .waitForElementVisible('.input-group__error', 1000)
                    .assert.containsText('body', 'Le mot de passe doit être identique');
            })
            .end();
    },
};
