# Aman Mehrotra - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS 4, featuring an interactive AI chatbot assistant.

## 🚀 Features

### Core Portfolio Sections
- **Hero Section** - Dynamic introduction with animated elements
- **About Me** - Professional summary and personal background
- **Experience** - Detailed work history with company information
- **Skills** - Technical skills, tools, and domain expertise
- **Education** - Academic background and certifications
- **Contact** - Professional contact information and social links

### Interactive Elements
- **AI Chatbot Assistant** - Intelligent chat interface for portfolio inquiries
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Glassmorphism effects and gradient designs

### Technical Features
- **TypeScript** - Full type safety and better development experience
- **Next.js 15** - Latest React framework with App Router
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Heroicons** - Beautiful SVG icons from Heroicons

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Language**: TypeScript
- **Package Manager**: npm

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main portfolio page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Hero.tsx            # Hero section component
│   │   ├── About.tsx           # About section component
│   │   ├── Experience.tsx      # Work experience component
│   │   ├── Skills.tsx          # Skills display component
│   │   ├── Education.tsx       # Education component
│   │   ├── Contact.tsx         # Contact information component
│   │   ├── Layout.tsx          # Navigation and footer
│   │   └── Chatbot.tsx         # AI assistant chatbot
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interfaces
│   └── data/
│       └── portfolio.json      # Portfolio data
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Updating Portfolio Data
Edit `src/data/portfolio.json` to update your information:

```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your Tagline",
    "summary": "Your professional summary",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "Your Phone",
    "linkedin": "Your LinkedIn URL"
  }
}
```

### Styling
- Modify `src/app/globals.css` for global styles
- Update component-specific styles in each component file
- Customize Tailwind CSS configuration in `tailwind.config.js`

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to the main page in `src/app/page.tsx`
3. Update navigation in `src/components/Layout.tsx`

## 🤖 AI Chatbot

The portfolio includes an intelligent chatbot that can answer questions about:
- Professional experience and work history
- Technical skills and expertise
- Educational background
- Certifications and achievements
- Personal interests and background
- Contact information

The chatbot uses pattern matching to provide relevant responses based on user queries.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Performance Features

- **Image Optimization** - Next.js built-in image optimization
- **Code Splitting** - Automatic code splitting for better performance
- **Lazy Loading** - Components load as needed
- **Optimized Animations** - Hardware-accelerated animations

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: amansammehrotra@gmail.com
- **LinkedIn**: [Aman Mehrotra](https://www.linkedin.com/in/aman-mehrotra-dataislife)
- **Location**: Bangalore, Karnataka, India

---

Built with ❤️ using Next.js, React, and Tailwind CSS
