import os
import re

def get_head(title, desc):
    return f"""<!DOCTYPE html>
<html lang="en" dir="ltr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>{title} | CareTrust Nursing & Patient Care</title>
  <meta name="description" content="{desc}">
  <link rel="icon" type="image/png" href="favicon.png?v=2">
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Fast Theme Sync to Prevent Flicker -->
  <script>
    (function() {{
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {{
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }} else {{
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }}
    }})();
  </script>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{ 
      darkMode: 'class',
      theme: {{
        extend: {{
          colors: {{
            primary: {{
              DEFAULT: '#1D4ED8',
              dark: '#38BDF8',
              hover: '#1E40AF',
              light: '#EFF6FF'
            }},
            secondary: {{
              DEFAULT: '#0D9488',
              dark: '#2DD4BF'
            }},
            darkBg: '#0B1120',
            cardDark: '#1E293B',
            borderDark: '#334155'
          }},
          fontFamily: {{
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          }}
        }}
      }}
    }}
  </script>

  <style>
    :root {{
      --bg-color: #F8FAFC;
      --card-bg: #FFFFFF;
      --text-color: #0F172A;
      --text-muted: #64748B;
      --border-color: #E2E8F0;
      --primary-accent: #1D4ED8;
    }}
    [data-theme="dark"], .dark {{
      --bg-color: #0B1120;
      --card-bg: #1E293B;
      --text-color: #F8FAFC;
      --text-muted: #94A3B8;
      --border-color: #334155;
      --primary-accent: #38BDF8;
    }}

    body {{
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
      font-family: 'Inter', sans-serif;
    }}

    .no-transition * {{ transition: none !important; }}
    .text-body-muted {{ color: var(--text-muted); }}
    .bg-card {{ background-color: var(--card-bg); }}
    .border-theme {{ border-color: var(--border-color); }}

    .nav-link {{
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.025em;
      transition: all 0.2s ease;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
    }}
    .nav-link:hover {{
      color: var(--primary-accent);
      background-color: rgba(56, 189, 248, 0.08);
    }}
  </style>
</head>
<body class="antialiased flex flex-col min-h-screen">
"""

