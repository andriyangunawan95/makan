// ================================
// NOMOR WHATSAPP PENJUAL
// ================================
const SELLER_WA = "6285782329752";


// ================================
// DAFTAR PRODUK
// ================================
const products = [
  ["Nasi Goreng Biasa", 7000],
  ["Nasi Goreng+Telur", 10000],
  ["Nasi Goreng Paket Lengkap", 15000],
  ["Mie Goreng Biasa", 8000],
  ["Mie Goreng+Telur", 10000],
  ["Mie Goreng Paket Lengkap", 15000],
  ["Ayam Geprek(Sayap)", 8000],
  ["Ayam Geprek(Dada,Paha Atas)", 11000],
  ["Ayam Geprek+Nasi", 13000],
  ["Ayam Geprek Paket Lengkap", 16000],
  ["Ayam Goreng Biasa", 8000],
  ["Ayam Goreng+Nasi", 12000],
  ["Ayam Goreng Paket Lengkap", 15000],
  ["Ayam Suwir+Nasi", 7000],
  ["Ayam Bakar Biasa", 10000],
  ["Ayam Bakar+Nasi", 16000],
  ["Ayam Bakar Paket Lengkap", 18000],
  ["Nasi Telor+Kecap", 7000],
  ["Telur Ceplok+Nasi", 7000],
  ["Telur Dadar+Nasi", 7000],
  ["Nasi+Tahu+Tempe", 6000],
  ["Nasi Telor Kecap Paket Lengkap", 10000],
  ["Telur Dadar Nasi+Balado Mayones", 10000],
  ["Lumpia Telur", 5000],
  ["Lumpia Telur+Nasi", 8000],
  ["Kentang Goreng Paket Lengkap", 9000],
  ["Otak-Otak Goreng Seporsi", 7000],
  ["Sosis Bakar(1)", 6000],
  ["Sosis Goreng", 5000],
  ["Bakso Goreng", 6000],
  ["Bakso Kuah", 7000],
  ["Cireng Isi Polos", 1000],
  ["Cireng Isi Ayam", 2000],
  ["Tahu Goreng Seporsi", 5000],
  ["Popcorn Original", 7000],
  ["Popcorn Coklat", 10000],
  ["Keripik Kentang", 5000],
  ["Keripik Singkong", 5000],
  ["Keripik Pisang", 6000],
  ["Makaroni Pedas", 2000],
  ["Basreng", 20000],
  ["Bakwan(1)", 1000],
  ["Tempe Goreng(1)", 1000],
  ["Cilok Seporsi", 6000],
  ["Nugget Seporsi", 6000],
  ["Wafer(Semua Rasa)", 2500],
  ["Oreo", 2500],
  ["Roti Bakar Coklat", 7000],
  ["Roti Bakar Keju", 8000],
  ["Pisang Goreng Keju", 7000],
  ["Pisang Cokelat", 8000],
  ["Air Mineral", 4000],
  ["Es Teh", 5000],
  ["Teh Hangat", 3000],
  ["Es Jeruk", 5000],
  ["Es Milo", 8000],
  ["Es Matcha", 10000],
  ["Es Kopi Susu", 7000],
  ["Es Kopi", 8000],
  ["Kopi Hangat", 6000],
  ["Cimol Seporsi", 7500],
  ["Es Cekek(Semua Rasa)", 2500],
  ["Choki-Choki", 1500],
  ["Beng-Beng", 2500],
  ["Roma Wafer", 3000],
  ["Tic Tac", 2000],
  ["Pilus", 2200],
  ["Garuda Kacang", 2500],
  ["Better", 2500],
  ["Tango Wafer", 2000],
  ["Teh Botol", 4000],
  ["Teh Kotak", 4000],
  ["Teh Pucuk", 4000],
  ["Pocari Sweat", 7000],
  ["Mizone", 6000],
  ["Florida", 4500],
  ["Minuman Energi", 7000],
  ["Fruit Tea", 4000],
  ["Teh Javana", 5000]
];


// ================================
// KERANJANG
// ================================
let cart = {};


// ================================
// FORMAT RUPIAH
// ================================
function rupiah(number) {
  return "Rp" + Number(number).toLocaleString("id-ID");
}


// ================================
// TAMPILKAN PRODUK
// ================================
function renderProducts() {

  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(function(product, index) {

    const name = product[0];
    const price = product[1];
    const qty = cart[index] || 0;

    container.innerHTML += `
      <div class="product">

        <h3>${name}</h3>

        <div class="price">
          ${rupiah(price)}
        </div>

        <div class="qty">

          <button type="button"
            onclick="changeQty(${index}, -1)">
            −
          </button>

          <span>${qty}</span>

          <button type="button"
            onclick="changeQty(${index}, 1)">
            +
          </button>

        </div>

      </div>
    `;
  });
}


