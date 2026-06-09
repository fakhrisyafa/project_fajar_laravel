/**
 * utils.js — Utilitas & Helper Functions
 * Modal, toast, cetak PDF, dan helper umum
 */

// ─── Modal ───────────────────────────────────────────────
function openM(id) {
  document.getElementById(id).classList.add('open');
}

function closeM(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modal when clicking backdrop
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// ─── Toast ────────────────────────────────────────────────
function toast(msg, type = 'success') {
  // Hapus toast lama jika masih ada
  const old = document.getElementById('toast');
  if (old) {
    old.classList.remove('show');
    clearTimeout(old._timer);
  }

  const icons = {
    success: 'ti-circle-check',
    error:   'ti-circle-x',
    warning: 'ti-alert-triangle',
    info:    'ti-info-circle',
  };
  const colors = {
    success: { border: 'rgba(34,197,94,0.35)',  color: 'var(--green)',  bg: 'rgba(34,197,94,0.06)' },
    error:   { border: 'rgba(239,68,68,0.35)',  color: 'var(--red)',    bg: 'rgba(239,68,68,0.06)' },
    warning: { border: 'rgba(245,158,11,0.35)', color: 'var(--amber)',  bg: 'rgba(245,158,11,0.06)' },
    info:    { border: 'rgba(59,130,246,0.35)', color: 'var(--accent)', bg: 'rgba(59,130,246,0.06)' },
  };

  const c = colors[type] || colors.success;
  const iconCls = icons[type] || icons.success;
  const duration = 2800;

  // Update konten
  const t = document.getElementById('toast');
  const iconEl = t.querySelector('.toast-icon');
  const msgEl  = document.getElementById('tmsg');
  let   progEl = t.querySelector('.toast-progress');

  if (iconEl) iconEl.className = `ti ${iconCls} toast-icon`;
  if (msgEl)  msgEl.textContent = msg;

  t.style.borderColor     = c.border;
  t.style.color           = c.color;
  t.style.backgroundColor = `var(--bg-1)`;

  // Progress bar
  if (!progEl) {
    progEl = document.createElement('div');
    progEl.className = 'toast-progress';
    t.appendChild(progEl);
  }
  progEl.style.background = c.color;
  progEl.style.width = '100%';
  progEl.style.transition = 'none';

  t.classList.add('show');
  clearTimeout(t._timer);

  // Mulai animasi progress bar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progEl.style.transition = `width ${duration}ms linear`;
      progEl.style.width = '0%';
    });
  });

  t._timer = setTimeout(() => {
    t.classList.remove('show');
  }, duration);
}

