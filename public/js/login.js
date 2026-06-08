document.addEventListener('DOMContentLoaded', function () {

    // ===================== CORE ELEMENTS =====================
    const authWrapper = document.getElementById('authWrapper');
    const loginInfo = document.getElementById('loginInfo');
    const registerInfo = document.getElementById('registerInfo');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const toRegisterLink = document.getElementById('toRegister');
    const toLoginLink = document.getElementById('toLogin');
    const mobileBrand = document.getElementById('mobileBrand');

    // Toast
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastSuccess = toast.querySelector('.toast-success');
    const toastError = toast.querySelector('.toast-error');

    // Success overlay
    const successOverlay = document.getElementById('successOverlay');
    const btnGoLogin = document.getElementById('btnGoLogin');

    // Animation lock
    let isAnimating = false;

    // ===================== VIEW SWITCHING =====================
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });
    function switchToRegister(e) {
        if (e) e.preventDefault();
        if (isAnimating) return;
        isAnimating = true;

        // 1. Fade out current content
        loginInfo.classList.remove('active');
        loginInfo.classList.add('inactive');
        loginFormContainer.classList.remove('active');
        loginFormContainer.classList.add('inactive');

        // 2. Slide panels
        authWrapper.classList.remove('login');
        authWrapper.classList.add('register');

        // 3. Fade in new content (delayed)
        setTimeout(function () {
            registerInfo.classList.remove('inactive');
            registerInfo.classList.add('active');
            registerFormContainer.classList.remove('inactive');
            registerFormContainer.classList.add('active');
            isAnimating = false;
        }, 350);
    }

    function switchToLogin(e) {
        if (e) e.preventDefault();
        if (isAnimating) return;
        isAnimating = true;

        // Reset register form steps
        resetRegisterSteps();

        // 1. Fade out current content
        registerInfo.classList.remove('active');
        registerInfo.classList.add('inactive');
        registerFormContainer.classList.remove('active');
        registerFormContainer.classList.add('inactive');

        // 2. Slide panels
        authWrapper.classList.remove('register');
        authWrapper.classList.add('login');

        // 3. Fade in new content (delayed)
        setTimeout(function () {
            loginInfo.classList.remove('inactive');
            loginInfo.classList.add('active');
            loginFormContainer.classList.remove('inactive');
            loginFormContainer.classList.add('active');
            isAnimating = false;
        }, 350);
    }

    toRegisterLink.addEventListener('click', switchToRegister);
    toLoginLink.addEventListener('click', switchToLogin);
    btnGoLogin.addEventListener('click', function () {
        successOverlay.classList.remove('show');
        switchToLogin();
    });

    // ===================== LOGIN FORM =====================
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const btnLogin = document.getElementById('btnLogin');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearAllErrors('login');

        let valid = true;
        const username = loginEmail.value.trim();
        const pass = loginPassword.value;

        if (!username) {
            showFieldError(loginEmail, 'loginEmailError', 'Username wajib diisi');
            valid = false;
        }

        if (!pass) {
            showFieldError(loginPassword, 'loginPasswordError', 'Kata sandi wajib diisi');
            valid = false;
        } else if (pass.length < 6) {
            showFieldError(loginPassword, 'loginPasswordError', 'Minimal 6 karakter');
            valid = false;
        }

        if (!valid) { showToast('Mohon periksa kembali data Anda', 'error'); return; }

        setButtonLoading(btnLogin, true);

        try {
            const res = await fetch('api/auth.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: pass })
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                showToast('Login berhasil! Mengalihkan...');
                setTimeout(function () {
                    window.location.href = 'inventaris.html';
                }, 1000);
            } else {
                setButtonLoading(btnLogin, false);
                showToast(data.error || 'Username atau password salah', 'error');
                showFieldError(loginEmail, 'loginEmailError', ' ');
                showFieldError(loginPassword, 'loginPasswordError', data.error || 'Username atau password salah');
            }
        } catch (err) {
            setButtonLoading(btnLogin, false);
            showToast('Gagal terhubung ke server. Pastikan XAMPP aktif.', 'error');
        }
    });

    // Real-time clearing
    loginEmail.addEventListener('input', function () { clearFieldError(this, 'loginEmailError'); });
    loginPassword.addEventListener('input', function () { clearFieldError(this, 'loginPasswordError'); });

    // Forgot link
    document.getElementById('forgotLink').addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Link reset kata sandi telah dikirim ke email Anda');
    });

    // Social buttons
    document.getElementById('btnGoogle').addEventListener('click', function () {
        showToast('Login dengan Google — segera hadir!');
    });


    // ===================== REGISTER FORM =====================
    const registerForm = document.getElementById('registerForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const regEmailInput = document.getElementById('regEmail');
    const phoneInput = document.getElementById('phone');
    const regPasswordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');

    const btnNext1 = document.getElementById('btnNext1');
    const btnBack1 = document.getElementById('btnBack1');
    const btnNext2 = document.getElementById('btnNext2');
    const btnBack2 = document.getElementById('btnBack2');
    const btnSubmit = document.getElementById('btnSubmit');

    // Password strength
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const reqItems = document.querySelectorAll('.req-item');

    // Step indicator
    const steps = document.querySelectorAll('.step');
    const stepLine1 = document.getElementById('stepLine1');
    const stepLine2 = document.getElementById('stepLine2');
    let currentRegStep = 1;

    // ---- Step Navigation ----
    function goToRegStep(step) {
        document.getElementById('regStep1').classList.remove('active');
        document.getElementById('regStep2').classList.remove('active');
        document.getElementById('regStep3').classList.remove('active');

        var target = document.getElementById('regStep' + step);
        target.classList.remove('active');
        void target.offsetWidth;
        target.classList.add('active');

        steps.forEach(function (s, i) {
            s.classList.remove('active', 'completed');
            if (i + 1 < step) s.classList.add('completed');
            else if (i + 1 === step) s.classList.add('active');
        });

        stepLine1.classList.toggle('filled', step > 1);
        stepLine2.classList.toggle('filled', step > 2);

        currentRegStep = step;
    }

    function resetRegisterSteps() {
        goToRegStep(1);
        registerForm.reset();
        strengthFill.className = 'strength-fill';
        strengthText.className = 'strength-text';
        strengthText.textContent = 'Kekuatan kata sandi';
        reqItems.forEach(function (item) { item.classList.remove('met'); });
        clearAllErrors('reg');
    }

    // ---- Step 1 → 2 ----
    btnNext1.addEventListener('click', function () {
        if (!validateRegStep1()) { showToast('Mohon lengkapi semua data dengan benar', 'error'); return; }
        goToRegStep(2);
    });

    // ---- Step 2 → 3 ----
    btnNext2.addEventListener('click', function () {
        if (!validateRegStep2()) { showToast('Mohon periksa kembali kata sandi Anda', 'error'); return; }
        populateSummary();
        goToRegStep(3);
    });

    // ---- Back ----
    btnBack1.addEventListener('click', function () { goToRegStep(1); });
    btnBack2.addEventListener('click', function () { goToRegStep(2); });

    // ---- Submit ----
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!agreeTerms.checked) {
            document.getElementById('agreeTermsError').textContent = 'Anda harus menyetujui Syarat & Ketentuan';
            showToast('Anda harus menyetujui Syarat & Ketentuan', 'error');
            return;
        }
        document.getElementById('agreeTermsError').textContent = '';
        setButtonLoading(btnSubmit, true);

        setTimeout(function () {
            setButtonLoading(btnSubmit, false);
            successOverlay.classList.add('show');
        }, 2500);
    });

    // ---- Validation: Step 1 ----
    function validateRegStep1() {
        var valid = true;
        var fn = firstNameInput.value.trim();
        var ln = lastNameInput.value.trim();
        var em = regEmailInput.value.trim();
        var ph = phoneInput.value.trim();

        if (!fn) { showFieldError(firstNameInput, 'firstNameError', 'Nama depan wajib diisi'); valid = false; }
        else if (fn.length < 2) { showFieldError(firstNameInput, 'firstNameError', 'Minimal 2 karakter'); valid = false; }
        else { clearFieldError(firstNameInput, 'firstNameError'); }

        if (!ln) { showFieldError(lastNameInput, 'lastNameError', 'Nama belakang wajib diisi'); valid = false; }
        else { clearFieldError(lastNameInput, 'lastNameError'); }

        if (!em) { showFieldError(regEmailInput, 'regEmailError', 'Email wajib diisi'); valid = false; }
        else if (!isValidEmail(em)) { showFieldError(regEmailInput, 'regEmailError', 'Format email tidak valid'); valid = false; }
        else { clearFieldError(regEmailInput, 'regEmailError'); }

        if (!ph) { showFieldError(phoneInput, 'phoneError', 'Nomor telepon wajib diisi'); valid = false; }
        else if (!isValidPhone(ph)) { showFieldError(phoneInput, 'phoneError', 'Format nomor tidak valid'); valid = false; }
        else { clearFieldError(phoneInput, 'phoneError'); }

        return valid;
    }

    // ---- Validation: Step 2 ----
    function validateRegStep2() {
        var valid = true;
        var pw = regPasswordInput.value;
        var cp = confirmPasswordInput.value;

        if (!pw) { showFieldError(regPasswordInput, 'regPasswordError', 'Kata sandi wajib diisi'); valid = false; }
        else if (pw.length < 8) { showFieldError(regPasswordInput, 'regPasswordError', 'Minimal 8 karakter'); valid = false; }
        else if (getPasswordScore(pw) < 3) { showFieldError(regPasswordInput, 'regPasswordError', 'Kata sandi terlalu lemah'); valid = false; }
        else { clearFieldError(regPasswordInput, 'regPasswordError'); }

        if (!cp) { showFieldError(confirmPasswordInput, 'confirmPasswordError', 'Konfirmasi kata sandi wajib diisi'); valid = false; }
        else if (cp !== pw) { showFieldError(confirmPasswordInput, 'confirmPasswordError', 'Kata sandi tidak cocok'); valid = false; }
        else { clearFieldError(confirmPasswordInput, 'confirmPasswordError'); }

        return valid;
    }

    // ---- Real-time clearing ----
    firstNameInput.addEventListener('input', function () { clearFieldError(this, 'firstNameError'); });
    lastNameInput.addEventListener('input', function () { clearFieldError(this, 'lastNameError'); });
    regEmailInput.addEventListener('input', function () { clearFieldError(this, 'regEmailError'); });
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9\s]/g, '');
        clearFieldError(this, 'phoneError');
    });
    regPasswordInput.addEventListener('input', function () {
        clearFieldError(this, 'regPasswordError');
        updatePasswordStrength(this.value);
        updateRequirements(this.value);
    });
    confirmPasswordInput.addEventListener('input', function () {
        clearFieldError(this, 'confirmPasswordError');
        if (this.value && this.value !== regPasswordInput.value) {
            this.classList.add('error');
            document.getElementById('confirmPasswordError').textContent = 'Kata sandi tidak cocok';
        } else if (this.value) {
            this.classList.remove('error');
            document.getElementById('confirmPasswordError').textContent = '';
        }
    });
    agreeTerms.addEventListener('change', function () {
        if (this.checked) document.getElementById('agreeTermsError').textContent = '';
    });

    // ---- Password strength ----
    function getPasswordScore(pw) {
        var s = 0;
        if (pw.length >= 8) s++;
        if (/[A-Z]/.test(pw)) s++;
        if (/[a-z]/.test(pw)) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^A-Za-z0-9]/.test(pw)) s++;
        return s;
    }

    function updatePasswordStrength(pw) {
        strengthFill.className = 'strength-fill';
        strengthText.className = 'strength-text';
        if (!pw) { strengthText.textContent = 'Kekuatan kata sandi'; return; }
        var s = getPasswordScore(pw);
        var levels = ['', 'weak', 'fair', 'medium', 'strong', 'very-strong'];
        var labels = ['', 'Sangat lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'];
        strengthFill.classList.add(levels[s]);
        strengthText.classList.add(levels[s]);
        strengthText.textContent = labels[s];
    }

    function updateRequirements(pw) {
        reqItems.forEach(function (item) {
            var req = item.getAttribute('data-req');
            var met = false;
            switch (req) {
                case 'length': met = pw.length >= 8; break;
                case 'uppercase': met = /[A-Z]/.test(pw); break;
                case 'lowercase': met = /[a-z]/.test(pw); break;
                case 'number': met = /[0-9]/.test(pw); break;
                case 'special': met = /[^A-Za-z0-9]/.test(pw); break;
            }
            item.classList.toggle('met', met);
        });
    }

    // ---- Summary ----
    function populateSummary() {
        document.getElementById('sumName').textContent = firstNameInput.value.trim() + ' ' + lastNameInput.value.trim();
        document.getElementById('sumEmail').textContent = regEmailInput.value.trim();
        document.getElementById('sumPhone').textContent = '+62 ' + phoneInput.value.trim();
    }

    // ===================== TOGGLE PASSWORD =====================
    document.querySelectorAll('.toggle-password').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetId = this.getAttribute('data-target');
            var input = document.getElementById(targetId);
            var icon = this.querySelector('i');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.setAttribute('type', 'password');
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ===================== HELPER FUNCTIONS =====================
    function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    function isValidPhone(phone) {
        var c = phone.replace(/\s/g, '');
        if (c.startsWith('0')) c = c.substring(1);
        return /^[0-9]{9,13}$/.test(c);
    }

    function showFieldError(input, errorId, message) {
        if (input) input.classList.add('error');
        var el = document.getElementById(errorId);
        if (el) el.textContent = message;
    }

    function clearFieldError(input, errorId) {
        if (input) input.classList.remove('error');
        var el = document.getElementById(errorId);
        if (el) el.textContent = '';
    }

    function clearAllErrors(prefix) {
        if (prefix === 'login') {
            clearFieldError(loginEmail, 'loginEmailError');
            clearFieldError(loginPassword, 'loginPasswordError');
        } else {
            clearFieldError(firstNameInput, 'firstNameError');
            clearFieldError(lastNameInput, 'lastNameError');
            clearFieldError(regEmailInput, 'regEmailError');
            clearFieldError(phoneInput, 'phoneError');
            clearFieldError(regPasswordInput, 'regPasswordError');
            clearFieldError(confirmPasswordInput, 'confirmPasswordError');
            document.getElementById('agreeTermsError').textContent = '';
        }
    }

    function setButtonLoading(btn, loading) {
        var txt = btn.querySelector('.btn-text');
        var ldr = btn.querySelector('.btn-loader');
        if (loading) {
            btn.disabled = true;
            txt.style.display = 'none';
            ldr.style.display = 'inline-block';
        } else {
            btn.disabled = false;
            txt.style.display = 'inline';
            ldr.style.display = 'none';
        }
    }

    // ===================== TOAST =====================
    var toastTimeout = null;

    function showToast(message, type) {
        if (toastTimeout) clearTimeout(toastTimeout);
        toast.classList.remove('show', 'error-toast');
        toastSuccess.style.display = 'none';
        toastError.style.display = 'none';

        if (type === 'error') {
            toast.classList.add('error-toast');
            toastError.style.display = 'inline-block';
        } else {
            toastSuccess.style.display = 'inline-block';
        }

        toastMsg.textContent = message;
        requestAnimationFrame(function () { toast.classList.add('show'); });

        toastTimeout = setTimeout(function () { toast.classList.remove('show'); }, 3500);
    }

    // ===================== PLACEHOLDER LINKS =====================
    document.querySelectorAll('.terms-text a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Halaman Syarat & Ketentuan — segera hadir', 'error');
        });
    });

});

const customerBtn = document.getElementById("customerBtn");
const staffBtn = document.getElementById("staffBtn");
const registerText = document.getElementById("registerText");
const loginFormContainer = document.getElementById("loginFormContainer");

registerText.style.visibility = "visible";

customerBtn.addEventListener("click", () => {

    customerBtn.classList.add("active");
    staffBtn.classList.remove("active");

    registerText.style.visibility = "visible";

    // efek flash
    loginFormContainer.classList.remove("mode-switch-effect");
    void loginFormContainer.offsetWidth;
    loginFormContainer.classList.add("mode-switch-effect");
});

staffBtn.addEventListener("click", () => {

    staffBtn.classList.add("active");
    customerBtn.classList.remove("active");

    registerText.style.visibility = "hidden";

    // efek flash
    loginFormContainer.classList.remove("mode-switch-effect");
    void loginFormContainer.offsetWidth;
    loginFormContainer.classList.add("mode-switch-effect");
});