/**
 * views.js — Render Functions
 * Setiap halaman memiliki fungsi render-nya sendiri
 */

// ─── Data Barang ──────────────────────────────────────────
function renderBarang() {
  let data = [...items];
  if (q) {
    data = data.filter(i =>
      i.nama.toLowerCase().includes(q) ||
      i.kode.toLowerCase().includes(q) ||
      i.kat.toLowerCase().includes(q) ||
      i.lokasi.toLowerCase().includes(q)
    );
  }

  // Filter kategori
  const fk = window._fKat || 'Semua';
  if (fk !== 'Semua') data = data.filter(i => i.kat === fk);

  const fKondisi = window._fKondisi || 'Semua';
  if (fKondisi !== 'Semua') data = data.filter(i => i.kondisi === fKondisi);

  const fStok = window._fStok || 'Semua';
  if (fStok === 'habis')       data = data.filter(i => i.stok === 0);
  else if (fStok === 'rendah') data = data.filter(i => i.stok > 0 && i.stok < 5);
  else if (fStok === 'aman')   data = data.filter(i => i.stok >= 5);

  // Sort
  const fSort = window._fSortBarang || 'default';
  if (fSort === 'nama_az')        data.sort((a,b) => a.nama.localeCompare(b.nama));
  else if (fSort === 'nama_za')   data.sort((a,b) => b.nama.localeCompare(a.nama));
  else if (fSort === 'stok_asc')  data.sort((a,b) => a.stok - b.stok);
  else if (fSort === 'stok_desc') data.sort((a,b) => b.stok - a.stok);

  const totalStok  = items.reduce((s,i) => s + i.stok, 0);
  const totalBaik  = items.filter(i => i.kondisi === 'Baik').length;
  const totalPerlu = items.filter(i => i.kondisi === 'Rusak').length;

  return `
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="ti ti-packages"></i></div>
        <div class="stat-value">${items.length}</div>
        <div class="stat-label">Total Jenis</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="ti ti-stack"></i></div>
        <div class="stat-value">${totalStok}</div>
        <div class="stat-label">Total Unit</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="ti ti-circle-check"></i></div>
        <div class="stat-value">${totalBaik}</div>
        <div class="stat-label">Kondisi Baik</div>
      </div>
      <div class="stat-card red">
        <div class="stat-icon red"><i class="ti ti-alert-circle"></i></div>
        <div class="stat-value">${totalPerlu}</div>
        <div class="stat-label">Kondisi Rusak</div>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar-left" style="flex-wrap:wrap;gap:8px">
        <select class="filter-select" onchange="window._fKat=this.value;render()" style="min-width:160px">
          <option value="Semua" ${(window._fKat||'Semua')==='Semua'?'selected':''}>Semua Kategori</option>
          <option value="Perangkat Aktif" ${window._fKat==='Perangkat Aktif'?'selected':''}>Perangkat Aktif</option>
          <option value="Infrastruktur Fiber Optik" ${window._fKat==='Infrastruktur Fiber Optik'?'selected':''}>Infrastruktur Fiber Optik</option>
          <option value="Kabel Fiber Optik" ${window._fKat==='Kabel Fiber Optik'?'selected':''}>Kabel Fiber Optik</option>
          <option value="Konektor & Aksesoris" ${window._fKat==='Konektor & Aksesoris'?'selected':''}>Konektor & Aksesoris</option>
          <option value="Perangkat Wireless" ${window._fKat==='Perangkat Wireless'?'selected':''}>Perangkat Wireless</option>
        </select>
        <select class="filter-select" onchange="window._fKondisi=this.value;render()">
          <option value="Semua" ${(window._fKondisi||'Semua')==='Semua'?'selected':''}>Semua Kondisi</option>
          <option value="Baik" ${window._fKondisi==='Baik'?'selected':''}>Baik</option>
          <option value="Rusak" ${window._fKondisi==='Rusak'?'selected':''}>Rusak</option>
        </select>
        <select class="filter-select" onchange="window._fStok=this.value;render()">
          <option value="Semua" ${(window._fStok||'Semua')==='Semua'?'selected':''}>Semua Stok</option>
          <option value="habis" ${window._fStok==='habis'?'selected':''}>Stok Habis (0)</option>
          <option value="rendah" ${window._fStok==='rendah'?'selected':''}>Stok Rendah (&lt;5)</option>
          <option value="aman" ${window._fStok==='aman'?'selected':''}>Stok Aman (≥5)</option>
        </select>
        <select class="filter-select" onchange="window._fSortBarang=this.value;render()">
          <option value="default" ${(window._fSortBarang||'default')==='default'?'selected':''}>Urutan Default</option>
          <option value="nama_az" ${window._fSortBarang==='nama_az'?'selected':''}>Nama A→Z</option>
          <option value="nama_za" ${window._fSortBarang==='nama_za'?'selected':''}>Nama Z→A</option>
          <option value="stok_asc" ${window._fSortBarang==='stok_asc'?'selected':''}>Stok Terkecil</option>
          <option value="stok_desc" ${window._fSortBarang==='stok_desc'?'selected':''}>Stok Terbesar</option>
        </select>
        <span class="result-count">${data.length} / ${items.length} barang</span>
      </div>
      <div class="toolbar-right">
        ${window.userRole === 'Admin' ? `
        <button class="btn btn-primary" onclick="openAddBarang()">
          <i class="ti ti-plus"></i> Tambah Barang
        </button>` : ''}
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="width:88px">Kode</th>
            <th style="width:200px">Nama Barang</th>
            <th style="width:100px">Kategori</th>
            <th style="width:70px">Stok</th>
            <th style="width:65px">Satuan</th>
            <th style="width:110px">Kondisi</th>
            <th style="width:110px">Lokasi</th>
            <th style="width:80px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${data.length === 0
            ? `<tr><td colspan="8">
                <div class="empty-state">
                  <i class="ti ti-inbox"></i>
                  <p>Tidak ada barang ditemukan</p>
                </div>
              </td></tr>`
          : data.map(i => `
            <tr class="tr-clickable" onclick="bukaDetail(${i.id})">
              <td class="td-code">${i.kode}</td>
              <td class="td-name" title="${i.nama}">${i.nama}</td>
              <td><span class="badge ${katCls[i.kat] || 'badge-lain'}">${i.kat}</span></td>
              <td class="td-stock">${i.stok}</td>
              <td class="td-unit">${i.satuan}</td>
              <td><span class="badge ${kondCls[i.kondisi]}">${i.kondisi}</span></td>
              <td title="${i.lokasi}" style="color:var(--text-2)">${i.lokasi}</td>
             <td>
  ${window.userRole === 'Admin' ? `
  <div class="act-wrap">
    <button class="act-btn edit" title="Edit" onclick="event.stopPropagation();openEditBarang(${i.id})">
      <i class="ti ti-pencil"></i>
    </button>
    <button class="act-btn del" title="Hapus" onclick="event.stopPropagation();hapus(${i.id})">
      <i class="ti ti-trash"></i>
    </button>
  </div>` : '—'}
</td>
           </tr>`).join('')
          }
        </tbody>
      </table>
    </div>`;
}

