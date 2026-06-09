/**
 * app.js — Controller Utama
 * Navigasi, CRUD barang, transaksi, dan event handling
 */

// ─── Navigation ───────────────────────────────────────────
function nav(page) {
  curPage = page;

  const pages = ['barang', 'masuk', 'keluar', 'laporan', 'user'];
  pages.forEach(p => {
    document.getElementById('nav-' + p).classList.toggle('active', p === page);
  });

  const meta = {
    barang:  { title: 'Data Barang',   desc: 'Kelola semua aset kantor' },
    masuk:   { title: 'Stok Masuk',  desc: 'Catat penerimaan stok barang' },
    keluar:  { title: 'Pemakaian',   desc: 'Catat pemakaian barang untuk instalasi & servis' },
    laporan: { title: 'Laporan',       desc: 'Ringkasan stok & transaksi' },
    user:    { title: 'Kelola User',   desc: 'Manajemen akun pengguna' },  // tambahkan ini
  };

  document.getElementById('ptitle').textContent = meta[page].title;
  document.getElementById('pbread').textContent = meta[page].desc;

  render();
}

// ─── Search ───────────────────────────────────────────────
function doSearch(val) {
  q = val.toLowerCase();
  render();
}

// ─── Render dispatcher ───────────────────────────────────
function render() {
  const ca = document.getElementById('ca');
  if (curPage === 'barang')        ca.innerHTML = renderBarang();
  else if (curPage === 'masuk')    ca.innerHTML = renderTrans('masuk');
  else if (curPage === 'keluar')   ca.innerHTML = renderTrans('keluar');
  else if (curPage === 'laporan') {
    if (window.userRole !== 'Admin') {
      ca.innerHTML = `<div class="empty-state" style="margin-top:60px">
        <i class="ti ti-lock" style="font-size:40px;color:var(--text-3)"></i>
        <p>Halaman ini hanya dapat diakses oleh Admin</p>
      </div>`;
    } else {
      ca.innerHTML = renderLaporan();
    }
  }
  else if (curPage === 'user') { ca.innerHTML = renderUser(); loadUsers(); }

  // Paksa sinkron nilai select setelah DOM selesai dirender
  setTimeout(() => {
    if (curPage === 'barang') {
      const selects = ca.querySelectorAll('.filter-select');
      selects[0].value = window._fKat        || 'Semua';
      selects[1].value = window._fKondisi    || 'Semua';
      selects[2].value = window._fStok       || 'Semua';
      selects[3].value = window._fSortBarang || 'default';
    }
    if (curPage === 'masuk' || curPage === 'keluar') {
      const selects = ca.querySelectorAll('.toolbar-right .filter-select');
      if (selects[0]) selects[0].value = window[`_fBarang_${curPage}`] || 'Semua';
      if (selects[1]) selects[1].value = window[`_fSort_${curPage}`]   || 'tgl_desc';
    }
  }, 0);

  const nc = document.getElementById('nc-barang');
  if (nc) nc.textContent = items.length;
  updateBadgeStokRendah();
}

// ─── Barang: Open modals ──────────────────────────────────
function openAddBarang() {
  document.getElementById('modal-title-barang').textContent = 'Tambah Barang Baru';
  document.getElementById('edit-id').value  = '';
  document.getElementById('b-nama').value   = '';
  document.getElementById('b-stok').value   = '';
  document.getElementById('b-satuan').value = 'Unit';
  document.getElementById('b-lokasi').value = '';
  document.getElementById('b-ket').value    = '';
  document.getElementById('b-kat').value = 'Perangkat Aktif';
  document.getElementById('b-kondisi').value = 'Baik';
  document.getElementById('b-stokmin').value = 5;

  // Reset foto preview
document.getElementById('b-foto').value          = '';
document.getElementById('foto-preview').style.display     = 'none';
document.getElementById('foto-placeholder').style.display = 'block';

  // Generate kode otomatis
  document.getElementById('b-kode').value = generateKode();

  // Update kode saat kategori diganti
  document.getElementById('b-kat').onchange = function() {
    document.getElementById('b-kode').value = generateKode();
  };

  openM('modal-barang');
  setTimeout(() => document.getElementById('b-nama').focus(), 100);
}

