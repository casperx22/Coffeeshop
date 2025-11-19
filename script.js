/**
 * Fungsi showPage digunakan untuk mengaktifkan tampilan halaman tertentu 
 * dan menyembunyikan halaman lainnya, memberikan efek Single Page Application (SPA) sederhana.
 * @param {string} pageId - ID dari elemen halaman yang ingin ditampilkan ('home', 'menu', atau 'about').
 */
function showPage(pageId) {
    // 1. Ambil semua elemen dengan class 'page'
    const pages = document.querySelectorAll('.page');
    
    // 2. Sembunyikan semua halaman
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 3. Tampilkan halaman yang diminta
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }

    // 4. Kembali ke atas halaman setelah navigasi
    window.scrollTo(0, 0);
}

// Panggil fungsi untuk memastikan halaman 'home' aktif saat pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    showPage('home'); 
});
