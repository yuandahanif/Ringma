window.addEventListener('DOMContentLoaded', (e) => {
    const sNav = document.querySelector('.sidenav')
    const mCollapsible = document.querySelectorAll('.collapsible')
    const dropdown = document.querySelectorAll('.dropdown-trigger')
    let page = window.location.hash.substr(1) == "" ? 'home' : window.location.hash.substr(1)
    M.Sidenav.init(sNav)
    M.Collapsible.init(mCollapsible)
    M.Dropdown.init(dropdown, {
        hover: false
    })

    // gunakan ini jika text area sudah di isi value oleh sistem
    //   $('#textarea1').val('New Text');
    //   M.textareaAutoResize($('#textarea1'));

    loadNav()
    loadPage(page)
})

function loadNav() {
    const xhttpMobile = new XMLHttpRequest()
    const xhttpNav = new XMLHttpRequest()

    xhttpNav.onreadystatechange = function () {
        if (xhttpNav.readyState == 4) {
            if (xhttpNav.status != 200) return;
            document.querySelector('#materi-dropdown').innerHTML = xhttpNav.responseText
        }
    }
    xhttpNav.open('GET', 'assets/shell/materi-desktop.html')
    xhttpNav.send()

    xhttpMobile.onreadystatechange = function () {
        if (xhttpMobile.readyState == 4) {
            if (xhttpMobile.status != 200) return;
            document.querySelector('#materi-sidenav').innerHTML = xhttpMobile.responseText

            // buka per page
            document.querySelectorAll('.sidenav a , #materi-dropdown a ,.topnav a').forEach(e => {
                e.addEventListener('click', click => {
                    // Tutup sidenav
                    let sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    click.preventDefault()
                    let page = click.target.getAttribute('href').substr(1)
                    if (page != '!') {
                        loadPage(page)
                    }
                })
            })
        }
    }
    xhttpMobile.open('GET', 'assets/shell/materi-android.html')
    xhttpMobile.send()

}

function loadPage(page) {
    const xhttpPage = new XMLHttpRequest()
    xhttpPage.onreadystatechange = function () {
        if (xhttpPage.readyState == 4) {
            const dPage = document.querySelector('#main-display')
            if (xhttpPage.status == 200) {
                dPage.innerHTML = xhttpPage.responseText
            } else if (xhttpPage.status == 404) {
                dPage.innerHTML = '<h2>maaf halaman yang anda tuju tidak ditemukan</h2>'
            } else {
                dPage.innerHTML = '<h2>maaf halaman yag anda tuju tidak dapat di akses</h2>'
            }
        }
    }
    xhttpPage.open('GET', `page/${page}.html`, true)
    xhttpPage.send()
}

function loadListMateriDiHome(page) {
    loadPage('materi/'+page)
}