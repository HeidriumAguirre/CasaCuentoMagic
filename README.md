# ✨ CasaCuento Hotel & Spa — Versión Mágica

Sitio web temático, mágico e inmersivo de CasaCuento Hotel & Spa, inspirado en la estética encantada de sitios como casabosque.cl. Ubicado en Mantagua, Concón, V Región, Chile.

🌐 **Sitio en vivo:** [https://casacuentomagic.vercel.app](https://casacuentomagic.vercel.app)
📦 **Repositorio:** [github.com/HeidriumAguirre/CasaCuentoMagic](https://github.com/HeidriumAguirre/CasaCuentoMagic)

## 🎭 Concepto

Landing page temática de "cuento de hadas" que transporta al visitante a un mundo encantado. La experiencia incluye:

- **Split-Door Animada:** Al cargar, una puerta de piedra/madera se abre revelando el sitio
- **Cursor de Varita Mágica con Llamas:** Cada movimiento deja una estela de chispas 🔥
- **Easter Egg del Duendecillo:** Aparece sutilmente asomándose desde el borde 🧚
- **Sección Pergamino Mágico:** La historia encantada de CasaCuento
- **Chatbot "Asistente Mágico":** Responde preguntas frecuentes y redirige a Booking.com o WhatsApp Business
- **Música de Fondo:** "Soldier, Poet, King" instrumental con botón toggle
- **Footer completo** de 4 columnas con navegación, contacto, redes sociales y canales de reserva

## 🛠️ Stack técnico

- HTML5 semántico
- JavaScript vanilla (sin frameworks, sin build step)
- CSS3 con Custom Properties, keyframes avanzados, transformaciones 3D
- HTML parciales cargados vía `fetch()` (header, footer, chatbot)
- Google Fonts: Cinzel, Great Vibes, Sacramento, Cormorant Garamond
- HTML5 Audio API para música de fondo
- 100% responsive mobile-first
- WCAG AA accesibilidad con `prefers-reduced-motion`

## 📁 Estructura

```
CasaCuentoMagic/
├── index.html                              # Estructura principal con placeholders
├── css/
│   └── styles.css                          # Todos los estilos
├── js/
│   ├── includes.js                         # Carga los partials HTML
│   └── app.js                              # Lógica (puerta, cursor, chatbot, etc.)
├── partials/
│   ├── header.html                         # Menú de navegación
│   ├── footer.html                         # Footer de 4 columnas
│   └── chatbot.html                        # Asistente Mágico
├── Musica/
│   └── soldier-poet-king.mp3               # Audio instrumental (1.73 MB)
├── Fotos CasaCuento/
│   ├── Logo.jpg
│   ├── entrada-cuento.jpg                  # Hero / Split-Door
│   ├── pergamino.jpg                       # Sección historia
│   ├── hero-vista-panoramica.jpg
│   ├── hero-piscina.jpg
│   ├── hero2-piscina.jpg
│   ├── hero3-piscina.jpg
│   ├── galeria-habitacion.jpg
│   ├── galeria-interior-chimenea.jpg
│   └── galeria-techo.jpg
├── README.md
└── .gitignore
```

## 🚀 Despliegue

El sitio está desplegado automáticamente en Vercel:

- 🔗 URL producción: [https://casacuentomagic.vercel.app](https://casacuentomagic.vercel.app)
- Deploy automático desde la rama `main`
- Sin build step, sin configuración adicional
- HTTPS incluido

## 🎨 Identidad

- **Slogan:** "Paz, Amor y Fuego"
- **Paleta:** Verde bosque (#2D3D2E), pergamino (#E8D5A8), oro (#C9A14A), fuego (#C84B2D)
- **Tipografía display:** Cinzel (logo)
- **Tipografía caligráfica:** Great Vibes (títulos)
- **Tipografía cuerpo:** Cormorant Garamond (texto)

## 📞 Contacto del hotel

- **WhatsApp:** +56 9 5796 8254
- **Ubicación:** Mantagua, Concón, V Región, Chile

© CasaCuento Hotel & Spa · Versión Mágica · 2026