def get_header(active=''):
    def link_class(page):
        if active == page:
            return "text-blue-600 dark:text-sky-400 font-bold bg-blue-50 dark:bg-sky-950/40"
        return "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400"

    is_home1 = (active in ['home', 'home1', 'index', ''])
    is_home2 = (active == 'home2')

    home_btn_class = "text-blue-600 dark:text-sky-400 font-extrabold bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800" if (is_home1 or is_home2) else "text-slate-700 dark:text-slate-200 font-bold"

    # High contrast selected states for Home 1 and Home 2
    home1_item_class = "bg-blue-600 text-white dark:bg-sky-500 dark:text-slate-950 font-extrabold shadow-sm rounded-xl" if is_home1 else "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-sky-400 font-medium rounded-xl"
    home2_item_class = "bg-blue-600 text-white dark:bg-sky-500 dark:text-slate-950 font-extrabold shadow-sm rounded-xl" if is_home2 else "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-sky-400 font-medium rounded-xl"

    return f"""  <!-- TOP CLINICAL UTILITY BAR -->
  <div class="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 z-50">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
        <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          24/7 Clinical Triage Available
        </span>
        <span class="hidden md:inline text-slate-600">|</span>
        <span class="hidden md:inline">Accredited Home Health Agency • Joint Commission Certified</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="tel:18005552273" class="font-bold text-white hover:text-sky-400 transition flex items-center gap-1.5">
          <i class="fas fa-phone-alt text-sky-400"></i> (800) 555-CARE
        </a>
        <span class="text-slate-600">|</span>
        <a href="contact.html" class="hover:text-white transition">Find Local Caregiver</a>
      </div>
    </div>
  </div>

  <!-- FLOATING HEALTHCARE NAVIGATION -->
  <header class="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#0B1120]/95 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <!-- LOGO -->
        <a href="index.html" class="flex items-center gap-3 group flex-shrink-0">
          <div class="w-11 h-11 rounded-2xl bg-blue-600/10 dark:bg-sky-400/20 flex items-center justify-center text-blue-600 dark:text-sky-400 transition-transform group-hover:scale-105 shadow-sm">
            <i class="fas fa-heartbeat text-2xl"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Care<span class="text-blue-600 dark:text-sky-400">Trust</span>
            </span>
            <span class="text-[0.65rem] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
              Nursing & Patient Care
            </span>
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
          <!-- Home Dropdown with High-Contrast Active State -->
          <div class="relative group">
            <button type="button" class="nav-link {home_btn_class} flex items-center gap-1.5">
              <span>Home</span>
              <i class="fas fa-chevron-down text-[9px] transition-transform duration-200 group-hover:rotate-180"></i>
            </button>
            <div class="absolute top-full start-0 w-64 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 space-y-1">
              <a href="index.html" class="block px-4 py-2.5 text-xs {home1_item_class} transition-colors">
                <i class="fas fa-house-user mr-1.5"></i> Home 1 - Family Care
              </a>
              <a href="home2.html" class="block px-4 py-2.5 text-xs {home2_item_class} transition-colors">
                <i class="fas fa-hospital-user mr-1.5"></i> Home 2 - Clinical & Rehab
              </a>
            </div>
          </div>

          <a href="services.html" class="nav-link {link_class('services')}">Services</a>
          <a href="nursing.html" class="nav-link {link_class('nursing')}">Nursing Care</a>
          <a href="caregivers.html" class="nav-link {link_class('caregivers')}">Caregivers</a>
          <a href="physiotherapy.html" class="nav-link {link_class('physiotherapy')}">Physiotherapy</a>
          <a href="start.html" class="nav-link {link_class('start')}">How to Start</a>
          <a href="pricing.html" class="nav-link {link_class('pricing')}">Pricing</a>
          <a href="about.html" class="nav-link {link_class('about')}">About Us</a>
          <a href="faq.html" class="nav-link {link_class('faq')}">FAQ</a>
          <a href="contact.html" class="nav-link {link_class('contact')}">Contact</a>
        </nav>

        <!-- UTILITY CONTROLS: EQUAL SIZED BUTTONS & SECONDARY CTA LOGIN -->
        <div class="hidden sm:flex items-center gap-2.5">
          <!-- RTL Button (Exact w-9 h-9 rounded-full identical to theme toggle) -->
          <button type="button" class="rtl-toggle-btn w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 flex items-center justify-center font-bold text-[11px] uppercase transition shadow-sm" title="Toggle RTL">
            RTL
          </button>
          
          <!-- Theme Toggle Button (Exact w-9 h-9 rounded-full identical to RTL) -->
          <button type="button" class="theme-toggle w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 flex items-center justify-center transition shadow-sm" title="Toggle Dark/Light Mode">
            <i class="fas fa-moon text-xs" id="theme-icon"></i>
          </button>
          
          <!-- Login Option Styled as Secondary CTA Button -->
          <a href="login.html" class="h-9 px-4 rounded-full border-2 border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center">
            Login
          </a>

          <!-- Register / Consultation Styled as Primary CTA Button -->
          <a href="register.html" class="h-9 px-5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center">
            Register
          </a>
        </div>

        <!-- MOBILE MENU BUTTON -->
        <div class="flex items-center gap-2 lg:hidden">
          <button type="button" class="rtl-toggle-btn w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center" title="Toggle RTL">
            RTL
          </button>
          <button type="button" class="theme-toggle w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center" title="Toggle Theme">
            <i class="fas fa-moon text-xs" id="mobile-theme-icon"></i>
          </button>
          <button id="mobile-menu-btn" class="w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition">
            <i class="fas fa-bars text-sm" id="mobile-menu-icon"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <div id="mobile-drawer" class="hidden lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
      <div class="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <a href="index.html" class="p-2.5 rounded-xl text-xs font-bold text-center {home1_item_class}">Home 1</a>
        <a href="home2.html" class="p-2.5 rounded-xl text-xs font-bold text-center {home2_item_class}">Home 2</a>
      </div>
      <a href="services.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Services</a>
      <a href="nursing.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Nursing Care</a>
      <a href="caregivers.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Caregivers</a>
      <a href="physiotherapy.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Physiotherapy</a>
      <a href="start.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">How to Start</a>
      <a href="pricing.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Pricing</a>
      <a href="about.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">About Us</a>
      <a href="faq.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">FAQ</a>
      <a href="contact.html" class="block py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Contact Us</a>
      
      <div class="pt-4 flex flex-col gap-2.5">
        <div class="flex gap-2">
          <a href="login.html" class="flex-1 py-2.5 text-xs font-bold rounded-xl border-2 border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 text-center">Login</a>
          <a href="register.html" class="flex-1 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white text-center shadow-md">Register</a>
        </div>
      </div>
    </div>
  </header>
"""

