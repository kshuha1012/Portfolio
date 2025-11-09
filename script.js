// Simple interactive script for portfolio
(function () {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const stored = localStorage.getItem('theme');
    if (stored === 'light') body.classList.add('light');


    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light');
        localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
        themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
    });


    // Avatar interactive tilt
    const avatarWrap = document.querySelector('.avatar-wrap');

    avatarWrap.addEventListener('mousemove', (e) => {
        const rect = avatarWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        avatarWrap.style.transform = `rotateY(${deltaX * 15}deg) rotateX(${-deltaY * 15}deg) scale(1.05)`;
    });

    avatarWrap.addEventListener('mouseleave', () => {
        avatarWrap.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });


    // Mobile nav
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    menuToggle.addEventListener('click', () => { mobileNav.setAttribute('aria-hidden', 'false'); });
    mobileNavClose.addEventListener('click', () => { mobileNav.setAttribute('aria-hidden', 'true'); });
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 72; // header height
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                    mobileNav.setAttribute('aria-hidden', 'true');
                }
            }
        });
    });

    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const type = card.dataset.type;
                if (filter === '*' || type === filter) card.style.display = '';
                else card.style.display = 'none';
            });
        });
    });
    // Modal preview
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('[data-open="modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const img = btn.dataset.img;
            const title = btn.dataset.title;
            const desc = btn.dataset.desc;
            modalImg.src = img;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.setAttribute('aria-hidden', 'false');
        });
    });
    modalClose.addEventListener('click', () => { modal.setAttribute('aria-hidden', 'true'); });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

    // Contact form (simple local simulation)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        if (!name || !email || !message) {
            formStatus.textContent = 'Iltimos barcha maydonlarni to‘ldiring.';
            return;
        }
        // fake send: store to localStorage and show thanks
        const data = { name, email, message, date: new Date().toISOString() };
        const out = JSON.parse(localStorage.getItem('contacts') || '[]');
        out.push(data);
        localStorage.setItem('contacts', JSON.stringify(out));
        formStatus.textContent = 'Xabaringiz yuborildi. Rahmat!';
        contactForm.reset();
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();


    // Small reveal on scroll (observer)
    const revealEls = document.querySelectorAll('.project-card, .about-text, .skill');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.transform = 'translateY(0)', entry.target.style.opacity = 1;
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => { el.style.transform = 'translateY(14px)'; el.style.opacity = 0; io.observe(el) });


})();