// ─── Transaksi (Masuk / Keluar) ────────────────────────────
function renderTrans(type) {
  let data = trans.filter(t => t.type === type);
  if (q) {
    data = data.filter(t =>
      t.nama.toLowerCase().includes(q) ||
      (t.ket  && t.ket.toLowerCase().includes(q)) ||
      (t.dicatat_oleh && t.dicatat_oleh.toLowerCase().includes(q))
    );
  }

  // ── Filter periode ──
  const _fp     = window[`_fPeriode_${type}`] || 'semua';
  const _dari   = window[`_fDari_${type}`]    || '';
  const _sampai = window[`_fSampai_${type}`]  || '';
  const todayT  = new Date(); todayT.setHours(0,0,0,0);
  if (_fp === 'hari') {
    data = data.filter(t => { const d = new Date(t.tgl); d.setHours(0,0,0,0); return d.getTime() === todayT.getTime(); });
  } else if (_fp === '7hari') {
    const batas = new Date(todayT); batas.setDate(batas.getDate() - 6);
    data = data.filter(t => new Date(t.tgl) >= batas);
  } else if (_fp === 'bulan') {
    data = data.filter(t => { const d = new Date(t.tgl); return d.getMonth() === todayT.getMonth() && d.getFullYear() === todayT.getFullYear(); });
  } else if (_fp === 'custom' && _dari && _sampai) {
    const dari   = new Date(_dari);
    const sampai = new Date(_sampai); sampai.setHours(23,59,59,999);
    data = data.filter(t => { const d = new Date(t.tgl); return d >= dari && d <= sampai; });
  }

  // ── Filter barang ──
  const _fBarang = window[`_fBarang_${type}`] ?? 'Semua';
  if (_fBarang !== 'Semua') data = data.filter(t => t.nama === _fBarang);

  // ── Sort ──
  const _fSort = window[`_fSort_${type}`] || 'tgl_desc';
  if (_fSort === 'tgl_asc')        data.sort((a,b) => a.tgl.localeCompare(b.tgl));
  else if (_fSort === 'tgl_desc')  data.sort((a,b) => b.tgl.localeCompare(a.tgl));
  else if (_fSort === 'jml_desc')  data.sort((a,b) => b.jumlah - a.jumlah);
  else if (_fSort === 'jml_asc')   data.sort((a,b) => a.jumlah - b.jumlah);

  const total     = data.reduce((s,t) => s + t.jumlah, 0);
  const label     = type === 'masuk' ? 'Stok Masuk' : 'Pemakaian';
  const badgeCls  = type === 'masuk' ? 'badge-masuk' : 'badge-keluar';
  const iconName  = type === 'masuk' ? 'ti-arrow-bar-to-down' : 'ti-arrow-bar-up';
  const accentClr = type === 'masuk' ? 'var(--green)' : 'var(--red)';

  const lastTgl = data.length > 0
    ? new Date(data[0].tgl).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
    : '—';
  const rata = data.length > 0 ? Math.round(total / data.length) : 0;

  return `
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="stat-card ${type === 'masuk' ? 'green' : 'red'}">
        <div class="stat-icon ${type === 'masuk' ? 'green' : 'red'}">
          <i class="ti ${iconName}"></i>
        </div>
        <div class="stat-value">${data.length}</div>
        <div class="stat-label">Total Transaksi</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="ti ti-sum"></i></div>
        <div class="stat-value">${total}</div>
        <div class="stat-label">Total Unit</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="ti ti-math-avg"></i></div>
        <div class="stat-value">${rata}</div>
        <div class="stat-label">Rata-rata / Transaksi</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-icon purple"><i class="ti ti-clock"></i></div>
        <div class="stat-value" style="font-size:13px;line-height:1.3">${lastTgl}</div>
        <div class="stat-label">Transaksi Terakhir</div>
      </div>
    </div>

    <div class="toolbar" style="flex-wrap:wrap;gap:8px;align-items:flex-start">
      <div class="toolbar-left" style="flex-wrap:wrap;gap:8px">
        ${['semua','hari','7hari','bulan','custom'].map(p => {
          const lbl = {semua:'Semua',hari:'Hari Ini','7hari':'7 Hari',bulan:'Bulan Ini',custom:'Custom'}[p];
          const aktif = _fp === p;
          return `<button onclick="window['_fPeriode_${type}']='${p}';render()"
            style="font-size:12px;padding:5px 12px;border-radius:20px;cursor:pointer;font-family:var(--font-sans);
                   border:1px solid ${aktif ? 'var(--accent)' : 'var(--border-md)'};
                   background:${aktif ? 'var(--accent-dim)' : 'none'};
                   color:${aktif ? 'var(--accent)' : 'var(--text-2)'}">${lbl}</button>`;
        }).join('')}
        ${_fp === 'custom' ? `
        <input type="date" class="form-input" style="width:145px;font-size:12px"
          value="${_dari}" onchange="window['_fDari_${type}']=this.value;render()" />
        <span style="color:var(--text-3);font-size:12px">s/d</span>
        <input type="date" class="form-input" style="width:145px;font-size:12px"
          value="${_sampai}" onchange="window['_fSampai_${type}']=this.value;render()" />
        ` : ''}
      </div>
      <div class="toolbar-right" style="gap:8px">
        <select class="filter-select" onchange="window['_fBarang_${type}']=this.value;render()">
        <option value="Semua" ${_fBarang === 'Semua' ? 'selected' : ''}>Semua Barang</option>
        ${[...new Set(trans.filter(t=>t.type===type).map(t=>t.nama))].sort().map(n =>
          `<option value="${n}" ${_fBarang === n ? 'selected' : ''}>${n}</option>`
        ).join('')}
      </select>
        <select class="filter-select" onchange="window['_fSort_${type}']=this.value;render()">
          <option value="tgl_desc">Terbaru</option>
          <option value="tgl_asc">Terlama</option>
          <option value="jml_desc">Jumlah Terbesar</option>
          <option value="jml_asc">Jumlah Terkecil</option>
        </select>
        <button class="btn btn-outline" onclick="cetakLaporan('${type}')">
          <i class="ti ti-printer"></i> Cetak PDF
        </button>
        <button class="btn btn-primary" onclick="openTrans('${type}')"
          style="${type === 'keluar' ? 'background:var(--red);border-color:var(--red);box-shadow:0 0 14px rgba(239,68,68,0.25)' : ''}">
          <i class="ti ti-plus"></i> Catat ${label}
        </button>
      </div>
    </div>
    <div style="padding:4px 0 8px 0;font-size:12px;color:var(--text-3)">
      ${data.length} transaksi · ${total} unit
    </div>

    <div class="table-wrap">
      <table style="table-layout:auto">
        <thead>
          <tr>
            <th style="width:48px">No</th>
            <th style="width:150px">Tanggal</th>
            <th>Nama Barang</th>
            <th style="width:90px;text-align:center">Jumlah</th>
            <th style="width:140px">Dicatat Oleh</th>
            <th style="width:180px">Keterangan</th>
            <th style="width:56px"></th>
          </tr>
        </thead>
        <tbody>
          ${data.length === 0
            ? `<tr><td colspan="7">
                <div class="empty-state">
                  <i class="ti ti-notes"></i>
                  <p>Belum ada ${label.toLowerCase()}</p>
                </div>
              </td></tr>`
            : data.map((t,i) => {
                const tglObj = t.tgl ? new Date(t.tgl) : null;
                const tglFmt = tglObj ? tglObj.toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}) : '—';
                const waktu  = tglObj && t.tgl.length > 10 ? t.tgl.slice(11,16) : '';
                return `
              <tr onclick="bukaDetailTrans(${t.id})" style="cursor:pointer">
                <td style="color:var(--text-3);font-family:var(--font-mono);font-size:11px;text-align:center">${i+1}</td>
                <td>
                  <span style="font-size:12px;color:var(--text-1);font-weight:500">${tglFmt}</span>${waktu ? `<br><span style="font-size:10px;color:var(--text-3);font-family:var(--font-mono)">${waktu}</span>` : ''}
                </td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${accentClr}"></div>
                    <span style="font-weight:500;color:var(--text-0)" title="${t.nama}">${t.nama}</span>
                  </div>
                </td>
                <td style="text-align:center">
                  <span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:${accentClr}">
                    ${type === 'masuk' ? '+' : '-'}${t.jumlah}
                  </span>
                </td>
                <td>
                  <div style="display:flex;align-items:center;gap:6px">
                    <div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0">
                      ${t.dicatat_oleh ? t.dicatat_oleh.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span style="font-size:12px;color:var(--text-2)">${t.dicatat_oleh || '—'}</span>
                  </div>
                </td>
                <td style="font-size:12px;color:var(--text-2)" title="${t.ket || ''}">${t.ket || '—'}</td>
                <td>
                  ${window.userRole === 'Admin' ? `
                  <div class="act-wrap">
                    <button class="act-btn del" title="Hapus & Rollback Stok"
                      onclick="event.stopPropagation();hapusTrans(${t.id}, '${t.nama}', ${t.jumlah})">
                      <i class="ti ti-trash"></i>
                    </button>
                  </div>` : ''}
                </td>
              </tr>`;
              }).join('')
          }
        </tbody>
      </table>
    </div>`;
}

// ─── Laporan ──────────────────────────────────────────────
function renderLaporan() {
  const totalMasuk  = trans.filter(t => t.type === 'masuk').reduce((s,t) => s + t.jumlah, 0);
  const totalKeluar = trans.filter(t => t.type === 'keluar').reduce((s,t) => s + t.jumlah, 0);
  const totalStok   = items.reduce((s,i) => s + i.stok, 0);
  const netStok     = totalMasuk - totalKeluar;

  // Bulan ini
  const now = new Date();
  const bulanIni = now.toISOString().slice(0, 7);
  const masukBulanIni  = trans.filter(t => t.type === 'masuk'  && t.tgl.startsWith(bulanIni)).reduce((s,t) => s + t.jumlah, 0);
  const keluarBulanIni = trans.filter(t => t.type === 'keluar' && t.tgl.startsWith(bulanIni)).reduce((s,t) => s + t.jumlah, 0);
  const namaBulan = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  // By category
  const byKat = {};
  items.forEach(i => {
    if (!byKat[i.kat]) byKat[i.kat] = { jenis: 0, stok: 0 };
    byKat[i.kat].jenis++;
    byKat[i.kat].stok += i.stok;
  });
  const maxKatStok = Math.max(...Object.values(byKat).map(v => v.stok), 1);

  // Condition counts
  const kondCount = {};
  items.forEach(i => {
    kondCount[i.kondisi] = (kondCount[i.kondisi] || 0) + 1;
  });

  // Barang stok rendah (stok < 5)
  const stokRendah = items.filter(i => i.stok < 5).sort((a,b) => a.stok - b.stok);

  // Top 5 barang paling banyak keluar
  const byItem = {};
  trans.filter(t => t.type === 'keluar').forEach(t => {
    byItem[t.nama] = (byItem[t.nama] || 0) + t.jumlah;
  });
  const topKeluar = Object.entries(byItem).sort((a,b) => b[1]-a[1]).slice(0, 5);
  const maxKeluar = topKeluar[0]?.[1] || 1;

  // Aktivitas 7 hari terakhir
  const hari7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const tgl = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
    const masuk  = trans.filter(t => t.type === 'masuk'  && t.tgl && t.tgl.slice(0,10) === tgl).reduce((s,t) => s + t.jumlah, 0);
    const keluar = trans.filter(t => t.type === 'keluar' && t.tgl && t.tgl.slice(0,10) === tgl).reduce((s,t) => s + t.jumlah, 0);
    hari7.push({ tgl, label, masuk, keluar });
  }
  const maxHari = Math.max(...hari7.map(h => Math.max(h.masuk, h.keluar)), 1);

  // Filter transaksi (state disimpan di window)
  window._laporanFilter  = window._laporanFilter  || 'semua';
  window._laporanPeriode = window._laporanPeriode || 'bulan';
  const filterTrans   = window._laporanFilter;
  const filterPeriode = window._laporanPeriode;
  const filterDari    = window._laporanDari   || '';
  const filterSampai  = window._laporanSampai || '';
  const transSorted = [...trans].sort((a,b) => b.tgl.localeCompare(a.tgl));
  let transFiltered = filterTrans === 'semua' ? transSorted : transSorted.filter(t => t.type === filterTrans);

  // Filter tanggal
  const today = new Date(); today.setHours(0,0,0,0);
  if (filterPeriode === 'hari') {
    transFiltered = transFiltered.filter(t => {
      const d = new Date(t.tgl); d.setHours(0,0,0,0);
      return d.getTime() === today.getTime();
    });
  } else if (filterPeriode === '7hari') {
    const batas = new Date(today); batas.setDate(batas.getDate() - 6);
    transFiltered = transFiltered.filter(t => new Date(t.tgl) >= batas);
  } else if (filterPeriode === 'bulan') {
    transFiltered = transFiltered.filter(t => {
      const d = new Date(t.tgl);
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });
  } else if (filterPeriode === 'custom' && filterDari && filterSampai) {
    const dari   = new Date(filterDari);
    const sampai = new Date(filterSampai); sampai.setHours(23,59,59,999);
    transFiltered = transFiltered.filter(t => {
      const d = new Date(t.tgl);
      return d >= dari && d <= sampai;
    });
  }

  return `
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="result-count">Ringkasan inventaris · ${namaBulan}</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-outline" onclick="cetakLaporan('stok')">
          <i class="ti ti-printer"></i> Laporan Stok
        </button>
        <button class="btn btn-outline" onclick="exportExcel()">
          <i class="ti ti-file-spreadsheet"></i> Export Excel
        </button>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="ti ti-stack"></i></div>
        <div class="stat-value" style="color:var(--accent)">${totalStok}</div>
        <div class="stat-label">Total Stok</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="ti ti-arrow-bar-to-down"></i></div>
        <div class="stat-value" style="color:var(--green)">${totalMasuk}</div>
        <div class="stat-label">Total Stok Masuk</div>
      </div>
      <div class="stat-card red">
        <div class="stat-icon red"><i class="ti ti-arrow-bar-up"></i></div>
        <div class="stat-value" style="color:var(--red)">${totalKeluar}</div>
        <div class="stat-label">Total Pemakaian</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="ti ti-packages"></i></div>
        <div class="stat-value" style="color:var(--amber)">${items.length}</div>
        <div class="stat-label">Jenis Barang</div>
      </div>
    </div>

    <!-- Bulan ini & Stok Rendah -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">

      <!-- Aktivitas bulan ini -->
      <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:14px">
          <i class="ti ti-calendar-stats"></i> Aktivitas ${namaBulan}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div style="background:var(--green-dim);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-md);padding:14px;text-align:center">
            <div style="font-size:11px;color:var(--green);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">Masuk</div>
            <div style="font-size:28px;font-weight:700;font-family:var(--font-mono);color:var(--green)">${masukBulanIni}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:2px">unit diterima</div>
          </div>
          <div style="background:var(--red-dim);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-md);padding:14px;text-align:center">
            <div style="font-size:11px;color:var(--red);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">Keluar</div>
            <div style="font-size:28px;font-weight:700;font-family:var(--font-mono);color:var(--red)">${keluarBulanIni}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:2px">unit keluar</div>
          </div>
        </div>
        <div style="margin-top:12px;padding:10px;background:var(--bg-2);border-radius:var(--radius-md);display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:12px;color:var(--text-2)">Net pergerakan bulan ini</span>
          <span style="font-family:var(--font-mono);font-weight:700;font-size:14px;color:${netStok >= 0 ? 'var(--green)' : 'var(--red)'}">${netStok >= 0 ? '+' : ''}${masukBulanIni - keluarBulanIni}</span>
        </div>
      </div>

      <!-- Stok Rendah -->
      <div style="background:var(--bg-1);border:1px solid ${stokRendah.length > 0 ? 'rgba(245,158,11,0.3)' : 'var(--border-md)'};border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:14px;color:${stokRendah.length > 0 ? 'var(--amber)' : 'var(--text-1)'}">
          <i class="ti ti-alert-triangle"></i> Stok Rendah
          ${stokRendah.length > 0 ? `<span style="margin-left:auto;background:var(--amber-dim);color:var(--amber);font-size:11px;padding:2px 8px;border-radius:20px">${stokRendah.length} barang</span>` : ''}
        </div>
        ${stokRendah.length === 0
          ? `<div style="text-align:center;padding:24px 0;color:var(--text-3)">
              <i class="ti ti-circle-check" style="font-size:28px;color:var(--green);display:block;margin-bottom:8px"></i>
              <span style="font-size:13px">Semua stok dalam kondisi aman</span>
            </div>`
          : stokRendah.slice(0, 5).map(i => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
              <div>
                <div style="font-size:13px;font-weight:500;color:var(--text-0)">${i.nama}</div>
                <div style="font-size:11px;color:var(--text-3)">${i.kode} · ${i.lokasi}</div>
              </div>
              <span style="font-family:var(--font-mono);font-weight:700;font-size:15px;color:${i.stok === 0 ? 'var(--red)' : 'var(--amber)'};background:${i.stok === 0 ? 'var(--red-dim)' : 'var(--amber-dim)'};padding:3px 10px;border-radius:20px">${i.stok} ${i.satuan}</span>
            </div>`).join('')
        }
      </div>
    </div>

    <!-- Grafik 7 hari & Top keluar -->
    <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:16px;margin-bottom:16px">

      <!-- Grafik Aktivitas 7 Hari -->
      <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:16px">
          <i class="ti ti-chart-bar"></i> Aktivitas 7 Hari Terakhir
        </div>
        <div style="display:flex;align-items:flex-end;gap:8px;height:100px">
          ${hari7.map(h => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
              <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:2px;height:80px;justify-content:flex-end">
                ${h.masuk > 0 ? `<div title="Masuk: ${h.masuk}" style="width:60%;background:var(--green);border-radius:3px 3px 0 0;height:${Math.round((h.masuk/maxHari)*70)}px;opacity:0.85;transition:height 0.3s"></div>` : '<div style="width:60%;height:2px"></div>'}
                ${h.keluar > 0 ? `<div title="Keluar: ${h.keluar}" style="width:60%;background:var(--red);border-radius:3px 3px 0 0;height:${Math.round((h.keluar/maxHari)*70)}px;opacity:0.85;transition:height 0.3s;margin-top:2px"></div>` : '<div style="width:60%;height:2px"></div>'}
              </div>
              <div style="font-size:10px;color:var(--text-3);text-align:center;line-height:1.2">${h.label}</div>
            </div>`).join('')}
        </div>
        <div style="display:flex;gap:14px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
          <span style="font-size:11px;color:var(--text-3);display:flex;align-items:center;gap:5px">
            <span style="width:10px;height:10px;background:var(--green);border-radius:2px;display:inline-block"></span> Masuk
          </span>
          <span style="font-size:11px;color:var(--text-3);display:flex;align-items:center;gap:5px">
            <span style="width:10px;height:10px;background:var(--red);border-radius:2px;display:inline-block"></span> Keluar
          </span>
        </div>
      </div>

      <!-- Top 5 Barang Paling Banyak Keluar -->
      <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:14px">
          <i class="ti ti-trending-up"></i> Top Barang Keluar
        </div>
        ${topKeluar.length === 0
          ? `<div style="text-align:center;padding:24px 0;color:var(--text-3);font-size:13px">Belum ada data transaksi keluar</div>`
          : topKeluar.map(([nama, jml], idx) => `
            <div style="margin-bottom:10px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;color:var(--text-1);font-weight:500">${idx+1}. ${nama}</span>
                <span style="font-size:12px;font-family:var(--font-mono);color:var(--red)">${jml}</span>
              </div>
              <div style="height:5px;background:var(--bg-3);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${Math.round((jml/maxKeluar)*100)}%;background:linear-gradient(90deg,var(--red),rgba(239,68,68,0.4));border-radius:3px;transition:width 0.4s"></div>
              </div>
            </div>`).join('')
        }
      </div>
    </div>

    <!-- Stok per Kategori & Kondisi -->
    <div class="report-grid" style="margin-bottom:16px">
      <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:14px">
          <i class="ti ti-tag"></i> Stok per Kategori
        </div>
        ${Object.entries(byKat).map(([k, v]) => `
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
              <span class="badge ${katCls[k] || 'badge-lain'}">${k}</span>
              <div style="text-align:right">
                <span style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--text-0)">${v.stok}</span>
                <span style="font-size:11px;color:var(--text-3);margin-left:4px">unit · ${v.jenis} jenis</span>
              </div>
            </div>
            <div style="height:6px;background:var(--bg-3);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${Math.round((v.stok/maxKatStok)*100)}%;background:var(--accent);border-radius:3px;opacity:0.8"></div>
            </div>
          </div>`).join('')}
      </div>

      <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
        <div class="report-section-title" style="margin-bottom:14px">
          <i class="ti ti-heart-rate-monitor"></i> Kondisi Barang
        </div>
        ${['Baik','Rusak'].map(k => {
          const c = kondCount[k] || 0;
          if (!c) return '';
          const pct = items.length > 0 ? Math.round((c / items.length) * 100) : 0;
          const color = k === 'Baik' ? 'var(--green)' : 'var(--red)';
          return `
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                <span class="badge ${kondCls[k]}">${k}</span>
                <span style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--text-0)">${c} <span style="font-size:11px;color:var(--text-3);font-weight:400">(${pct}%)</span></span>
              </div>
              <div style="height:6px;background:var(--bg-3);border-radius:3px;overflow:hidden">
                <div style="height:100%;width:${pct}%;background:${color};border-radius:3px;opacity:0.8"></div>
              </div>
            </div>`;
        }).join('')}

        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-3);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Ringkasan</div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2)">
            <span>Total jenis barang</span>
            <span style="font-family:var(--font-mono);color:var(--text-0)">${items.length}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-top:6px">
            <span>Total stok keseluruhan</span>
            <span style="font-family:var(--font-mono);color:var(--accent)">${totalStok}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-top:6px">
            <span>Total aktivitas</span>
            <span style="font-family:var(--font-mono);color:var(--text-0)">${trans.length}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Riwayat Transaksi dengan filter -->
    <div style="background:var(--bg-1);border:1px solid var(--border-md);border-radius:var(--radius-lg);padding:18px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div class="report-section-title" style="margin:0">
          <i class="ti ti-history"></i> Riwayat Aktivitas
          <span style="margin-left:8px;font-size:11px;color:var(--text-3);font-weight:400">${transFiltered.length} aktivitas</span>
        </div>
        <!-- Filter Periode -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${['hari','7hari','bulan','custom'].map(p => {
            const label = {hari:'Hari Ini','7hari':'7 Hari',bulan:'Bulan Ini',custom:'Custom'}[p];
            const aktif = filterPeriode === p;
            return `<button onclick="window._laporanPeriode='${p}';render()"
              style="font-size:12px;padding:5px 12px;border-radius:20px;
                     border:1px solid ${aktif ? 'var(--accent)' : 'var(--border-md)'};
                     background:${aktif ? 'var(--accent-dim)' : 'none'};
                     color:${aktif ? 'var(--accent)' : 'var(--text-2)'};
                     cursor:pointer;font-family:var(--font-sans)">${label}</button>`;
          }).join('')}
        </div>

        <!-- Input custom range -->
        ${filterPeriode === 'custom' ? `
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <input type="date" class="form-input" style="width:160px;font-size:12px"
            value="${filterDari}" onchange="window._laporanDari=this.value;render()" />
          <span style="color:var(--text-3);font-size:12px">s/d</span>
          <input type="date" class="form-input" style="width:160px;font-size:12px"
            value="${filterSampai}" onchange="window._laporanSampai=this.value;render()" />
        </div>` : ''}
        </div>
      </div>
      <div class="table-wrap">
        <table style="table-layout:auto">
          <thead>
            <tr>
              <th style="width:48px">No</th>
              <th style="width:150px">Tanggal</th>
              <th>Nama Barang</th>
              <th style="width:90px">Jenis</th>
              <th style="width:80px;text-align:center">Jumlah</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${transFiltered.length === 0
              ? `<tr><td colspan="6"><div class="empty-state"><i class="ti ti-notes"></i><p>Tidak ada transaksi</p></div></td></tr>`
              : transFiltered.map((t, i) => {
                  const tglObj2 = t.tgl ? new Date(t.tgl) : null;
                  const tglFmt2 = tglObj2 ? tglObj2.toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}) : '—';
                  const waktu2  = tglObj2 && t.tgl.length > 10 ? t.tgl.slice(11,16) : '';
                  return `
                <tr>
                  <td style="color:var(--text-3);font-family:var(--font-mono);font-size:11px;text-align:center">${i+1}</td>
                  <td>
                    <span style="font-size:12px;color:var(--text-1);font-weight:500">${tglFmt2}</span>${waktu2 ? `<br><span style="font-size:10px;color:var(--text-3);font-family:var(--font-mono)">${waktu2}</span>` : ''}
                  </td>
                  <td class="td-name">${t.nama}</td>
                  <td><span class="badge ${t.type === 'masuk' ? 'badge-masuk' : 'badge-keluar'}">
                    ${t.type === 'masuk' ? '↓ Masuk' : '↑ Keluar'}
                  </span></td>
                  <td style="text-align:center" class="td-stock">${t.jumlah}</td>
                  <td style="color:var(--text-2)">${t.ket || '—'}</td>
                </tr>`;
                }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderDetailModal(item) {
  const fotoUrl   = item.foto ? `uploads/${item.foto}` : null;
  const stokColor = item.stok === 0 ? 'var(--red)' : item.stok <= (item.stok_min ?? 5) ? 'var(--amber)' : 'var(--green)';
  const riwayat   = trans
    .filter(t => t.item_id == item.id)
    .sort((a,b) => b.tgl.localeCompare(a.tgl))
    .slice(0, 10);
  const totalMasuk  = trans.filter(t => t.item_id == item.id && t.type === 'masuk').reduce((s,t) => s + t.jumlah, 0);
  const totalKeluar = trans.filter(t => t.item_id == item.id && t.type === 'keluar').reduce((s,t) => s + t.jumlah, 0);

  return `
    <div class="modal-backdrop open" id="modal-detail" onclick="closeDetailOnBackdrop(event)">
      <div class="modal" style="width:580px;max-height:90vh;display:flex;flex-direction:column">

        <!-- Header -->
        <div class="modal-header" style="flex-shrink:0">
          <div style="display:flex;align-items:center;gap:10px">
            <span class="badge ${katCls[item.kat] || 'badge-lain'}" style="font-size:11px">${item.kat}</span>
            <h2 class="modal-title" style="margin:0">${item.nama}</h2>
          </div>
          <button class="modal-close" onclick="closeM('modal-detail')">
            <i class="ti ti-x"></i>
          </button>
        </div>

        <!-- Body scrollable -->
        <div class="modal-body" style="overflow-y:auto;flex:1;padding:0">

          <!-- Hero: Foto + Info Utama -->
          <div style="display:grid;grid-template-columns:180px 1fr;gap:0;border-bottom:1px solid var(--border)">

            <!-- Foto -->
            <div style="padding:20px;display:flex;flex-direction:column;align-items:center;gap:10px;border-right:1px solid var(--border)">
              ${fotoUrl
                ? `<img src="${fotoUrl}" alt="${item.nama}"
                        style="width:140px;height:140px;object-fit:cover;border-radius:var(--radius-md);border:1px solid var(--border)" />`
                : `<div style="width:140px;height:140px;border-radius:var(--radius-md);
                               border:2px dashed var(--border-md);
                               display:flex;flex-direction:column;align-items:center;justify-content:center;
                               color:var(--text-3);gap:6px;background:var(--bg-2)">
                    <i class="ti ti-photo-off" style="font-size:28px"></i>
                    <span style="font-size:11px">Belum ada foto</span>
                  </div>`
              }
              <label style="cursor:pointer;display:flex;align-items:center;gap:5px;
                             font-size:12px;color:var(--text-2);padding:5px 12px;
                             border:1px solid var(--border-md);border-radius:var(--radius-md);
                             background:var(--bg-2);transition:all 0.15s"
                     onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'"
                     onmouseout="this.style.borderColor='var(--border-md)';this.style.color='var(--text-2)'">
                <i class="ti ti-upload" style="font-size:13px"></i>
                ${fotoUrl ? 'Ganti Foto' : 'Upload Foto'}
                <input type="file" accept="image/*" style="display:none" onchange="uploadFoto(${item.id}, this)" />
              </label>
            </div>

            <!-- Info Utama -->
            <div style="padding:20px;display:flex;flex-direction:column;gap:14px">

              <!-- Kode + Stok -->
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
                <div>
                  <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px">Kode Barang</div>
                  <div style="font-family:var(--font-mono);font-size:15px;font-weight:600;color:var(--text-0);
                               background:var(--bg-2);padding:4px 10px;border-radius:var(--radius-sm);
                               border:1px solid var(--border)">${item.kode}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px">Stok Saat Ini</div>
                  <div style="font-family:var(--font-mono);font-size:26px;font-weight:800;color:${stokColor};line-height:1">
                    ${item.stok}
                    <span style="font-size:13px;font-weight:400;color:var(--text-2)">${item.satuan}</span>
                  </div>
                  <div style="font-size:10px;color:var(--text-3);margin-top:2px">min. ${item.stok_min ?? 5} ${item.satuan}</div>
                </div>
              </div>

              <!-- Lokasi & Kondisi -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:var(--radius-md);padding:10px">
                  <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">
                    <i class="ti ti-map-pin" style="font-size:11px"></i> Lokasi
                  </div>
                  <div style="font-size:13px;color:var(--text-1);font-weight:500">${item.lokasi || '—'}</div>
                </div>
                <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:var(--radius-md);padding:10px">
                  <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">
                    <i class="ti ti-heart-rate-monitor" style="font-size:11px"></i> Kondisi
                  </div>
                  <span class="badge ${kondCls[item.kondisi]}">${item.kondisi}</span>
                </div>
              </div>

              <!-- Stat mini: total masuk/keluar -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                <div style="background:var(--green-dim);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-md);padding:10px;display:flex;align-items:center;gap:8px">
                  <i class="ti ti-arrow-bar-to-down" style="color:var(--green);font-size:16px"></i>
                  <div>
                    <div style="font-family:var(--font-mono);font-size:16px;font-weight:700;color:var(--green)">${totalMasuk}</div>
                    <div style="font-size:10px;color:var(--text-3)">Total Masuk</div>
                  </div>
                </div>
                <div style="background:var(--red-dim);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-md);padding:10px;display:flex;align-items:center;gap:8px">
                  <i class="ti ti-arrow-bar-up" style="color:var(--red);font-size:16px"></i>
                  <div>
                    <div style="font-family:var(--font-mono);font-size:16px;font-weight:700;color:var(--red)">${totalKeluar}</div>
                    <div style="font-size:10px;color:var(--text-3)">Total Keluar</div>
                  </div>
                </div>
              </div>

              ${item.ket ? `
              <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:var(--radius-md);padding:10px">
                <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Keterangan</div>
                <div style="font-size:13px;color:var(--text-2)">${item.ket}</div>
              </div>` : ''}
            </div>
          </div>

          <!-- Riwayat Aktivitas -->
          <div style="padding:18px 20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div style="font-size:12px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:6px">
                <i class="ti ti-history" style="font-size:14px"></i> Riwayat Aktivitas
              </div>
              ${trans.filter(t => t.item_id == item.id).length > 0 ? `
              <span style="font-size:11px;color:var(--text-3)">${trans.filter(t => t.item_id == item.id).length} aktivitas total</span>` : ''}
            </div>

            ${riwayat.length === 0
              ? `<div style="text-align:center;padding:24px 0;color:var(--text-3)">
                  <i class="ti ti-notes" style="font-size:28px;display:block;margin-bottom:8px"></i>
                  <span style="font-size:13px">Belum ada riwayat aktivitas</span>
                </div>`
              : riwayat.map(t => `
                <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
                  <div style="width:32px;height:32px;border-radius:50%;flex-shrink:0;
                              display:flex;align-items:center;justify-content:center;
                              background:${t.type === 'masuk' ? 'var(--green-dim)' : 'var(--red-dim)'};
                              color:${t.type === 'masuk' ? 'var(--green)' : 'var(--red)'}">
                    <i class="ti ${t.type === 'masuk' ? 'ti-arrow-bar-to-down' : 'ti-arrow-bar-up'}" style="font-size:14px"></i>
                  </div>
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;justify-content:space-between">
                      <span style="font-size:13px;font-weight:700;color:${t.type === 'masuk' ? 'var(--green)' : 'var(--red)'}">
                        ${t.type === 'masuk' ? '+' : '-'}${t.jumlah} ${item.satuan}
                      </span>
                      <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3)">
                        ${t.tgl ? t.tgl.slice(0,10) : '—'} ${t.tgl && t.tgl.length > 10 ? t.tgl.slice(11,16) : ''}
                      </span>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px">
                      <span style="font-size:11px;color:var(--text-3)">${t.ket || '—'}</span>
                      ${t.dicatat_oleh ? `
                      <span style="font-size:11px;color:var(--text-3);display:flex;align-items:center;gap:4px">
                        <i class="ti ti-user" style="font-size:10px"></i> ${t.dicatat_oleh}
                      </span>` : ''}
                    </div>
                  </div>
                </div>`).join('')
            }

            ${trans.filter(t => t.item_id == item.id).length > 10 ? `
            <div style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-3)">
              Menampilkan 10 dari ${trans.filter(t => t.item_id == item.id).length} aktivitas
            </div>` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer" style="flex-shrink:0">
          <button class="btn btn-ghost" onclick="closeM('modal-detail')">Tutup</button>
          ${window.userRole === 'Admin' ? `
          <button class="btn btn-outline" onclick="closeM('modal-detail');openEditBarang(${item.id})">
            <i class="ti ti-pencil"></i> Edit Barang
          </button>` : ''}
        </div>

      </div>
    </div>`;
}

