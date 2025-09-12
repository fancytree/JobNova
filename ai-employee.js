// AI Employee 页面专用JavaScript功能

// AI员工数据
const aiEmployeesData = [
    {
        id: 'alfred',
        name: 'Alfred',
        role: 'AI Executive Assistant',
        avatar: 'Asset/AI Employee Avatars/alfred-avatar.svg',
        color: '#8B5CF6',
        skills: [
            'Schedule Calendar',
            'Prioritize Tasks',
            'Reply to Emails',
            'Takes Notes'
        ],
        featured: false
    },
    {
        id: 'chip',
        name: 'Chip',
        role: 'AI Sales Representative',
        avatar: 'Asset/AI Employee Avatars/chip-avatar.svg',
        color: '#3B82F6',
        skills: [
            'Update CRM',
            'Chase Opportunities',
            'Find Leads',
            'Personalized Outreach'
        ],
        featured: false
    },
    {
        id: 'clide',
        name: 'Clide',
        role: 'AI Customer Support Specialist',
        avatar: 'Asset/AI Employee Avatars/clide-avatar.svg',
        color: '#EC4899',
        skills: [
            'Respond to Tickets',
            'Escalate Issues',
            'Take Actions',
            'Solve Problems'
        ],
        featured: false
    },
    {
        id: 'suki',
        name: 'Suki',
        role: 'AI Marketing Associate',
        avatar: 'Asset/AI Employee Avatars/suki-avatar.svg',
        color: '#F59E0B',
        skills: [
            'Write Blog Posts',
            'Run SEO',
            'Manage Social Media',
            'Write with Brand Voice'
        ],
        featured: false
    },
    {
        id: 'dot',
        name: 'Dot',
        role: 'AI Recruiter',
        avatar: 'Asset/AI Employee Avatars/dot-avatar.svg',
        color: '#10B981',
        skills: [
            'Screen Candidates',
            'Personalized Outreach',
            'Grade Interviews',
            'Schedule Interviews'
        ],
        featured: false
    },
    {
        id: 'millie',
        name: 'Millie',
        role: 'AI Project Manager',
        avatar: 'Asset/AI Employee Avatars/millie-avatar.svg',
        color: '#8B5CF6',
        skills: [
            'Coordinate with Team',
            'Plan Resource & Capacity',
            'Check-in on Deadlines',
            'Create Reports'
        ],
        featured: false
    },
    {
        id: 'spec',
        name: 'Spec',
        role: 'AI Researcher',
        avatar: 'Asset/AI Employee Avatars/spec-avatar.svg',
        color: '#10B981',
        skills: [
            'Aggregate News',
            'Monitor Competitors',
            'Generate Reports',
            'Deep Research'
        ],
        featured: false
    },
    {
        id: 'custom',
        name: 'Build your own',
        role: 'Your own custom AI Employee',
        avatar: 'Asset/AI Employee Avatars/custom-avatar.svg',
        color: '#64748B',
        skills: [
            'Use words to describe what your AI Employee does. Motion\'s team can custom-create AI Employees for your special needs!'
        ],
        featured: false,
        custom: true
    }
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Employee页面初始化中...');
    
    // 初始化所有功能模块
    initAIEmployeeCards();
    initAIEmployeeButtons();
    initNavigation();
    initSmoothScrolling();
    initFooterAnimation();
    
    console.log('AI Employee页面初始化完成！');
});

/**
 * 初始化Footer动画
 */
function initFooterAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    // 使用Intersection Observer来触发footer动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                footer.classList.add('animate-in');
                footerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    footerObserver.observe(footer);
}

/**
 * 初始化AI员工卡片
 */
function initAIEmployeeCards() {
    const grid = document.getElementById('ai-employees-grid');
    if (!grid) {
        console.error('未找到AI员工网格容器');
        return;
    }
    
    // 清空现有内容
    grid.innerHTML = '';
    
    // 渲染所有AI员工卡片
    aiEmployeesData.forEach(employee => {
        const card = createAIEmployeeCard(employee);
        grid.appendChild(card);
    });
    
    console.log('AI员工卡片渲染完成，共', aiEmployeesData.length, '个员工');
}

/**
 * 创建AI员工卡片
 * @param {Object} employee - 员工数据
 * @returns {HTMLElement} 卡片元素
 */
function createAIEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = `ai-employee-card ${employee.featured ? 'featured' : ''}`;
    card.setAttribute('data-employee-id', employee.id);
    
    // 员工姓名和角色
    const nameSection = document.createElement('div');
    nameSection.className = 'ai-employee-name';
    
    const name = document.createElement('h3');
    name.textContent = employee.name;
    name.style.color = employee.color;
    
    const role = document.createElement('p');
    role.className = 'ai-employee-role';
    role.textContent = employee.role;
    
    nameSection.appendChild(name);
    nameSection.appendChild(role);
    
    // 头像
    const avatar = document.createElement('div');
    avatar.className = 'ai-employee-avatar';
    
    const avatarImg = document.createElement('img');
    avatarImg.src = employee.avatar;
    avatarImg.alt = `${employee.name} Avatar`;
    avatarImg.onerror = function() {
        // 如果图片加载失败，显示默认头像
        this.style.display = 'none';
        avatar.innerHTML = '<i class="fas fa-robot" style="font-size: 100px; color: #94A3B8;"></i>';
    };
    
    avatar.appendChild(avatarImg);
    
    // 技能标题
    const skillsTitle = document.createElement('h4');
    skillsTitle.className = 'ai-employee-skills-title';
    skillsTitle.textContent = 'What I can do';
    
    // 技能列表
    const skillsList = document.createElement('ul');
    skillsList.className = 'ai-employee-skills-list';
    
    employee.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.className = 'ai-employee-skill';
        skillItem.textContent = skill;
        
        // 添加点击效果
        skillItem.addEventListener('click', function() {
            this.style.background = employee.color;
            this.style.color = 'white';
            this.style.borderColor = employee.color;
            
            // 1秒后恢复原样
            setTimeout(() => {
                this.style.background = '#F8FAFC';
                this.style.color = '#475569';
                this.style.borderColor = '#E2E8F0';
            }, 1000);
        });
        
        skillsList.appendChild(skillItem);
    });
    
    const moreSkills = document.createElement('p');
    moreSkills.className = 'ai-employee-more-skills';
    moreSkills.textContent = 'and hundreds more skills...';
    
    // 组装卡片
    card.appendChild(nameSection);
    card.appendChild(avatar);
    card.appendChild(skillsTitle);
    card.appendChild(skillsList);
    card.appendChild(moreSkills);
    
    // 添加卡片点击事件
    card.addEventListener('click', function() {
        console.log('点击了AI员工卡片:', employee.name);
        // 这里可以添加更多交互逻辑，比如显示详情弹窗
    });
    
    return card;
}

/**
 * 初始化AI员工页面按钮
 */
function initAIEmployeeButtons() {
    // Try AI Employees 按钮
    const tryBtn = document.getElementById('try-ai-employees-btn');
    if (tryBtn) {
        tryBtn.addEventListener('click', function() {
            console.log('Try AI Employees 按钮被点击');
            // 这里可以添加跳转到试用页面的逻辑
            showNotification('AI Employees功能即将上线！', 'info');
        });
    }
}

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'info' ? '#3B82F6' : type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 导出函数供其他脚本使用
window.AIEmployeePage = {
    initAIEmployeeCards,
    createAIEmployeeCard,
    showNotification
};