// ─── Animate Counter ──────────────────────────────────────
function animateCounter(el, target, duration = 800) {
  if (!el || isNaN(target)) return;
  const start     = performance.now();
  const startVal  = 0;
  const easeOut   = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(startVal + (target - startVal) * easeOut(progress));
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ─── Skeleton Loader ──────────────────────────────────────
function showSkeleton() {
  const ca = document.getElementById('ca');
  if (!ca) return;
  const rows = Array(5).fill(0).map(() => `
    <tr>
      <td><div class="skel" style="width:60px"></div></td>
      <td><div class="skel" style="width:140px"></div></td>
      <td><div class="skel" style="width:90%;max-width:200px"></div></td>
      <td><div class="skel" style="width:50px"></div></td>
      <td><div class="skel" style="width:40px"></div></td>
      <td><div class="skel" style="width:70px;border-radius:20px"></div></td>
    </tr>`).join('');
  ca.innerHTML = `
    <div class="stats-grid">
      ${Array(4).fill(0).map(() => `
        <div class="stat-card" style="padding:18px 20px">
          <div class="skel" style="width:38px;height:38px;border-radius:10px;margin-bottom:14px"></div>
          <div class="skel" style="width:60px;height:28px;margin-bottom:8px"></div>
          <div class="skel" style="width:80px;height:12px"></div>
        </div>`).join('')}
    </div>
    <div class="table-wrap" style="margin-top:16px">
      <table style="table-layout:fixed;width:100%">
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ─── Date ─────────────────────────────────────────────────
function updateDate() {
  const el = document.getElementById('topbar-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('id-ID', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  });
}

// ─── Print / PDF ──────────────────────────────────────────
function cetakLaporan(type) {
  const now = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  let rows = '';
  let title = '';

  const tblStyle = `
    width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px;
  `;
  const thStyle = `
    background:#f3f4f6;padding:9px 12px;text-align:left;font-weight:600;
    font-size:11px;letter-spacing:0.05em;text-transform:uppercase;
    border-bottom:2px solid #e5e7eb;
  `;
  const tdStyle = `
    padding:9px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;
  `;

  if (type === 'stok') {
    title = 'Laporan Stok Barang';
    rows = `
      <table style="${tblStyle}">
        <thead><tr>
          <th style="${thStyle}">No</th>
          <th style="${thStyle}">Kode</th>
          <th style="${thStyle}">Nama Barang</th>
          <th style="${thStyle}">Kategori</th>
          <th style="${thStyle}">Stok</th>
          <th style="${thStyle}">Kondisi</th>
          <th style="${thStyle}">Lokasi</th>
        </tr></thead>
        <tbody>
          ${items.map((i,n) => `<tr>
            <td style="${tdStyle}">${n+1}</td>
            <td style="${tdStyle};font-family:monospace">${i.kode}</td>
            <td style="${tdStyle};font-weight:500">${i.nama}</td>
            <td style="${tdStyle}">${i.kat}</td>
            <td style="${tdStyle};font-weight:600">${i.stok} ${i.satuan}</td>
            <td style="${tdStyle}">${i.kondisi}</td>
            <td style="${tdStyle}">${i.lokasi}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;

  } else if (type === 'masuk' || type === 'keluar') {
    title = 'Laporan Barang ' + (type === 'masuk' ? 'Masuk' : 'Keluar');
    const data = trans.filter(t => t.type === type);
    rows = `
      <table style="${tblStyle}">
        <thead><tr>
          <th style="${thStyle}">No</th>
          <th style="${thStyle}">Tanggal</th>
          <th style="${thStyle}">Nama Barang</th>
          <th style="${thStyle}">Jumlah</th>
          <th style="${thStyle}">Keterangan</th>
        </tr></thead>
        <tbody>
          ${data.map((t,n) => `<tr>
            <td style="${tdStyle}">${n+1}</td>
            <td style="${tdStyle}">${t.tgl}</td>
            <td style="${tdStyle};font-weight:500">${t.nama}</td>
            <td style="${tdStyle};font-weight:600">${t.jumlah}</td>
            <td style="${tdStyle}">${t.ket || '-'}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;

  } else {
    title = 'Laporan Inventaris Lengkap';
    const totalStok   = items.reduce((s,i) => s + i.stok, 0);
    const totalMasuk  = trans.filter(t => t.type === 'masuk').reduce((s,t) => s + t.jumlah, 0);
    const totalKeluar = trans.filter(t => t.type === 'keluar').reduce((s,t) => s + t.jumlah, 0);

    rows = `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#3b82f6;margin-bottom:4px">Total Stok</div>
          <div style="font-size:24px;font-weight:700;font-family:monospace;color:#1d4ed8">${totalStok}</div>
          <div style="font-size:11px;color:#60a5fa">unit tersedia</div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#22c55e;margin-bottom:4px">Total Masuk</div>
          <div style="font-size:24px;font-weight:700;font-family:monospace;color:#15803d">${totalMasuk}</div>
          <div style="font-size:11px;color:#4ade80">unit diterima</div>
        </div>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#ef4444;margin-bottom:4px">Total Keluar</div>
          <div style="font-size:24px;font-weight:700;font-family:monospace;color:#b91c1c">${totalKeluar}</div>
          <div style="font-size:11px;color:#f87171">unit keluar</div>
        </div>
      </div>

      <h3 style="font-size:14px;font-weight:600;margin-bottom:10px">Data Barang</h3>
      <table style="${tblStyle}">
        <thead><tr>
          <th style="${thStyle}">No</th><th style="${thStyle}">Kode</th>
          <th style="${thStyle}">Nama Barang</th><th style="${thStyle}">Kategori</th>
          <th style="${thStyle}">Stok</th><th style="${thStyle}">Kondisi</th>
        </tr></thead>
        <tbody>
          ${items.map((i,n) => `<tr>
            <td style="${tdStyle}">${n+1}</td>
            <td style="${tdStyle};font-family:monospace">${i.kode}</td>
            <td style="${tdStyle};font-weight:500">${i.nama}</td>
            <td style="${tdStyle}">${i.kat}</td>
            <td style="${tdStyle};font-weight:600">${i.stok} ${i.satuan}</td>
            <td style="${tdStyle}">${i.kondisi}</td>
          </tr>`).join('')}
        </tbody>
      </table>

      <h3 style="font-size:14px;font-weight:600;margin-bottom:10px">Riwayat Transaksi</h3>
      <table style="${tblStyle}">
        <thead><tr>
          <th style="${thStyle}">Tanggal</th><th style="${thStyle}">Nama Barang</th>
          <th style="${thStyle}">Jenis</th><th style="${thStyle}">Jumlah</th>
          <th style="${thStyle}">Keterangan</th>
        </tr></thead>
        <tbody>
          ${[...trans].sort((a,b) => b.tgl.localeCompare(a.tgl)).map(t => `<tr>
            <td style="${tdStyle}">${t.tgl}</td>
            <td style="${tdStyle};font-weight:500">${t.nama}</td>
            <td style="${tdStyle}">${t.type === 'masuk' ? '↓ Masuk' : '↑ Keluar'}</td>
            <td style="${tdStyle};font-weight:600">${t.jumlah}</td>
            <td style="${tdStyle}">${t.ket || '-'}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  }

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 32px; color: #111; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
    .header-left h1 { font-size: 22px; font-weight: 700; }
    .header-left p { font-size: 12px; color: #6b7280; margin-top: 3px; }
    .header-badge { background: #eff6ff; color: #1d4ed8; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; border: 1px solid #bfdbfe; }
    .print-btn { display: block; margin-top: 24px; padding: 10px 20px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
    @media print { .print-btn { display: none; } body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>${title}</h1>
      <p>Dicetak pada: ${now} &nbsp;·&nbsp; Sistem Inventaris Kantor</p>
    </div>
    <div class="header-badge">INVENTRA</div>
  </div>
  ${rows}
  <button class="print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
  } else {
    toast('Izinkan pop-up untuk mencetak PDF', 'error');
  }
}

// ─── Export Excel ─────────────────────────────────────────
function exportExcel() {
  const filterTrans   = window._laporanFilter  || 'semua';
  const filterPeriode = window._laporanPeriode || 'bulan';
  const filterDari    = window._laporanDari    || '';
  const filterSampai  = window._laporanSampai  || '';

  // ── Filter transaksi ──
  let data = filterTrans === 'semua' ? [...trans] : trans.filter(t => t.type === filterTrans);

  const today = new Date(); today.setHours(0,0,0,0);
  if (filterPeriode === 'hari') {
    data = data.filter(t => {
      const d = new Date(t.tgl); d.setHours(0,0,0,0);
      return d.getTime() === today.getTime();
    });
  } else if (filterPeriode === '7hari') {
    const batas = new Date(today); batas.setDate(batas.getDate() - 6);
    data = data.filter(t => new Date(t.tgl) >= batas);
  } else if (filterPeriode === 'bulan') {
    data = data.filter(t => {
      const d = new Date(t.tgl);
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });
  } else if (filterPeriode === 'custom' && filterDari && filterSampai) {
    const dari   = new Date(filterDari);
    const sampai = new Date(filterSampai); sampai.setHours(23,59,59,999);
    data = data.filter(t => {
      const d = new Date(t.tgl);
      return d >= dari && d <= sampai;
    });
  }

  data.sort((a,b) => b.tgl.localeCompare(a.tgl));

  // ── Buat workbook ──
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Transaksi ──
  const sheetTrans = data.map((t, i) => ({
    'No':           i + 1,
    'Tanggal':      t.tgl ? t.tgl.slice(0,10) : '—',
    'Jam':          t.tgl && t.tgl.length > 10 ? t.tgl.slice(11,16) : '—',
    'Nama Barang':  t.nama,
    'Jenis':        t.type === 'masuk' ? 'Masuk' : 'Keluar',
    'Jumlah':       t.jumlah,
    'Keterangan':   t.ket || '',
    'Dicatat Oleh': t.dicatat_oleh || '—',
  }));
  const wsTrans = XLSX.utils.json_to_sheet(sheetTrans.length > 0 ? sheetTrans : [{'Keterangan':'Tidak ada data'}]);
  XLSX.utils.book_append_sheet(wb, wsTrans, 'Transaksi');

  // ── Sheet 2: Semua Barang ──
  const sheetStokSemua = items.map((i, idx) => ({
    'No':           idx + 1,
    'Kode':         i.kode,
    'Nama':         i.nama,
    'Kategori':     i.kat,
    'Stok':         i.stok,
    'Satuan':       i.satuan,
    'Lokasi':       i.lokasi,
    'Kondisi':      i.kondisi,
    'Stok Minimum': i.stok_min ?? 5,
  }));
  const wsStokSemua = XLSX.utils.json_to_sheet(sheetStokSemua.length > 0 ? sheetStokSemua : [{'Keterangan':'Tidak ada data'}]);
  XLSX.utils.book_append_sheet(wb, wsStokSemua, 'Semua Barang');

  // ── Sheet 3+: Per Kategori ──
  const kategoriList = [...new Set(items.map(i => i.kat))].sort();
  kategoriList.forEach(kat => {
    const sheetKat = items.filter(i => i.kat === kat).map((i, idx) => ({
      'No':           idx + 1,
      'Kode':         i.kode,
      'Nama':         i.nama,
      'Stok':         i.stok,
      'Satuan':       i.satuan,
      'Lokasi':       i.lokasi,
      'Kondisi':      i.kondisi,
      'Stok Minimum': i.stok_min ?? 5,
    }));
    const wsKat = XLSX.utils.json_to_sheet(sheetKat.length > 0 ? sheetKat : [{'Keterangan':'Tidak ada data'}]);
    XLSX.utils.book_append_sheet(wb, wsKat, kat);
  });

  // ── Nama file ──
  const labelPeriode = {
    hari:   'HariIni',
    '7hari':'7Hari',
    bulan:  new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).replace(' ', '_'),
    custom: `${filterDari}_sd_${filterSampai}`,
  }[filterPeriode] || 'Semua';

  XLSX.writeFile(wb, `Laporan_Inventaris_${labelPeriode}.xlsx`);
  toast('Excel berhasil diexport ✓');
}