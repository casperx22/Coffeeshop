// --- LOGIKA KERANJANG GLOBAL ---
let selectedItem = {}; 
let cart = []; 

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => { page.classList.remove('active'); });
    const activePage = document.getElementById(pageId);
    if (activePage) { activePage.classList.add('active'); }
    closeAllModals(); 
    window.scrollTo(0, 0);
}

// Menutup semua modal (QRIS sudah dihapus)
function closeAllModals() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'none';
}

function formatRupiah(number) {
    const num = parseInt(number, 10) || 0;
    return 'Rp ' + num.toLocaleString('id-ID');
}

// --- FUNGSI MODAL PESANAN & KERANJANG ---
function showModal(element) {
    const itemElement = element.closest('.menu-item');
    const name = itemElement.querySelector('.item-name').innerText;
    const desc = itemElement.querySelector('.item-desc').innerText;
    const priceText = itemElement.querySelector('.item-price').innerText; 
    const priceCleaned = priceText.replace(/[^\d]/g, ''); 
    const price = parseInt(priceCleaned, 10);
    selectedItem = { name, price, desc };
    document.getElementById('modal-item-name').innerText = selectedItem.name;
    document.getElementById('modal-item-desc').innerText = selectedItem.desc;
    document.getElementById('modal-item-price-text').innerText = priceText;
    document.getElementById('quantity').value = 1; 
    updateTotal();
    document.getElementById('orderModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentQty = parseInt(quantityInput.value, 10);
    currentQty += change;
    if (currentQty < 1) { currentQty = 1; }
    quantityInput.value = currentQty;
    updateTotal();
}

function updateTotal() {
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const total = selectedItem.price * quantity;
    document.getElementById('modal-total-price').innerText = formatRupiah(total);
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const item = {
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: quantity,
        total: selectedItem.price * quantity
    };
    cart.push(item);
    closeModal('orderModal');
    updateCartDisplay();
    alert(`✅ ${quantity}x ${item.name} berhasil ditambahkan ke Keranjang!`);
}

function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + item.total, 0);
}

function updateCartDisplay() {
    const listElement = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('cart-total-price');
    const badgeElement = document.getElementById('cart-badge');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyMessage = document.getElementById('empty-cart-message');

    listElement.innerHTML = ''; 

    if (cart.length === 0) {
        badgeElement.style.display = 'none';
        totalElement.innerText = formatRupiah(0);
        checkoutBtn.disabled = true;
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';
    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span class="cart-item-name">${item.quantity}x ${item.name}</span>
            <span>
                ${formatRupiah(item.total)}
                <button class="cart-item-remove" onclick="removeFromCart(${index})">x</button>
            </span>
        `;
        listElement.appendChild(li);
    });

    const total = calculateCartTotal();
    totalElement.innerText = formatRupiah(total);
    badgeElement.innerText = cart.length;
    badgeElement.style.display = 'inline-block';
}

function showCartModal() {
    updateCartDisplay(); 
    document.getElementById('cartModal').style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartDisplay();
}

function showPaymentModal() {
    const finalTotal = calculateCartTotal();
    document.getElementById('payment-final-total').innerText = formatRupiah(finalTotal);
    closeModal('cartModal');
    document.getElementById('paymentModal').style.display = 'block';
}

// FUNGSI PEMBAYARAN: Menangani semua metode yang diminta
function processPayment(method) {
    const finalTotal = calculateCartTotal();
    let message = '';
    
    if (method === 'COD') {
        message = `🎉 PESANAN COD BERHASIL! 🎉\n\nTotal Bayar: ${formatRupiah(finalTotal)}\nMetode: Cash On Delivery (COD)\n\nHarap siapkan uang tunai saat pesanan tiba. Terima kasih!`;
    } else if (['BRI', 'BCA', 'BNI', 'Mandiri', 'Bank Jatim'].includes(method)) {
         message = `💵 Pesanan Berhasil! Total: ${formatRupiah(finalTotal)}\n\nMetode: Transfer Bank ${method}\n\nSilakan transfer ke rekening ${method} yang tertera (simulasi). Pesanan akan diproses setelah pembayaran terkonfirmasi.`;
    } else { // Dana, OVO, Gopay, Shopee Pay (E-Wallet)
        message = `🎉 Pesanan Berhasil! Total: ${formatRupiah(finalTotal)}\n\nMetode: E-Wallet ${method}\n\nHarap buka aplikasi ${method} untuk menyelesaikan pembayaran (simulasi). Terima kasih!`;
    }
    
    alert(message);
    
    // Finalisasi dan reset
    cart = [];
    updateCartDisplay();
    closeModal('paymentModal');
    showPage('home'); // Kembali ke beranda
}

// --- GLOBAL LISTENER ---
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const cartModal = document.getElementById('cartModal');
    const paymentModal = document.getElementById('paymentModal');
    
    // Menutup modal jika user mengklik di luar area modal
    if (event.target == orderModal) closeModal('orderModal');
    if (event.target == cartModal) closeModal('cartModal');
    if (event.target == paymentModal) closeModal('paymentModal');
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);