def get_footer():
    return """  <!-- UNIFIED HEALTHCARE FOOTER -->
  <footer class="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center text-xl">
              <i class="fas fa-heartbeat"></i>
            </div>
            <span class="text-xl font-extrabold tracking-tight text-white">Care<span class="text-sky-400">Trust</span></span>
          </div>
          <p class="text-slate-400 text-xs leading-relaxed mb-6">
            CareTrust is a nationally accredited home health care organization providing skilled in-home nursing, companion care, and rehabilitation therapies with compassion and clinical rigor.
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center text-xs transition"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center text-xs transition"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center text-xs transition"><i class="fab fa-instagram"></i></a>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Specialized Services</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="nursing.html" class="hover:text-white transition">Skilled In-Home RN Nursing</a></li>
            <li><a href="caregivers.html" class="hover:text-white transition">Elderly & Dementia Companion</a></li>
            <li><a href="services.html" class="hover:text-white transition">Post-Surgical In-Home Recovery</a></li>
            <li><a href="physiotherapy.html" class="hover:text-white transition">In-Home Physical Therapy</a></li>
            <li><a href="facilities.html" class="hover:text-white transition">Medical ICU Equipment & Beds</a></li>
            <li><a href="nutrition.html" class="hover:text-white transition">Clinical Dietary & Enteral Care</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Patient Resources</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="start.html" class="hover:text-white transition">How to Start Care in 4 Steps</a></li>
            <li><a href="pricing.html" class="hover:text-white transition">Transparent Rates & Insurance</a></li>
            <li><a href="dashboard-user.html" class="hover:text-white transition">Family Portal Login</a></li>
            <li><a href="faq.html" class="hover:text-white transition">Frequently Asked Questions</a></li>
            <li><a href="about.html" class="hover:text-white transition">Our Clinical Advisory Board</a></li>
            <li><a href="blog.html" class="hover:text-white transition">Caregiver Advice & Wellness Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">24/7 Clinical Emergency Line</h4>
          <div class="space-y-3 text-xs text-slate-400">
            <div class="flex items-start gap-2.5">
              <i class="fas fa-phone-alt text-sky-400 mt-0.5"></i>
              <div>
                <a href="tel:18005552273" class="font-bold text-white hover:text-sky-400 transition text-sm">(800) 555-CARE</a>
                <div class="text-[10px] text-slate-500">24/7 Toll-Free Triage</div>
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <i class="fas fa-envelope text-sky-400 mt-0.5"></i>
              <a href="mailto:care@caretrusthealth.org" class="hover:text-white transition">care@caretrusthealth.org</a>
            </div>
            <div class="flex items-start gap-2.5">
              <i class="fas fa-map-marker-alt text-sky-400 mt-0.5"></i>
              <span>450 Healthcare Parkway, Suite 300, Medical Center District</span>
            </div>
          </div>
        </div>

      </div>

      <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 CareTrust Nursing & Patient Care. All rights reserved.</p>
        <div class="flex items-center gap-6 text-slate-400">
          <a href="#" class="hover:text-white transition">Privacy Policy</a>
          <a href="#" class="hover:text-white transition">HIPAA Compliance</a>
          <a href="#" class="hover:text-white transition">Terms of Care</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- GLOBAL CLIENT LOGIC -->
  <script>
    const htmlElement = document.documentElement;
    const themeToggles = document.querySelectorAll('.theme-toggle');

    function syncThemeIcons() {
      const isDark = htmlElement.classList.contains('dark');
      themeToggles.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isDark ? 'fas fa-sun text-xs text-amber-400' : 'fas fa-moon text-xs';
        }
      });
    }

    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        syncThemeIcons();
      });
    });
    syncThemeIcons();

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.body.classList.add('no-transition');
        const curDir = htmlElement.getAttribute('dir');
        const newDir = curDir === 'ltr' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', newDir);
        rtlButtons.forEach(b => {
          b.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
        });
        setTimeout(() => { document.body.classList.remove('no-transition'); }, 50);
      });
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileIcon = document.getElementById('mobile-menu-icon');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
        if (mobileDrawer.classList.contains('hidden')) {
          mobileIcon.className = 'fas fa-bars text-sm';
        } else {
          mobileIcon.className = 'fas fa-times text-sm';
        }
      });
    }
  </script>
</body>
</html>
"""

