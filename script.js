// JobNova 智能招聘平台 - 主要JavaScript功能
// 作者: JobNova团队
// 版本: 2.0.0

// 全局变量
let isNavOpen = false;
let currentSection = 'home';
let scrollPosition = 0;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('JobNova平台初始化中...');
    
    // 初始化所有功能模块
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initScrollEffects();
    initParallaxEffects();
    initNumberCounters();
    initButtonEffects();
    initKeyboardNavigation();
    initMainPageButtons();
    
    console.log('JobNova平台初始化完成！');
});

// ==================== 导航功能 ====================

/**
 * 初始化导航功能
 * 包括移动端菜单切换和导航高亮
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            isNavOpen = !isNavOpen;
            
            if (isNavOpen) {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 点击导航链接后关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isNavOpen) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    isNavOpen = false;
                }
            });
        });
    }
    
    // 导航链接高亮
    window.addEventListener('scroll', function() {
        updateNavigationHighlight();
    });
}

/**
 * 更新导航高亮状态
 */
function updateNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== 平滑滚动 ====================

/**
 * 初始化平滑滚动功能
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== 表单处理 ====================

/**
 * 初始化表单处理功能
 */
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // 初始化所有输入框的标签动画
    initInputLabels();
}

/**
 * 处理联系表单提交
 * @param {HTMLFormElement} form - 表单元素
 */
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // 表单验证
    if (!validateForm(data)) {
        return;
    }
    
    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟API调用
    setTimeout(() => {
        // 成功处理
        showNotification('消息发送成功！我们会尽快回复您。', 'success');
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

/**
 * 表单验证
 * @param {Object} data - 表单数据
 * @returns {boolean} 验证结果
 */
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('姓名至少需要2个字符');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('请输入有效的邮箱地址');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('消息内容至少需要10个字符');
    }
    
    if (errors.length > 0) {
        errors.forEach(error => {
            showNotification(error, 'error');
        });
        return false;
    }
    
    return true;
}

/**
 * 邮箱格式验证
 * @param {string} email - 邮箱地址
 * @returns {boolean} 验证结果
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 初始化输入框标签动画
 */
function initInputLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // 检查初始值
            if (input.value) {
                label.classList.add('active');
            }
            
            // 输入事件
            input.addEventListener('input', function() {
                if (this.value) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
            
            // 焦点事件
            input.addEventListener('focus', function() {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.classList.remove('active');
                }
            });
        }
    });
}

// ==================== 动画效果 ====================

/**
 * 初始化动画效果
 */
function initAnimations() {
    // 页面加载动画
    animateOnLoad();
    
    // 初始化滚动动画观察器
    initScrollAnimations();
}

/**
 * 页面加载动画
 */
function animateOnLoad() {
    const elements = document.querySelectorAll('.hero-content, .hero-visual, .feature-card, .workflow-step');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * 初始化滚动动画观察器
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== 滚动效果 ====================

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    // 导航栏滚动效果
    initNavbarScrollEffect();
    
    // 滚动位置追踪
    window.addEventListener('scroll', function() {
        scrollPosition = window.pageYOffset;
        updateNavbarStyle();
    });
}

/**
 * 导航栏滚动效果
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // 确保初始状态没有滚动类
        navbar.classList.remove('scrolled');
        
        window.addEventListener('scroll', function() {
            if (scrollPosition > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

/**
 * 更新导航栏样式
 */
function updateNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}



// ==================== 视差效果 ====================

/**
 * 初始化视差效果
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ==================== 数字计数动画 ====================

/**
 * 初始化数字计数动画
 */
function initNumberCounters() {
    const numberElements = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => observer.observe(el));
}

/**
 * 数字计数动画
 * @param {HTMLElement} element - 数字元素
 */
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = finalNumber / (duration / 16);
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += step;
        
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        
        // 格式化数字显示
        if (finalNumber >= 1000) {
            element.textContent = Math.floor(currentNumber).toLocaleString() + '+';
        } else {
            element.textContent = Math.floor(currentNumber) + '%';
        }
    }, 16);
}

// ==================== Button Component ====================

/**
 * Button Component Class
 * 可配置的按钮组件，支持多种样式、尺寸和状态
 */
