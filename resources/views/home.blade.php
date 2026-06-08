<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="PT Fajar Broadband - Penyedia Layanan Internet Fiber Optik, Dedicated Internet, dan Solusi Jaringan Terpercaya di Indonesia. Cepat, Stabil, 99.9% Uptime.">
    <meta name="keywords"
        content="ISP, Internet Fiber Optik, Dedicated Internet, PT Fajar Broadband, Internet Makassar, Internet Bisnis">
    <title>PT Fajar Broadband</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>

    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar-main" id="mainNav">
        <div class="container">
            <div class="navbar-inner">
                <a href="#hero" class="nav-brand">
                    <img src="{{ asset('assets/images/logo1.png') }}" alt="Logo Fajar Broadband" class="logo-navbar">
                </a>

                <ul class="nav-links-center d-none d-lg-flex">
                    <li><a href="#hero" class="active">Home</a></li>
                    <li><a href="#about">Tentang Kami</a></li>
                    <li><a href="#services">Layanan</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Kontak</a></li>
                </ul>

                <div class="nav-right d-none d-lg-flex">
                    <a href="/login" class="btn-cta-nav">Login</a>
                </div>

                <button class="navbar-toggler-custom d-lg-none" type="button" id="mobileToggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="mobile-menu" id="mobileMenu">
                <a href="#hero" class="active">Home</a>
                <a href="#about">Tentang Kami</a>
                <a href="#services">Layanan</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Kontak</a>
                <div class="mobile-cta">
                    <a href="/login" class="btn-login">Login</a>
                    <a href="#contact" class="btn-cta-nav">Hubungi Kami</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- ==================== HERO ==================== -->
    <section class="hero-section" id="hero">
        <div class="hero-bg-grid"></div>
        <div class="hero-glow-1"></div>
        <div class="hero-glow-2"></div>
        <div class="container position-relative">
            <div class="row align-items-center">
                <div class="col-lg-6" data-aos="fade-right" data-aos-duration="800">
                    <div class="hero-badge">
                        <div class="hero-badge-dot"></div>
                        Network Active â€¢ 99.9% Uptime Guaranteed
                    </div>
                    <h1 class="hero-title">Solusi Internet <span class="highlight">Cepat, Stabil,</span> dan Terpercaya
                    </h1>
                    <p class="hero-desc">Menyediakan layanan internet fiber optik, dedicated internet, dan solusi
                        jaringan untuk rumah, bisnis, sekolah, dan instansi pemerintah di seluruh Indonesia.</p>
                    <div class="d-flex flex-wrap gap-3 hero-buttons">
                        <a href="#services" class="btn-hero-primary"><i class="fas fa-arrow-right"></i> Lihat
                            Layanan</a>
                        <a href="#contact" class="btn-hero-secondary"><i class="fas fa-headset"></i> Hubungi Kami</a>
                    </div>
                </div>
                <div class="col-lg-6 mt-5 mt-lg-0" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
                    <div class="hero-image-wrapper">
                        <img src="{{ asset('assets/images/projek2.png') }}" alt="PT Fajar Broadband Data Center">
                        <div class="hero-image-overlay"></div>
                        <div class="speed-card">
                            <div class="speed-card-value">1 Gbps+</div>
                            <div class="speed-card-label">Max Fiber Speed</div>
                        </div>
                        <div class="uptime-card">
                            <div class="d-flex align-items-center gap-2">
                                <i class="fas fa-shield-halved" style="color: #00E676;"></i>
                                <div>
                                    <div class="uptime-card-value">99.9%</div>
                                    <div class="speed-card-label">SLA Uptime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== ABOUT ==================== -->
    <section class="about-section section-padding" id="about">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-building"></i> Tentang Kami</div>
                <h2 class="section-title">Profil Perusahaan</h2>
                <p class="section-subtitle mx-auto">Mengenal lebih dekat visi, misi, dan nilai yang menjadi fondasi PT
                    Fajar Broadband</p>
            </div>
            <div class="row g-4">
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="profile-card">
                        <div class="profile-icon"><i class="fas fa-eye"></i></div>
                        <h4>Visi</h4>
                        <p>Menjadi penyedia layanan internet dan solusi jaringan terdepan di Indonesia yang menghadirkan
                            konektivitas berkualitas tinggi, terjangkau, dan merata untuk mendukung pertumbuhan digital
                            nasional.</p>
                    </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="profile-card">
                        <div class="profile-icon"><i class="fas fa-bullseye"></i></div>
                        <h4>Misi</h4>
                        <p>Membangun infrastruktur jaringan fiber optik yang handal dan luas, menghadirkan layanan
                            dengan standar SLA terbaik, memberikan dukungan teknis 24/7 yang responsif, serta berinovasi
                            berkelanjutan untuk kepuasan pelanggan.</p>
                    </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="profile-card">
                        <div class="profile-icon"><i class="fas fa-gem"></i></div>
                        <h4>Nilai Kami</h4>
                        <p>Integritas dalam setiap layanan, inovasi tanpa henti, kepuasan pelanggan sebagai prioritas
                            utama, kolaborasi tim yang solid, dan tanggung jawab terhadap kemajuan digital Indonesia.
                        </p>
                    </div>
                </div>
            </div>
            <div class="stats-bar" data-aos="fade-up" data-aos-delay="100">
                <div class="row text-center">
                    <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <div class="stat-item">
                            <div class="stat-value counter" data-target="5000">0</div>
                            <div class="stat-label">Pelanggan Aktif</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <div class="stat-item">
                            <div class="stat-value counter" data-target="50">0</div>
                            <div class="stat-label">Kota Terjangkau</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-value">99.9<span style="font-size:1.5rem;">%</span></div>
                            <div class="stat-label">Uptime SLA</div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-item">
                            <div class="stat-value counter" data-target="10">0</div>
                            <div class="stat-label">Tahun Pengalaman</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== SERVICES ==================== -->
    <section class="section-padding" id="services" style="background: #fff;">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-cogs"></i> Layanan</div>
                <h2 class="section-title">Layanan Profesional Kami</h2>
                <p class="section-subtitle mx-auto">Solusi lengkap untuk kebutuhan konektivitas Anda â€” dari rumah hingga
                    enterprise</p>
            </div>
            <div class="row g-4">
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
                    <div class="service-card">
                        <div class="service-icon-wrap blue"><i class="fas fa-network-wired"></i></div>
                        <h5>Fiber Optic Internet</h5>
                        <p>Koneksi internet berkecepatan tinggi melalui jaringan fiber optik hingga 1 Gbps untuk
                            kebutuhan rumah dan bisnis.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="50">
                    <div class="service-card">
                        <div class="service-icon-wrap cyan"><i class="fas fa-satellite-dish"></i></div>
                        <h5>Dedicated Internet</h5>
                        <p>Bandwidth dedicated simetris dengan SLA 99.9% untuk korporasi, data center, dan instansi yang
                            membutuhkan koneksi stabil.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-card">
                        <div class="service-icon-wrap green"><i class="fas fa-wifi"></i></div>
                        <h5>Wireless Internet</h5>
                        <p>Solusi internet wireless untuk area yang belum terjangkau fiber optik, cocok untuk daerah
                            terpencil dan lokasi sementara.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="150">
                    <div class="service-card">
                        <div class="service-icon-wrap purple"><i class="fas fa-building"></i></div>
                        <h5>Corporate Network</h5>
                        <p>Perancangan dan implementasi jaringan korporat, VPN, VLAN, dan infrastruktur IT untuk skala
                            enterprise.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-card">
                        <div class="service-icon-wrap orange"><i class="fas fa-video"></i></div>
                        <h5>Instalasi CCTV</h5>
                        <p>Pemasangan sistem CCTV terintegrasi dengan monitoring cloud dan penyimpanan lokal untuk
                            keamanan properti Anda.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="250">
                    <div class="service-card">
                        <div class="service-icon-wrap red"><i class="fas fa-server"></i></div>
                        <h5>Konfigurasi Mikrotik</h5>
                        <p>Setup dan konfigurasi router Mikrotik profesional untuk manajemen bandwidth, firewall, QoS,
                            dan load balancing.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-card">
                        <div class="service-icon-wrap teal"><i class="fas fa-tools"></i></div>
                        <h5>Network Maintenance</h5>
                        <p>Layanan pemeliharaan jaringan berkala, monitoring proaktif 24/7, dan respons cepat terhadap
                            gangguan teknis.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="350">
                    <div class="service-card">
                        <div class="service-icon-wrap indigo"><i class="fas fa-headset"></i></div>
                        <h5>Technical Support 24/7</h5>
                        <p>Tim support teknis berpengalaman siap membantu Anda kapan saja â€” pagi, siang, malam, bahkan
                            di jam 2 pagi.</p><a href="#" class="service-link">Selengkapnya <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== COVERAGE ==================== -->
    <section class="coverage-section section-padding" id="coverage">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"
                    style="background: rgba(0,201,255,0.1); border-color: rgba(0,201,255,0.25); color: var(--accent);">
                    <i class="fas fa-globe-asia"></i> Coverage
                </div>
                <h2 class="section-title">Jangkauan & Portofolio</h2>
                <p class="section-subtitle mx-auto">Jaringan fiber optik kami terus berkembang ke seluruh penjuru
                    Indonesia</p>
            </div>
            <div class="map-container" data-aos="zoom-in" data-aos-duration="1000">
                <svg class="map-svg" viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M80,60 Q100,50 120,65 Q135,80 130,100 Q125,130 115,155 Q100,175 85,180 Q70,175 65,155 Q60,130 65,100 Q70,75 80,60Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path
                        d="M170,185 Q200,175 250,178 Q300,180 350,182 Q400,184 430,188 Q440,192 430,196 Q400,200 350,198 Q300,196 250,194 Q200,192 170,190 Q165,188 170,185Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path
                        d="M220,60 Q260,45 300,55 Q330,65 340,90 Q345,120 330,145 Q310,160 280,165 Q250,160 230,140 Q215,115 215,90 Q218,70 220,60Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path
                        d="M380,70 Q395,60 410,70 Q415,85 405,100 Q415,110 420,125 Q415,140 400,145 Q390,135 395,120 Q385,110 380,95 Q375,80 380,70Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path
                        d="M530,60 Q570,45 610,55 Q640,70 650,100 Q645,135 625,155 Q600,165 570,155 Q545,140 535,115 Q530,85 530,60Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path
                        d="M440,195 Q460,190 480,193 Q500,196 520,200 Q530,204 520,208 Q500,206 480,203 Q460,200 440,198 Q435,197 440,195Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <path d="M480,100 Q495,92 505,100 Q510,115 500,125 Q490,120 485,110 Q480,105 480,100Z"
                        fill="rgba(0,201,255,0.08)" stroke="rgba(0,201,255,0.2)" stroke-width="1" />
                    <line class="map-line" x1="100" y1="120" x2="240" y2="100" />
                    <line class="map-line" x1="240" y1="100" x2="395" y2="105" />
                    <line class="map-line" x1="395" y1="105" x2="495" y2="110" />
                    <line class="map-line" x1="395" y1="105" x2="580" y2="100" />
                    <line class="map-line" x1="240" y1="100" x2="300" y2="188" />
                    <line class="map-line" x1="300" y1="188" x2="395" y2="105" />
                    <line class="map-line" x1="300" y1="188" x2="480" y2="200" />
                    <circle class="map-node" cx="100" cy="120" r="5" />
                    <circle class="map-node" cx="85" cy="160" r="5" />
                    <circle class="map-node" cx="80" cy="100" r="4" />
                    <circle class="map-node" cx="120" cy="150" r="4" />
                    <circle class="map-node" cx="130" cy="165" r="4" />
                    <circle class="map-node" cx="240" cy="100" r="5" />
                    <circle class="map-node" cx="290" cy="80" r="4" />
                    <circle class="map-node" cx="270" cy="140" r="5" />
                    <circle class="map-node" cx="310" cy="110" r="4" />
                    <circle class="map-node" cx="300" cy="188" r="6" />
                    <circle class="map-node" cx="340" cy="185" r="4" />
                    <circle class="map-node" cx="370" cy="188" r="5" />
                    <circle class="map-node" cx="395" cy="105" r="6" />
                    <circle class="map-node" cx="410" cy="130" r="4" />
                    <circle class="map-node" cx="400" cy="80" r="4" />
                    <circle class="map-node" cx="495" cy="110" r="4" />
                    <circle class="map-node" cx="480" cy="200" r="4" />
                    <circle class="map-node" cx="540" cy="200" r="4" />
                    <circle class="map-node" cx="580" cy="100" r="5" />
                    <text x="300" y="208" fill="rgba(255,255,255,0.5)" font-size="9" font-family="Poppins"
                        text-anchor="middle">Jakarta</text>
                    <text x="395" y="125" fill="rgba(255,255,255,0.5)" font-size="9" font-family="Poppins"
                        text-anchor="middle">Makassar</text>
                    <text x="370" y="205" fill="rgba(255,255,255,0.4)" font-size="8" font-family="Poppins"
                        text-anchor="middle">Surabaya</text>
                    <text x="580" y="118" fill="rgba(255,255,255,0.4)" font-size="8" font-family="Poppins"
                        text-anchor="middle">Jayapura</text>
                </svg>
            </div>
            <div class="text-center" data-aos="fade-up">
                <div class="coverage-badge"><i class="fas fa-signal"></i> Coverage Expanding â€¢ 50 New Cities in 2026
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== PORTFOLIO ==================== -->
    <section class="section-padding" id="portfolio" style="background: var(--surface);">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-briefcase"></i> Portofolio</div>
                <h2 class="section-title">Proyek Terbaru Kami</h2>
                <p class="section-subtitle mx-auto">Beberapa proyek unggulan yang telah kami selesaikan dengan sukses
                </p>
            </div>
            <div class="row g-4">
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/campus-network-smart/600/400.jpg"
                                alt="Smart Campus Network" class="portfolio-img">
                            <div class="portfolio-category">Education</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>Smart Campus Network</h5>
                            <p>Implementasi jaringan kampus terintegrasi dengan WiFi 6, VLAN management, dan bandwidth
                                control untuk 5.000+ pengguna concurrent di Universitas Hasanuddin.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> Selesai: Desember 2025
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/office-tower-fiber/600/400.jpg"
                                alt="Dedicated Fiber Office Tower" class="portfolio-img">
                            <div class="portfolio-category">Business</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>Dedicated Fiber Office Tower</h5>
                            <p>Penarikan fiber optik dedicated 500 Mbps ke gedung perkantoran 25 lantai dengan
                                redundansi link dan SLA 99.95% untuk Centro Business Park.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> Selesai: Oktober 2025
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/residential-ftth-cluster/600/400.jpg"
                                alt="FTTH Residential Cluster" class="portfolio-img">
                            <div class="portfolio-category">Residential</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>FTTH Residential Cluster</h5>
                            <p>Deployment FTTH untuk perumahan 1.200 unit dengan teknologi GPON, menjangkau setiap rumah
                                dengan kecepatan minimum 50 Mbps di Gateway Residence.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> Selesai: Agustus 2025
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== BLOG ==================== -->
    <section class="section-padding" id="blog" style="background: #fff;">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-newspaper"></i> Blog</div>
                <h2 class="section-title">Artikel & Insight</h2>
                <p class="section-subtitle mx-auto">Tips, berita, dan informasi terbaru seputar teknologi internet dan
                    jaringan</p>
            </div>
            <div class="row g-4">
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/fiber-optic-blog/600/400.jpg" alt="Blog Post"
                                class="portfolio-img">
                            <div class="portfolio-category" style="background: rgba(0,82,204,0.85);">Teknologi</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>Mengapa Fiber Optik Lebih Unggul dari Kabel Tembaga?</h5>
                            <p>Perbandingan mendalam antara teknologi fiber optik dan kabel tembaga dalam hal kecepatan,
                                latensi, dan keandalan untuk koneksi modern.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> 15 Januari 2026</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/network-security-tips/600/400.jpg" alt="Blog Post"
                                class="portfolio-img">
                            <div class="portfolio-category" style="background: rgba(124,77,255,0.85);">Keamanan</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>5 Tips Mengamankan Jaringan WiFi Kantor Anda</h5>
                            <p>Panduan praktis melindungi jaringan bisnis dari ancaman siber, mulai dari pengaturan
                                firewall hingga manajemen akses pengguna.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> 8 Januari 2026</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="portfolio-card">
                        <div class="portfolio-img-wrap"><img
                                src="https://picsum.photos/seed/isp-selection-guide/600/400.jpg" alt="Blog Post"
                                class="portfolio-img">
                            <div class="portfolio-category" style="background: rgba(0,200,83,0.85);">Panduan</div>
                        </div>
                        <div class="portfolio-body">
                            <h5>Cara Memilih ISP yang Tepat untuk Bisnis Anda</h5>
                            <p>Faktor-faktor penting yang perlu dipertimbangkan saat memilih penyedia layanan internet
                                untuk kebutuhan operasional perusahaan.</p>
                            <div class="portfolio-date"><i class="far fa-calendar-alt me-1"></i> 2 Januari 2026</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== PACKAGES ==================== -->
    <section class="packages-section section-padding" id="packages">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"
                    style="background: rgba(0,201,255,0.1); border-color: rgba(0,201,255,0.25); color: var(--accent);">
                    <i class="fas fa-tags"></i> Paket Internet
                </div>
                <h2 class="section-title">Pilih Paket Terbaik Anda</h2>
                <p class="section-subtitle mx-auto">Paket internet yang dirancang khusus untuk setiap kebutuhan Anda</p>
            </div>
            <div class="row g-4 align-items-start">
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="package-card">
                        <div class="package-type">Home Fiber</div>
                        <div class="package-price">Rp299K<span>/bulan</span></div>
                        <ul class="package-features">
                            <li><i class="fas fa-check-circle"></i> Kecepatan hingga 50 Mbps</li>
                            <li><i class="fas fa-check-circle"></i> Unlimited Kuota Data</li>
                            <li><i class="fas fa-check-circle"></i> Free Router WiFi</li>
                            <li><i class="fas fa-check-circle"></i> Free Instalasi</li>
                            <li><i class="fas fa-check-circle"></i> Support 24/7</li>
                        </ul><a href="#contact" class="btn-package btn-package-outline">Pilih Paket</a>
                    </div>
                </div>
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="package-card featured">
                        <div class="package-badge">Most Popular</div>
                        <div class="package-type">Business</div>
                        <div class="package-price">Rp1.5JT<span>/bulan</span></div>
                        <ul class="package-features">
                            <li><i class="fas fa-check-circle"></i> 100 Mbps Dedicated</li>
                            <li><i class="fas fa-check-circle"></i> SLA 99.9% Uptime</li>
                            <li><i class="fas fa-check-circle"></i> Static Public IP</li>
                            <li><i class="fas fa-check-circle"></i> Priority Support 24/7</li>
                            <li><i class="fas fa-check-circle"></i> Free Mikrotik Router</li>
                            <li><i class="fas fa-check-circle"></i> Free Instalasi & Setup</li>
                        </ul><a href="#contact" class="btn-package btn-package-primary">Hubungi Sales</a>
                    </div>
                </div>
                <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="package-card mb-4">
                        <div class="package-type">Enterprise</div>
                        <div class="package-price">Custom<span> /bulan</span></div>
                        <ul class="package-features">
                            <li><i class="fas fa-check-circle"></i> Bandwidth Custom (up to 10 Gbps)</li>
                            <li><i class="fas fa-check-circle"></i> SLA 99.95% Uptime</li>
                            <li><i class="fas fa-check-circle"></i> Multiple Static IP</li>
                            <li><i class="fas fa-check-circle"></i> Dedicated Account Manager</li>
                            <li><i class="fas fa-check-circle"></i> Redundancy & Failover</li>
                        </ul><a href="#contact" class="btn-package btn-package-outline">Request Quotation</a>
                    </div>
                    <div class="testimonial-sidebar">
                        <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
                        <p class="quote-text">"Kecepatan stabil siang dan malam. Tim support sangat responsif bahkan di
                            jam 2 pagi saat ada kendala teknis. Sangat recommended untuk bisnis!"</p>
                        <div class="quote-author">Ahmad Fadli Rahman</div>
                        <div class="quote-role">IT Manager, PT Sulawesi Teknologi</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== WHY CHOOSE US ==================== -->
    <section class="why-section section-padding" id="why">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-star"></i> Keunggulan</div>
                <h2 class="section-title">Mengapa Memilih Kami?</h2>
                <p class="section-subtitle mx-auto">Alasan ribuan pelanggan mempercayakan konektivitas mereka kepada PT
                    Fajar Broadband</p>
            </div>
            <div class="row g-4">
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(0,82,204,0.1); color: var(--primary);"><i
                                class="fas fa-bolt"></i></div>
                        <h5>Koneksi Cepat & Stabil</h5>
                        <p>Bandwidth besar dengan latensi rendah, didukung backbone fiber optik multi-path untuk
                            performa optimal.</p>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="50">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(0,200,83,0.1); color: #00C853;"><i
                                class="fas fa-user-tie"></i></div>
                        <h5>Tim Teknis Profesional</h5>
                        <p>Teknisi bersertifikat Mikrotik, Cisco, dan fiber optic siap menangani kebutuhan jaringan
                            Anda.</p>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(0,201,255,0.1); color: #00B8D4;"><i
                                class="fas fa-headset"></i></div>
                        <h5>Support 24/7</h5>
                        <p>Layanan pelanggan non-stop melalui telepon, WhatsApp, dan email dengan waktu respons
                            rata-rata di bawah 15 menit.</p>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="150">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(124,77,255,0.1); color: #7C4DFF;"><i
                                class="fas fa-shield-halved"></i></div>
                        <h5>Infrastruktur Handal</h5>
                        <p>Server dan perangkat jaringan tier-1 dengan redundansi penuh dan monitoring proaktif 24 jam.
                        </p>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(255,145,0,0.1); color: #FF9100;"><i
                                class="fas fa-tags"></i></div>
                        <h5>Harga Terjangkau</h5>
                        <p>Paket kompetitif mulai dari Rp299K/bulan tanpa biaya tersembunyi dan free instalasi untuk
                            area terjangkau.</p>
                    </div>
                </div>
                <div class="col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="250">
                    <div class="why-card">
                        <div class="why-icon" style="background: rgba(255,23,68,0.1); color: #FF1744;"><i
                                class="fas fa-rocket"></i></div>
                        <h5>Instalasi Cepat</h5>
                        <p>Proses pemasangan 1-3 hari kerja setelah survei lokasi, dengan standar instalasi profesional
                            dan rapi.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== TESTIMONIALS ==================== -->
    <section class="testimonials-section section-padding" id="testimonials">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-comments"></i> Testimoni</div>
                <h2 class="section-title">Apa Kata Pelanggan Kami</h2>
                <p class="section-subtitle mx-auto">Pengalaman nyata dari pelanggan yang telah mempercayakan
                    konektivitas mereka kepada kami</p>
            </div>
            <div class="position-relative">
                <div class="row" id="testimonialSlider">
                    <div class="col-md-6 col-lg-4 testimonial-slide">
                        <div class="testimonial-card">
                            <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            <p class="testimonial-text">"Sejak menggunakan Fajar Broadband, downtime hampir tidak pernah
                                terjadi. Internet stabil untuk operasional kantor 24 jam. Sangat puas!"</p>
                            <div class="testimonial-author"><img src="https://picsum.photos/seed/person-ceo-1/96/96.jpg"
                                    alt="Budi Santoso" class="testimonial-avatar">
                                <div>
                                    <div class="testimonial-name">Budi Santoso</div>
                                    <div class="testimonial-company">Direktur, PT Nusantara Digital</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 testimonial-slide">
                        <div class="testimonial-card">
                            <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            <p class="testimonial-text">"Untuk kebutuhan Ujian Online di sekolah kami, koneksi harus
                                benar-benar stabil. Fajar Broadband memberikan solusi yang sempurna dengan dedicated
                                line."</p>
                            <div class="testimonial-author"><img
                                    src="https://picsum.photos/seed/person-teacher-2/96/96.jpg" alt="Siti Rahmawati"
                                    class="testimonial-avatar">
                                <div>
                                    <div class="testimonial-name">Siti Rahmawati</div>
                                    <div class="testimonial-company">Kepala IT, SMA Negeri 1 Makassar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 testimonial-slide">
                        <div class="testimonial-card">
                            <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star-half-alt"></i></div>
                            <p class="testimonial-text">"Proses instalasi cepat, teknisi ramah dan profesional. Internet
                                di rumah sekarang jauh lebih kencang dibanding provider sebelumnya. Worth it!"</p>
                            <div class="testimonial-author"><img
                                    src="https://picsum.photos/seed/person-home-3/96/96.jpg" alt="Andi Pratama"
                                    class="testimonial-avatar">
                                <div>
                                    <div class="testimonial-name">Andi Pratama</div>
                                    <div class="testimonial-company">Pelanggan Home Fiber</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-controls justify-content-center d-flex">
                    <button class="carousel-btn" id="prevTestimonial"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-btn" id="nextTestimonial"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== CONTACT ==================== -->
    <section class="contact-section section-padding" id="contact">
        <div class="container">
            <div class="text-center mb-5" data-aos="fade-up">
                <div class="section-badge"><i class="fas fa-envelope"></i> Kontak</div>
                <h2 class="section-title">Hubungi Kami</h2>
                <p class="section-subtitle mx-auto">Siap membantu Anda mendapatkan konektivitas terbaik. Hubungi kami
                    sekarang!</p>
            </div>
            <div class="row g-4">
                <div class="col-lg-7" data-aos="fade-right">
                    <div class="contact-form-card">
                        <h4 style="font-weight:700; margin-bottom:8px;">Kirim Pesan</h4>
                        <p style="color: var(--text-mid); font-size: 0.9rem; margin-bottom:28px;">Isi formulir di bawah
                            dan tim kami akan segera menghubungi Anda.</p>
                        <form id="contactForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-floating-custom"><label for="fullName">Nama Lengkap</label><input
                                            type="text" class="form-control form-control-custom" id="fullName"
                                            placeholder="Nama Lengkap" required></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating-custom"><label for="email">Email</label><input
                                            type="email" class="form-control form-control-custom" id="email"
                                            placeholder="email@contoh.com" required></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-floating-custom"><label for="whatsapp">Nomor WhatsApp</label><input
                                            type="tel" class="form-control form-control-custom" id="whatsapp"
                                            placeholder="08xxxxxxxxxx" required></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating-custom"><label for="serviceType">Jenis
                                            Layanan</label><select class="form-control form-control-custom"
                                            id="serviceType" required>
                                            <option value="" disabled selected>Pilih Layanan</option>
                                            <option value="fiber-optic">Fiber Optic Internet</option>
                                            <option value="dedicated">Dedicated Internet</option>
                                            <option value="wireless">Wireless Internet</option>
                                            <option value="corporate">Corporate Network</option>
                                            <option value="cctv">Instalasi CCTV</option>
                                            <option value="mikrotik">Konfigurasi Mikrotik</option>
                                            <option value="maintenance">Network Maintenance</option>
                                            <option value="other">Lainnya</option>
                                        </select></div>
                                </div>
                            </div>
                            <div class="form-floating-custom"><label for="message">Pesan</label><textarea
                                    class="form-control form-control-custom" id="message" rows="4"
                                    placeholder="Tuliskan pesan atau pertanyaan Anda..." required></textarea></div>
                            <button type="submit" class="btn-submit"><i class="fas fa-paper-plane me-2"></i> Kirim
                                Pesan</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-5" data-aos="fade-left">
                    <div class="contact-info-card">
                        <h4 style="font-weight:700; color: var(--white); margin-bottom:32px; position:relative;">
                            Informasi Kontak</h4>
                        <div class="contact-info-item">
                            <div class="contact-info-icon"><i class="fab fa-whatsapp"></i></div>
                            <div>
                                <div class="contact-info-label">WhatsApp</div>
                                <div class="contact-info-value"><a
                                        href="https://wa.me/6283186918751?text=Halo%20PT%20Fajar%20Techno%20System,%20saya%20ingin%20bertanya%20tentang%20layanan%20internet.">+6283186910751</a>
                                </div>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <div class="contact-info-icon"><i class="fas fa-envelope"></i></div>
                            <div>
                                <div class="contact-info-label">Email</div>
                                <div class="contact-info-value"><a
                                        href="mailto:info@fajarbroadband.co.id">info@fajarbroadband.co.id</a></div>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <div class="contact-info-icon"><i class="fas fa-phone"></i></div>
                            <div>
                                <div class="contact-info-label">Telepon</div>
                                <div class="contact-info-value"><a href="tel:+62411123456">(0411) 123-456</a></div>
                            </div>
                        </div>
                        <div class="contact-info-item">
                            <div class="contact-info-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div>
                                <div class="contact-info-label">Kantor</div>
                                <div class="contact-info-value">Jl. AP Pettarani No. 88<br>Makassar, Sulawesi Selatan
                                    90231</div>
                            </div>
                        </div>
                        <div class="contact-info-item" style="margin-bottom:0;">
                            <div class="contact-info-icon"><i class="fas fa-clock"></i></div>
                            <div>
                                <div class="contact-info-label">Jam Operasional</div>
                                <div class="contact-info-value">Senin - Sabtu: 08:00 - 21:00<br>Support: 24/7</div>
                            </div>
                        </div>
                        <div class="map-embed" style="position:relative;"><iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.2!2d119.4!3d-5.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee30b5%3A0!2sMakassar!5e0!3m2!1sid!2sid!4v1"
                                allowfullscreen="" loading="lazy"></iframe></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== FOOTER ==================== -->
    <footer class="footer-section" id="footer">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <div class="footer-brand">
                        <div class="footer-brand-icon"><i class="fas fa-bolt"></i></div>Fajar Broadband
                    </div>
                    <p class="footer-desc">PT Fajar Broadband adalah penyedia layanan internet dan solusi jaringan
                        terpercaya di Indonesia. Kami berkomitmen menghadirkan konektivitas berkualitas tinggi untuk
                        rumah, bisnis, dan institusi.</p>
                    <div class="social-icons">
                        <a href="#" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://wa.me/6283186918751?text=Halo%20saya%20ingin%20bertanya%20tentang%20layanan%20internet"
                            class="social-icon" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-6">
                    <div class="footer-title">Layanan</div>
                    <ul class="footer-links">
                        <li><a href="#">Fiber Optic</a></li>
                        <li><a href="#">Dedicated Internet</a></li>
                        <li><a href="#">Wireless Internet</a></li>
                        <li><a href="#">Corporate Network</a></li>
                        <li><a href="#">Instalasi CCTV</a></li>
                        <li><a href="#">Mikrotik Setup</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 col-6">
                    <div class="footer-title">Perusahaan</div>
                    <ul class="footer-links">
                        <li><a href="#">Tentang Kami</a></li>
                        <li><a href="#">Portofolio</a></li>
                        <li><a href="#">Karir</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Kebijakan Privasi</a></li>
                        <li><a href="#">Syarat & Ketentuan</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="footer-title">Bantuan & Support</div>
                    <ul class="footer-links">
                        <li><a href="#">Pusat Bantuan</a></li>
                        <li><a href="#">Cek Coverage Area</a></li>
                        <li><a href="#">Panduan Pembayaran</a></li>
                        <li><a href="#">Status Jaringan</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                    <div class="mt-4"
                        style="background: rgba(255,255,255,0.04); border-radius: 14px; padding: 16px; border: 1px solid rgba(255,255,255,0.06);">
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-bottom: 6px;">Emergency
                            Support 24/7</div><a href="tel:+6281234567890"
                            style="color: var(--accent); font-weight: 700; font-size: 1.1rem; text-decoration: none;">+62
                            812-3456-7890</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="row align-items-center">
                    <div class="col-md-6 text-center text-md-start">
                        <p>&copy; 2026 PT Fajar Broadband. All Rights Reserved.</p>
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        <p>Designed with <i class="fas fa-heart" style="color: #FF1744;"></i> for Indonesia's Digital
                            Future</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <a href="https://wa.me/6283186918751?text=Halo%20saya%20ingin%20bertanya%20tentang%20layanan%20internet"
        class="wa-float" aria-label="Chat WhatsApp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i></a>
    <button class="back-to-top" id="backToTop" aria-label="Kembali ke atas"><i class="fas fa-arrow-up"></i></button>
    <div class="toast-notification" id="toast"><i class="fas fa-check-circle"></i><span id="toastMessage">Pesan berhasil
            dikirim!</span></div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- AOS JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Custom JS -->
    <script src="{{ asset('js/script.js') }}"></script>
</body>

</html>