function openEditBarang(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  document.getElementById('modal-title-barang').textContent = 'Edit Barang';
  document.getElementById('edit-id').value      = id;
  document.getElementById('b-nama').value       = item.nama;
  document.getElementById('b-kode').value       = item.kode;
  document.getElementById('b-stok').value       = item.stok;
  document.getElementById('b-satuan').value     = item.satuan;
  document.getElementById('b-kat').value        = item.kat;
  document.getElementById('b-lokasi').value     = item.lokasi;
  document.getElementById('b-kondisi').value    = item.kondisi;
  document.getElementById('b-ket').value        = item.ket || '';
  document.getElementById('b-stokmin').value = item.stok_min ?? 5;
  openM('modal-barang');

  // Tampilkan foto lama jika ada
const preview     = document.getElementById('foto-preview');
const placeholder = document.getElementById('foto-placeholder');
document.getElementById('b-foto').value = '';
if (item.foto) {
  preview.src           = 'uploads/' + item.foto;
  preview.style.display = 'block';
  placeholder.style.display = 'none';
} else {
  preview.style.display     = 'none';
  placeholder.style.display = 'block';
}
}

// ─── Barang: Save ─────────────────────────────────────────
async function saveBarang() {
  if (window.userRole !== 'Admin') { toast('Akses ditolak', 'error'); return; }
  const nama = document.getElementById('b-nama').value.trim();
  if (!nama) { toast('Nama barang wajib diisi', 'error'); return; }

  const editId = document.getElementById('edit-id').value;
  const data = {
    id:      editId || null,
    nama,
    kode:    document.getElementById('b-kode').value.trim(),
    kat:     document.getElementById('b-kat').value,
    stok:    parseInt(document.getElementById('b-stok').value) || 0,
    satuan:  document.getElementById('b-satuan').value.trim() || 'Unit',
    lokasi:  document.getElementById('b-lokasi').value.trim() || '—',
    kondisi: document.getElementById('b-kondisi').value,
    ket:     document.getElementById('b-ket').value.trim(),
    stok_min: parseInt(document.getElementById('b-stokmin').value) || 5,
  };

  const method = editId ? 'PUT' : 'POST';
  const url    = editId ? `/api/items/${editId}` : '/api/items';
  const csrf   = document.querySelector('meta[name="csrf-token"]')?.content || '';
  if (!csrf) { toast('Token keamanan tidak ditemukan, coba refresh halaman', 'error'); return; }
  const res    = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrf,
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();

  // Upload foto jika ada file dipilih
  const fotoFile = document.getElementById('b-foto').files[0];
  if (fotoFile) {
    const itemId = editId || result.id;
    const form   = new FormData();
    form.append('id',   itemId);
    form.append('foto', fotoFile);
    await fetch('/api/upload', { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' }, body: form });
  }

  await loadData();
  closeM('modal-barang');
  toast(editId ? 'Barang berhasil diperbarui ✓' : 'Barang berhasil ditambahkan ✓');
  render();
}

// ─── Barang: Delete ───────────────────────────────────────
async function hapus(id) {
  if (window.userRole !== 'Admin') { toast('Akses ditolak', 'error'); return; }
  const item = items.find(i => i.id == id);
  konfirm(`Hapus barang "${item.nama}"? Tindakan ini tidak bisa dibatalkan.`, async () => {
    await fetch(`/api/items/${id}`, {
  method: 'DELETE',
  headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' }
});
    await loadData();
    toast('Barang dihapus');
    render();
  }, { title: 'Hapus Barang', ok: 'Ya, Hapus' });
}

// ─── Transaksi: Delete ───────────────────────────────────
async function hapusTrans(id, nama, jumlah) {
  konfirm(`Hapus transaksi "${nama}" (${jumlah} unit)? Stok barang akan dikembalikan otomatis.`, async () => {
    const res = await fetch(`/api/trans/${id}`, {
  method: 'DELETE',
  headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' }
});
    const data = await res.json();
    if (!res.ok) { toast(data.error || 'Gagal menghapus', 'error'); return; }
    await loadData();
    toast('Transaksi dihapus & stok dikembalikan ✓');
    render();
  }, { title: 'Hapus Transaksi', ok: 'Ya, Hapus' });
}

// ─── Transaksi: Open modal ────────────────────────────────
function openTrans(type) {
  transType = type;

  document.getElementById('modal-title-trans').textContent =
    type === 'masuk' ? 'Catat Stok Masuk' : 'Catat Pemakaian';

  const sel = document.getElementById('t-barang');
  sel.innerHTML = items.map(i =>
    `<option value="${i.id}">${i.nama} — stok: ${i.stok} ${i.satuan}</option>`
  ).join('');

  document.getElementById('t-jumlah').value = '';
  // Gunakan tanggal lokal (bukan UTC dari toISOString yang bisa salah hari untuk UTC+8)
  const now = new Date();
  const localDate = now.getFullYear() + '-'
    + String(now.getMonth() + 1).padStart(2, '0') + '-'
    + String(now.getDate()).padStart(2, '0');
  document.getElementById('t-tgl').value = localDate;
  document.getElementById('t-ket').value    = '';

  // Update save button color
  const btn = document.getElementById('btn-save-trans');
  if (type === 'keluar') {
    btn.style.background    = 'var(--red)';
    btn.style.borderColor   = 'var(--red)';
    btn.style.boxShadow     = '0 0 14px rgba(239,68,68,0.3)';
  } else {
    btn.style.background    = '';
    btn.style.borderColor   = '';
    btn.style.boxShadow     = '';
  }

  openM('modal-trans');
  setTimeout(() => document.getElementById('t-jumlah').focus(), 100);
}

// ─── Transaksi: Save ──────────────────────────────────────
async function saveTrans() {
  const itemId = parseInt(document.getElementById('t-barang').value);
  const jumlah = parseInt(document.getElementById('t-jumlah').value) || 0;
  const tgl    = document.getElementById('t-tgl').value;

  if (!jumlah || jumlah < 1) { toast('Jumlah harus lebih dari 0', 'error'); return; }
  if (!tgl) { toast('Tanggal wajib diisi', 'error'); return; }

  const item = items.find(i => i.id == itemId);
  const data = { type: transType, item_id: itemId, nama: item.nama, jumlah, tgl,
                 ket: document.getElementById('t-ket').value.trim() };

  const res = await fetch('/api/trans', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
  },
  body: JSON.stringify(data)
});

  if (!res.ok) { toast('Stok tidak mencukupi!', 'error'); return; }

  await loadData();
  closeM('modal-trans');
  toast(transType === 'masuk' ? `${jumlah} unit masuk ✓` : `${jumlah} unit keluar ✓`);
  render();
}

