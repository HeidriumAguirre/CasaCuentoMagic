(function() {
  'use strict';

  const WHATSAPP_NUMBER = '56957968254';
  const WHATSAPP_BASE = 'https://wa.me/' + WHATSAPP_NUMBER;
  const BOOKING_URL = 'https://www.booking.com/hotel/cl/casa-cuento.es.html';
  const EXPEDIA_URL = 'https://www.expedia.com/es/Vina-Del-Mar-Hoteles-Casa-Cuento.h16264146.Informacion-Hotel';

  // Año dinámico footer
  const setYear = () => {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  // ============================================
  // SPLIT-DOOR
  // ============================================
  const initDoor = () => {
    const doorOverlay = document.getElementById('doorOverlay');
    const enterBtn = document.getElementById('enterBtn');
    if (!doorOverlay) return;
    const DOOR_KEY = 'casacuento-door-opened';
    let alreadyOpened = false;
    try { alreadyOpened = sessionStorage.getItem(DOOR_KEY) === '1'; } catch (e) {}
    if (alreadyOpened) {
      doorOverlay.style.display = 'none';
      doorOverlay.classList.add('opened');
      document.body.classList.add('door-opened');
      return;
    }
    document.body.classList.add('door-active');
    const openDoor = () => {
      if (doorOverlay.classList.contains('opened')) return;
      doorOverlay.classList.add('opened');
      document.body.classList.remove('door-active');
      document.body.classList.add('door-opened');
      try { sessionStorage.setItem(DOOR_KEY, '1'); } catch (e) {}
      setTimeout(() => { doorOverlay.style.display = 'none'; }, 2200);
    };
    enterBtn.addEventListener('click', openDoor);
    doorOverlay.addEventListener('click', (e) => {
      if (e.target === enterBtn || enterBtn.contains(e.target)) return;
      openDoor();
    });
    setTimeout(() => { if (!doorOverlay.classList.contains('opened')) openDoor(); }, 15000);
  };

  // ============================================
  // MAGIC CURSOR + SPARKS
  // ============================================
  const initCursor = () => {
    const cursor = document.getElementById('magicCursor');
    if (!cursor) return;
    // Activar modo varita: ocultar cursor del sistema solo en esta página
    document.body.classList.add('magical-cursor-active');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let lastSparkTime = 0;
    let isReady = false;

    // Forzar que el cursor sea visible
    cursor.style.display = 'block';
    cursor.style.visibility = 'visible';
    cursor.style.opacity = '1';

    // Posición inicial centrada (usando left/top para evitar conflictos con transform CSS)
    const setPosition = (x, y) => {
      cursor.style.left = (x - 18) + 'px';
      cursor.style.top = (y - 18) + 'px';
    };
    setPosition(mouseX, mouseY);

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      setPosition(mouseX, mouseY);
      isReady = true;
      const now = Date.now();
      if (now - lastSparkTime > 60) {
        createSpark(mouseX, mouseY);
        lastSparkTime = now;
      }
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

    // Re-aplicar posición al cargar la página
    requestAnimationFrame(() => {
      setPosition(mouseX, mouseY);
      cursor.classList.add('visible');
    });

    function createSpark(x, y) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const dx = (Math.random() - 0.5) * 40;
      const dy = (Math.random() - 0.5) * 40 - 10;
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      spark.style.setProperty('--dx', dx + 'px');
      spark.style.setProperty('--dy', dy + 'px');
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  };

  // ============================================
  // EASTER EGG - DUENDECILLO
  // ============================================
  const initElf = () => {
    const elf = document.getElementById('elfEaster');
    if (!elf) return;
    let elfTimer;
    const peekElf = () => {
      if (!document.body.classList.contains('door-opened')) return;
      elf.classList.add('peek');
      setTimeout(() => elf.classList.remove('peek'), 2500);
      elfTimer = setTimeout(peekElf, Math.random() * 12000 + 8000);
    };
    setTimeout(peekElf, 5000);
  };

  // ============================================
  // MUSIC TOGGLE
  // ============================================
  const initMusic = () => {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    if (!audio || !musicToggle) return;
    const VOLUME = 0.35;
    audio.volume = VOLUME;

    if (localStorage.getItem('casacuento-music') === 'on') {
      musicToggle.classList.add('playing');
    }

    musicToggle.addEventListener('click', async () => {
      if (audio.paused) {
        try {
          await audio.play();
          musicToggle.classList.add('playing');
          localStorage.setItem('casacuento-music', 'on');
        } catch (e) {
          console.warn('Audio bloqueado:', e);
        }
      } else {
        audio.pause();
        musicToggle.classList.remove('playing');
        localStorage.setItem('casacuento-music', 'off');
      }
    });
  };

  // ============================================
  // HEADER SCROLL + active link
  // ============================================
  const initHeaderScroll = () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }, { passive: true });

    // Marcar el item de menú correspondiente a la página actual
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = header.querySelectorAll('.nav-list a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  };

  // ============================================
  // MOBILE NAV
  // ============================================
  const initMobileNav = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', () => {
      const active = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', active);
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Dropdown toggle (Habitaciones y Tarifas)
    document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.parentElement;
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
        document.querySelectorAll('.nav-dropdown.open').forEach(other => {
          if (other !== parent) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.nav-dropdown-toggle');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.open').forEach(d => {
          d.classList.remove('open');
          const btn = d.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });
  };

  // ============================================
  // SCROLLSPY
  // ============================================
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  };

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  const initReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObs.observe(el));
  };

  // ============================================
  // LIGHTBOX GALERÍA
  // ============================================
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    if (!lightbox) return;
    document.querySelectorAll('.galeria-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.dataset.caption || '';
        lightboxImg.src = img.src;
        lightboxImg.alt = caption;
        lightbox.style.display = 'flex';
      });
    });
    const closeLightbox = () => { lightbox.style.display = 'none'; };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox(); });
  };

  // ============================================
  // CHATBOT (Asistente Mágico)
  // ============================================
  const responses = {
    habitaciones: {
      text: '🛏️ Nuestras habitaciones boutique combinan piedra y madera noble. Están equipadas con ropa de cama premium, calefacción y todo lo necesario para un descanso profundo.',
      waText: 'Hola%20CasaCuento%2C%20me%20interesan%20las%20habitaciones'
    },
    piscina: {
      text: '🏊 Nuestra piscina al aire libre está rodeada de áreas verdes y naturaleza. Un refugio perfecto para refrescar cuerpo y espíritu bajo el sol de la costa.',
      waText: 'Hola%20CasaCuento%2C%20me%20interesa%20la%20piscina'
    },
    entorno: {
      text: '🌲 CasaCuento está abrazada por el bosque nativo de Mantagua. Senderos, silencio, aire puro y la brisa del Pacífico a minutos de Concón.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20conocer%20m%C3%A1s%20sobre%20el%20entorno'
    },
    ubicacion: {
      text: '📍 Estamos en Mantagua, Concón, V Región de Chile. Aprox. 1 h 30 min desde Santiago por Ruta 5 Norte, a 15 min de Concón por la F-30.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20m%C3%A1s%20detalles%20sobre%20la%20ubicaci%C3%B3n'
    },
    desayuno: {
      text: '🍳 Cada mañana servimos un desayuno casero con productos frescos y locales: pan recién hecho, café de la zona, frutas y más. Una forma encantadora de empezar el día.',
      waText: 'Hola%20CasaCuento%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20desayuno'
    },
    equipo: {
      text: '💬 ¡Con mucho gusto! Te conecto directamente con nuestro equipo por WhatsApp para resolver todas tus dudas.',
      waText: 'Hola%20CasaCuento%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n'
    }
  };

  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const buildOptionsHTML = (actions) => {
    return '<div class="chat-options">' + actions.map(a =>
      `<button class="chat-option" data-action="${a.action}">${a.label}</button>`
    ).join('') + '</div>';
  };

  const addBotMessage = (body, html = '') => {
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbotBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message bot';
    msg.innerHTML = `<div class="chat-bubble">${escapeHTML(body)}</div>${html}`;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    return msg;
  };

  const addUserMessage = (text) => {
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbotBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.innerHTML = `<div class="chat-bubble">${escapeHTML(text)}</div>`;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  };

  const initChatbot = () => {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbot || !chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotBody) return;

    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
    });
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });

    // Mensaje de bienvenida + menú principal
    const welcomeActions = [
      { action: 'habitaciones', label: '🛏️  Habitaciones' },
      { action: 'piscina', label: '🏊  Piscina' },
      { action: 'entorno', label: '🌲  El entorno' },
      { action: 'ubicacion', label: '📍  Ubicación y cómo llegar' },
      { action: 'desayuno', label: '🍳  Desayuno' },
      { action: 'equipo', label: '💬  Hablar con el equipo' }
    ];
    addBotMessage('✨ ¡Saludos, viajero! Soy el Asistente Mágico de CasaCuento. ¿Qué quieres conocer?', buildOptionsHTML(welcomeActions));

    chatbotBody.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-option');
      if (!btn) return;
      const action = btn.dataset.action;
      const resp = responses[action];
      if (!resp) return;

      const label = btn.textContent.trim();
      addUserMessage(label);

      // Ocultar las opciones que estaban visibles
      const optionLists = chatbotBody.querySelectorAll('.chat-options');
      optionLists.forEach(o => o.style.display = 'none');

      setTimeout(() => {
        // Respuesta del bot
        if (action === 'equipo') {
          // Equipo: salta directo a WhatsApp, sin pantalla intermedia
          const waLink = `${WHATSAPP_BASE}?text=${resp.waText}`;
          const cta = `<div class="chat-options" style="margin-top:12px;">
            <a class="chat-option" href="${waLink}" target="_blank" rel="noopener">💬 Abrir WhatsApp</a>
          </div>`;
          addBotMessage(resp.text, cta);
        } else {
          // Otras opciones: muestra info + CTA final con Booking y WhatsApp
          const cta = `<div class="chat-options" style="margin-top:12px;">
            <a class="chat-option" href="${BOOKING_URL}" target="_blank" rel="noopener">📅 Reservar por Booking</a>
            <a class="chat-option" href="${WHATSAPP_BASE}?text=${resp.waText}" target="_blank" rel="noopener">💬 Hablar por WhatsApp</a>
            <button class="chat-option" data-action="reset">↩️  Ver el menú principal</button>
          </div>`;
          addBotMessage(resp.text, cta);
        }
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 700);
    });

    // Botón "Ver el menú principal"
    chatbotBody.addEventListener('click', (e) => {
      const reset = e.target.closest('[data-action="reset"]');
      if (!reset) return;
      const label = reset.textContent.trim();
      addUserMessage(label);
      const optionLists = chatbotBody.querySelectorAll('.chat-options');
      optionLists.forEach(o => o.style.display = 'none');
      setTimeout(() => {
        addBotMessage('✨ ¿Qué más te gustaría saber de CasaCuento?', buildOptionsHTML(welcomeActions));
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 500);
    });
  };

  // ============================================
  // INICIALIZACIÓN (espera a que carguen los partials)
  // ============================================
  // ============================================
  // MODAL DE CONTACTO
  // ============================================
  const initContactoModal = () => {
    const btn = document.getElementById('contactoBtn');
    const modal = document.getElementById('contactoModal');
    const close = document.getElementById('contactoModalClose');
    const form = document.getElementById('contactoForm');
    const note = document.getElementById('contactoModalNote');

    if (btn && modal) {
      btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (close) {
      close.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const asunto = form.asunto.value.trim();
        const correo = form.correo.value.trim();
        const mensaje = form.mensaje.value.trim();
        if (!nombre || !asunto || !correo || !mensaje) {
          if (note) { note.textContent = 'Por favor completa todos los campos.'; note.style.display = 'block'; note.style.color = '#C84B2D'; }
          return;
        }
        // Construir mailto con los datos pre-llenados
        const body = `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`;
        const mailtoUrl = `mailto:refugiocasacuento@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        if (note) { note.textContent = 'Abriendo tu cliente de correo...'; note.style.display = 'block'; note.style.color = '#2E4A3E'; }
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          form.reset();
        }, 1000);
      });
    }
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  const ready = window.__includesReady || Promise.resolve();

  ready.then(() => {
    setYear();
    initDoor();
    initCursor();
    initElf();
    initMusic();
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initLightbox();
    initChatbot();
    initContactoModal();
  });
})();