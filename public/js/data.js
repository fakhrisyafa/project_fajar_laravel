let items = [];
let trans = [];
let curPage   = 'barang';
let transType = 'masuk';
let q = '';

const katCls = {
  'Perangkat Aktif':           'badge-elekt',
  'Infrastruktur Fiber Optik': 'badge-furn',
  'Kabel Fiber Optik':         'badge-atk',
  'Konektor & Aksesoris':      'badge-lain',
  'Perangkat Wireless':        'badge-masuk',
};
const kondCls = { 'Baik':'badge-baik', 'Rusak':'badge-rusak' };

// Muat data dari API
async function loadData() {
  const [resItems, resTrans] = await Promise.all([
    fetch('/api/items'),
    fetch('/api/trans')
  ]);

  items = await resItems.json();
  trans = await resTrans.json();
  trans = trans.map(t => ({ ...t, itemId: t.item_id }));
}

function generateKode() {
  const katPrefix = {
    'Perangkat Aktif':           'PAK',
    'Infrastruktur Fiber Optik': 'IFO',
    'Kabel Fiber Optik':         'KFO',
    'Konektor & Aksesoris':      'KNK',
    'Perangkat Wireless':        'PWL',
  };

  const kat    = document.getElementById('b-kat').value;
  const prefix = katPrefix[kat] || 'INV';

  // Ambil semua nomor yang sudah ada untuk prefix ini dari SEMUA items
  // (bukan hanya yang sedang ditampilkan)
  const existing = items
    .filter(i => i.kode && i.kode.startsWith(prefix + '-'))
    .map(i => {
      const num = parseInt(i.kode.substring(prefix.length + 1));
      return isNaN(num) ? 0 : num;
    });

  const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;
  return prefix + '-' + String(next).padStart(3, '0');
}