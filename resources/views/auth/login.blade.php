<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login — Inventaris Kantor</title>
  <link rel="stylesheet" href="{{ asset('css/inventaris.css') }}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: auto;
      background: var(--bg-0);
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }
    body::after {
      content: '';
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .login-wrap {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    .theme-switcher {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
    }
    .theme-btn {
      background: var(--bg-2);
      border: 1px solid var(--border-md);
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 12px;
      color: var(--text-2);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-sans);
      transition: all 0.2s;
    }
    .theme-btn:hover {
      background: var(--bg-3);
      color: var(--text-0);
    }
    .login-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }
    .login-brand img {
      height: 48px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));
    }
    .login-brand-bg {
    background: transparent;
    border-radius: 10px;
    padding: 10px 20px;
    display: inline-flex;
    align-items: center;
   }
    .login-card {
      background: var(--bg-1);
      border: 1px solid var(--border-md);
      border-radius: var(--radius-xl);
      padding: 32px;
      box-shadow: var(--shadow-lg);
    }
    .login-card h1 {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-0);
      margin-bottom: 4px;
    }
    .login-card p {
      font-size: 13px;
      color: var(--text-3);
      margin-bottom: 28px;
    }
    .login-btn {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      font-weight: 600;
      font-family: var(--font-sans);
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s;
      box-shadow: 0 0 16px var(--accent-glow);
      margin-top: 8px;
    }
    .login-btn:hover { background: #2563eb; box-shadow: 0 0 24px var(--accent-glow); transform: translateY(-1px); }
    .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .error-box {
      background: var(--red-dim);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: var(--radius-md);
      color: var(--red);
      font-size: 13px;
      padding: 10px 14px;
      margin-bottom: 16px;
      display: none;
      align-items: center;
      gap: 8px;
    }
    .error-box.show { display: flex; }
    .input-wrap { position: relative; }
    .input-wrap .input-icon {
      position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
      font-size: 15px; color: var(--text-3); pointer-events: none;
    }
    .input-wrap .form-input { padding-left: 34px; }
    .input-wrap .toggle-pass {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: var(--text-3);
      cursor: pointer; font-size: 15px; padding: 2px; display: flex;
    }
    .input-wrap .toggle-pass:hover { color: var(--text-1); }
    .login-footer {
      text-align: center; margin-top: 20px;
      font-size: 11px; color: var(--text-3);
    }
  </style>
</head>
<body class="login-page">
  <div class="login-wrap">

    {{-- Theme Switcher --}}
    <div class="theme-switcher">
      <button class="theme-btn" onclick="toggleTheme()" id="theme-toggle-btn">
        <i class="ti ti-moon" id="theme-icon"></i>
        <span id="theme-label">Dark</span>
      </button>
    </div>

    {{-- Logo Fajar Technos --}}
    <div class="login-brand">
      <div class="login-brand-bg">
        <img src="{{ asset('assets/images/logo1.png') }}" alt="Fajar Technos" />
      </div>
    </div>

    <div class="login-card">
      <h1>Selamat datang</h1>
      <p>Masuk untuk mengelola inventaris kantor</p>

      <div class="error-box" id="error-box">
        <i class="ti ti-alert-circle"></i>
        <span id="error-msg">Username atau password salah</span>
      </div>

      <div class="form-field">
        <label class="form-label">Username</label>
        <div class="input-wrap">
          <i class="ti ti-user input-icon"></i>
          <input type="text" class="form-input" id="username"
            placeholder="Masukkan username" autocomplete="username" />
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">Password</label>
        <div class="input-wrap">
          <i class="ti ti-lock input-icon"></i>
          <input type="password" class="form-input" id="password"
            placeholder="Masukkan password" autocomplete="current-password" />
          <button type="button" class="toggle-pass" onclick="togglePass()" id="toggle-pass-btn">
            <i class="ti ti-eye" id="pass-eye"></i>
          </button>
        </div>
      </div>

      <button class="login-btn" id="login-btn" onclick="doLogin()">
        <i class="ti ti-login"></i>
        <span id="btn-text">Masuk</span>
      </button>
    </div>

    <div class="login-footer">
      Fajar Technos © 2025 · Sistem Inventaris Internal
    </div>
  </div>

  <script>
    // ── Theme ──────────────────────────────────────────
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeBtn(savedTheme);

    function updateThemeBtn(theme) {
      const icon  = document.getElementById('theme-icon');
      const label = document.getElementById('theme-label');
      if (!icon) return;
      icon.className    = theme === 'dark' ? 'ti ti-moon' : 'ti ti-sun';
      label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeBtn(next);
    }

    // ── Auth check ────────────────────────────────────
    (async () => {
      try {
        const res  = await fetch('/auth/check');
        const data = await res.json();
        if (data.loggedIn) window.location.href = '/inventaris';
      } catch (e) {}
    })();

    // ── Password toggle ───────────────────────────────
    function togglePass() {
      const input = document.getElementById('password');
      const icon  = document.getElementById('pass-eye');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ti ti-eye-off';
      } else {
        input.type = 'password';
        icon.className = 'ti ti-eye';
      }
    }

    // ── Login ─────────────────────────────────────────
    function showError(msg) {
      const box = document.getElementById('error-box');
      document.getElementById('error-msg').textContent = msg;
      box.classList.add('show');
    }

    function hideError() {
      document.getElementById('error-box').classList.remove('show');
    }

    async function doLogin() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const btn      = document.getElementById('login-btn');
      const btnText  = document.getElementById('btn-text');

      hideError();

      if (!username || !password) {
        showError('Username dan password wajib diisi');
        return;
      }

      btn.disabled = true;
      btnText.textContent = 'Memverifikasi...';

      try {
        const res  = await fetch('/login', {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          showError(data.error || 'Login gagal');
          return;
        }

        localStorage.setItem('user_nama',     data.nama);
        localStorage.setItem('user_role',     data.role);
        localStorage.setItem('user_username', data.username);
        localStorage.setItem('csrf_token',    data.csrf_token);

        window.location.href = '/inventaris';

      } catch (e) {
        showError('Tidak dapat terhubung ke server');
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Masuk';
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') doLogin();
    });
  </script>
</body>
</html>