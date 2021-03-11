const home = 'home';
const error = 'error';

document.addEventListener('DOMContentLoaded', () => {
    var query = new URLSearchParams(window.location.search);

    if (query.has('page')) {
        loadPage(query.get('page'));
    } else {
        loadPage('home');
    }

    document.querySelectorAll('.navbar-burger').forEach(el => {
        el.addEventListener('click', e => {
            el.classList.toggle('is-active');
            document.getElementById(el.dataset.target).classList.toggle('is-active');
        });
    });

    document.querySelectorAll('a[data]').forEach(el => {
        el.addEventListener('click', e => {
            let page = el.getAttribute('data');
            if (page) {
                query.set('page', page);
                window.history.pushState({}, '', '?' + query.toString());
                loadPage(page);
            }
        });
    });

    window.onpopstate = function (e) {
        if (e.state) {
            var query = new URLSearchParams(window.location.search);
            loadPage(query.get('page'));
        }
    }
});

function loadPage(page) {
    fetch('pages/' + page + '.html').then(res => {
        if (res.status === 200)
            return res.text();
        else
            throw new Error(res.statusText);
    }).then(html => {
        document.getElementById('content').innerHTML = html;
        toggleBurger(false);
    }).catch(function (err) {
        if (page === error)
            document.getElementById('content').innerHTML = '<div class="container is-fluid">Critical Error</div>';
        else
            loadPage(error);
    });
}

function toggleBurger(show) {
    document.querySelectorAll('.navbar-burger').forEach(el => {
        el.classList.toggle('is-active', show);
        document.getElementById(el.dataset.target).classList.toggle('is-active', show);
    });
}