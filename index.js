const home = 'pages/home.html';
const error = 'pages/error.html';

document.addEventListener('DOMContentLoaded', () => {
    loadPage('pages/home.html');

    document.querySelectorAll('.navbar-burger').forEach(el => {
        el.addEventListener('click', e => {
            el.classList.toggle('is-active');
            document.getElementById(el.dataset.target).classList.toggle('is-active');
        });
    });

    document.querySelectorAll('a[data]').forEach(el => {
        el.addEventListener('click', e => {
            let page = el.getAttribute('data');
            if (page) loadPage(page);
        });
    });
});

function loadPage(page) {
    fetch(page).then(res => {
        if (res.status === 200)
            return res.text();
        else
            throw new Error(res.statusText);
    }).then(html => {
        // let adrs = page.split('/')[1].split('.')[0];
        // window.history.pushState('', adrs, adrs);
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