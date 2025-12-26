// Modal functions
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        type: document.getElementById('type').value,
        description: document.getElementById('description').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    const currentLang = localStorage.getItem('language') || 'en';
    const message = currentLang === 'ru' 
        ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
        : 'Application submitted! We will contact you soon.';
    alert(message);
    
    // Reset form and close modal
    document.getElementById('applicationForm').reset();
    closeModal();
}

// Smooth scroll animation on load
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Open chat function
function openChat(modelName) {
    // Here you would typically redirect to chat or open chat interface
    console.log('Opening chat for:', modelName);
    const currentLang = localStorage.getItem('language') || 'en';
    const message = currentLang === 'ru' 
        ? `Открытие чата с моделью: ${modelName}`
        : `Opening chat with model: ${modelName}`;
    alert(message);
    // You can replace this with actual chat functionality
}

// Open login function
function openLogin() {
    // Here you would typically redirect to login page or open login modal
    console.log('Opening login');
    const currentLang = localStorage.getItem('language') || 'en';
    const message = currentLang === 'ru' 
        ? 'Переход на страницу входа'
        : 'Redirecting to login page';
    alert(message);
    // You can replace this with actual login functionality
}

// Toggle more models visibility
function toggleMoreModels() {
    const hiddenRows = document.querySelectorAll('.model-row-hidden');
    const moreButton = document.querySelector('.more-button');
    let allVisible = true;
    
    hiddenRows.forEach(row => {
        if (!row.classList.contains('show')) {
            allVisible = false;
        }
    });
    
    if (allVisible) {
        // Hide all
        hiddenRows.forEach(row => {
            row.classList.remove('show');
        });
        moreButton.classList.remove('expanded');
    } else {
        // Show all
        hiddenRows.forEach(row => {
            row.classList.add('show');
        });
        moreButton.classList.add('expanded');
    }
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        if (heroParticleSwarm) {
            heroParticleSwarm.updateTheme(true);
        }
        if (moreParticleSwarm) {
            moreParticleSwarm.updateTheme(true);
        }
        if (footerParticleSwarm) {
            footerParticleSwarm.updateTheme(true);
        }
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        if (heroParticleSwarm) {
            heroParticleSwarm.updateTheme(false);
        }
        if (moreParticleSwarm) {
            moreParticleSwarm.updateTheme(false);
        }
        if (footerParticleSwarm) {
            footerParticleSwarm.updateTheme(false);
        }
    }
}

// Particles animation for swarm structure
class ParticleSwarm {
    constructor(canvas, particleCount = 50) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = particleCount;
        this.maxDistance = 150;
        this.isLightTheme = false;
        
        this.resize();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    updateTheme(isLight) {
        this.isLightTheme = isLight;
    }
    
