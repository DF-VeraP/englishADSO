class LoginController {
    constructor() {
        this.authService = new window.AuthService();
        this.form         = document.getElementById('loginForm');
        this.emailInput   = document.getElementById('email');
        this.passwordInput= document.getElementById('password');
        this.emailGroup   = document.getElementById('emailGroup');
        this.passwordGroup= document.getElementById('passwordGroup');
        this.submitBtn    = document.getElementById('submitBtn');
        this.toastContainer = document.getElementById('toastContainer');
        this.rememberMe   = document.getElementById('rememberMe');
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => this.handleSubmit(e));
        this.emailInput.addEventListener('input',    () => this.clearValidation(this.emailInput,    this.emailGroup));
        this.passwordInput.addEventListener('input', () => this.clearValidation(this.passwordInput, this.passwordGroup));
    }

    validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

    clearValidation(input, group) {
        input.classList.remove('is-invalid');
        group.classList.remove('has-error');
    }

    showError(input, group) {
        input.classList.add('is-invalid');
        group.classList.add('has-error');
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }

    setLoading(loading) {
        this.submitBtn.classList.toggle('is-loading', loading);
        this.submitBtn.disabled = loading;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email    = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        const remember = this.rememberMe.checked;
        const role     = document.querySelector('input[name="role"]:checked').value;
        let valid = true;

        if (!email || !this.validateEmail(email)) { this.showError(this.emailInput, this.emailGroup); valid = false; }
        if (!password || password.length < 6)     { this.showError(this.passwordInput, this.passwordGroup); valid = false; }
        if (!valid) return;

        this.setLoading(true);
        try {
            const response = await this.authService.login(email, password, role);
            this.authService.saveSession(response.token, response.user, remember);
            this.showToast(`Bienvenido, ${response.user.nombre || response.user.email}`, 'success');

            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1200);
        } catch (error) {
            this.showToast(error.message, 'error');
            this.passwordInput.value = '';
        } finally {
            this.setLoading(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new LoginController());