def generate_index_html():
    main_content = """
    <!-- 1. HERO SECTION (CENTER ALIGNED, LUMINOUS CONTRAST HEADLINE, MATCHING FULL-ROUNDED CTA RADII) -->
    <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 border-b border-slate-200 dark:border-slate-800">
      <!-- Background Medical Image with Deep Protective Overlay -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>
      
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        
        <!-- Safety Badge Center Aligned -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-sky-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <i class="fas fa-certificate text-sky-400"></i> Patient Safety & Clinical Excellence Certified
        </div>
        
        <!-- Main Headline with Supreme Contrast Gradient on IN YOUR OWN HOME. -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 uppercase text-center">
          Compassionate Care.<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-sky-400 drop-shadow-[0_4px_24px_rgba(56,189,248,0.7)]">
            In Your Own Home.
          </span>
        </h1>

        <!-- Centered Subheading -->
        <p class="text-base sm:text-xl text-slate-200 leading-relaxed font-normal mb-10 max-w-2xl text-center mx-auto">
          From 24/7 skilled registered nursing to certified elderly companionship and physical rehabilitation, CareTrust provides hospital-standard medical excellence, safety, and heartfelt support for your loved ones.
        </p>

        <!-- Both Buttons: Exactly Identical Corner Radius (rounded-full), Height, Font and Alignment -->
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto mb-12">
          <a href="contact.html" class="w-full sm:w-[220px] px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5">
            <span>Inquire Now</span>
            <i class="fas fa-arrow-right text-xs rtl:rotate-180"></i>
          </a>
          <a href="services.html" class="w-full sm:w-[220px] px-8 py-4 border-2 border-white/80 dark:border-sky-400/80 bg-white/10 dark:bg-slate-900/60 hover:bg-white hover:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-slate-950 text-white font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2.5">
            <span>Explore Services</span>
          </a>
        </div>

        <!-- Trust Badges Row Centered -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-700/60 text-slate-300 text-xs font-semibold max-w-3xl mx-auto w-full">
          <div class="flex items-center justify-center gap-2.5">
            <i class="fas fa-user-check text-sky-400 text-lg"></i>
            <span>100% Background Checked & Verified RNs</span>
          </div>
          <div class="flex items-center justify-center gap-2.5">
            <i class="fas fa-stopwatch text-teal-400 text-lg"></i>
            <span>15-Minute Rapid Response Guarantee</span>
          </div>
          <div class="flex items-center justify-center gap-2.5">
            <i class="fas fa-shield-alt text-blue-400 text-lg"></i>
            <span>HIPAA Compliant & Fully Insured</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. QUICK CARE FINDER -->
    <section class="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="nursing.html" class="p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-sky-400 hover:shadow-md transition group">
          <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-sky-950/50 text-blue-600 dark:text-sky-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            <i class="fas fa-user-nurse"></i>
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">Skilled In-Home Nursing</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">IV therapy, wound dressing, catheter management & ICU setups.</p>
        </a>

        <a href="caregivers.html" class="p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-sky-400 hover:shadow-md transition group">
          <div class="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            <i class="fas fa-hands-helping"></i>
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">Elderly & Companion Care</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Daily grooming, medication adherence, meal prep & companionship.</p>
        </a>

        <a href="services.html" class="p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-sky-400 hover:shadow-md transition group">
          <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            <i class="fas fa-procedures"></i>
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">Post-Surgical Recovery</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Orthopedic, cardiac, and general surgical post-op rehabilitation.</p>
        </a>

        <a href="physiotherapy.html" class="p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-sky-400 hover:shadow-md transition group">
          <div class="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            <i class="fas fa-crutch"></i>
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">In-Home Physiotherapy</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Stroke rehabilitation, fall prevention & mobility retraining.</p>
        </a>
      </div>
    </section>

    <!-- 3. COMPREHENSIVE MEDICAL SERVICES -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Clinical Scope of Care
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Specialized Healthcare Services
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            Every patient receives an individualized clinical care plan overseen by licensed physicians and certified medical directors.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service Card 1 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-sky-900/40 text-blue-600 dark:text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-syringe"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">IV Infusion & Injection Therapy</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Safe intravenous antibiotic administration, hydration therapy, parenteral nutrition, and biologic medications administered by licensed registered nurses.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> PICC line & Port-a-Cath maintenance</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Pain management & continuous pumps</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Laboratory blood draw at home</li>
              </ul>
            </div>
            <a href="nursing.html" class="inline-flex items-center text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline">
              Learn more about Infusion Care <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>

          <!-- Service Card 2 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-band-aid"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Advanced Wound Care & Dressing</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Hospital-grade sterile dressing changes for surgical incisions, pressure ulcers, diabetic foot ulcers, and ostomy management to prevent infections.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-teal-600 dark:text-teal-400"></i> Negative Pressure Wound Therapy (Wound VAC)</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-teal-600 dark:text-teal-400"></i> Infection monitoring & sterile debridement</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-teal-600 dark:text-teal-400"></i> Stoma & colostomy appliance care</li>
              </ul>
            </div>
            <a href="nursing.html" class="inline-flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
              Learn more about Wound Protocols <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>

          <!-- Service Card 3 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-lungs"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">ICU & Ventilator Support at Home</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Hospital beds, mechanical ventilators, oxygen concentrators, and cardiac monitors with dedicated round-the-clock critical care registered nurses.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-purple-600 dark:text-purple-400"></i> Tracheostomy care & suctioning</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-purple-600 dark:text-purple-400"></i> Continuous biometric vital monitoring</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-purple-600 dark:text-purple-400"></i> Emergency backup battery protocols</li>
              </ul>
            </div>
            <a href="nursing.html" class="inline-flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
              Learn more about Home ICU <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>

          <!-- Service Card 4 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-brain"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Alzheimer's & Dementia Support</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Compassionate cognitive support, wandering prevention, structured daily routines, and family respite care designed for memory impairment stages.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-600 dark:text-emerald-400"></i> Calming memory-affirming activities</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-600 dark:text-emerald-400"></i> Safe environment modification</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-emerald-600 dark:text-emerald-400"></i> 24/7 dedicated watchful companion</li>
              </ul>
            </div>
            <a href="caregivers.html" class="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Learn more about Memory Care <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>

          <!-- Service Card 5 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-walking"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Physiotherapy & Rehabilitation</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Licensed physical therapists bring clinical equipment to your home to restore strength, rebuild balance, and accelerate independent mobility.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-sky-600 dark:text-sky-400"></i> Post-hip & knee replacement rehab</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-sky-600 dark:text-sky-400"></i> Neuro muscular re-education</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-sky-600 dark:text-sky-400"></i> Gait & fall hazard assessments</li>
              </ul>
            </div>
            <a href="physiotherapy.html" class="inline-flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
              Learn more about Rehabilitation <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>

          <!-- Service Card 6 -->
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-sky-400 transition group flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                <i class="fas fa-pills"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Chronic Disease & Medication Control</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Comprehensive disease management for Type 1 & 2 Diabetes, Congestive Heart Failure, COPD, and Hypertension with physician coordination.
              </p>
              <ul class="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
                <li class="flex items-center gap-2"><i class="fas fa-check text-rose-600 dark:text-rose-400"></i> Glucometer & insulin administration</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-rose-600 dark:text-rose-400"></i> Daily edema & fluid retention checks</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-rose-600 dark:text-rose-400"></i> Automated medication blister dispensing</li>
              </ul>
            </div>
            <a href="services.html" class="inline-flex items-center text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline">
              Learn more about Chronic Care <i class="fas fa-chevron-right text-[10px] ms-1.5"></i>
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- 4. CARE PACKAGES SECTION (HIGH-CONTRAST 2PX BORDER LINING ON FIRST CONTAINER CTA) -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Transparent Pricing Options
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Care Packages
          </h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full mt-4 mb-4"></div>
          <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Flexible home healthcare packages designed to meet your family's care schedule and budget with zero hidden fees.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <!-- First Container: Hourly Care (PROMINENT 2PX HIGH-CONTRAST BORDER LINING ON CTA) -->
          <div class="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Flexible Scheduling</span>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">Hourly Rate</h3>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-blue-600 dark:text-sky-400">$35</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">/ hour</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Perfect for routine morning assistance, hygiene, medication administration, or doctor appointment escort.
              </p>
              <ul class="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Minimum 4 hours per visit</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Flexible day & evening scheduling</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Basic clinical & companion care</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Free supervisory RN oversight</li>
              </ul>
            </div>
            <!-- Prominent High-Contrast 2px Border Lining CTA Button -->
            <a href="contact.html" class="block w-full py-3.5 px-6 border-2 border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 text-blue-700 dark:text-sky-300 font-extrabold text-xs uppercase tracking-widest text-center rounded-full transition shadow-sm">
              SELECT PLAN
            </a>
          </div>

          <!-- Second Container: Daily Package (Most Popular) -->
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-sky-400 relative shadow-2xl flex flex-col justify-between transform md:-translate-y-2">
            <div class="absolute -top-3.5 inset-x-0 flex justify-center">
              <span class="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400">12-Hour Continuous Care</span>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">Daily Package</h3>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-blue-600 dark:text-sky-400">$250</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">/ day</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Dedicated daytime or overnight watchful care for patients recovering from surgery or needing close supervision.
              </p>
              <ul class="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> 12-hour continuous presence</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Dedicated certified caregiver</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Full medication management</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Real-time family EHR vitals log</li>
              </ul>
            </div>
            <a href="contact.html" class="block w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-extrabold text-xs uppercase tracking-widest text-center rounded-full shadow-lg shadow-blue-500/25 transition">
              SELECT PLAN
            </a>
          </div>

          <!-- Third Container: 24/7 Live-In -->
          <div class="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Round-The-Clock Support</span>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">24/7 Live-In</h3>
              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-blue-600 dark:text-sky-400">$450</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">/ day</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Complete 24-hour presence for advanced Alzheimer's support, palliative comfort, or high-acuity in-home care.
              </p>
              <ul class="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-8">
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Full 24-hour primary caregiver</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Secondary respite relief team</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> Clinical ICU equipment integration</li>
                <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600 dark:text-sky-400"></i> 24/7 direct physician triage line</li>
              </ul>
            </div>
            <a href="contact.html" class="block w-full py-3.5 px-6 border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:border-blue-600 dark:hover:border-sky-400 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 font-extrabold text-xs uppercase tracking-widest text-center rounded-full transition shadow-sm">
              SELECT PLAN
            </a>
          </div>

        </div>

      </div>
    </section>

    <!-- 5. WHY FAMILIES TRUST CARETRUST (NURSE VETTING & CLINICAL STANDARDS) -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          
          <!-- Nurse Photo & Verified Badge -->
          <div class="w-full lg:w-1/2 relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000" alt="Licensed CareTrust Nurse" class="w-full h-[520px] object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 start-6 end-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div class="text-sm font-bold text-slate-900 dark:text-white">Elena Rostova, RN, BSN</div>
                  <div class="text-xs text-blue-600 dark:text-sky-400 font-medium">Head of Clinical Home Nursing • 12 Yrs Exp</div>
                </div>
                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Verified License
                </span>
              </div>
            </div>
            
            <div class="absolute -top-6 -end-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-sky-900/40 text-blue-600 dark:text-sky-400 flex items-center justify-center text-lg">
                <i class="fas fa-user-shield"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-slate-900 dark:text-white">Only Top 4% Hired</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400">Strict 5-Phase Clinical Screening</div>
              </div>
            </div>
          </div>

          <!-- Content Description -->
          <div class="w-full lg:w-1/2">
            <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
              The CareTrust Quality Standard
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight leading-tight">
              Hospital Standards.<br/>
              Delivered with Heartfelt Empathy.
            </h2>
            <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              Entrusting someone with your loved one's well-being is an enormous decision. That's why CareTrust maintains the most rigorous clinician screening, background verification, and quality protocols in the home healthcare industry.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <div class="text-blue-600 dark:text-sky-400 text-lg mb-2"><i class="fas fa-id-card-alt"></i></div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">Triple Background Screening</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">FBI fingerprinting, state registry checks, and continuous motor vehicle screening.</p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <div class="text-teal-600 dark:text-teal-400 text-lg mb-2"><i class="fas fa-graduation-cap"></i></div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">Monthly Skills Simulation</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Mandatory clinical re-certification in BLS, emergency protocols, and infection control.</p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <div class="text-purple-600 dark:text-purple-400 text-lg mb-2"><i class="fas fa-laptop-medical"></i></div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">Live Family EHR Portal</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">View caregiver check-ins, medication logs, and doctor visit notes in real-time on your phone.</p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <div class="text-amber-600 dark:text-amber-400 text-lg mb-2"><i class="fas fa-phone-alt"></i></div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">Backup Nurse Guarantee</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">If your assigned caregiver is ever unwell, a fully briefed substitute arrives on schedule.</p>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-6">
              <div>
                <div class="text-3xl font-extrabold text-blue-600 dark:text-sky-400">99.4%</div>
                <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient Satisfaction</div>
              </div>
              <div class="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
              <div>
                <div class="text-3xl font-extrabold text-teal-600 dark:text-teal-400">15,000+</div>
                <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Families Supported</div>
              </div>
              <div class="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
              <div>
                <div class="text-3xl font-extrabold text-slate-900 dark:text-white">15 Min</div>
                <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Urgent Response</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 6. INTERACTIVE CARE ESTIMATOR -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Transparent Pricing Tool
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Estimate Your Family's Care Needs
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            Select the required level of care and weekly schedule to view estimated rates. All plans include 24/7 supervisory nurse oversight.
          </p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 sm:p-10">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div class="lg:col-span-2 space-y-6">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  1. Select Type of Care
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="care-type-selector">
                  <button type="button" onclick="selectCareType('companion', 32)" class="care-type-btn p-3.5 rounded-xl border-2 border-blue-600 dark:border-sky-400 bg-blue-50/50 dark:bg-sky-950/40 text-left transition" data-type="companion">
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Companion & Aide</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Daily grooming & meals</div>
                    <div class="text-xs font-extrabold text-blue-600 dark:text-sky-400 mt-2">$32 / hr</div>
                  </button>

                  <button type="button" onclick="selectCareType('nursing', 48)" class="care-type-btn p-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-left transition hover:border-slate-400" data-type="nursing">
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Skilled RN Nursing</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Wounds, IV & catheters</div>
                    <div class="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-2">$48 / hr</div>
                  </button>

                  <button type="button" onclick="selectCareType('physio', 65)" class="care-type-btn p-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-left transition hover:border-slate-400" data-type="physio">
                    <div class="text-xs font-bold text-slate-900 dark:text-white">Physiotherapist</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Rehab & mobility</div>
                    <div class="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-2">$65 / hr</div>
                  </button>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    2. Hours Per Visit
                  </label>
                  <span class="text-xs font-extrabold text-blue-600 dark:text-sky-400" id="hours-display">6 Hours</span>
                </div>
                <input type="range" min="4" max="24" step="2" value="6" id="hours-slider" oninput="updateEstimate()" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600">
                <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>4 hrs (Min)</span>
                  <span>8 hrs</span>
                  <span>12 hrs</span>
                  <span>24 hrs (Live-in)</span>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    3. Days Per Week
                  </label>
                  <span class="text-xs font-extrabold text-blue-600 dark:text-sky-400" id="days-display">5 Days / Week</span>
                </div>
                <input type="range" min="1" max="7" step="1" value="5" id="days-slider" oninput="updateEstimate()" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600">
                <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 Day</span>
                  <span>3 Days</span>
                  <span>5 Days</span>
                  <span>7 Days (Daily)</span>
                </div>
              </div>
            </div>

            <!-- Price Output Card -->
            <div class="bg-gradient-to-br from-blue-600 to-sky-700 text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg">
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3">
                  Estimated Care Investment
                </span>
                <div class="text-4xl font-extrabold tracking-tight mt-1" id="weekly-cost">$960</div>
                <div class="text-xs text-sky-100 font-medium">Estimated Weekly Total</div>
                
                <div class="mt-6 pt-6 border-t border-white/20 space-y-2 text-xs text-sky-100">
                  <div class="flex justify-between">
                    <span>Base Hourly Rate:</span>
                    <span class="font-bold text-white" id="summary-rate">$32 / hr</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Weekly Coverage:</span>
                    <span class="font-bold text-white" id="summary-hours">30 hrs / week</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Clinical Supervision:</span>
                    <span class="font-bold text-emerald-300">Included Free</span>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <a href="contact.html" class="block w-full py-3 bg-white text-blue-800 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider text-center rounded-xl shadow-md transition transform hover:scale-[1.02]">
                  Lock In This Rate
                </a>
                <p class="text-[10px] text-center text-sky-200 mt-2">No commitment required. Covered by most private insurances & veteran benefits.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- 7. PATIENT STORIES & RECOVERY CASE STUDIES -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Real Recovery Milestones
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Voices of Families We Serve
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            Read how our registered nurses and compassionate aides transformed home recoveries and provided crucial peace of mind.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex text-amber-400 text-xs gap-1 mb-4">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed italic mb-6">
                "Following my father's triple bypass surgery, we were terrified of complications at home. CareTrust nurse Sarah was phenomenal. She caught an early fluid retention symptom on day 3 that prevented re-hospitalization."
              </p>
            </div>
            <div class="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                DK
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white text-xs">David K. & Family</h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Post-Cardiac Recovery • 8 Weeks Care</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex text-amber-400 text-xs gap-1 mb-4">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed italic mb-6">
                "Finding compassionate, patient care for my mother who lives with moderate Alzheimer's was so hard until we found CareTrust. Their aide Miriam doesn't just assist with hygiene—she brings joy, laughter, and structure to Mom's day."
              </p>
            </div>
            <div class="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                ML
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white text-xs">Margaret & Lisa L.</h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Memory & Companion Care • Ongoing 1 Year</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex text-amber-400 text-xs gap-1 mb-4">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed italic mb-6">
                "Their physiotherapist Mark had my grandfather walking with a cane again within six weeks of his stroke. He treated him with such dignity and patience. We cannot recommend CareTrust enough."
              </p>
            </div>
            <div class="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                JT
              </div>
              <div>
                <h4 class="font-bold text-slate-900 dark:text-white text-xs">James Thornton</h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">In-Home Stroke Rehabilitation</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 8. HOW IT WORKS: 4-STEP ONBOARDING -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
          Simple Onboarding
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          How CareTrust Begins in 4 Steps
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-base max-w-2xl mx-auto mt-3">
          We can deploy a certified caregiver or registered nurse to your residence in as little as 24 hours.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 text-left">
          <div class="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg mb-4">1</div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Free Consultation</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Call or submit your details. A senior clinical coordinator reviews your loved one's diagnosis and medical schedule.</p>
          </div>

          <div class="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-lg mb-4">2</div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">RN Home Assessment</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">A supervisory nurse visits in-person to evaluate safety hazards, mobility requirements, and doctor orders.</p>
          </div>

          <div class="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-extrabold text-lg mb-4">3</div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Caregiver Matching</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">We match a clinician with both the clinical credentials and the personality compatibility your family desires.</p>
          </div>

          <div class="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-lg mb-4">4</div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Care Begins & Monitored</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Care begins seamlessly. You monitor updates 24/7 on the family portal, backed by 24/7 nurse telephone triage.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- 9. IMMEDIATE INQUIRY & DISPATCH FORM -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Direct Coordination
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Schedule an Immediate Care Consultation
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            Submit your request below. A senior home healthcare manager will phone you within 15 minutes.
          </p>
        </div>

        <form class="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6" onsubmit="handleInquiry(event)">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
              <input type="text" required placeholder="Full Name" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
              <input type="tel" required placeholder="(800) 555-0199" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input type="email" required placeholder="name@example.com" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Primary Care Needed</label>
              <select class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500">
                <option>Elderly Companion & Hygiene</option>
                <option>Skilled Nursing (RN / Wound / IV)</option>
                <option>Post-Surgical In-Home Rehab</option>
                <option>In-Home Physical Therapy</option>
                <option>Alzheimer's / Dementia 24/7 Care</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">Patient Details & Medical Context</label>
            <textarea rows="3" placeholder="Describe the current diagnosis, mobility challenges, or physician recommendations..." class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"></textarea>
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <i class="fas fa-lock text-emerald-500"></i>
            <span>All health information is protected under HIPAA federal privacy standards.</span>
          </div>

          <button type="submit" class="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/25 transition">
            Request Rapid Clinical Assessment
          </button>
        </form>

      </div>
    </section>

    <!-- ESTIMATOR JAVASCRIPT -->
    <script>
      let currentRate = 32;

      function selectCareType(type, rate) {
        currentRate = rate;
        document.querySelectorAll('.care-type-btn').forEach(btn => {
          if (btn.dataset.type === type) {
            btn.className = 'care-type-btn p-3.5 rounded-xl border-2 border-blue-600 dark:border-sky-400 bg-blue-50/50 dark:bg-sky-950/40 text-left transition';
            btn.querySelector('.font-extrabold').className = 'text-xs font-extrabold text-blue-600 dark:text-sky-400 mt-2';
          } else {
            btn.className = 'care-type-btn p-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-left transition hover:border-slate-400';
            btn.querySelector('.font-extrabold').className = 'text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-2';
          }
        });
        updateEstimate();
      }

      function updateEstimate() {
        const hours = parseInt(document.getElementById('hours-slider').value);
        const days = parseInt(document.getElementById('days-slider').value);
        
        document.getElementById('hours-display').innerText = hours + ' Hours';
        document.getElementById('days-display').innerText = days + ' Days / Week';
        
        const weeklyHours = hours * days;
        const total = weeklyHours * currentRate;
        
        document.getElementById('weekly-cost').innerText = '$' + total.toLocaleString();
        document.getElementById('summary-rate').innerText = '$' + currentRate + ' / hr';
        document.getElementById('summary-hours').innerText = weeklyHours + ' hrs / week';
      }

      function handleInquiry(e) {
        e.preventDefault();
        alert('Thank you. A CareTrust clinical coordinator has received your consultation request and will call you within 15 minutes.');
      }
    </script>
    """

    content = get_head("CareTrust | Home Nursing & Clinical Patient Care", "Accredited in-home nursing, elderly companion care, post-surgical recovery, and physiotherapy services. 24/7 clinical supervision.") + get_header('home') + f"<main class='flex-grow'>{main_content}</main>" + get_footer()
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Generated index.html successfully.")