class Button {
    constructor(options = {}) {
        this.options = {
            text: 'Button',
            type: 'Primary', // Primary, Secondary, Outline
            size: 'L', // S, M, L, XL
            state: 'Default', // Default, Disabled, Loading
            leftIcon: false,
            rightIcon: false,
            fullWidth: false,
            iconOnly: false,
            onClick: null,
            className: '',
            ...options
        };
        
        this.element = this.create();
        this.bindEvents();
    }
    
    /**
     * 创建按钮元素
     */
    create() {
        const button = document.createElement('button');
        
        // 基础类名
        button.className = `btn btn-${this.options.type} btn-${this.options.size} btn-${this.options.state} ${this.options.className}`;
        
        // 设置数据属性
        button.setAttribute('data-lefticon', this.options.leftIcon);
        button.setAttribute('data-righticon', this.options.rightIcon);
        button.setAttribute('data-size', this.options.size);
        button.setAttribute('data-state', this.options.state);
        button.setAttribute('data-text', !this.options.iconOnly);
        button.setAttribute('data-type', this.options.type);
        button.setAttribute('data-fullwidth', this.options.fullWidth);
        button.setAttribute('data-icononly', this.options.iconOnly);
        
        // 按钮内容
        button.innerHTML = this.createContent();
        
        return button;
    }
    
    /**
     * 创建按钮内容
     */
    createContent() {
        let content = '';
        
        // 左侧图标
        if (this.options.leftIcon) {
            content += `<div class="btn-left-icon">${this.options.leftIcon}</div>`;
        }
        
        // 按钮文本
        if (!this.options.iconOnly) {
            content += `<div class="btn-text">${this.options.text}</div>`;
        }
        
        // 右侧图标
        if (this.options.rightIcon) {
            content += `<div class="btn-right-icon">${this.options.rightIcon}</div>`;
        }
        
        return content;
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        if (this.options.onClick && this.options.state !== 'Disabled') {
            this.element.addEventListener('click', (e) => {
                this.options.onClick(e, this);
                this.createRippleEffect(e);
            });
        }
        
        // 添加pressed状态支持
        this.element.addEventListener('mousedown', () => {
            if (this.options.state !== 'Disabled') {
                this.element.classList.add('pressed');
            }
        });
        
        this.element.addEventListener('mouseup', () => {
            this.element.classList.remove('pressed');
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('pressed');
        });
    }
    
    /**
     * 创建涟漪效果
     */
    createRippleEffect(e) {
        const ripple = document.createElement('span');
        const rect = this.element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * 更新按钮状态
     */
    setState(state) {
        this.options.state = state;
        this.element.className = this.element.className.replace(/btn-(Default|Disabled|Loading)/, `btn-${state}`);
        this.element.setAttribute('data-state', state);
        
        if (state === 'Disabled') {
            this.element.disabled = true;
        } else {
            this.element.disabled = false;
        }
    }
    
    /**
     * 更新按钮文本
     */
    setText(text) {
        this.options.text = text;
        const textElement = this.element.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = text;
        }
    }
    
    /**
     * 更新按钮类型
     */
    setType(type) {
        this.options.type = type;
        this.element.className = this.element.className.replace(/btn-(Primary|Secondary|Outline)/, `btn-${type}`);
        this.element.setAttribute('data-type', type);
    }
    
    /**
     * 更新按钮尺寸
     */
    setSize(size) {
        this.options.size = size;
        this.element.className = this.element.className.replace(/btn-(S|M|L|XL)/, `btn-${size}`);
        this.element.setAttribute('data-size', size);
    }
    
    /**
     * 获取按钮元素
     */
    getElement() {
        return this.element;
    }
    
