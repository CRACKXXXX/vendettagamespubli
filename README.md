# Vendetta Games II - Clandestine Event / Evento Clandestino

![Vendetta Games](assets/images/bg/background.png)

*(English below / Español abajo)*

---

## 🇬🇧 English

Interactive announcement page and billboard for the **Vendetta Games II** event, specifically designed to be displayed within the **FiveM** embedded browser (CEF).

### 🎨 Aesthetics and Design
The project features a dark, gloomy, and highly elegant atmosphere. It stands out with its use of deep blacks, dark grays, and accents in blood red and gold.

**Visual Features:**
- **Forced Resolution:** The design is anchored to `1920x1080px` without media queries (`overflow: hidden`), ensuring it looks exactly like a full-screen movie poster in-game.
- **Premium Typography:** Use of the *Cinzel* font family to add a classic, mysterious, and solemn touch.
- **Effects and Animations:**
  - **Embers:** Dynamically generated with JavaScript and animated with pure CSS to maintain performance.
  - **Diagonal Shimmer:** A subtle light sweep over the main title.
  - **Scanline Overlay:** An old screen effect that subtly travels down the page.
  - **Dynamic Countdown:** A countdown to May 16, 2026, with a "flip" visual effect when numbers change.
  - **Hover Interactions:** Golden glows on prices and color reveals for sponsors.

### 🛠️ Technologies Used
This project is built **100% in Vanilla** to ensure maximum lightness and performance within the restricted FiveM CEF environment.
- **HTML5** (Clean semantic structure)
- **CSS3** (Keyframe animations, Flexbox, Grid, no external libraries)
- **JavaScript (ES5/ES6)** (Countdown logic and particle generation, no frameworks)

### 📂 File Structure
```text
vendettagamespubli/
├── index.html                   # Main document
├── README.md                    # This file
└── assets/
    ├── css/
    │   └── styles.css           # Main styles and animations
    ├── js/
    │   └── main.js              # Countdown and particle logic
    └── images/
        ├── bg/                  # Background images
        └── sponsors/            # Sponsor logos
```

### 🚀 Deployment
To view the project locally, simply open `index.html` in any modern web browser, or serve it via a local HTTP server.
For FiveM, simply integrate this folder into your UI (NUI) resource and call `index.html`.

---

## 🇪🇸 Español

Página de anuncio y cartelera interactiva para el evento **Vendetta Games II**, diseñada específicamente para ser visualizada dentro del navegador integrado (CEF) de **FiveM**.

### 🎨 Estética y Diseño
El proyecto presenta una atmósfera oscura, tétrica y muy elegante. Destaca por el uso de colores negros profundos, grises oscuros y acentos en rojo sangre y dorado.

**Características Visuales:**
- **Resolución Forzada:** El diseño está anclado a `1920x1080px` sin media queries (`overflow: hidden`), garantizando que se vea exactamente como un cartel de cine a pantalla completa en el juego.
- **Tipografía Premium:** Uso de la familia tipográfica *Cinzel* para aportar un toque clásico, misterioso y solemne.
- **Efectos y Animaciones:**
  - **Partículas de brasa (Embers):** Generadas dinámicamente con JavaScript y animadas con CSS puro para no afectar el rendimiento.
  - **Shimmer Diagonal:** Un sutil barrido de luz sobre el título principal.
  - **Scanline Overlay:** Un efecto de pantalla antigua que recorre sutilmente la página de arriba a abajo.
  - **Contador Dinámico:** Cuenta regresiva hacia el 16 de mayo de 2026 con un efecto visual de "flip" al cambiar los números.
  - **Interacciones Hover:** Destellos dorados en precios y revelación a color de los patrocinadores.

### 🛠️ Tecnologías Utilizadas
Este proyecto está construido **100% en Vanilla** para asegurar la máxima ligereza y rendimiento dentro del entorno restringido del CEF de FiveM.
- **HTML5** (Estructura semántica limpia)
- **CSS3** (Animaciones por Keyframes, Flexbox, Grid, sin librerías externas)
- **JavaScript (ES5/ES6)** (Lógica del temporizador y generación de partículas, sin frameworks)

### 📂 Estructura de Archivos
```text
vendettagamespubli/
├── index.html                   # Documento principal
├── README.md                    # Este archivo
└── assets/
    ├── css/
    │   └── styles.css           # Estilos principales y animaciones
    ├── js/
    │   └── main.js              # Lógica de cuenta regresiva y partículas
    └── images/
        ├── bg/                  # Imágenes de fondo
        └── sponsors/            # Logos de patrocinadores
```

### 🚀 Despliegue
Para visualizar el proyecto localmente, simplemente abre `index.html` en cualquier navegador web moderno, o sírvelo a través de un servidor HTTP local.
Para FiveM, simplemente integra esta carpeta dentro de tu recurso UI (NUI) y llama al `index.html`.

---
*Built for the Roleplay community. / Diseñado para la comunidad de Roleplay.*
