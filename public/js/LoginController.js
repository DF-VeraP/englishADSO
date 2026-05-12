/**
 * LoginController
 * 
 * Principio de Responsabilidad Única (SRP):
 * Esta clase se encarga ÚNICAMENTE de gestionar la vista (DOM), validar inputs,
 * y coordinar acciones con el AuthService.
 */
class LoginController {
    constructor() {
        // Inicializar servicio
        this.authService = new window.AuthService();

        // Elementos del DOM
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailGroup = document.getElementById('emailGroup');
        this.passwordGroup = document.getElementById('passwordGroup');
        this.submitBtn = document.getElementById('submitBtn');
        this.toastContainer = document.getElementById('toastContainer');
        this.rememberMe = document.getElementById('rememberMe');

        // Bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearValidation = this.clearValidation.bind(this);

        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit);
            this.emailInput.addEventListener('input', () => this.clearValidation(this.emailInput, this.emailGroup));
            this.passwordInput.addEventListener('input', () => this.clearValidation(this.passwordInput, this.passwordGroup));
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

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
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('is-loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('is-loading');
            this.submitBtn.disabled = false;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        const remember = this.rememberMe.checked;
        const role = document.querySelector('input[name="role"]:checked').value;
        
        let isValid = true;

        // Validaciones Front-End
        if (!email || !this.validateEmail(email)) {
            this.showError(this.emailInput, this.emailGroup);
            isValid = false;
        }

        if (!password || password.length < 6) {
            this.showError(this.passwordInput, this.passwordGroup);
            isValid = false;
        }

        if (!isValid) return;

        this.setLoading(true);

        try {
            // Llamada al servicio externo con el rol
            const response = await this.authService.login(email, password, role);
            
            // Guardar sesión
            this.authService.saveSession(response.token, remember);
            
            this.showToast('Inicio de sesión exitoso. Redirigiendo...', 'success');
            
            // Simular redirección al dashboard
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirigir a inicio por ahora
            }, 1500);

        } catch (error) {
            this.showToast(error.message, 'error');
            this.passwordInput.value = ''; // Limpiar contraseña en caso de error
        } finally {
            this.setLoading(false);
        }
    }
}

// Inicializar controlador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new LoginController();
});