    /**
     * 销毁按钮
     */
    destroy() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

/**
 * 创建按钮的便捷函数
 */
function createButton(options) {
    return new Button(options);
}

/**
 * 初始化按钮效果
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

/**
 * 创建按钮涟漪效果
 * @param {Event} e - 点击事件
 * @param {HTMLElement} button - 按钮元素
 */
function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==================== 键盘导航 ====================

/**
 * 初始化键盘导航
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape' && isNavOpen) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                isNavOpen = false;
            }
        }
        
        // 方向键导航
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            navigateWithArrows(e.key);
        }
    });
}

/**
 * 方向键导航
 * @param {string} key - 按键类型
 */
function navigateWithArrows(key) {
    const sections = document.querySelectorAll('section[id]');
    const currentIndex = Array.from(sections).findIndex(section => 
        section.getAttribute('id') === currentSection
    );
    
    let targetIndex;
    
    if (key === 'ArrowDown') {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
        targetIndex = Math.max(currentIndex - 1, 0);
    }
    
    const targetSection = sections[targetIndex];
    if (targetSection) {
        currentSection = targetSection.getAttribute('id');
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ==================== 通知系统 ====================

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 设置样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-left: 4px solid ${getNotificationColor(type)};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        padding: 16px 20px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * 获取通知图标
 * @param {string} type - 通知类型
 * @returns {string} 图标类名
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * 获取通知颜色
 * @param {string} type - 通知类型
 * @returns {string} 颜色值
 */
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#B0F809',
        info: '#B0F809'
    };
    return colors[type] || colors.info;
}

// ==================== 性能优化 ====================

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间
 * @returns {Function} 防抖后的函数
 */
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

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 应用防抖到滚动事件
window.addEventListener('scroll', debounce(function() {
    updateNavigationHighlight();
    updateNavbarStyle();
}, 16));

// 应用节流到窗口调整事件
window.addEventListener('resize', throttle(function() {
    // 重新计算布局相关的内容
    console.log('窗口大小调整');
}, 250));

// ==================== 主页面按钮初始化 ====================

/**
 * 初始化主页面按钮
 */
function initMainPageButtons() {
    // 创建英雄区域的主要按钮
    const heroPrimaryBtn = createButton({
        text: 'Get Started',
        type: 'Primary',
        size: 'L',
        rightIcon: true,
        onClick: (e, btn) => {
            console.log('Get Started clicked!');
            // 这里可以添加跳转逻辑
        }
    });
    
    // 将按钮添加到页面
    const heroPrimaryContainer = document.getElementById('hero-primary-btn');
    
    if (heroPrimaryContainer) {
        heroPrimaryContainer.appendChild(heroPrimaryBtn.getElement());
    }
    
    // 初始化导航栏按钮
    initNavigationButtons();
}

/**
 * 初始化导航栏按钮
 */
function initNavigationButtons() {
    // 创建 "Find Talents" 按钮 (Secondary类型)
    const findTalentsBtn = createButton({
        text: 'Find Talents',
        type: 'Secondary',
        size: 'L',
        onClick: (e, btn) => {
            console.log('Find Talents clicked!');
            // 这里可以添加跳转逻辑
        }
    });
    
    // 创建 "Log in" 按钮 (Primary类型)
    const loginBtn = createButton({
        text: 'Log in',
        type: 'Primary',
        size: 'M',
        onClick: (e, btn) => {
            console.log('Log in clicked!');
            // 这里可以添加登录逻辑
        }
    });
    
    // 将按钮添加到导航栏
    const findTalentsContainer = document.getElementById('nav-find-talents-btn');
    const loginContainer = document.getElementById('nav-login-btn');
    
    if (findTalentsContainer) {
        findTalentsContainer.appendChild(findTalentsBtn.getElement());
    }
    
    if (loginContainer) {
        loginContainer.appendChild(loginBtn.getElement());
    }
}

// ==================== 错误处理 ====================

/**
 * 全局错误处理
 */
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    showNotification('页面出现错误，请刷新重试', 'error');
});

/**
 * 未处理的Promise拒绝处理
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
    showNotification('操作失败，请重试', 'error');
});

// ==================== 工具函数 ====================

/**
 * 获取元素在视口中的位置
 * @param {HTMLElement} element - 目标元素
 * @returns {Object} 位置信息
 */
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset,
        right: rect.right + window.pageXOffset
    };
}

/**
 * 检查元素是否在视口中
 * @param {HTMLElement} element - 目标元素
 * @returns {boolean} 是否在视口中
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 格式化数字显示
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ==================== 导出模块 ====================

// 如果支持ES6模块，则导出主要函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSmoothScrolling,
        initFormHandling,
        initAnimations,
        showNotification,
        debounce,
        throttle
    };
}

console.log('JobNova JavaScript模块加载完成！');
