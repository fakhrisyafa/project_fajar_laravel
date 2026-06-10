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

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// ─── Toast ────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const old = document.getElementById('toast');
  if (old) { old.classList.remove('show'); clearTimeout(old._timer); }

  const icons  = { success:'ti-circle-check', error:'ti-circle-x', warning:'ti-alert-triangle', info:'ti-info-circle' };
  const colors = {
    success: { border:'rgba(34,197,94,0.35)',  color:'var(--green)',  bg:'rgba(34,197,94,0.06)' },
    error:   { border:'rgba(239,68,68,0.35)',  color:'var(--red)',    bg:'rgba(239,68,68,0.06)' },
    warning: { border:'rgba(245,158,11,0.35)', color:'var(--amber)',  bg:'rgba(245,158,11,0.06)' },
    info:    { border:'rgba(59,130,246,0.35)', color:'var(--accent)', bg:'rgba(59,130,246,0.06)' },
  };

  const c        = colors[type] || colors.success;
  const iconCls  = icons[type]  || icons.success;
  const duration = 2800;

  const t     = document.getElementById('toast');
  const iconEl = t.querySelector('.toast-icon');
  const msgEl  = document.getElementById('tmsg');
  let   progEl = t.querySelector('.toast-progress');

  if (iconEl) iconEl.className = `ti ${iconCls} toast-icon`;
  if (msgEl)  msgEl.textContent = msg;

  t.style.borderColor     = c.border;
  t.style.color           = c.color;
  t.style.backgroundColor = `var(--bg-1)`;

  if (!progEl) { progEl = document.createElement('div'); progEl.className = 'toast-progress'; t.appendChild(progEl); }
  progEl.style.background  = c.color;
  progEl.style.width       = '100%';
  progEl.style.transition  = 'none';

  t.classList.add('show');
  clearTimeout(t._timer);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progEl.style.transition = `width ${duration}ms linear`;
      progEl.style.width = '0%';
    });
  });

  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// ─── Animate Counter ──────────────────────────────────────
function animateCounter(el, target, duration = 800) {
  if (!el || isNaN(target)) return;
  const start   = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round((target) * easeOut(progress));
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
  el.textContent = new Date().toLocaleDateString('id-ID', {
    weekday:'short', day:'2-digit', month:'short', year:'numeric'
  });
}