    update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const color = this.isLightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
        const lineColor = this.isLightTheme ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
        const particleColor = this.isLightTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)';
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.3;
                    this.ctx.strokeStyle = this.isLightTheme 
                        ? `rgba(0, 0, 0, ${opacity})` 
                        : `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        for (let particle of this.particles) {
            this.ctx.fillStyle = particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

let heroParticleSwarm = null;
let moreParticleSwarm = null;
let footerParticleSwarm = null;

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    // Initialize particles for Hero section
    const heroCanvas = document.getElementById('heroParticlesCanvas');
    if (heroCanvas) {
        heroParticleSwarm = new ParticleSwarm(heroCanvas, 80);
    }
    
    // Initialize particles for More Possibilities section (fewer particles)
    const moreCanvas = document.getElementById('moreParticlesCanvas');
    if (moreCanvas) {
        moreParticleSwarm = new ParticleSwarm(moreCanvas, 40);
    }
    
    // Initialize particles for Footer section
    const footerCanvas = document.getElementById('footerParticlesCanvas');
    if (footerCanvas) {
        footerParticleSwarm = new ParticleSwarm(footerCanvas, 50);
    }
    
    const isLight = savedTheme === 'light';
    
    if (isLight) {
        document.body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }
    
    if (heroParticleSwarm) {
        heroParticleSwarm.updateTheme(isLight);
    }
    if (moreParticleSwarm) {
        moreParticleSwarm.updateTheme(isLight);
    }
    if (footerParticleSwarm) {
        footerParticleSwarm.updateTheme(isLight);
    }
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language') || 'en';
    const languageToggle = document.getElementById('languageToggle');
    
    if (savedLanguage === 'ru') {
        if (languageToggle) {
            languageToggle.checked = true;
        }
        setLanguage('ru');
    } else {
        setLanguage('en');
    }
});

// Language translations
const translations = {
    en: {
        heroTitle: 'Decentralized AI-Platform',
        heroSubtitle: 'Distributed Inference, GPU-powered, Agents Store',
        getAccess: 'Get Access',
        login: 'login',
        aboutSwarMind: 'About Swarmind',
        aboutSwarMindDesc1: 'We are building a decentralized AI platform that simplifies deploying and scaling inference models and GPU infrastructure for businesses and developers.',
        aboutSwarMindDesc2: 'Our mission is to make powerful AI technologies accessible, transparent, and cost-efficient for building and monetizing AI solutions.',
        quickStart: 'Quick Start',
        quickStartDesc: 'OpenAI-compatible API. Dozens of popular models for all types of tasks, responsive technical support.',
        infrastructureSavings: 'Infrastructure Savings',
        infrastructureSavingsDesc: 'Rent Bare-metal GPU at a favorable price and pay only for actual usage.',
        morePossibilities: 'More possibilities',
        aiCreators: 'AI Creators',
        aiCreatorsDesc1: 'Publish your AI agents on our platform and make them available to a wide audience of users without managing infrastructure or payments.',
        aiCreatorsDesc2: 'You keep up to <strong>90% of the revenue</strong>, while we handle hosting, scaling, and distribution.',
        gpuProviders: 'GPU Providers',
        gpuProvidersDesc1: 'Connect your GPUs to our platform and monetize idle computing resources without having to find clients yourself.',
        gpuProvidersDesc2: 'Machines can be launched quickly, and our decentralized architecture allows operation without strict time constraints. We take only a <strong>10% commission</strong>.',
        popularModels: 'Popular Models',
        input: 'Input:',
        output: 'Output:',
        tokens: '/1K tokens',
        chat: 'chat',
        swarmind: 'Swarmind',
        footerDescription: 'Decentralized AI-Platform. Distributed Inference, GPU-powered, Agents Store.',
        dataPolicy: 'Data Policy',
        userAgreement: 'User Agreement',
        lightMode: 'Light Mode',
        languageLabel: 'EN',
        formName: 'Your Name',
        formContact: 'Email | Telegram',
        formType: 'Request Type',
        formTypeSelect: 'Request Type',
        formTypeRentGpu: 'Rent GPU',
        formTypeRentOutGpu: 'Rent Out GPU',
        formTypeAgentPlacement: 'Agent Placement',
        formTypeLlmBusiness: 'LLM for business',
        formTypeLlmPersonal: 'LLM for personal use'
    },
    ru: {
        heroTitle: 'Децентрализованная AI-Платформа',
        heroSubtitle: 'Распределенный Инференс, GPU-мощности, Магазин Агентов',
        getAccess: 'получить доступ',
        login: 'войти',
        aboutSwarMind: 'О Swarmind',
        aboutSwarMindDesc1: 'Мы создаем децентрализованную AI-платформу, которая упрощает развертывание и масштабирование моделей инференса и GPU-инфраструктуры для бизнеса и разработчиков.',
        aboutSwarMindDesc2: 'Наша миссия — сделать мощные AI-технологии доступными, прозрачными и экономически эффективными для создания и монетизации AI-решений.',
        quickStart: 'Быстрый старт',
        quickStartDesc: 'OpenAI-совместимый API. Десятки популярных моделей для всех типов задач, оперативная тех-поддержка.',
        infrastructureSavings: 'Экономия на инфраструктуре',
        infrastructureSavingsDesc: 'Арендуйте Bare-metal GPU по выгодной цене и платите только за фактическое использование.',
        morePossibilities: 'Больше возможностей',
        aiCreators: 'AI-Создатели',
        aiCreatorsDesc1: 'Публикуйте своих AI-агентов на нашей платформе и делайте их доступными широкой аудитории пользователей без управления инфраструктурой или платежами.',
        aiCreatorsDesc2: 'Вы получаете до <strong>90% дохода</strong>, а мы занимаемся хостингом, масштабированием и распространением.',
        gpuProviders: 'GPU-Провайдеры',
        gpuProvidersDesc1: 'Подключайте свои GPU к нашей платформе и монетизируйте простаивающие вычислительные ресурсы без необходимости самостоятельно искать клиентов.',
        gpuProvidersDesc2: 'Машины можно запускать быстро, а наша децентрализованная архитектура позволяет работать без строгих временных ограничений. Мы берем только <strong>10% комиссии</strong>.',
        popularModels: 'Популярные модели',
        input: 'Вход:',
        output: 'Выход:',
        tokens: '/1K токенов',
        chat: 'чат',
        swarmind: 'Swarmind',
        footerDescription: 'Децентрализованная AI-Платформа. Распределенный Инференс, GPU-мощности, Магазин Агентов.',
        dataPolicy: 'Политика данных',
        userAgreement: 'Пользовательское соглашение',
        lightMode: 'Светлая тема',
        languageLabel: 'RU',
        formName: 'Ваше имя',
        formContact: 'Email | Telegram',
        formType: 'Тип запроса',
        formTypeSelect: 'Тип запроса',
        formTypeRentGpu: 'Аренда GPU',
        formTypeRentOutGpu: 'Сдача GPU в аренду',
        formTypeAgentPlacement: 'Размещение агента',
        formTypeLlmBusiness: 'LLM для бизнеса',
        formTypeLlmPersonal: 'LLM для личного использования'
    }
};

// Set language function
function setLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else if (key === 'languageLabel') {
                // Special handling for language label - show current language
                element.textContent = lang.toUpperCase();
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update select options
    const selectType = document.getElementById('type');
    if (selectType) {
        const options = selectType.querySelectorAll('option[data-i18n]');
        options.forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    localStorage.setItem('language', lang);
}

// Toggle language function
function toggleLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    const currentLang = languageToggle.checked ? 'ru' : 'en';
    setLanguage(currentLang);
}