// ─── Detail Transaksi Modal ───────────────────────────────
function renderDetailTransModal(t) {
  const item      = items.find(i => i.id == t.item_id);
  const isMasuk   = t.type === 'masuk';
  const accentClr = isMasuk ? 'var(--green)' : 'var(--red)';
  const accentDim = isMasuk ? 'var(--green-dim)' : 'var(--red-dim)';
  const accentBdr = isMasuk ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
  const iconName  = isMasuk ? 'ti-arrow-bar-to-down' : 'ti-arrow-bar-up';
  const labelType = isMasuk ? 'Stok Masuk' : 'Pemakaian / Keluar';
  const riwayatBarang = trans
    .filter(x => x.item_id == t.item_id && x.id != t.id)
    .sort((a,b) => b.tgl.localeCompare(a.tgl))
    .slice(0, 8);
  return `
    <div class="modal-backdrop open" id="modal-detail-trans" onclick="if(event.target.id==='modal-detail-trans')closeM('modal-detail-trans')">
      <div class="modal" style="width:520px;max-height:90vh;display:flex;flex-direction:column">
        <div class="modal-header" style="flex-shrink:0">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:34px;height:34px;border-radius:50%;background:${accentDim};border:1px solid ${accentBdr};display:flex;align-items:center;justify-content:center;color:${accentClr}">
              <i class="ti ${iconName}" style="font-size:16px"></i>
            </div>
            <div>
              <h2 class="modal-title" style="margin:0;font-size:15px">${t.nama}</h2>
              <div style="font-size:11px;color:var(--text-3);margin-top:1px">${labelType}</div>
            </div>
          </div>
          <button class="modal-close" onclick="closeM('modal-detail-trans')"><i class="ti ti-x"></i></button>
        </div>
        <div class="modal-body" style="overflow-y:auto;flex:1">
          <div style="text-align:center;padding:24px 20px 20px;border-bottom:1px solid var(--border)">
            <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px">Jumlah ${isMasuk ? 'Masuk' : 'Keluar'}</div>
            <div style="font-family:var(--font-mono);font-size:48px;font-weight:800;color:${accentClr};line-height:1">${isMasuk ? '+' : '-'}${t.jumlah}</div>
            <div style="font-size:13px;color:var(--text-3);margin-top:4px">${item ? item.satuan : 'unit'}</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border-bottom:1px solid var(--border)">
            <div style="background:var(--bg-1);padding:14px 18px">
              <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px"><i class="ti ti-calendar" style="font-size:11px"></i> Tanggal</div>
              <div style="font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--text-0)">${t.tgl ? t.tgl.slice(0,10) : '—'}</div>
              ${t.tgl && t.tgl.length > 10 ? `<div style="font-size:11px;color:var(--text-3);margin-top:2px">${t.tgl.slice(11,16)} WIB</div>` : ''}
            </div>
            <div style="background:var(--bg-1);padding:14px 18px">
              <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px"><i class="ti ti-user" style="font-size:11px"></i> Dicatat Oleh</div>
              <div style="display:flex;align-items:center;gap:7px;margin-top:2px">
                <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">${t.dicatat_oleh ? t.dicatat_oleh.charAt(0).toUpperCase() : '?'}</div>
                <span style="font-size:13px;font-weight:500;color:var(--text-0)">${t.dicatat_oleh || '—'}</span>
              </div>
            </div>
            <div style="background:var(--bg-1);padding:14px 18px">
              <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px"><i class="ti ti-box" style="font-size:11px"></i> Nama Barang</div>
              <div style="font-size:13px;font-weight:500;color:var(--text-0)">${t.nama}</div>
              ${item ? `<div style="font-family:var(--font-mono);font-size:11px;color:var(--text-3);margin-top:2px">${item.kode}</div>` : ''}
            </div>
            <div style="background:var(--bg-1);padding:14px 18px">
              <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px"><i class="ti ti-stack" style="font-size:11px"></i> Stok Saat Ini</div>
              ${item
                ? `<div style="font-family:var(--font-mono);font-size:16px;font-weight:700;color:${item.stok===0?'var(--red)':item.stok<=5?'var(--amber)':'var(--green)'}">
                    ${item.stok} <span style="font-size:12px;font-weight:400;color:var(--text-3)">${item.satuan}</span>
                  </div>`
                : `<div style="font-size:13px;color:var(--text-3)">—</div>`}
            </div>
          </div>
          <div style="padding:16px 18px;border-bottom:1px solid var(--border)">
            <div style="font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px"><i class="ti ti-notes" style="font-size:11px"></i> Keterangan</div>
            ${t.ket
              ? `<div style="font-size:13px;color:var(--text-1);line-height:1.6;background:var(--bg-2);padding:12px 14px;border-radius:var(--radius-md);border:1px solid var(--border)">${t.ket}</div>`
              : `<div style="font-size:13px;color:var(--text-3);font-style:italic">Tidak ada keterangan</div>`}
          </div>
          <div style="padding:16px 18px">
            <div style="font-size:11px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <span><i class="ti ti-history" style="font-size:13px"></i> Riwayat Barang Ini</span>
              ${item ? `<button class="btn btn-ghost" style="font-size:11px;padding:3px 10px" onclick="closeM('modal-detail-trans');bukaDetail(${item.id})">Lihat Detail Barang <i class="ti ti-arrow-right" style="font-size:11px"></i></button>` : ''}
            </div>
            ${riwayatBarang.length === 0
              ? `<div style="text-align:center;padding:16px 0;color:var(--text-3);font-size:13px">Belum ada riwayat lain</div>`
              : riwayatBarang.map(x => `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
                  <div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${x.type==='masuk'?'var(--green-dim)':'var(--red-dim)'};color:${x.type==='masuk'?'var(--green)':'var(--red)'}">
                    <i class="ti ${x.type==='masuk'?'ti-arrow-bar-to-down':'ti-arrow-bar-up'}" style="font-size:12px"></i>
                  </div>
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;justify-content:space-between">
                      <span style="font-size:13px;font-weight:700;color:${x.type==='masuk'?'var(--green)':'var(--red)'}">
                        ${x.type==='masuk'?'+':'-'}${x.jumlah} ${item?item.satuan:''}
                      </span>
                      <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-3)">${x.tgl?x.tgl.slice(0,10):'—'}</span>
                    </div>
                    <div style="font-size:11px;color:var(--text-3);margin-top:1px;display:flex;justify-content:space-between">
                      <span>${x.ket||'—'}</span><span>${x.dicatat_oleh||''}</span>
                    </div>
                  </div>
                </div>`).join('')}
          </div>
        </div>
        <div class="modal-footer" style="flex-shrink:0">
          <button class="btn btn-ghost" onclick="closeM('modal-detail-trans')">Tutup</button>
          ${window.userRole === 'Admin' ? `
          <button class="btn btn-outline" style="color:var(--red);border-color:var(--red)"
            onclick="closeM('modal-detail-trans');hapusTrans(${t.id},'${t.nama}',${t.jumlah})">
            <i class="ti ti-trash"></i> Hapus
          </button>` : ''}
        </div>
      </div>
    </div>`;
}