// ─── Keyboard shortcuts ───────────────────────────────────
document.addEventListener('keydown', function(e) {
  // ⌘K / Ctrl+K → focus search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('q').focus();
  }
  // Escape → close any open modal
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
    });
  }
});

// ─── Preview Foto ─────────────────────────────────────────
function previewFoto(input) {
  const file = input.files[0];
  if (!file) return;

  input.value = '';

  bukaModalCrop(file, function(croppedFile) {
    // Simpan file hasil crop
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(croppedFile);
    document.getElementById('b-foto').files = dataTransfer.files;

    // Tampilkan preview langsung dari blob
    const url = URL.createObjectURL(croppedFile);
    const preview     = document.getElementById('foto-preview');
    const placeholder = document.getElementById('foto-placeholder');

    preview.onload = function() {
      URL.revokeObjectURL(url); // bebaskan memori setelah gambar load
    };

    preview.src               = url;
    preview.style.display     = 'block';
    placeholder.style.display = 'none';
  });
}

// ─── Theme ───────────────────────────────────────────────
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const nextTheme = isDark ? 'light' : 'dark';

  // Cek apakah browser support View Transition
  if (!document.startViewTransition) {
    applyTheme(nextTheme);
    return;
  }

  document.startViewTransition(() => applyTheme(nextTheme));
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const el = document.getElementById('theme-icon');
  if (el) el.className = theme === 'light' ? 'ti ti-sun' : 'ti ti-moon';
}

