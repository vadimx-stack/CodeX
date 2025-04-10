// Ждем загрузки документа
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций
    initAOS();
    
    // Инициализация кастомного курсора
    initCustomCursor();
    
    // Анимация частиц на фоне
    initParticles();
    
    // Обработка мобильного меню
    initMobileMenu();
    
    // Обработка прокрутки хедера
    initScrollHeader();
    
    // Инициализация слайдера отзывов
    initTestimonialsSlider();
    
    // Инициализация аккордеона FAQ
    initFaqAccordion();
    
    // Обработка переключателя цен
    initPricingToggle();
    
    // Инициализация видео
    initVideoPlayer();

    // Добавляем новые функции
    addSvgIcons();
    initFeaturesFilter();
});

// Анимации при прокрутке с использованием data-aos атрибутов
function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    // Функция проверки, находится ли элемент в области видимости
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // Проверяем видимость элементов при загрузке
    aosElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('aos-animate');
        }
    });
    
    // Проверяем видимость при прокрутке
    window.addEventListener('scroll', () => {
        aosElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('aos-animate');
            }
        });
    });
}

// Кастомный курсор
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        
        // Позиционируем курсор и его следователь
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Добавляем небольшую задержку для эффекта "следования"
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 100);
    });
    
    // Эффект при наведении на ссылки и кнопки
    const links = document.querySelectorAll('a, button, .btn, .burger');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(110, 87, 255, 0.2)';
            cursorFollower.style.border = 'none';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.border = '2px solid #00f7ff';
        });
    });
    
    // Скрываем курсор при выходе за пределы окна
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
}

// Анимация частиц на фоне
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Создаем частицы
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные размеры
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Случайная позиция
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Случайная задержка анимации
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Случайная длительность анимации
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Добавляем частицу в контейнер
        particlesContainer.appendChild(particle);
    }
}

// Мобильное меню
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    if (!burger) return;
    
    // Добавляем мобильное меню в DOM, если оно еще не существует
    if (!document.querySelector('.nav-mobile')) {
        const navDesktop = document.querySelector('.nav');
        const headerButtons = document.querySelector('.header__buttons');
        
        if (navDesktop && headerButtons) {
            const navMobile = document.createElement('div');
            navMobile.classList.add('nav-mobile');
            
            const navList = navDesktop.cloneNode(true);
            const buttons = headerButtons.cloneNode(true);
            
            navMobile.appendChild(navList);
            navMobile.appendChild(buttons);
            
            document.body.appendChild(navMobile);
        }
    }
    
    const navMobile = document.querySelector('.nav-mobile');
    
    // Переключение мобильного меню
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Закрываем меню при клике на пункт меню
    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Изменение хедера при прокрутке
function initScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Слайдер отзывов
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials__slider');
    const dotsContainer = document.querySelector('.testimonials__dots');
    const prevButton = document.querySelector('.testimonials__arrow--prev');
    const nextButton = document.querySelector('.testimonials__arrow--next');
    
    if (!slider || !dotsContainer) return;
    
    const slides = slider.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    
    // Создаем точки навигации
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Переключение на определенный слайд
    function goToSlide(index) {
        currentSlide = index;
        
        // Обновляем активные точки
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // На мобильных используем прокрутку
        if (window.innerWidth < 992) {
            const slideWidth = slides[0].offsetWidth + 30; // + gap
            slider.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
        } else {
            // На десктопе показываем все слайды сразу
            // Но можем добавить дополнительные эффекты
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                
                if (i === index) {
                    slide.style.transform = 'scale(1.05)';
                } else {
                    slide.style.transform = 'scale(1)';
                }
            });
        }
    }
    
    // Кнопки навигации
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        });
    }
}

// Аккордеон для FAQ
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий вопрос
            item.classList.toggle('active');
        });
    });
}

// Переключатель планов оплаты
function initPricingToggle() {
    const pricingTabs = document.querySelectorAll('.pricing__tab');
    if (!pricingTabs.length) return;
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Удаляем активный класс у всех табов и сбрасываем стили
            pricingTabs.forEach(t => {
                t.classList.remove('active');
                t.style.background = 'rgba(26, 26, 26, 0.5)';
                t.style.borderColor = 'rgba(136, 136, 136, 0.1)';
                t.style.color = '#aaa';
            });
            
            // Добавляем активный класс текущему табу и устанавливаем активные стили
            tab.classList.add('active');
            tab.style.background = 'rgba(110, 87, 255, 0.1)';
            tab.style.borderColor = 'rgba(110, 87, 255, 0.3)';
            tab.style.color = '#fff';
            
            const period = tab.dataset.period;
            
            // Скрываем все цены и периоды
            document.querySelectorAll('.pricing-card__price .price, .pricing-card__price .period, .period-link').forEach(el => {
                el.classList.remove('active');
                if (el.style) el.style.display = 'none';
            });
            
            // Показываем цены, периоды и кнопки для выбранного периода
            document.querySelectorAll(`.pricing-card__price .price.${period}, .pricing-card__price .period.${period}, .period-link.${period}`).forEach(el => {
                el.classList.add('active');
                if (el.classList.contains('period-link')) {
                    el.style.display = 'block';
                } else {
                    el.style.display = 'inline-block';
                }
            });
        });
    });
}

// Видеоплеер
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    if (!playButton) return;
    
    playButton.addEventListener('click', () => {
        const videoWrapper = playButton.closest('.video-wrapper');
        const videoFrame = videoWrapper.querySelector('.video-frame');
        const video = videoFrame.querySelector('video');
        const videoOverlay = videoFrame.querySelector('.video-overlay');
        
        // Скрываем кнопку воспроизведения и оверлей
        playButton.style.display = 'none';
        if (videoOverlay) {
            videoOverlay.style.display = 'none';
        }
        
        // Воспроизводим видео
        video.controls = true;
        video.play();
    });
}

