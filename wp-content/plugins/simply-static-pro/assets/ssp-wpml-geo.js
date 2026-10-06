function get_cookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

// Do we need to switch the language?
if ( ! sessionStorage.getItem("current_language") ) {
    // Collect language links.
    let languages_links = {};
    let languages = document.getElementsByClassName('wpml-ls-native');

    for (const language of languages) {
        let language_tag = language.getAttribute('lang');
        let language_href = language.parentElement.getAttribute('href');

        // We may need to modify the tag.
        if (language_tag) {
            if (language_tag.includes("-")) {
                let parts = language_tag.split('-');
                languages_links[language_tag] = parts[0];
            } else {
                languages_links[language_tag] = language_href;
            }
        }
    }

    // Check if we need to redirect.
    let current_language = navigator.language;

    if (current_language !== get_cookie('wp-wpml_current_language')) {
        let redirect_link = languages_links[navigator.language];

        if (typeof (redirect_link) !== 'undefined') {
            window.location.href = redirect_link;
        }
    }
}

// Update cookie based on language selection.
const language_links = document.querySelectorAll('.wpml-ls-link');

for (const language_link of language_links) {
    language_link.addEventListener('click', function handleClick(event) {
        event.preventDefault();

        let languages = this.getElementsByClassName('wpml-ls-native');

        for (const language of languages) {
            let language_tag = language.getAttribute('lang');
            let language_href = language.parentElement.getAttribute('href');

            // Delete old WPML cookie.
            document.cookie = 'wp-wpml_current_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

            // Set new cookie and session for selected language.
            document.cookie = 'wp-wpml_current_language=' + language_tag;

            // We may need to modify the tag.
            if (language_tag) {
                if (language_tag.includes("-")) {
                    let parts = language_tag.split('-');
                    language_tag = parts[0];
                }
            }

            sessionStorage.setItem("current_language", language_tag);
            window.location.href = language_href;
        }
    });
}