// ================================
// TAMBAH / KURANG PRODUK
// ================================
function changeQty(index, change) {

  if (!cart[index]) {
    cart[index] = 0;
  }

  cart[index] += change;

  if (cart[index] <= 0) {
    delete cart[index];
  }

  renderProducts();
  renderCart();
}


// ================================
// TAMPILKAN KERANJANG
// ================================
function renderCart() {

  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  if (!cartItems || !totalElement) return;

  let total = 0;
  let html = "";

  const keys = Object.keys(cart);

  // Jika kosong
  if (keys.length === 0) {

    cartItems.innerHTML = `
      <p>Keranjang masih kosong.</p>
    `;

    totalElement.textContent = "Rp0";

    return;
  }


  // Hitung semua barang
  keys.forEach(function(index) {

    const qty = Number(cart[index]);
    const name = products[index][0];
    const price = Number(products[index][1]);

    const subtotal = price * qty;

    total += subtotal;

    html += `
      <div class="cart-item">

        <div>
          <strong>${name}</strong>
          <br>
          ${rupiah(price)} × ${qty}
        </div>

        <strong>
          ${rupiah(subtotal)}
        </strong>

      </div>
    `;
  });


  // Tampilkan barang
  cartItems.innerHTML = html;


  // Tampilkan total SEMUA barang
  totalElement.textContent = rupiah(total);
}


// ================================
// KOSONGKAN KERANJANG
// ================================
function resetOrder() {

  const yakin = confirm(
    "Yakin ingin mengosongkan keranjang dan data?"
  );

  if (!yakin) {
    return;
  }

  cart = {};

  const form = document.getElementById("orderForm");

  if (form) {
    form.reset();
  }

  renderProducts();
  renderCart();
}


// ================================
// PINDAH HALAMAN
// ================================
function showPage(page) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(function(item) {
    item.classList.remove("active");
  });

  const selectedPage = document.getElementById(page);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================================
// BAHASA
// ================================
function changeLanguage() {

  const languageElement =
    document.getElementById("language");

  if (!languageElement) return;

  const language = languageElement.value;

  const title =
    document.getElementById("heroTitle");

  const text =
    document.getElementById("heroText");

  if (!title || !text) return;


  if (language === "en") {

    title.textContent =
      "Hungry while playing PS or watching?";

    text.textContent =
      "Order your favorite food easily and quickly.";

  } else {

    title.textContent =
      "Lapar saat main PS atau nonton?";

    text.textContent =
      "Pesan makanan favoritmu dengan mudah dan cepat.";
  }
}


// ================================
// PESAN WHATSAPP
// ================================
document.addEventListener("DOMContentLoaded", function() {

  // Tampilkan produk dan keranjang saat website dibuka
  renderProducts();
  renderCart();


  const orderForm =
    document.getElementById("orderForm");

  if (!orderForm) return;


  orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const keys = Object.keys(cart);


    // Keranjang kosong
    if (keys.length === 0) {

      alert(
        "Silakan pilih makanan terlebih dahulu."
      );

      return;
    }


    // ================================
    // DATA PEMBELI
    // ================================
    const name =
      document.getElementById("name")?.value.trim() || "";

    const age =
      document.getElementById("age")?.value.trim() || "";

    const phone =
      document.getElementById("phone")?.value.trim() || "";

    const address =
      document.getElementById("address")?.value.trim() || "";

    const place =
      document.getElementById("place")?.value || "";

    const location =
      document.getElementById("location")?.value.trim() || "";

    const note =
      document.getElementById("note")?.value.trim() || "";


    // ================================
    // BUAT PESAN
    // ================================
    let total = 0;

    let message =
      "🍔 *PESANAN FOODBOX*\n";

    message +=
      "====================\n";


    keys.forEach(function(index) {

      const qty = Number(cart[index]);

      const productName =
        products[index][0];

      const price =
        Number(products[index][1]);

      const subtotal =
        price * qty;

      total += subtotal;


      message +=
        `${productName} x${qty} = ${rupiah(subtotal)}\n`;
    });


    message +=
      "====================\n";

    message +=
      `💰 Total: ${rupiah(total)}\n\n`;


    message +=
      "👤 *DATA PEMESAN*\n";

    message +=
      `Nama: ${name}\n`;

    message +=
      `Umur: ${age}\n`;

    message +=
      `WhatsApp: ${phone}\n`;

    message +=
      `Alamat: ${address}\n`;

    message +=
      `Tempat: ${place}\n`;

    message +=
      `Lokasi: ${location}\n`;


    if (note !== "") {

      message +=
        `Catatan: ${note}\n`;
    }


    message +=
      "\nTerima kasih 🙏";


    // ================================
    // KIRIM KE WHATSAPP
    // ================================
    const whatsappURL =
      `https://wa.me/${SELLER_WA}?text=${encodeURIComponent(message)}`;


    window.open(
      whatsappURL,
      "_blank"
    );

  });

});