// Создаем SVG иконки
function createSVGIcons() {
    const iconsContainer = document.querySelector('.svg-icons');
    if (!iconsContainer) return;
    
    // Определяем набор иконок
    const icons = {
        'shield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22c-5 0-8-3-8-8V5l8-2 8 2v9c0 5-3 8-8 8zm0-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>`,
        'target': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="12" cy="12" r="2"/></svg>`,
        'eye': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`,
        'bolt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.8-.5-.5-1l6-11h1l-1 7h3.5c.49 0 .7.5.4 1l-6 11z"/></svg>`,
        'mouse': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4C9.24 4 7 6.24 7 9v6c0 2.76 2.24 5 5 5s5-2.24 5-5V9c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3s-3-1.34-3-3V9c0-1.66 1.34-3 3-3z"/><path d="M12 7c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z"/></svg>`,
        'settings': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>`,
        'update': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"/></svg>`,
        'play': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
        'star': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        'star-half': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`,
        'plus': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
        'arrow-left': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`,
        'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,
        'discord': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.876-.608 1.265a18.578 18.578 0 0 0-5.487 0 12.43 12.43 0 0 0-.617-1.265.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.028C.533 9.037-.32 13.458.099 17.827a.082.082 0 0 0 .031.056 20.03 20.03 0 0 0 5.993 3.014.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.229 13.229 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.29a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.29a.077.077 0 0 1-.006.127 12.347 12.347 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-3.014.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg>`,
        'telegram': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.08-.06-.18-.04-.26-.02-.12.02-1.92 1.22-5.41 3.59-.51.35-.97.52-1.4.51-.46-.01-1.34-.26-2-.47-.8-.26-1.45-.4-1.39-.85.03-.22.46-.45 1.3-.68 5.09-2.21 8.51-3.67 10.26-4.37.24-.1 2.43-1.02 2.73-.93.06.02.18.11.15.23z"/></svg>`,
        'youtube': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.77-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>`,
        'vk': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 12.5c0 .16-.02.31-.04.46h.04v.04c0 .126-.008.25-.023.374C19.636 16.933 16.78 20 12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8c4.78 0 7.636 3.07 7.977 6.626.015.124.023.248.023.374h-.042c.02.153.042.306.042.5zm-9.98 4.353c3.52 0 5.43-2.44 5.5-6.488h-1.72c-.05 2.974-1.533 4.236-2.65 4.498v-4.498H9.48v2.58c-1.104-.203-2.308-1.315-2.923-3.003h-1.84C5.384 15.51 7.726 16.853 10.02 16.853z"/></svg>`
    };
    
    // Добавляем иконки в контейнер
    let svgContent = '';
    for (const [name, svg] of Object.entries(icons)) {
        svgContent += `
            <symbol id="icon-${name}">
                ${svg}
            </symbol>
        `;
    }
    
    iconsContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none">${svgContent}</svg>`;
}

// Функция для добавления SVG иконок
function addSvgIcons() {
    const svgContainer = document.querySelector('.svg-icons');
    if (!svgContainer) return;

    // SVG иконки для функций
    const svgIcons = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="icon-target" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </symbol>
            <symbol id="icon-shield" viewBox="0 0 24 24">
                <path d="M12 22C8.353 22 4 19.373 4 13.6V6.033l8-3 8 3V13.6c0 5.773-4.353 8.4-8 8.4zm6-9.6V7.833l-6-2.25-6 2.25V12.4c0 4.24 2.78 6.317 6 6.6 3.22-.283 6-2.36 6-6.6z"/>
            </symbol>
            <symbol id="icon-bolt" viewBox="0 0 24 24">
                <path d="M13 10h7l-9 13v-9H4l9-13z"/>
            </symbol>
            <symbol id="icon-eye" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </symbol>
            <symbol id="icon-check" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </symbol>
            <symbol id="icon-discord" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </symbol>
            <symbol id="icon-telegram" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </symbol>
            <symbol id="icon-youtube" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </symbol>
            <symbol id="icon-vk" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 16.612h-1.744c-.655 0-.874-.525-2.072-1.744-1.045-1.001-1.501-1.132-1.763-1.132-.36 0-.458.102-.458.621v1.579c0 .432-.131.696-1.24.696-1.831 0-3.864-1.089-5.303-3.138C5.235 10.561 4.522 8.369 4.522 7.8c0-.262.099-.5.619-.5h1.744c.461 0 .624.202.802.696.896 2.631 2.379 4.935 2.994 4.935.232 0 .336-.102.336-.67V9.739c-.069-1.195-.619-1.303-.619-1.732 0-.202.166-.411.437-.411h2.745c.371 0 .5.181.5.597v3.209c0 .347.158.463.272.463.232 0 .436-.116.85-.53 1.321-1.436 2.251-3.667 2.251-3.667.125-.268.325-.5.816-.5h1.744c.532 0 .643.273.532.645-.222 1.017-2.351 3.934-2.351 3.934-.181.305-.268.461 0 .808.196.27.85.837 1.287 1.35.797.963 1.399 1.787 1.566 2.338.18.597-.334.904-.837.904z"/>
            </symbol>
        </svg>
    `;
    
    svgContainer.innerHTML = svgIcons;
}

// Функция для инициализации фильтрации функций
function initFeaturesFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const featureItems = document.querySelectorAll('.feature-item');
    
    if(!categoryBtns.length || !featureItems.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Фильтруем функции
            featureItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
} 