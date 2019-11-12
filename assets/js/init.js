if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./serviceWorker.js').then(function () {
            console.log('serviceWorker: pendaftaran berhasil')
        }).catch(function () {
            console.log('sarviceWorker: pendaftaran gagal');
        })
    })
} else {
    console.log('serviseWorker: browser tidak mendukung serviceWorker');
}