// ─── Init ─────────────────────────────────────────────────
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
  setTimeout(() => {
    const el = document.getElementById('theme-icon');
    if (el) el.className = 'ti ti-sun';
  }, 0);

}

// ─── Detail Barang ────────────────────────────────────────
function bukaDetail(id) {
  const item = items.find(i => i.id == id);
  if (!item) return;

  // Hapus modal lama jika ada
  const old = document.getElementById('modal-detail');
  if (old) old.remove();

  document.body.insertAdjacentHTML('beforeend', renderDetailModal(item));
}

function bukaDetailTrans(id) {
  const t = trans.find(x => x.id == id);
  if (!t) return;
  const old = document.getElementById('modal-detail-trans');
  if (old) old.remove();
  document.body.insertAdjacentHTML('beforeend', renderDetailTransModal(t));
}

function closeDetailOnBackdrop(e) {
  if (e.target.id === 'modal-detail') closeM('modal-detail');
}

// ─── Upload Foto ──────────────────────────────────────────
async function uploadFoto(id, input) {
  const file = input.files[0];
  if (!file) return;

  input.value = '';

  bukaModalCrop(file, async function(croppedFile) {
    const form = new FormData();
    form.append('id',   id);
    form.append('foto', croppedFile);

    const csrf2 = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const res  = await fetch('/api/upload', { method: 'POST', headers: { 'X-CSRF-TOKEN': csrf2 }, body: form });
    const data = await res.json();

    if (data.error) { toast(data.error, 'error'); return; }

    const item = items.find(i => i.id == id);
    if (item) item.foto = data.foto;

    toast('Foto berhasil diupload ✓');

    const old = document.getElementById('modal-detail');
    if (old) old.remove();
    bukaDetail(id);
  });
}

