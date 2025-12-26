// ============================================
// МОДАЛЬНОЕ ОКНО
// ============================================

// Открытие модального окна с формой заявки
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Hide all request fields when opening modal
    const allFields = document.querySelectorAll('.request-fields');
    allFields.forEach(field => {
        field.style.display = 'none';
    });
    // Close dropdown if open
    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
        customSelect.classList.remove('active');
    }
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

// ============================================
// КАСТОМНЫЙ DROPDOWN (выпадающее меню)
// ============================================

// Переключение видимости выпадающего меню
function toggleCustomSelect() {
    const customSelect = document.querySelector('.custom-select');
    customSelect.classList.toggle('active');
}

function selectOption(element, value) {
    const hiddenInput = document.getElementById('type');
    const selectedDisplay = document.getElementById('select-selected');
    const allOptions = document.querySelectorAll('.select-option');
    
    // Update hidden input
    hiddenInput.value = value;
    
    // Update display text
    const textSpan = document.getElementById('select-selected-text');
    if (textSpan) {
        textSpan.textContent = element.textContent;
        textSpan.removeAttribute('data-i18n'); // Remove i18n attribute when value is selected
    }
    
    // Add has-value class to show selected state
    if (selectedDisplay) {
        selectedDisplay.classList.add('has-value');
    }
    
    // Update selected state
    allOptions.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    
    // Close dropdown
    const customSelect = document.querySelector('.custom-select');
    customSelect.classList.remove('active');
    
    // Trigger field toggle
    toggleRequestFields();
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const customSelect = document.querySelector('.custom-select');
    if (customSelect && !customSelect.contains(event.target)) {
        customSelect.classList.remove('active');
    }
});

// Показ/скрытие полей формы в зависимости от выбранного типа запроса
function toggleRequestFields() {
    const typeInput = document.getElementById('type');
    const selectedType = typeInput.value;
    
    // Hide all field groups
    const allFields = document.querySelectorAll('.request-fields');
    allFields.forEach(field => {
        field.style.display = 'none';
    });
    
    // Show fields for selected type
    if (selectedType === 'rent-gpu') {
        document.getElementById('rent-gpu-fields').style.display = 'block';
    } else if (selectedType === 'rent-out-gpu') {
        document.getElementById('rent-out-gpu-fields').style.display = 'block';
    } else if (selectedType === 'llm-business') {
        document.getElementById('llm-business-fields').style.display = 'block';
    } else if (selectedType === 'agent-placement') {
        document.getElementById('agent-placement-fields').style.display = 'block';
    } else if (selectedType === 'llm-personal') {
        document.getElementById('llm-personal-fields').style.display = 'block';
    }
}

// Обработка отправки формы заявки
function handleSubmit(event) {
    event.preventDefault();
    
    const typeInput = document.getElementById('type');
    if (!typeInput.value) {
        alert(currentLang === 'ru' ? 'Пожалуйста, выберите тип запроса' : 'Please select a request type');
        return;
    }
    
    const formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        type: typeInput.value
    };
    
    // Add fields based on type
    const selectedType = formData.type;
    if (selectedType === 'rent-gpu') {
        formData.targetGpuModel = document.getElementById('target-gpu-model').value;
        formData.gpuCount = document.getElementById('gpu-count').value;
        formData.minVram = document.getElementById('min-vram').value;
        formData.expectedUptime = document.getElementById('expected-uptime').value;
    } else if (selectedType === 'rent-out-gpu') {
        formData.gpuModel = document.getElementById('gpu-model-out').value;
        formData.gpuCount = document.getElementById('gpu-count-out').value;
        formData.totalVram = document.getElementById('total-vram').value;
        formData.availableUptime = document.getElementById('available-uptime').value;
    } else if (selectedType === 'llm-business') {
        formData.modelType = document.getElementById('model-type-business').value;
        formData.modelName = document.getElementById('model-name-business').value;
        formData.modelUrl = document.getElementById('model-url').value;
        formData.avgInputTokens = document.getElementById('avg-input-tokens').value;
        formData.avgOutputTokens = document.getElementById('avg-output-tokens').value;
    } else if (selectedType === 'agent-placement') {
        formData.agentDescription = document.getElementById('agent-description').value;
    } else if (selectedType === 'llm-personal') {
        formData.modelType = document.getElementById('model-type-personal').value;
        formData.modelName = document.getElementById('model-name-personal').value;
    }
    
    // TODO: Отправить данные на сервер
    console.log('Form submitted:', formData);
    
    // Показ сообщения об успешной отправке
    const currentLang = localStorage.getItem('language') || 'en';
    const message = currentLang === 'ru' 
        ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
        : 'Application submitted! We will contact you soon.';
    alert(message);
    
    // Reset form and close modal
    document.getElementById('applicationForm').reset();
    
    // Reset custom select
    const hiddenInput = document.getElementById('type');
    const selectedDisplay = document.getElementById('select-selected');
    const textSpan = document.getElementById('select-selected-text');
    if (hiddenInput) hiddenInput.value = '';
    if (selectedDisplay) selectedDisplay.classList.remove('has-value');
    if (textSpan) {
        const currentLang = localStorage.getItem('language') || 'en';
        const key = 'formTypeSelect';
        if (translations[currentLang] && translations[currentLang][key]) {
            textSpan.textContent = translations[currentLang][key];
            textSpan.setAttribute('data-i18n', key);
        }
    }
    
    toggleRequestFields(); // Reset fields visibility
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

