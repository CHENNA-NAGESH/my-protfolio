# 🌌 Space-Themed Developer Portfolio

<p align="center">
  <img src="./public/favicon.ico" alt="Astronaut Logo" width="80" />
</p>

<h3 align="center">Chenna | Software Developer</h3>

<p align="center">
  A stunning, interactive, space-themed portfolio website showcasing personal projects, technical skills, and experience with a fully-integrated 3D space scene.
</p>

<p align="center">
  <a href="https://github.com/CHENNA-NAGESH/my-protfolio/stargazers"><img src="https://img.shields.io/github/stars/CHENNA-NAGESH/my-protfolio?style=for-the-badge&color=8A2BE2" alt="Stars"></a>
  <a href="https://github.com/CHENNA-NAGESH/my-protfolio/network/members"><img src="https://img.shields.io/github/forks/CHENNA-NAGESH/my-protfolio?style=for-the-badge&color=7B68EE" alt="Forks"></a>
  <a href="https://github.com/CHENNA-NAGESH/my-protfolio/blob/main/LICENSE"><img src="https://img.shields.io/github/license/CHENNA-NAGESH/my-protfolio?style=for-the-badge&color=4169E1" alt="License"></a>
</p>

---

## 🚀 Key Features

*   **🌌 Immersive 3D Space Background**: Built with **Three.js**, featuring floating animated stars (octahedrons) and a dynamic 3D Astronaut model that responds and rotates as the user scrolls.
*   **✨ Advanced Micro-Animations**: Page sections, cards, and titles animate gracefully using **Framer Motion** and custom CSS parallax effects that follow the user's cursor.
*   **📱 Responsive & Fluid Design**: Structured with Tailwind CSS to ensure a flawless experience across mobile, tablet, and desktop screens.
*   **🛠️ Showcase of Projects**: Highlighted projects featuring interactive tiles displaying technical tags, direct github repositories, and live links.
*   **📬 Contact Integration**: Fully functional contact form linked directly via `mailto` setup to quickly engage clients/recruiters.

---

## 🛠️ Tech Stack & Badges

The portfolio leverages modern libraries and tools:

| Category | Technologies |
| :--- | :--- |
| **Framework & Library** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white) |
| **3D Graphics** | ![Three.js](https://img.shields.io/badge/three.js-black?style=flat-square&logo=three.js&logoColor=white) |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white) |
| **Animations** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white) |
| **Email API** | ![Sendgrid](https://img.shields.io/badge/Sendgrid-00BFFF?style=flat-square&logo=sendgrid&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=flat-square&logo=node.js&logoColor=white) |

---

## 📁 Project Structure

```bash
my-portfolio/
├── components/          # Reusable Next.js React components
│   ├── layout/          # Layout wrappers (Navbar, Footer, 3D Canvas wrapper)
│   │   ├── Nav.js       # Dynamic floating navigation
│   │   ├── ThreeD.js    # Three.js setup, scene loading, and scroll animations
│   │   └── Footer.js    # Clean SVG-wave footer design
│   ├── main/            # Content sections
│   │   ├── Home.js      # Landing section
│   │   ├── About.js     # Biography section with mouse-parallax effects
│   │   ├── Skills.js    # Technical skills grid with interactive components
│   │   ├── Projects.js  # Project mapping and layout
│   │   └── Contact.js   # Mailto integrated feedback and inquiries form
│   └── Main.js          # Entry aggregator for section page components
├── pages/               # Next.js pages directory
│   ├── _app.js          # App configuration
│   └── index.js         # Home page with Head metadata and keywords
├── public/              # Static assets (3D models, textures, me.png, favicon)
├── styles/              # Global custom CSS rules
├── tailwind.config.js   # Tailwind grid and color definitions
└── package.json         # Scripts and library version records
```

---

## 🏁 Getting Started

To run this project locally, follow these simple steps:

### 1. Prerequisites
Ensure you have **Node.js** (v14+ recommended) and **npm** or **yarn** installed.

### 2. Clone the Repository
```bash
git clone https://github.com/CHENNA-NAGESH/my-protfolio.git
cd my-protfolio
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## ⚡ Customization Guide

You can easily adapt this portfolio to highlight your own skills and projects:

### 📝 Updating Projects
Navigate to `components/main/Projects.js` and edit the `projects` array:
```javascript
const projects = [
  {
    link: "https://your-live-link.com",
    color: "#COLOR_CODE",
    title: "Project Name",
    description: "Detailed description of your awesome application...",
    techs: ["React", "Node.js", "Express"],
    gitLink: "https://github.com/your-username/repo-name",
    bgPath: "/image-in-public-folder.png",
  },
  // Add more projects...
];
```

### ⚙️ Modifying Skills
Navigate to `components/main/Skills.js` and modify the `skills` array to include your custom icons and colors:
```javascript
const skills = [
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  // Add or remove icons...
];
```

### 🪐 Editing 3D Settings
To change the 3D model (default: Astronaut), replace the GLTF model in `/public/astronaut/` and configure the model loader settings in `components/layout/ThreeD.js`.

### 📧 Changing Contact Target Email
Open `components/main/Contact.js` and change the recipient email in `handleSubmit`:
```javascript
window.location.href = `mailto:nageshch9966@gmail.com?subject=${subject}&body=${message}`;
```
Replace `nageshch9966@gmail.com` with your preferred email address.

---

<p align="center">
  Made with 💜 and 🌌 by Chenna Nagesh
</p>
