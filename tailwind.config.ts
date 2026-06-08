import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        hero: {
          bg: "#0a0a0a",
          orange: "#FF6B00",
          orangeHover: "#e05e00",
          muted: "#888888",
          cardGray: "#2a2a2a",
          cardDark: "#1f1f1f",
          pillDark: "#1a1a1a",
          pillBorder: "#333333",
        },
        figma: {
          background: "#000000",
          skeleton: "rgba(255, 255, 255, 0.1)",
        },
        muziika: {
          black: "#000000",
          orange: "#D96319",
          "orange-light": "#FF8B06",
          "orange-accent": "#FF9D00",
          gray: "#707070",
          "gray-light": "#D9D9D9",
          dashboard: "#0a0a0a",
          "dashboard-muted": "#A8A8A8",
          "dashboard-subtle": "#888888",
          "dashboard-card": "rgba(217, 99, 25, 0.04)",
          "dashboard-card-solid": "rgba(26, 18, 8, 0.28)",
          purple: "#7209B7",
          "purple-light": "#B5179E",
          auth: "#4045EF",
          "auth-dark": "#16173A",
          "auth-bg": "#F6F6FF",
        },
        auth: {
          panel: "#140c08",
          blob: {
            1: "#2a1408",
            2: "#4a240f",
            3: "#D96319",
          },
          headline: {
            1: "#ffffff",
            2: "#FF8B06",
            3: "#D96319",
          },
          surface: "#ffffff",
          title: "#0e0b16",
          muted: "#888780",
          label: "#444441",
          border: "#D3D1C7",
          focus: "#D96319",
          primary: "#D96319",
          error: "#E24B4A",
          success: "#2E9E5B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "50px",
        "dashboard-card": "20px",
        "dashboard-search": "36px",
        "auth-card": "20px",
      },
      fontFamily: {
        space: ['"Space Grotesk"', "Inter", "sans-serif"],
        display: ['"Bebas Neue"', "serif"],
        body: ['Inter', "sans-serif"],
        inter: ['Inter', "sans-serif"],
        galindo: ['"Galindo"', "cursive"],
      },
      fontSize: {
        "auth-title": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "auth-title-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "auth-subtitle": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        "auth-label": ["13px", { lineHeight: "1.4", fontWeight: "400" }],
        "auth-button": ["15px", { lineHeight: "1", fontWeight: "600" }],
        "auth-headline": ["48px", { lineHeight: "1.1", fontWeight: "800" }],
        "auth-tagline": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        "auth-field": "52px",
        "auth-gap-form": "32px",
        "auth-gap-fields": "16px",
        "auth-gap-label": "6px",
      },
      backgroundImage: {
        "muziika-gradient": "linear-gradient(136deg, #D96319 0%, #FF8B06 50%, #FF9D00 100%)",
        "muziika-orange-gradient": "linear-gradient(136deg, #D96319 0%, #FF8B06 50%, #FF9D00 100%)",
        "auth-button-gradient": "linear-gradient(135deg, #D96319 0%, #FF8B06 50%, #FF9D00 100%)",
      },
      boxShadow: {
        dashboard: "6px 4px 100px 0px rgba(0, 0, 0, 0.8)",
        "auth-card": "0 -8px 40px rgba(217, 99, 25, 0.12)",
      },
      keyframes: {
        "scroll-reveal": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "scroll-reveal": "scroll-reveal 500ms ease-out forwards",
      },
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
