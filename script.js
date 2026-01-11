// ============================================
// CBT ONLINE - COMMON JAVASCRIPT FUNCTIONS
// ============================================

// Konfigurasi
const CONFIG = {
    appName: 'CBT Online',
    version: '1.0.0',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif']
};

// ============================================
// FUNGSI NOTIFIKASI
// ============================================

function showNotification(message, type = 'info', duration = 5000) {
    // Hapus notifikasi lama
    const oldNotifications = document.querySelectorAll('.custom-notification');
    oldNotifications.forEach(notif => notif.remove());
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        z-index: 99999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Warna berdasarkan jenis
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.background = colors[type] || colors.info;
    if (type === 'warning') {
        notification.style.color = '#212529';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Tambahkan animasi CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Hapus setelah durasi
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, duration);
}

// ============================================
// FUNGSI VALIDASI
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateImageFile(file) {
    if (!CONFIG.allowedImageTypes.includes(file.type)) {
        return { valid: false, message: 'Format file tidak didukung. Gunakan JPG, PNG, atau GIF.' };
    }
    
    if (file.size > CONFIG.maxFileSize) {
        return { valid: false, message: 'Ukuran file terlalu besar. Maksimal 2MB.' };
    }
    
    return { valid: true, message: 'File valid' };
}

// ============================================
// FUNGSI FORMAT DATA
// ============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatScore(score) {
    return Math.round(score);
}

// ============================================
// FUNGSI STORAGE
// ============================================

function saveToStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
    }
}

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
}

// ============================================
// FUNGSI HELPER
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// FUNGSI ANTI-CHEATING
// ============================================

function setupAntiCheating() {
    // Deteksi developer tools
    setInterval(function() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            alert('Akses tidak diizinkan!');
            window.location.href = 'index.html';
        }
    }, 1000);
    
    // Blokir copy paste
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        showNotification('Copy teks tidak diizinkan saat ujian!', 'warning');
    });
    
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        showNotification('Cut teks tidak diizinkan saat ujian!', 'warning');
    });
    
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        showNotification('Paste teks tidak diizinkan saat ujian!', 'warning');
    });
}

// ============================================
// FUNGSI LOADING
// ============================================

function showLoading(message = 'Memuat...') {
    // Hapus loading lama
    const oldLoading = document.getElementById('custom-loading');
    if (oldLoading) oldLoading.remove();
    
    // Buat loading baru
    const loading = document.createElement('div');
    loading.id = 'custom-loading';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        flex-direction: column;
    `;
    
    loading.innerHTML = `
        <div style="
            width: 60px;
            height: 60px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        "></div>
        <div style="color: white; font-size: 16px; font-weight: 500;">${message}</div>
    `;
    
    // Tambahkan animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loading);
    
    return {
        hide: function() {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
                style.remove();
            }, 300);
        }
    };
}

// ============================================
// FUNGSI MODAL
// ============================================

function showModal(title, content, buttons = []) {
    // Hapus modal lama
    const oldModal = document.getElementById('custom-modal');
    if (oldModal) oldModal.remove();
    
    // Buat modal baru
    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        padding: 20px;
    `;
    
    let buttonsHTML = '';
    if (buttons.length > 0) {
        buttonsHTML = '<div style="display: flex; gap: 10px; margin-top: 20px;">';
        buttons.forEach(btn => {
            buttonsHTML += `
                <button onclick="${btn.onclick}"
                        style="
                            padding: 10px 20px;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                            ${btn.primary ? 'background: #667eea; color: white;' : 'background: #6c757d; color: white;'}
                        ">
                    ${btn.text}
                </button>
            `;
        });
        buttonsHTML += '</div>';
    }
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <h2 style="margin-top: 0; color: #333; margin-bottom: 15px;">${title}</h2>
            <div style="color: #666; line-height: 1.5;">${content}</div>
            ${buttonsHTML}
            <button onclick="closeModal()"
                    style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                    ">
                ×
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    return {
        close: function() {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    };
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// ============================================
// FUNGSI ERROR HANDLING
// ============================================

function handleApiError(error) {
    console.error('API Error:', error);
    
    let message = 'Terjadi kesalahan. Silakan coba lagi.';
    
    if (error.message) {
        message = error.message;
    }
    
    if (error.toString().includes('network') || error.toString().includes('Network')) {
        message = 'Koneksi jaringan bermasalah. Periksa koneksi internet Anda.';
    }
    
    showNotification(message, 'error');
    return { success: false, message: message };
}

// ============================================
// INISIALISASI GLOBAL
// ============================================

// Cegah akses langsung ke file
if (window.location.protocol === 'file:') {
    alert('Website harus diakses melalui server web. Silakan gunakan GitHub Pages atau hosting lainnya.');
}

// Setup event listeners global
document.addEventListener('DOMContentLoaded', function() {
    // Setup anti-cheating untuk halaman ujian
    if (window.location.pathname.includes('ujian.html')) {
        setupAntiCheating();
    }
    
    // Setup konfirmasi sebelum meninggalkan halaman
    window.addEventListener('beforeunload', function(e) {
        if (window.location.pathname.includes('ujian.html')) {
            e.preventDefault();
            e.returnValue = 'Anda sedang dalam ujian. Yakin ingin meninggalkan halaman?';
            return 'Anda sedang dalam ujian. Yakin ingin meninggalkan halaman?';
        }
    });
});

// Ekspor fungsi ke global scope
window.CBT = {
    showNotification,
    showLoading,
    showModal,
    closeModal,
    validateEmail,
    validatePassword,
    validateImageFile,
    formatDate,
    formatTime,
    formatScore,
    saveToStorage: saveToStorage,
    getFromStorage: getFromStorage,
    clearStorage,
    handleApiError,
    debounce,
    throttle
};