// ─── Kelola User ──────────────────────────────────────────
async function loadUsers() {
  const tbody = document.getElementById('user-tbody');
  const count = document.getElementById('user-count');
  if (!tbody) return;

  try {
    const res   = await fetch('/api/users');
    if (!res.ok) throw new Error(res.status);
    const users = await res.json();

    // Update stat cards
    const totalAdmin   = users.filter(u => u.role === 'Admin').length;
    const totalTeknisi = users.filter(u => u.role === 'Teknisi').length;
    const elTotal   = document.getElementById('stat-total-user');
    const elAdmin   = document.getElementById('stat-total-admin');
    const elTeknisi = document.getElementById('stat-total-teknisi');
    if (elTotal)   elTotal.textContent   = users.length;
    if (elAdmin)   elAdmin.textContent   = totalAdmin;
    if (elTeknisi) elTeknisi.textContent = totalTeknisi;

    if (count) count.textContent = `${users.length} user terdaftar`;

    tbody.innerHTML = users.length === 0
      ? `<tr><td colspan="8"><div class="empty-state"><i class="ti ti-users"></i><p>Belum ada user</p></div></td></tr>`
      : users.map((u, i) => {
          const avatarInner = u.foto
            ? `<img src="uploads/avatars/${u.foto}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--border)" />`
            : `<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0">${u.nama.charAt(0).toUpperCase()}</div>`;

          const lastLogin = u.last_login
            ? new Date(u.last_login).toLocaleString('id-ID', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
            : '—';

          const roleCls = u.role === 'Admin' ? 'badge-elekt' : u.role === 'Teknisi' ? 'badge-atk' : 'badge-lain';

          return `<tr>
            <td style="color:var(--text-3);font-family:var(--font-mono);font-size:11px;text-align:center">${i + 1}</td>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                ${avatarInner}
                <div style="min-width:0">
                  <div style="font-weight:600;color:var(--text-0);font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.nama}</div>
                  <div style="font-size:11px;color:var(--text-3);margin-top:1px">ID #${u.id}</div>
                </div>
              </div>
            </td>
            <td>
              <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-2);background:var(--bg-2);padding:3px 8px;border-radius:var(--radius-sm);border:1px solid var(--border)">${u.username}</span>
            </td>
            <td style="font-size:12px;color:var(--text-2)">${u.email || '<span style="color:var(--text-3)">—</span>'}</td>
            <td style="font-size:12px;color:var(--text-2)">${u.telepon || '<span style="color:var(--text-3)">—</span>'}</td>
            <td><span class="badge ${roleCls}">${u.role}</span></td>
            <td>
              <div style="font-size:11px;color:var(--text-2);font-family:var(--font-mono)">${lastLogin}</div>
            </td>
            <td>
              <div class="act-wrap">
                <button class="act-btn edit" title="Edit User" onclick="openEditUser(${u.id})">
                  <i class="ti ti-pencil"></i>
                </button>
                <button class="act-btn" title="Reset Password" onclick="openResetPassword(${u.id}, '${u.nama}')"
                  style="color:var(--text-3)"
                  onmouseover="this.style.color='var(--amber)';this.style.background='var(--amber-dim)'"
                  onmouseout="this.style.color='var(--text-3)';this.style.background='none'">
                  <i class="ti ti-key"></i>
                </button>
                <button class="act-btn del" title="Hapus User" onclick="hapusUser(${u.id}, '${u.nama}')">
                  <i class="ti ti-trash"></i>
                </button>
              </div>
            </td>
          </tr>`;
        }).join('');

  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="ti ti-alert-circle"></i><p>Gagal memuat: ${e.message}</p></div></td></tr>`;
  }
}

// Tambah user
function openAddUser() {
  document.getElementById('modal-user-title').textContent = 'Tambah User';
  document.getElementById('u-id').value       = '';
  document.getElementById('u-nama').value     = '';
  document.getElementById('u-username').value = '';
  document.getElementById('u-email').value    = '';
  document.getElementById('u-telepon').value  = '';
  document.getElementById('u-password').value = '';
  document.getElementById('u-role').value = 'Teknisi';
  document.getElementById('u-password-wrap').style.display = 'block';
  document.getElementById('u-avatar-wrap').style.display   = 'none';
  openM('modal-user');
  setTimeout(() => document.getElementById('u-nama').focus(), 100);
}

// Edit user
async function openEditUser(id) {
  const res   = await fetch('/api/users');
  const users = await res.json();
  const u     = users.find(x => x.id == id);
  if (!u) return;

  document.getElementById('modal-user-title').textContent = 'Edit User';
  document.getElementById('u-id').value       = u.id;
  document.getElementById('u-nama').value     = u.nama;
  document.getElementById('u-username').value = u.username;
  document.getElementById('u-email').value    = u.email || '';
  document.getElementById('u-telepon').value  = u.telepon || '';
  document.getElementById('u-role').value     = u.role;
  document.getElementById('u-password-wrap').style.display = 'none';
  document.getElementById('u-avatar-wrap').style.display   = 'block';

  // Tampilkan avatar
  const avatarPreview = document.getElementById('u-avatar-preview');
  if (u.foto) {
    avatarPreview.innerHTML = `<img src="uploads/avatars/${u.foto}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--border)" />`;
  } else {
    avatarPreview.innerHTML = `<div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#fff">${u.nama.charAt(0).toUpperCase()}</div>`;
  }

  openM('modal-user');
}

// Simpan user (tambah / edit)
async function saveUser() {
  const id       = document.getElementById('u-id').value;
  const nama     = document.getElementById('u-nama').value.trim();
  const username = document.getElementById('u-username').value.trim();
  const email    = document.getElementById('u-email').value.trim();
  const telepon  = document.getElementById('u-telepon').value.trim();
  const role     = document.getElementById('u-role').value;
  const password = document.getElementById('u-password').value;

  if (!nama || !username) { toast('Nama dan username wajib diisi', 'error'); return; }

  if (!id) {
    // Tambah baru
    if (!password) { toast('Password wajib diisi', 'error'); return; }
    if (password.length < 8) { toast('Password minimal 8 karakter', 'error'); return; }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || '';
    if (!csrfToken) { toast('Token keamanan tidak ditemukan, coba refresh halaman', 'error'); return; }
    const res  = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
      body: JSON.stringify({ nama, username, password, role, email, telepon }),
    });
    const data = await res.json();
    if (!res.ok) { toast(data.error || 'Gagal menyimpan', 'error'); return; }

    // Upload avatar jika ada
    const fotoFile = document.getElementById('u-foto-input').files[0];
    if (fotoFile && data.id) {
      const form = new FormData();
      form.append('id', data.id);
      form.append('foto', fotoFile);
      await fetch('/api/users/foto', { method: 'POST', headers: { 'X-CSRF-TOKEN': csrfToken }, body: form });
    }

    toast('User berhasil ditambahkan ✓');

  } else {
    // Edit
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || '';
    if (!csrfToken) { toast('Token keamanan tidak ditemukan, coba refresh halaman', 'error'); return; }
    const res  = await fetch(`/api/users/${parseInt(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
      body: JSON.stringify({ id: parseInt(id), nama, username, role, email, telepon }),
    });
    const data = await res.json();
    if (!res.ok) { toast(data.error || 'Gagal menyimpan', 'error'); return; }

    // Upload avatar jika ada file baru
    const fotoFile = document.getElementById('u-foto-input').files[0];
    if (fotoFile) {
      const form = new FormData();
      form.append('id', id);
      form.append('foto', fotoFile);
      await fetch('/api/users/foto', { method: 'POST', headers: { 'X-CSRF-TOKEN': csrfToken }, body: form });
    }

    toast('User berhasil diperbarui ✓');
  }

  closeM('modal-user');
  loadUsers();
}

// Reset password
function openResetPassword(id, nama) {
  document.getElementById('rp-id').value = id;
  document.getElementById('rp-nama').textContent = nama;
  document.getElementById('rp-password').value = '';
  openM('modal-reset-password');
  setTimeout(() => document.getElementById('rp-password').focus(), 100);
}

async function saveResetPassword() {
  const id   = document.getElementById('rp-id').value;
  const pass = document.getElementById('rp-password').value;

  if (!pass) { toast('Password wajib diisi', 'error'); return; }
  if (pass.length < 8) { toast('Password minimal 8 karakter', 'error'); return; }

  const res  = await fetch('/api/users/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
    },
    body: JSON.stringify({ id: parseInt(id), password: pass }),
  });
  const data = await res.json();
  if (!res.ok) { toast(data.error, 'error'); return; }

  closeM('modal-reset-password');
  toast('Password berhasil direset ✓');
}

// Hapus user
async function hapusUser(id, nama) {
  konfirm(`Hapus user "${nama}"? Tindakan ini tidak bisa dibatalkan.`, async () => {
    const res  = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
    });
    const data = await res.json();
    if (!res.ok) { toast(data.error, 'error'); return; }
    toast('User dihapus');
    loadUsers();
  }, { title: 'Hapus User', ok: 'Ya, Hapus' });
}

// Preview avatar
function previewAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  document.getElementById('u-avatar-preview').innerHTML =
    `<img src="${url}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--accent)" />`;
}


// ─── Logout ───────────────────────────────────────────────
async function doLogout() {
  konfirm('Yakin ingin keluar dari sistem?', async () => {
    await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
      }
    });
    localStorage.removeItem('user_nama');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_username');
    window.location.href = '/';
  }, { title: 'Keluar', ok: 'Ya, Keluar', danger: false });
}

// ─── Sidebar Collapse ─────────────────────────────────────
function toggleSidebar() {
  const app       = document.getElementById('app');
  const btn       = document.getElementById('sidebar-toggle');
  const collapsed = app.classList.toggle('sidebar-collapsed');

  btn.style.justifyContent = collapsed ? 'center' : 'flex-end';
  btn.style.paddingRight   = collapsed ? '0' : '14px';

  localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
}

// ─── Crop Foto ────────────────────────────────────────────
let cropperInstance = null;
let cropCallback    = null;

function bukaModalCrop(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('crop-image');
    img.src = e.target.result;

    openM('modal-crop');

    // Destroy instance lama jika ada
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    // Init Cropper setelah modal terbuka
    setTimeout(() => {
      cropperInstance = new Cropper(img, {
        aspectRatio:    NaN,         // 1:1 (kotak), ganti NaN untuk bebas
        viewMode:       1,
        autoCropArea:   0.9,
        responsive:     true,
        background:     false,
        guides:         true,
        highlight:      true,
        movable:        true,
        zoomable:       true,
        rotatable:      true,
        scalable:       true,
      });
    }, 200);

    cropCallback = callback;
  };
  reader.readAsDataURL(file);
}

function cropperAction(action, value) {
  if (!cropperInstance) return;
  if (action === 'rotate') cropperInstance.rotate(value);
  if (action === 'zoom')   cropperInstance.zoom(value);
  if (action === 'reset')  cropperInstance.reset();
  if (action === 'flip' && value === 'x') {
    const data = cropperInstance.getData();
    cropperInstance.scaleX(data.scaleX === -1 ? 1 : -1);
  }
  if (action === 'flip' && value === 'y') {
    const data = cropperInstance.getData();
    cropperInstance.scaleY(data.scaleY === -1 ? 1 : -1);
  }
}

function konfirmasiCrop() {
  if (!cropperInstance) return;

cropperInstance.getCroppedCanvas({
  maxWidth:  1200,
  maxHeight: 1200,
  imageSmoothingQuality: 'high',
}).toBlob(function(blob) {
    const file = new File([blob], 'foto.jpg', { type: 'image/jpeg' });

    if (cropCallback) cropCallback(file);

    batalCrop();
  }, 'image/jpeg', 0.85); // 0.85 = kualitas 85% (compress otomatis)
}

function batalCrop() {
  closeM('modal-crop');
  if (cropperInstance) {
    cropperInstance.destroy();
    cropperInstance = null;
  }
  cropCallback = null;
}

// ─── Modal Konfirmasi (pengganti confirm()) ────────────────
function konfirm(pesan, onYa, opsi = {}) {
  document.getElementById('konfirm-title').textContent = opsi.title   || 'Konfirmasi';
  document.getElementById('konfirm-msg').textContent   = pesan;
  document.getElementById('konfirm-batal').textContent = opsi.batal   || 'Batal';

  const btnOk = document.getElementById('konfirm-ok');
  btnOk.innerHTML = `<i class="ti ti-check"></i> ${opsi.ok || 'Ya, Lanjutkan'}`;
  btnOk.style.background   = opsi.danger === false ? 'var(--accent)' : 'var(--red)';
  btnOk.style.borderColor  = opsi.danger === false ? 'var(--accent)' : 'var(--red)';
  btnOk.style.boxShadow    = opsi.danger === false
    ? '0 0 14px rgba(59,130,246,0.3)'
    : '0 0 14px rgba(239,68,68,0.3)';

  btnOk.onclick = function() {
    closeM('modal-konfirm');
    onYa();
  };

  openM('modal-konfirm');
}

// ─── Sync filter selects setelah render ───────────────────
function syncFilterSelects() {
  ['masuk', 'keluar'].forEach(type => {
    const val = window[`_fBarang_${type}`] || 'Semua';
    document.querySelectorAll('.filter-select').forEach(sel => {
      if ([...sel.options].some(o => o.value === val)) {
        sel.value = val;
      }
    });
  });
}