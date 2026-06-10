<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Inventaris Kantor — Fajar Technos</title>

    {{-- Favicon --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('public/favicon.png') }}">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

    {{-- CSS --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" />
    <link rel="stylesheet" href="{{ asset('css/inventaris.css') }}" />

    {{-- JS --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js"></script>
    <script src="{{ asset('js/data.js') }}"></script>
</head>
<body>
  <div class="app" id="app">

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">

      <!-- Hamburger di sini -->
      <button onclick="toggleSidebar()" id="sidebar-toggle" title="Toggle Sidebar">
        <span id="hb-1"></span>
        <span id="hb-2"></span>
        <span id="hb-3"></span>
      </button>

      <nav class="nav">
        <div class="nav-section">
          <div class="nav-section-label">Utama</div>
          <a class="nav-item active" id="nav-barang" onclick="nav('barang')" data-label="Data Barang">
            <span class="nav-icon"><i class="ti ti-package"></i></span>
            <span>Data Barang</span>
            <span class="nav-count" id="nc-barang">0</span>
          </a>
          <a class="nav-item" id="nav-masuk" onclick="nav('masuk')" data-label="Stok Masuk">
            <span class="nav-icon"><i class="ti ti-arrow-bar-to-down"></i></span>
            <span>Stok Masuk</span>
          </a>
          <a class="nav-item" id="nav-keluar" onclick="nav('keluar')" data-label="Pemakaian">
            <span class="nav-icon"><i class="ti ti-arrow-bar-up"></i></span>
            <span>Pemakaian</span>
          </a>
        </div>
        <div class="nav-section">
          <div class="nav-section-label">Analitik</div>
          <a class="nav-item" id="nav-laporan" onclick="nav('laporan')" data-label="Laporan">
            <span class="nav-icon"><i class="ti ti-chart-bar"></i></span>
            <span>Laporan</span>
          </a>
        </div>
        <div class="nav-section" id="nav-section-admin">
          <div class="nav-section-label">Pengaturan</div>
          <a class="nav-item" id="nav-user" onclick="nav('user')" data-label="Kelola User">
            <span class="nav-icon"><i class="ti ti-users"></i></span>
            <span>Kelola User</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">A</div>
          <div class="user-info">
            <div class="user-name">Admin</div>
            <div class="user-role">Admin</div>
          </div>
        </div>
        <button
          onclick="doLogout()"
          title="Keluar"
          style="margin-top:10px; width:100%; background:none; border:1px solid var(--border);
                 border-radius:var(--radius-md); padding:7px; color:var(--text-3);
                 font-size:12px; font-family:var(--font-sans); cursor:pointer;
                 display:flex; align-items:center; justify-content:center; gap:6px;
                 transition:all 0.15s;"
          onmouseover="this.style.color='var(--red)';this.style.borderColor='rgba(239,68,68,0.3)'"
          onmouseout="this.style.color='var(--text-3)';this.style.borderColor='var(--border)'">
          <i class="ti ti-logout"></i> Keluar
        </button>
      </div>

    </aside>

    <!-- Main content -->
    <div class="main">
      <header class="topbar">
        <div class="topbar-left">
          <img
            src="{{ asset('assets/images/logo1.png') }}"
            alt="Fajar Technos"
            class="topbar-logo"
          />
          <div class="topbar-divider"></div>
          <div class="page-meta">
            <h1 class="page-title" id="ptitle">Data Barang</h1>
            <p class="page-desc" id="pbread">Kelola semua aset kantor</p>
          </div>
        </div>
        <div class="topbar-right">
          <button class="btn btn-outline" onclick="toggleTheme()" title="Ganti tema">
            <i class="ti ti-moon" id="theme-icon"></i>
          </button>
          <button class="btn btn-outline mobile-only" onclick="doLogout()" title="Keluar"
            style="color:var(--red);border-color:rgba(239,68,68,0.3)">
            <i class="ti ti-logout"></i>
          </button>
          <div class="search-wrap">
            <i class="ti ti-search search-icon"></i>
            <input type="text" class="search-input" id="q" placeholder="Cari barang..." oninput="doSearch(this.value)" />
            <kbd class="search-kbd">⌘K</kbd>
          </div>
          <div class="topbar-date" id="topbar-date"></div>
        </div>
      </header>

      <div class="content" id="ca"></div>
    </div>

  </div>

  <!-- Modal Barang -->
  <div class="modal-backdrop" id="modal-barang">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title-barang">Tambah Barang</h2>
        <button class="modal-close" onclick="closeM('modal-barang')"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="edit-id" value="" />
        <div class="form-field">
          <label class="form-label">Nama Barang <span class="req">*</span></label>
          <input type="text" class="form-input" id="b-nama" placeholder="Contoh: Laptop Dell XPS 15" />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Kategori</label>
            <select class="form-input" id="b-kat">
              <option>Perangkat Aktif</option>
              <option>Infrastruktur Fiber Optik</option>
              <option>Kabel Fiber Optik</option>
              <option>Konektor &amp; Aksesoris</option>
              <option>Perangkat Wireless</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Kode Barang</label>
            <input type="text" class="form-input" id="b-kode" placeholder="INV-001" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Stok Awal</label>
            <input type="number" class="form-input" id="b-stok" placeholder="0" min="0" />
          </div>
          <div class="form-field">
            <label class="form-label">Satuan</label>
            <input type="text" class="form-input" id="b-satuan" placeholder="Unit / Buah / Rim" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Lokasi</label>
            <input type="text" class="form-input" id="b-lokasi" placeholder="Ruang A / Gudang" />
          </div>
          <div class="form-field">
            <label class="form-label">Kondisi</label>
            <select class="form-input" id="b-kondisi">
              <option>Baik</option><option>Rusak</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Foto Barang</label>
          <div class="foto-upload-wrap" id="foto-preview-wrap">
            <div class="detail-foto-placeholder" id="foto-placeholder">
              <i class="ti ti-photo"></i>
              <span>Klik untuk pilih foto</span>
            </div>
            <img id="foto-preview" class="detail-foto" style="display:none" alt="preview" />
          </div>
          <input type="file" id="b-foto" accept="image/*" style="display:none" onchange="previewFoto(this)" />
          <label for="b-foto" class="btn btn-outline btn-upload" style="margin-top:8px">
            <i class="ti ti-upload"></i> Pilih Foto
          </label>
        </div>
        <div class="form-field">
          <label class="form-label">Stok Minimum <span style="font-size:11px;color:var(--text-3)">(peringatan jika stok ≤ angka ini)</span></label>
          <input type="number" class="form-input" id="b-stokmin" placeholder="5" min="0" />
        </div>
        <div class="form-field">
          <label class="form-label">Keterangan</label>
          <textarea class="form-input form-textarea" id="b-ket" placeholder="Opsional..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeM('modal-barang')">Batal</button>
        <button class="btn btn-primary" onclick="saveBarang()">
          <i class="ti ti-check"></i> Simpan Barang
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Transaksi -->
  <div class="modal-backdrop" id="modal-trans">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title-trans">Catat Barang Masuk</h2>
        <button class="modal-close" onclick="closeM('modal-trans')"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-field">
          <label class="form-label">Pilih Barang <span class="req">*</span></label>
          <select class="form-input" id="t-barang"></select>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Jumlah <span class="req">*</span></label>
            <input type="number" class="form-input" id="t-jumlah" placeholder="0" min="1" />
          </div>
          <div class="form-field">
            <label class="form-label">Tanggal</label>
            <input type="date" class="form-input" id="t-tgl" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Keterangan</label>
          <input type="text" class="form-input" id="t-ket" placeholder="Opsional..." />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeM('modal-trans')">Batal</button>
        <button class="btn btn-primary" id="btn-save-trans" onclick="saveTrans()">
          <i class="ti ti-check"></i> Simpan
        </button>
      </div>
    </div>
  </div>

  <!-- Modal User -->
  <div class="modal-backdrop" id="modal-user">
    <div class="modal" role="dialog" aria-modal="true" style="width:480px">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-user-title">Tambah User</h2>
        <button class="modal-close" onclick="closeM('modal-user')"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="u-id" />
        <div id="u-avatar-wrap" style="display:none;margin-bottom:16px">
          <label class="form-label">Foto Profil</label>
          <div style="display:flex;align-items:center;gap:14px">
            <div id="u-avatar-preview"></div>
            <label class="btn btn-outline btn-upload" style="cursor:pointer">
              <i class="ti ti-upload"></i> Ganti Foto
              <input type="file" id="u-foto-input" accept="image/*" style="display:none" onchange="previewAvatar(this)" />
            </label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Nama Lengkap <span class="req">*</span></label>
            <input type="text" class="form-input" id="u-nama" placeholder="Contoh: Budi Santoso" />
          </div>
          <div class="form-field">
            <label class="form-label">Username <span class="req">*</span></label>
            <input type="text" class="form-input" id="u-username" placeholder="budi123" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="u-email" placeholder="example@email.com" />
          </div>
          <div class="form-field">
            <label class="form-label">No. Telepon</label>
            <input type="text" class="form-input" id="u-telepon" placeholder="08xxxxxxxxxx" />
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Role</label>
          <select class="form-input" id="u-role">
            <option value="Teknisi">Teknisi</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div id="u-password-wrap">
          <div class="form-field">
            <label class="form-label">Password <span class="req">*</span></label>
            <input type="password" class="form-input" id="u-password" placeholder="Min. 6 karakter" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeM('modal-user')">Batal</button>
        <button class="btn btn-primary" onclick="saveUser()">
          <i class="ti ti-check"></i> Simpan
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Reset Password -->
  <div class="modal-backdrop" id="modal-reset-password">
    <div class="modal" role="dialog" aria-modal="true" style="width:380px">
      <div class="modal-header">
        <h2 class="modal-title">Reset Password</h2>
        <button class="modal-close" onclick="closeM('modal-reset-password')"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="rp-id" />
        <p style="font-size:13px;color:var(--text-2);margin-bottom:14px">
          Reset password untuk: <strong id="rp-nama" style="color:var(--text-0)"></strong>
        </p>
        <div class="form-field">
          <label class="form-label">Password Baru <span class="req">*</span></label>
          <input type="password" class="form-input" id="rp-password" placeholder="Min. 6 karakter" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeM('modal-reset-password')">Batal</button>
        <button class="btn btn-primary" onclick="saveResetPassword()">
          <i class="ti ti-key"></i> Reset Password
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Crop Foto -->
  <div class="modal-backdrop" id="modal-crop">
    <div class="modal" role="dialog" aria-modal="true" style="width:540px">
      <div class="modal-header">
        <h2 class="modal-title">Atur Foto</h2>
        <button class="modal-close" onclick="batalCrop()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div style="background:var(--bg-0);border-radius:var(--radius-md);overflow:hidden;max-height:380px;">
          <img id="crop-image" style="max-width:100%;display:block;" />
        </div>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="cropperAction('rotate', -90)" title="Putar Kiri"><i class="ti ti-rotate-counterclockwise"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('rotate', 90)" title="Putar Kanan"><i class="ti ti-rotate-clockwise"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('flip', 'x')" title="Flip Horizontal"><i class="ti ti-flip-horizontal"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('flip', 'y')" title="Flip Vertikal"><i class="ti ti-flip-vertical"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('zoom', 0.1)" title="Zoom In"><i class="ti ti-zoom-in"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('zoom', -0.1)" title="Zoom Out"><i class="ti ti-zoom-out"></i></button>
          <button class="btn btn-outline" onclick="cropperAction('reset')" title="Reset"><i class="ti ti-refresh"></i></button>
        </div>
        <p style="font-size:11px;color:var(--text-3);text-align:center;margin-top:8px;">
          Geser untuk pindah · Scroll untuk zoom · Tarik sudut untuk crop
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="batalCrop()">Batal</button>
        <button class="btn btn-primary" onclick="konfirmasiCrop()">
          <i class="ti ti-check"></i> Gunakan Foto
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Konfirmasi -->
  <div class="modal-backdrop" id="modal-konfirm">
    <div class="modal" role="dialog" aria-modal="true" style="width:360px">
      <div class="modal-header">
        <h2 class="modal-title" id="konfirm-title">Konfirmasi</h2>
        <button class="modal-close" onclick="closeM('modal-konfirm')"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body" style="padding-bottom:8px">
        <p id="konfirm-msg" style="font-size:14px;color:var(--text-1);line-height:1.6"></p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeM('modal-konfirm')" id="konfirm-batal">Batal</button>
        <button class="btn btn-primary" id="konfirm-ok" style="background:var(--red);border-color:var(--red);box-shadow:0 0 14px rgba(239,68,68,0.3)">
          <i class="ti ti-check"></i> Ya, Lanjutkan
        </button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast">
    <div class="toast-body">
      <i class="ti ti-circle-check toast-icon"></i>
      <span id="tmsg"></span>
    </div>
  </div>

  <script src="{{ asset('js/utils.js') }}"></script>
  <script src="{{ asset('js/views.js') }}"></script>
  <script src="{{ asset('js/app.js') }}"></script>
  <script>
    (async () => {
      try {
        const res  = await fetch('/auth/check');
        const data = await res.json();

        if (!data.loggedIn) {
          if (!window._loggingOut) window.location.href = '/login';
          return;
        }

        const nama = data.nama || localStorage.getItem('user_nama') || 'Admin';
        const role = data.role || localStorage.getItem('user_role') || 'User';

        document.querySelector('.user-name').textContent = nama;
        document.querySelector('.user-role').textContent = role;
        document.querySelector('.user-avatar').textContent = nama.charAt(0).toUpperCase();

        window.userRole = role;

        showSkeleton();
        await loadData();

        if (role !== 'Admin') {
          const navAdmin = document.getElementById('nav-section-admin');
          if (navAdmin) navAdmin.style.display = 'none';

          document.querySelectorAll('.nav-section').forEach(sec => {
            const label = sec.querySelector('.nav-section-label');
            if (label && label.textContent.trim() === 'Analitik') {
              sec.style.display = 'none';
            }
          });
        }

        updateDate();
        setInterval(updateDate, 60_000);
        render();
        updateBadgeStokRendah();

        if (localStorage.getItem('sidebar-collapsed') === '1') {
          document.getElementById('app').classList.add('sidebar-collapsed');
        }

      } catch (e) {
        console.error('Init error:', e);
      }
    })();

    setInterval(async () => {
      try {
        const res  = await fetch('/auth/check');
        const data = await res.json();
        if (!data.loggedIn && !window._loggingOut) {
          alert('Sesi Anda telah berakhir. Silakan login kembali.');
          window.location.href = '/login';
        }
      } catch (e) {}
    }, 5 * 60 * 1000);
  </script>
</body>
</html>