// Открытие чата с выбранной моделью (заглушка - нужно реализовать)
function openChat(modelName) {
    console.log('Opening chat for:', modelName);
    const currentLang = localStorage.getItem('language') || 'en';
    const message = currentLang === 'ru' 
        ? `Открытие чата с моделью: ${modelName}`
        : `Opening chat with model: ${modelName}`;
    alert(message);
    // You can replace this with actual chat functionality
}

// Открытие страницы входа (заглушка - нужно реализовать)
function openLogin() {
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

// ============================================
// АНИМАЦИЯ ЧАСТИЦ (фоновая анимация)
// ============================================

// Класс для создания анимации частиц на canvas
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

// ============================================
// ЛОКАЛИЗАЦИЯ (переводы)
// ============================================

// Словарь переводов для английского и русского языков
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
        formTypeLlmPersonal: 'LLM for personal use',
        formTargetGpuModel: 'Target GPU Model',
        formGpuCount: 'How Many GPUs Do You Need?',
        formMinVram: 'Minimum VRAM (GB)',
        formExpectedUptime: 'Expected Uptime',
        formGpuModel: 'GPU Model',
        formGpuCountOut: 'How Many GPU',
        formTotalVram: 'Total VRAM',
        formAvailableUptime: 'Available Uptime',
        formModelType: 'Model Type',
        formModelName: 'Model Name',
        formModelUrl: 'Model URL',
        formAvgInputTokens: 'Avg Input Token Quantity (daily)',
        formAvgOutputTokens: 'Avg Output Token Quantity (daily)',
        formAgentDescription: 'Please describe the agent you want to place'
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
        formTypeLlmPersonal: 'LLM для личного использования',
        formTargetGpuModel: 'Модель GPU',
        formGpuCount: 'Сколько GPU вам нужно?',
        formMinVram: 'Минимальный VRAM (GB)',
        formExpectedUptime: 'Ожидаемое время работы',
        formGpuModel: 'Модель GPU',
        formGpuCountOut: 'Количество GPU',
        formTotalVram: 'Общий VRAM',
        formAvailableUptime: 'Доступное время работы',
        formModelType: 'Тип модели',
        formModelName: 'Название модели',
        formModelUrl: 'URL модели',
        formAvgInputTokens: 'Среднее количество входных токенов (в день)',
        formAvgOutputTokens: 'Среднее количество выходных токенов (в день)',
        formAgentDescription: 'Опишите агента, которого вы хотите разместить'
    }
};

// Установка языка интерфейса
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
    
    // Update custom select options
    const selectOptions = document.querySelectorAll('.select-option[data-i18n]');
    selectOptions.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
    
    // Update select-selected placeholder
    const textSpan = document.getElementById('select-selected-text');
    const hiddenInput = document.getElementById('type');
    if (textSpan && (!hiddenInput || !hiddenInput.value)) {
        const key = textSpan.getAttribute('data-i18n') || 'formTypeSelect';
        if (translations[lang] && translations[lang][key]) {
            textSpan.textContent = translations[lang][key];
        }
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