// ─── Kelola User (Admin only) ─────────────────────────────
function renderUser() {
  return `
    <!-- Stat Cards -->
    <div class="stats-grid" id="user-stats" style="grid-template-columns:repeat(3,1fr)">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="ti ti-users"></i></div>
        <div class="stat-value" id="stat-total-user">—</div>
        <div class="stat-label">Total User</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="ti ti-shield-check"></i></div>
        <div class="stat-value" id="stat-total-admin">—</div>
        <div class="stat-label">Admin</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="ti ti-tool"></i></div>
        <div class="stat-value" id="stat-total-teknisi">—</div>
        <div class="stat-label">Teknisi</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="result-count" id="user-count">Memuat...</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-primary" onclick="openAddUser()">
          <i class="ti ti-plus"></i> Tambah User
        </button>
      </div>
    </div>

    <!-- Tabel -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="width:44px">No</th>
            <th style="width:200px">Pengguna</th>
            <th style="width:130px">Username</th>
            <th style="width:180px">Email</th>
            <th style="width:130px">Telepon</th>
            <th style="width:90px">Role</th>
            <th style="width:160px">Login Terakhir</th>
            <th style="width:100px">Aksi</th>
          </tr>
        </thead>
        <tbody id="user-tbody">
          <tr><td colspan="8">
            <div class="empty-state"><i class="ti ti-loader"></i><p>Memuat data...</p></div>
          </td></tr>
        </tbody>
      </table>
    </div>`;
}

// ─── Badge Stok Rendah ────────────────────────────────────
function updateBadgeStokRendah() {
  const jumlah = items.filter(i => i.stok <= (i.stok_min ?? 5)).length;

  const old = document.getElementById('badge-stok-rendah');
  if (old) old.remove();

  if (jumlah === 0) return;

  const navBarang = document.getElementById('nav-barang');
  if (!navBarang) return;

  navBarang.style.position = 'relative';
  navBarang.style.overflow = 'visible';

    navBarang.insertAdjacentHTML('beforeend', `
        <span id="badge-stok-rendah"
          style="position:absolute;top:4px;right:4px;left:auto;
                background:var(--red);color:#fff;
                font-size:9px;font-weight:700;
                width:fit-content;height:16px;
                border-radius:8px;padding:0 4px;
                display:flex;align-items:center;justify-content:center;
                font-family:var(--font-mono);
                box-shadow:0 0 8px rgba(239,68,68,0.5);
                animation:pulse-badge 2s infinite;
                pointer-events:none;
                z-index:10">
          ${jumlah}
        </span>
      `);
}