// ─── Helper: Logo Base64 ──────────────────────────────────
async function getLogoBase64() {
  try {
    const res  = await fetch('/assets/images/logo1.png');
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

// ─── Print / PDF ──────────────────────────────────────────
async function cetakLaporan(type) {
  const logoBase64 = await getLogoBase64();
  const now = new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' });

  const css = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; }
    .wrap { max-width: 1000px; margin: 0 auto; padding: 36px 40px; }

    /* ── Header ── */
    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 28px; padding-bottom: 20px;
      border-bottom: 3px solid #1e40af;
    }
    .header-left { display: flex; align-items: center; gap: 16px; }
    .header-logo { height: 48px; width: auto; object-fit: contain; }
    .header-logo-placeholder {
      width: 48px; height: 48px; background: linear-gradient(135deg,#1e40af,#3b82f6);
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 18px; font-weight: 800;
    }
    .header-text h1 { font-size: 20px; font-weight: 800; color: #1e293b; letter-spacing: -0.02em; }
    .header-text p  { font-size: 12px; color: #64748b; margin-top: 3px; }
    .header-right { text-align: right; }
    .company-name  { font-size: 15px; font-weight: 800; color: #1e40af; letter-spacing: 0.04em; }
    .print-date    { font-size: 11px; color: #94a3b8; margin-top: 4px; }
    .doc-badge {
      display: inline-block; margin-top: 6px; padding: 3px 10px;
      background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe;
      border-radius: 20px; font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
    }

    /* ── Summary Cards ── */
    .cards { display: grid; gap: 12px; margin-bottom: 24px; }
    .cards-3 { grid-template-columns: repeat(3,1fr); }
    .cards-4 { grid-template-columns: repeat(4,1fr); }
    .cards-2 { grid-template-columns: repeat(2,1fr); }
    .card {
      border-radius: 10px; padding: 16px 18px;
      border-left: 4px solid; position: relative; overflow: hidden;
    }
    .card::after {
      content: ''; position: absolute; right: -10px; top: -10px;
      width: 60px; height: 60px; border-radius: 50%; opacity: 0.08;
    }
    .card-blue  { background: #eff6ff; border-color: #2563eb; }
    .card-blue::after  { background: #2563eb; }
    .card-green { background: #f0fdf4; border-color: #16a34a; }
    .card-green::after { background: #16a34a; }
    .card-red   { background: #fef2f2; border-color: #dc2626; }
    .card-red::after   { background: #dc2626; }
    .card-amber { background: #fffbeb; border-color: #d97706; }
    .card-amber::after { background: #d97706; }
    .card-purple{ background: #faf5ff; border-color: #7c3aed; }
    .card-purple::after{ background: #7c3aed; }
    .card-label { font-size: 10px; font-weight: 700; text-transform: uppercase;
                  letter-spacing: 0.08em; opacity: 0.65; margin-bottom: 6px; }
    .card-value { font-size: 28px; font-weight: 800; font-family: 'Courier New', monospace;
                  line-height: 1; letter-spacing: -0.02em; }
    .card-sub   { font-size: 11px; opacity: 0.6; margin-top: 4px; }

    /* ── Section Title ── */
    .section {
      display: flex; align-items: center; gap: 10px;
      font-size: 13px; font-weight: 700; color: #1e293b;
      margin-bottom: 12px; padding: 10px 14px;
      background: #f1f5f9; border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .section-icon { font-size: 16px; }

    /* ── Table ── */
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 28px; }
    thead tr {
      background: linear-gradient(135deg, #1e3a8a, #2563eb);
    }
    thead th {
      color: #fff; padding: 11px 13px; text-align: left;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; border: none;
    }
    thead th:first-child { border-radius: 8px 0 0 0; }
    thead th:last-child  { border-radius: 0 8px 0 0; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody tr { transition: background 0.1s; }
    tbody td {
      padding: 10px 13px; border-bottom: 1px solid #e2e8f0;
      vertical-align: middle; color: #334155;
    }
    tbody tr:last-child td { border-bottom: none; }
    .num  { font-family: 'Courier New', monospace; font-weight: 700; }
    .code { font-family: 'Courier New', monospace; font-size: 11px; color: #64748b; }
    .name { font-weight: 600; color: #1e293b; }
    .muted{ color: #94a3b8; }
    .center { text-align: center; }

    /* ── Badges ── */
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 10px; font-weight: 700; letter-spacing: 0.03em;
    }
    .b-baik   { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .b-rusak  { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    .b-masuk  { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .b-keluar { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

    /* ── Stok Colors ── */
    .s-ok   { color: #16a34a; font-weight: 700; font-family: 'Courier New', monospace; }
    .s-warn { color: #d97706; font-weight: 700; font-family: 'Courier New', monospace; }
    .s-zero { color: #dc2626; font-weight: 700; font-family: 'Courier New', monospace; }

    /* ── Footer ── */
    .footer {
      margin-top: 28px; padding-top: 16px;
      border-top: 2px solid #e2e8f0;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 11px; color: #94a3b8;
    }
    .footer-left { display: flex; align-items: center; gap: 8px; }
    .footer-logo { height: 20px; opacity: 0.5; }

    /* ── Print Button ── */
    .print-btn {
      display: flex; align-items: center; gap: 8px;
      margin: 28px auto 0; padding: 12px 32px;
      background: linear-gradient(135deg, #1e3a8a, #2563eb);
      color: #fff; border: none; border-radius: 10px;
      font-size: 14px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 14px rgba(37,99,235,0.4);
    }

    @media print {
      .print-btn { display: none !important; }
      .wrap { padding: 16px 20px; }
      thead tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      tbody tr:nth-child(even) { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .card { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .section { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;

  const logoTag = logoBase64
    ? `<img src="${logoBase64}" class="header-logo" alt="Logo" />`
    : `<div class="header-logo-placeholder">FT</div>`;

  const header = (title, subtitle = '') => `
    <div class="header">
      <div class="header-left">
        ${logoTag}
        <div class="header-text">
          <h1>${title}</h1>
          <p>${subtitle || 'Sistem Inventaris Kantor · Fajar Technos'}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="company-name">FAJAR TECHNOS</div>
        <div class="print-date">Dicetak: ${now}</div>
        <div class="doc-badge">DOKUMEN RESMI</div>
      </div>
    </div>`;

  const footer = () => `
    <div class="footer">
      <div class="footer-left">
        ${logoBase64 ? `<img src="${logoBase64}" class="footer-logo" />` : ''}
        <span>Fajar Technos — Sistem Inventaris Kantor</span>
      </div>
      <span>Dicetak pada ${now} · Halaman 1</span>
    </div>`;

  const stokCls = s => s === 0 ? 's-zero' : s < 5 ? 's-warn' : 's-ok';

  let body = '';
  let title = '';

  // ── Laporan Stok ──
  if (type === 'stok') {
    title = 'Laporan Stok Barang';
    const totalStok  = items.reduce((s,i) => s + i.stok, 0);
    const totalBaik  = items.filter(i => i.kondisi === 'Baik').length;
    const totalRusak = items.filter(i => i.kondisi === 'Rusak').length;
    const stokRendah = items.filter(i => i.stok < 5).length;

    body = `
      <div class="cards cards-4">
        <div class="card card-blue">
          <div class="card-label">Total Jenis</div>
          <div class="card-value" style="color:#1e40af">${items.length}</div>
          <div class="card-sub">jenis barang</div>
        </div>
        <div class="card card-green">
          <div class="card-label">Total Stok</div>
          <div class="card-value" style="color:#16a34a">${totalStok}</div>
          <div class="card-sub">unit tersedia</div>
        </div>
        <div class="card card-amber">
          <div class="card-label">Kondisi Baik</div>
          <div class="card-value" style="color:#d97706">${totalBaik}</div>
          <div class="card-sub">${totalRusak} rusak</div>
        </div>
        <div class="card card-red">
          <div class="card-label">Stok Rendah</div>
          <div class="card-value" style="color:#dc2626">${stokRendah}</div>
          <div class="card-sub">perlu restock</div>
        </div>
      </div>
      <div class="section"><span class="section-icon">📦</span> Data Stok Barang — ${items.length} Item</div>
      <table>
        <thead><tr>
          <th style="width:40px" class="center">No</th>
          <th style="width:90px">Kode</th>
          <th>Nama Barang</th>
          <th>Kategori</th>
          <th style="width:100px" class="center">Stok</th>
          <th style="width:80px" class="center">Kondisi</th>
          <th style="width:110px">Lokasi</th>
        </tr></thead>
        <tbody>
          ${items.map((i,n) => `
          <tr>
            <td class="center muted">${n+1}</td>
            <td class="code">${i.kode}</td>
            <td class="name">${i.nama}</td>
            <td style="color:#64748b;font-size:11px">${i.kat}</td>
            <td class="center"><span class="${stokCls(i.stok)}">${i.stok} ${i.satuan}</span></td>
            <td class="center"><span class="badge b-${i.kondisi.toLowerCase()}">${i.kondisi}</span></td>
            <td class="muted">${i.lokasi || '—'}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;

  // ── Laporan Masuk / Keluar ──
  } else if (type === 'masuk' || type === 'keluar') {
    title = 'Laporan Barang ' + (type === 'masuk' ? 'Masuk' : 'Keluar');
    const data  = trans.filter(t => t.type === type).sort((a,b) => b.tgl.localeCompare(a.tgl));
    const total = data.reduce((s,t) => s + t.jumlah, 0);
    const rata  = data.length ? Math.round(total / data.length) : 0;
    const isMasuk = type === 'masuk';

    body = `
      <div class="cards cards-4">
        <div class="card ${isMasuk ? 'card-green' : 'card-red'}">
          <div class="card-label">Total Transaksi</div>
          <div class="card-value" style="color:${isMasuk?'#16a34a':'#dc2626'}">${data.length}</div>
          <div class="card-sub">transaksi</div>
        </div>
        <div class="card card-blue">
          <div class="card-label">Total Unit</div>
          <div class="card-value" style="color:#1e40af">${total}</div>
          <div class="card-sub">unit ${isMasuk?'diterima':'keluar'}</div>
        </div>
        <div class="card card-amber">
          <div class="card-label">Rata-rata</div>
          <div class="card-value" style="color:#d97706">${rata}</div>
          <div class="card-sub">unit / transaksi</div>
        </div>
        <div class="card card-purple">
          <div class="card-label">Transaksi Terakhir</div>
          <div class="card-value" style="font-size:14px;line-height:1.4;color:#7c3aed">
            ${data.length ? new Date(data[0].tgl).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '—'}
          </div>
          <div class="card-sub">&nbsp;</div>
        </div>
      </div>
      <div class="section">
        <span class="section-icon">${isMasuk?'⬇️':'⬆️'}</span>
        Riwayat ${isMasuk?'Stok Masuk':'Pemakaian'} — ${data.length} Transaksi
      </div>
      <table>
        <thead><tr>
          <th style="width:40px" class="center">No</th>
          <th style="width:110px">Tanggal</th>
          <th>Nama Barang</th>
          <th style="width:80px" class="center">Jumlah</th>
          <th style="width:130px">Dicatat Oleh</th>
          <th>Keterangan</th>
        </tr></thead>
        <tbody>
          ${data.map((t,n) => {
            const tgl = t.tgl ? new Date(t.tgl).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '—';
            const jam = t.tgl && t.tgl.length > 10 ? t.tgl.slice(11,16) : '';
            return `
            <tr>
              <td class="center muted">${n+1}</td>
              <td>
                <span style="font-size:12px;font-weight:500;color:#334155">${tgl}</span>
                ${jam?`<br><span class="muted" style="font-size:10px">${jam} WIB</span>`:''}
              </td>
              <td class="name">${t.nama}</td>
              <td class="center num" style="color:${isMasuk?'#16a34a':'#dc2626'};font-size:14px">
                ${isMasuk?'+':'-'}${t.jumlah}
              </td>
              <td style="color:#64748b;font-size:11px">${t.dicatat_oleh||'—'}</td>
              <td class="muted" style="font-size:11px">${t.ket||'—'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  }

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>${title} — Fajar Technos</title>
  <style>${css}</style>
</head>
<body>
  <div class="wrap">
    ${header(title)}
    ${body}
    ${footer()}
    <button class="print-btn" onclick="window.print()">🖨️ &nbsp;Cetak / Simpan PDF</button>
  </div>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  else toast('Izinkan pop-up untuk mencetak PDF', 'error');
}

// ─── Export Excel ─────────────────────────────────────────
async function exportExcel() {
  const filterTrans   = window._laporanFilter  || 'semua';
  const filterPeriode = window._laporanPeriode || 'bulan';
  const filterDari    = window._laporanDari    || '';
  const filterSampai  = window._laporanSampai  || '';

  let data = filterTrans === 'semua' ? [...trans] : trans.filter(t => t.type === filterTrans);
  const today = new Date(); today.setHours(0,0,0,0);

  if (filterPeriode === 'hari') {
    data = data.filter(t => { const d = new Date(t.tgl); d.setHours(0,0,0,0); return d.getTime() === today.getTime(); });
  } else if (filterPeriode === '7hari') {
    const batas = new Date(today); batas.setDate(batas.getDate() - 6);
    data = data.filter(t => new Date(t.tgl) >= batas);
  } else if (filterPeriode === 'bulan') {
    data = data.filter(t => { const d = new Date(t.tgl); return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); });
  } else if (filterPeriode === 'custom' && filterDari && filterSampai) {
    const dari   = new Date(filterDari);
    const sampai = new Date(filterSampai); sampai.setHours(23,59,59,999);
    data = data.filter(t => { const d = new Date(t.tgl); return d >= dari && d <= sampai; });
  }
  data.sort((a,b) => b.tgl.localeCompare(a.tgl));

  // ── Ambil logo sebagai ArrayBuffer ──
  let logoArrayBuffer = null;
  try {
    const res  = await fetch('/assets/images/logo1.png');
    const blob = await res.blob();
    logoArrayBuffer = await blob.arrayBuffer();
  } catch(e) { /* logo gagal dimuat, lanjut tanpa logo */ }

  // ── Warna ──
  const CLR = {
    navy:     '1E3A8A', blue:     '1D4ED8', white:    'FFFFFFFF',
    rowEven:  'FFEFF6FF', rowOdd: 'FFFFFFFF', borderC:  'FFBFDBFE',
    greenBg:  'FFDCFCE7', greenFg: 'FF166534', redBg:   'FFFEE2E2',
    redFg:    'FF991B1B', amberBg: 'FFFEF9C3', amberFg: 'FF92400E',
    dark:     'FF1E293B', gray:    'FF64748B', slate:   'FF94A3B8',
    totalBg:  'FF1E3A8A', totalFg: 'FFFFFFFF',
  };

  const thinBorder = (color = CLR.borderC) => ({
    top:    { style: 'thin', color: { argb: color } },
    bottom: { style: 'thin', color: { argb: color } },
    left:   { style: 'thin', color: { argb: color } },
    right:  { style: 'thin', color: { argb: color } },
  });

  const wb = new ExcelJS.Workbook();
  wb.creator  = 'Fajar Technos';
  wb.created  = new Date();

  const nowStr = new Date().toLocaleDateString('id-ID', {
    weekday:'long', day:'2-digit', month:'long', year:'numeric'
  });

  // ── Helper: buat sheet dengan header logo + kolom ──
  async function makeSheet(sheetName, title, headers, colWidths, rows, opts = {}) {
    const ws = wb.addWorksheet(sheetName);

    // Set lebar kolom
    ws.columns = colWidths.map((w, i) => ({ key: headers[i], width: w }));

    // ── Baris 1: Logo + Nama Perusahaan ──
    ws.getRow(1).height = 42;
    ws.mergeCells(1, 1, 1, 3);
    ws.mergeCells(1, 4, 1, headers.length);
    const nameCell = ws.getCell(1, 4);
    nameCell.value     = 'FAJAR TECHNOS';
    nameCell.font      = { name: 'Calibri', bold: true, size: 16, color: { argb: 'FF' + CLR.navy } };
    nameCell.alignment = { horizontal: 'right', vertical: 'middle' };

    // Sisipkan logo
    if (logoArrayBuffer) {
      const imgId = wb.addImage({ buffer: logoArrayBuffer, extension: 'png' });
      ws.addImage(imgId, {
        tl: { col: 0, row: 0 },
        ext: { width: 160, height: 36 },
        editAs: 'oneCell',
      });
    }

    // ── Baris 2: Judul dokumen ──
    ws.getRow(2).height = 20;
    ws.mergeCells(2, 1, 2, headers.length);
    const titleCell    = ws.getCell(2, 1);
    titleCell.value    = title;
    titleCell.font     = { name: 'Calibri', bold: true, size: 13, color: { argb: CLR.dark } };
    titleCell.alignment = { horizontal: 'left', vertical: 'middle' };

    // ── Baris 3: Tanggal cetak ──
    ws.getRow(3).height = 15;
    ws.mergeCells(3, 1, 3, headers.length);
    const dateCell     = ws.getCell(3, 1);
    dateCell.value     = `Dicetak: ${nowStr}`;
    dateCell.font      = { name: 'Calibri', size: 10, italic: true, color: { argb: CLR.slate } };
    dateCell.alignment = { horizontal: 'left', vertical: 'middle' };

    // ── Baris 4: Navy divider ──
    ws.getRow(4).height = 5;
    ws.mergeCells(4, 1, 4, headers.length);
    ws.getCell(4, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + CLR.navy } };

    // ── Baris 5: spacer ──
    ws.getRow(5).height = 6;

    // ── Baris 6: Header kolom ──
    ws.getRow(6).height = 22;
    headers.forEach((h, i) => {
      const cell      = ws.getCell(6, i + 1);
      cell.value      = h;
      cell.font       = { name: 'Calibri', bold: true, size: 10, color: { argb: 'FF' + CLR.white.replace('FF','') } };
      cell.fill       = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + CLR.blue } };
      cell.alignment  = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border     = thinBorder('FFFFFFFF');
    });

    // ── Baris data mulai row 7 ──
    rows.forEach((row, ri) => {
      const r      = 7 + ri;
      const isEven = ri % 2 === 0;
      const bgHex  = isEven ? CLR.rowEven : CLR.rowOdd;
      ws.getRow(r).height = 18;

      headers.forEach((h, ci) => {
        const cell    = ws.getCell(r, ci + 1);
        cell.value    = row[h] ?? '';
        cell.font     = { name: 'Calibri', size: 11, color: { argb: CLR.dark } };
        cell.fill     = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgHex } };
        cell.border   = thinBorder();
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      });

      // Kolom No → center abu
      const noCell       = ws.getCell(r, 1);
      noCell.font        = { name: 'Calibri', size: 11, color: { argb: CLR.gray } };
      noCell.alignment   = { horizontal: 'center', vertical: 'middle' };

      // Terapkan style khusus per sheet
      if (opts.styleRow) opts.styleRow(ws, r, row, isEven, bgHex);
    });

    // ── Baris TOTAL ──
    const totalRow = 7 + rows.length;
    ws.getRow(totalRow).height = 20;
    const totalCol = opts.totalCol || null;
    const totalVal = totalCol ? rows.reduce((s, r) => s + (Number(r[totalCol]) || 0), 0) : null;

    headers.forEach((h, ci) => {
      const cell    = ws.getCell(totalRow, ci + 1);
      cell.value    = ci === 0 ? 'TOTAL' : (h === totalCol ? totalVal : '');
      cell.font     = { name: 'Calibri', bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
      cell.fill     = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + CLR.navy } };
      cell.border   = thinBorder('FF' + CLR.navy);
      cell.alignment = { horizontal: ci === 0 ? 'left' : 'center', vertical: 'middle' };
    });

    return ws;
  }

  // ── Helper style kolom Jenis (Masuk/Keluar) ──
  function styleJenis(cell, val, isEven) {
    if (val === 'Masuk') {
      cell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? CLR.greenBg : 'FFF0FDF4' } };
      cell.font  = { name: 'Calibri', bold: true, size: 11, color: { argb: CLR.greenFg } };
    } else if (val === 'Keluar') {
      cell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? CLR.redBg : 'FFFFF1F2' } };
      cell.font  = { name: 'Calibri', bold: true, size: 11, color: { argb: CLR.redFg } };
    }
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  }

  // ── Helper style kolom Stok ──
  function styleStok(cell, val, isEven) {
    if (val === 0) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? CLR.redBg : 'FFFFF1F2' } };
      cell.font = { name: 'Courier New', bold: true, size: 11, color: { argb: CLR.redFg } };
    } else if (val < 5) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? CLR.amberBg : 'FFFFFBEB' } };
      cell.font = { name: 'Courier New', bold: true, size: 11, color: { argb: CLR.amberFg } };
    } else {
      cell.font = { name: 'Courier New', bold: true, size: 11, color: { argb: CLR.greenFg } };
    }
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  }

  // ── Helper style kolom Kondisi ──
  function styleKondisi(cell, val) {
    cell.font = {
      name: 'Calibri', bold: true, size: 11,
      color: { argb: val === 'Baik' ? CLR.greenFg : CLR.redFg }
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  }

  // ════════════════════════════════════════
  // Sheet 1: Transaksi
  // ════════════════════════════════════════
  const hTrans   = ['No','Tanggal','Jam','Nama Barang','Jenis','Jumlah','Keterangan','Dicatat Oleh'];
  const rowsTrans = data.map((t, i) => ({
    'No':           i + 1,
    'Tanggal':      t.tgl ? t.tgl.slice(0, 10) : '—',
    'Jam':          t.tgl && t.tgl.length > 10 ? t.tgl.slice(11, 16) : '—',
    'Nama Barang':  t.nama,
    'Jenis':        t.type === 'masuk' ? 'Masuk' : 'Keluar',
    'Jumlah':       t.jumlah,
    'Keterangan':   t.ket || '',
    'Dicatat Oleh': t.dicatat_oleh || '—',
  }));

  await makeSheet('Transaksi', 'Laporan Transaksi Inventaris', hTrans,
    [5, 14, 8, 34, 10, 10, 42, 18], rowsTrans,
    {
      totalCol: 'Jumlah',
      styleRow(ws, r, row, isEven) {
        // Tanggal & Jam center
        ws.getCell(r, 2).alignment = { horizontal: 'center', vertical: 'middle' };
        ws.getCell(r, 3).alignment = { horizontal: 'center', vertical: 'middle' };
        // Jenis
        styleJenis(ws.getCell(r, 5), row['Jenis'], isEven);
        // Jumlah
        const jCell    = ws.getCell(r, 6);
        jCell.font     = { name: 'Courier New', bold: true, size: 11, color: { argb: 'FF' + CLR.blue } };
        jCell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  );

  // ════════════════════════════════════════
  // Sheet 2: Semua Barang
  // ════════════════════════════════════════
  const hBarang   = ['No','Kode','Nama Barang','Kategori','Stok','Satuan','Lokasi','Kondisi','Stok Minimum'];
  const rowsBarang = items.map((item, idx) => ({
    'No':           idx + 1,
    'Kode':         item.kode,
    'Nama Barang':  item.nama,
    'Kategori':     item.kat,
    'Stok':         item.stok,
    'Satuan':       item.satuan,
    'Lokasi':       item.lokasi || '—',
    'Kondisi':      item.kondisi,
    'Stok Minimum': item.stok_min ?? 5,
  }));

  await makeSheet('Semua Barang', 'Laporan Stok Semua Barang', hBarang,
    [5, 12, 32, 28, 8, 10, 20, 10, 14], rowsBarang,
    {
      totalCol: 'Stok',
      styleRow(ws, r, row, isEven) {
        styleStok(ws.getCell(r, 5), row['Stok'], isEven);
        styleKondisi(ws.getCell(r, 8), row['Kondisi']);
        ws.getCell(r, 9).alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
  );

  // ════════════════════════════════════════
  // Sheet per Kategori
  // ════════════════════════════════════════
  const kategoriList = [...new Set(items.map(i => i.kat))].sort();
  for (const kat of kategoriList) {
    const hKat   = ['No','Kode','Nama Barang','Stok','Satuan','Lokasi','Kondisi','Stok Minimum'];
    const rowsKat = items.filter(i => i.kat === kat).map((item, idx) => ({
      'No':           idx + 1,
      'Kode':         item.kode,
      'Nama Barang':  item.nama,
      'Stok':         item.stok,
      'Satuan':       item.satuan,
      'Lokasi':       item.lokasi || '—',
      'Kondisi':      item.kondisi,
      'Stok Minimum': item.stok_min ?? 5,
    }));

    await makeSheet(kat.slice(0, 31), `Laporan Stok — ${kat}`, hKat,
      [5, 12, 36, 8, 10, 22, 10, 14], rowsKat,
      {
        totalCol: 'Stok',
        styleRow(ws, r, row, isEven) {
          styleStok(ws.getCell(r, 4), row['Stok'], isEven);
          styleKondisi(ws.getCell(r, 7), row['Kondisi']);
          ws.getCell(r, 8).alignment = { horizontal: 'center', vertical: 'middle' };
        }
      }
    );
  }

  // ── Download ──
  const labelPeriode = {
    hari:   'HariIni',
    '7hari':'7Hari',
    bulan:  new Date().toLocaleDateString('id-ID', { month:'long', year:'numeric' }).replace(' ','_'),
    custom: `${filterDari}_sd_${filterSampai}`,
  }[filterPeriode] || 'Semua';

  const buffer = await wb.xlsx.writeBuffer();
  const blob   = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href       = url;
  a.download   = `Laporan_Inventaris_FajarTechnos_${labelPeriode}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);

  toast('Excel berhasil diexport ✓');
}