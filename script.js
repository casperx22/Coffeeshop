// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi sederhana untuk menambahkan kelas 'loaded' setelah halaman dimuat
    // Berguna untuk transisi atau animasi saat pertama kali masuk
    document.body.classList.add('loaded');

    console.log("Website Anda berhasil dimuat! Siap untuk interaktivitas.");

    // Contoh interaktivitas: Memberikan pesan saat tombol CTA diklik
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', function(e) {
        // Karena tombol CTA hanya menavigasi, ini hanyalah contoh log.
        // Anda bisa menambahkan validasi form atau animasi di sini.
        console.log("Tombol 'Mulai Proyek Sekarang' diklik!");
        // alert("Terima kasih atas minat Anda! Kami akan segera menghubungi.");
    });
});