def update_home2():
    # Update home2.html with the new header (Home 2 active) and footer
    if not os.path.exists('home2.html'):
        return
    with open('home2.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract main content
    m = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL)
    if m:
        main_content = m.group(1)
        full_html = get_head("Clinical & Chronic Rehab | CareTrust Nursing", "Specialized post-acute hospital care and chronic illness rehabilitation at home.") + get_header('home2') + f"<main class='flex-grow'>{main_content}</main>" + get_footer()
        with open('home2.html', 'w', encoding='utf-8') as f_out:
            f_out.write(full_html)
        print("Updated home2.html")

def update_standard_page(filename, title, desc, active_key):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    m = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL)
    if m:
        main_content = m.group(1)
        # Check if there is a Care Packages section inside main_content and ensure first container has prominent 2px border lining
        # Replace faint button styling with 2px border lining
        main_content = re.sub(
            r'class="block w-full py-3 bg-gray-100 dark:bg-gray-800 text-dark-bg dark:text-white uppercase font-bold text-xs tracking-widest rounded-full hover:bg-primary hover:text-white transition-colors"',
            'class="block w-full py-3.5 border-2 border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 text-blue-700 dark:text-sky-300 uppercase font-extrabold text-xs tracking-widest rounded-full transition shadow-sm text-center"',
            main_content
        )
        # Also in pricing.html:
        main_content = re.sub(
            r'class="block w-full py-3 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-900 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider text-center rounded-xl transition"',
            'class="block w-full py-3.5 border-2 border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 text-blue-700 dark:text-sky-300 font-extrabold text-xs uppercase tracking-widest text-center rounded-full transition shadow-sm"',
            main_content
        )

        full_html = get_head(title, desc) + get_header(active_key) + f"<main class='flex-grow'>{main_content}</main>" + get_footer()
        with open(filename, 'w', encoding='utf-8') as f_out:
            f_out.write(full_html)
        print(f"Updated {filename}")

def update_auth_nav(filename):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace header utility buttons with equal-sized w-9 h-9 buttons
    old_util_pattern = r'<div class="flex items-center gap-3">.*?</div>\s*</header>'
    new_util = """<div class="flex items-center gap-2.5">
            <button type="button" class="rtl-toggle-btn w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 flex items-center justify-center font-bold text-[11px] uppercase transition shadow-sm" title="Toggle RTL">
                RTL
            </button>
            <button type="button" class="theme-toggle w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-600 dark:hover:border-sky-400 hover:text-blue-600 dark:hover:text-sky-400 flex items-center justify-center transition shadow-sm" title="Toggle Theme">
                <i class="fas fa-moon text-xs" id="theme-icon"></i>
            </button>
            <a href="index.html" class="h-9 px-4 rounded-full border-2 border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center">
                Home
            </a>
        </div>
    </header>"""
    
    content = re.sub(old_util_pattern, new_util, content, flags=re.DOTALL)
    with open(filename, 'w', encoding='utf-8') as f_out:
        f_out.write(content)
    print(f"Updated auth nav in {filename}")

if __name__ == '__main__':
    # 1. Regenerate index.html
    generate_index_html()

    # 2. Update home2.html
    update_home2()

    # 3. Update standard content pages
    pages = [
        ('services.html', 'Clinical & Companion Services', 'Comprehensive in-home care services by CareTrust.', 'services'),
        ('nursing.html', 'Skilled In-Home Nursing Care', 'Registered nurse infusion, ventilator, and wound care.', 'nursing'),
        ('caregivers.html', 'Vetted Caregivers & Nurse Profiles', 'Background checked and verified healthcare companions.', 'caregivers'),
        ('physiotherapy.html', 'In-Home Physiotherapy & Rehabilitation', 'Post-stroke, orthopedic, and mobility physical therapy.', 'physiotherapy'),
        ('start.html', 'How to Start Home Care', '4-step onboarding guide for families seeking in-home care.', 'start'),
        ('pricing.html', 'Transparent Care Pricing & Insurance', 'Hourly, 12h, and 24/7 live-in pricing options.', 'pricing'),
        ('about.html', 'About CareTrust Healthcare', 'Accreditations, clinical directors, and mission.', 'about'),
        ('faq.html', 'Frequently Asked Questions', 'Answers to nurse vetting, insurance, and emergency triage.', 'faq'),
        ('blog.html', 'Clinical Advice & Caregiver Journal', 'Evidence-based articles on elder health and recovery.', 'blog'),
        ('contact.html', '24/7 Clinical Contact & Care Intake', 'Request immediate caregiver dispatch or clinical triage.', 'contact'),
        ('facilities.html', 'In-Home ICU & Medical Equipment', 'Hospital bed rentals, oxygen, and biometric monitors.', 'facilities'),
        ('nutrition.html', 'Clinical Dietary & Enteral Nutrition', 'Dysphagia purees, PEG tube feeding, and renal diets.', 'nutrition'),
        ('groupclasses.html', 'Caregiver Support & Dementia Cafes', 'Community education and senior mobility workshops.', 'groupclasses'),
        ('dashboard-user.html', 'Patient & Family Portal', 'Live vitals monitoring and nurse visit logs.', 'dashboard'),
        ('dashboard-admin.html', 'Clinical Care Coordinator Portal', 'Caregiver dispatch, triage management, and patient caseloads.', 'dashboard'),
        ('404.html', 'Page Not Found', 'The requested clinical page could not be located.', '404')
    ]

    for p in pages:
        update_standard_page(p[0], p[1], p[2], p[3])

    # 4. Update auth pages header button sizes
    update_auth_nav('login.html')
    update_auth_nav('register.html')
    print("All pages successfully synchronized and updated!")
