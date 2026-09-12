import os
import re

# Import header, head, footer helpers
from update_all_pages import get_head, get_header, get_footer

def standardize_hero_and_h2(content):
    # 1. Standardize Hero H1 font size
    # Match any <h1 ...> in hero sections and set class to consistent standard:
    # "text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 uppercase text-center"
    def h1_repl(match):
        attrs = match.group(1)
        # Check if already standardized
        if 'text-4xl sm:text-5xl md:text-6xl' in attrs:
            return match.group(0)
        # Replace class in h1
        new_class = "text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 uppercase text-center"
        if 'class="' in attrs:
            new_attrs = re.sub(r'class="[^"]*"', f'class="{new_class}"', attrs)
        else:
            new_attrs = f'class="{new_class}" ' + attrs
        return f'<h1 {new_attrs}>'

    # Only replace h1s inside main or hero (skip 404, login, register card h1s)
    # Replace h1 with hero classes
    content = re.sub(r'<h1\s+([^>]*(?:font-extrabold|font-medium|tracking-tight)[^>]*)>', h1_repl, content)

    # 2. Standardize H2 tags: decrease font weight from font-extrabold/font-black to font-bold, and consistent text-3xl sm:text-4xl size
    def h2_repl(match):
        attrs = match.group(1)
        # Extract class
        m_cls = re.search(r'class="([^"]*)"', attrs)
        if m_cls:
            cls = m_cls.group(1)
            # Decrease weight: font-extrabold / font-black -> font-bold
            cls = re.sub(r'\bfont-extrabold\b', 'font-bold', cls)
            cls = re.sub(r'\bfont-black\b', 'font-bold', cls)
            
            # Standardize font size to text-3xl sm:text-4xl
            cls = re.sub(r'\btext-3xl\s+sm:text-4xl\s+md:text-5xl\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-3xl\s+md:text-5xl\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-4xl\s+sm:text-6xl(?:\s+md:text-7xl)?\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-4xl\s+md:text-5xl\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-5xl\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-4xl\b', 'text-3xl sm:text-4xl', cls)
            cls = re.sub(r'\btext-2xl\s+sm:text-4xl\b', 'text-3xl sm:text-4xl', cls)
            
            # Ensure font-bold is present if not already
            if 'font-bold' not in cls and 'font-semibold' not in cls:
                cls += ' font-bold'
            
            # Reconstruct
            new_attrs = attrs[:m_cls.start(1)] + cls + attrs[m_cls.end(1):]
            return f'<h2 {new_attrs}>'
        return match.group(0)

    content = re.sub(r'<h2\s+([^>]*)>', h2_repl, content)
    return content

def generate_full_about_page():
    main_content = """
    <!-- 1. HERO SECTION (STANDARDIZED FONT SIZE & FULL-ROUNDED CTAS) -->
    <section class="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-24 border-b border-slate-200 dark:border-slate-800">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>
      
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-sky-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <i class="fas fa-history text-sky-400"></i> Our History & Clinical Mission
        </div>
        
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 uppercase text-center">
          About CareTrust Healthcare
        </h1>

        <p class="text-base sm:text-xl text-slate-200 leading-relaxed font-normal mb-10 max-w-3xl text-center mx-auto">
          Founded by physicians and registered nurses with a singular conviction: the most restorative, dignified, and effective place for clinical healing is in the patient's own home.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto">
          <a href="contact.html" class="w-full sm:w-[220px] px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5">
            <span>Speak with a Nurse</span>
            <i class="fas fa-arrow-right text-xs rtl:rotate-180"></i>
          </a>
          <a href="services.html" class="w-full sm:w-[220px] px-8 py-4 border-2 border-white/80 dark:border-sky-400/80 bg-white/10 dark:bg-slate-900/60 hover:bg-white hover:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-slate-950 text-white font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2.5">
            <span>Explore Services</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 2. MISSION & CLINICAL PHILOSOPHY (DECREASED H2 WEIGHT TO FONT-BOLD) -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
              Our Guiding Philosophy
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-4 mb-6 leading-tight">
              Hospital Standards.<br/>Family Empathy.
            </h2>
            <p class="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
              When acute illness, surgery, or chronic conditions strike, families are often forced to choose between clinical institutions and struggling alone. CareTrust eliminates that sacrifice by delivering hospital-standard nursing, rehabilitation, and compassionate aid in your own home.
            </p>
            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
              Every clinician on our roster undergoes multi-layered screening, ongoing clinical skills validation, and background checks. We operate 24 hours a day, 365 days a year with licensed physician oversight.
            </p>
            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
              <div>
                <div class="text-3xl font-extrabold text-blue-600 dark:text-sky-400">15+</div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-1">Years Operating</div>
              </div>
              <div>
                <div class="text-3xl font-extrabold text-teal-600 dark:text-teal-400">15,000+</div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-1">Families Served</div>
              </div>
              <div>
                <div class="text-3xl font-extrabold text-slate-900 dark:text-white">99.4%</div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <i class="fas fa-heart text-3xl text-rose-500 mb-4"></i>
              <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Compassion First</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Treating every patient with dignity, warmth, and the attentive care we'd want for our own parents.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <i class="fas fa-shield-alt text-3xl text-blue-500 mb-4"></i>
              <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Clinical Rigor</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Hospital infection control, accurate medication titration, and 24/7 RN triage telemetry.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <i class="fas fa-eye text-3xl text-teal-500 mb-4"></i>
              <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Total Transparency</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Real-time EHR portal updates, no hidden fees, and seamless direct physician communication.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <i class="fas fa-award text-3xl text-amber-500 mb-4"></i>
              <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Accredited Quality</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Fully certified with Joint Commission standards and licensed state healthcare regulators.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CLINICAL LEADERSHIP & ADVISORY BOARD -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-100 dark:bg-sky-950/80 px-3.5 py-1 rounded-full">
            Physician Governance
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Clinical Leadership & Medical Governance
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-base mt-3">
            Every clinical protocol and nurse workflow is designed and audited by board-certified physicians and executive nursing directors.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" class="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-blue-500/20 shadow-md" alt="Dr. Marcus Vance">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Dr. Marcus Vance, MD</h3>
            <p class="text-xs text-blue-600 dark:text-sky-400 font-semibold mb-3">Chief Medical Officer • Internal Medicine</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Over 20 years leading hospital-to-home transitional care programs and chronic disease protocols.</p>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600" class="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-teal-500/20 shadow-md" alt="Elena Rostova">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Elena Rostova, RN, BSN</h3>
            <p class="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-3">Director of Nursing • Critical Care</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Directs nurse screening, infusion therapy compliance, and continuous emergency simulation drills.</p>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600" class="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-purple-500/20 shadow-md" alt="Dr. Clara Hayes">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Dr. Clara Hayes, DPT</h3>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-3">Head of In-Home Physical Therapy</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Pioneer in home-based neuro stroke rehabilitation and post-arthroplasty mobility restoration.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. OUR IMPACT & INQUIRE TODAY WRAPPER (SEAMLESS - NO GAP BETWEEN SECTIONS) -->
    <div class="bg-slate-950 text-white m-0 p-0 border-0">
      
      <!-- 4A. OUR IMPACT SECTION -->
      <section class="pt-24 pb-12 bg-slate-950 text-white relative m-0 border-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 border border-sky-800/50 px-3.5 py-1 rounded-full">
            Proven Track Record
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-white mt-4 mb-12 text-center">
            Our Impact
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div class="text-4xl sm:text-5xl font-extrabold text-sky-400 mb-2">50+</div>
              <div class="uppercase tracking-widest text-xs font-bold text-slate-300">Awards & Accreditations</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div class="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">99%</div>
              <div class="uppercase tracking-widest text-xs font-bold text-slate-300">Patient Satisfaction</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div class="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-2">30+</div>
              <div class="uppercase tracking-widest text-xs font-bold text-slate-300">Clinical Specialties</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div class="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-2">0</div>
              <div class="uppercase tracking-widest text-xs font-bold text-slate-300">Hidden Fees</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4B. INQUIRE TODAY SECTION (SEAMLESS CONTINUATION - NO GAP, SAME DARK BACKGROUND) -->
      <section class="pt-6 pb-24 bg-slate-950 text-white relative m-0 border-0">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-white mb-3 text-center">
            Inquire Today
          </h2>
          <p class="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-10">
            Submit your details below and our senior care coordinator will contact you within 15 minutes.
          </p>

          <form class="bg-slate-900/90 p-8 sm:p-10 rounded-3xl shadow-2xl text-left border border-slate-800 space-y-6" onsubmit="alert('Thank you. A CareTrust coordinator will phone you within 15 minutes.'); return false;">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold mb-2 text-slate-300 uppercase tracking-wider">Full Name</label>
                <input type="text" required placeholder="Your Full Name" class="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-400 text-white outline-none text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold mb-2 text-slate-300 uppercase tracking-wider">Phone Number</label>
                <input type="tel" required placeholder="(800) 555-0199" class="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-400 text-white outline-none text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold mb-2 text-slate-300 uppercase tracking-wider">Your Message</label>
              <textarea rows="3" placeholder="Tell us about the patient's condition, diagnosis, or care needs..." class="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-400 text-white outline-none text-sm"></textarea>
            </div>
            <button type="submit" class="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:from-blue-700 hover:to-sky-600 transition-all shadow-lg">
              Submit Request
            </button>
          </form>
        </div>
      </section>

    </div>
    """

    content = get_head("About Us | CareTrust Nursing & Patient Care", "Accredited home healthcare mission, leadership, clinical standards, and track record.") + get_header('about') + f"<main class='flex-grow'>{main_content}</main>" + get_footer()
    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Generated full about.html with seamless Our Impact & Inquire Today sections (zero gap).")

def process_all_pages():
    # List of all html files
    all_files = [f for f in os.listdir('.') if f.endswith('.html')]
    print(f"Processing {len(all_files)} pages for consistent typography...")
    
    # 1. Regenerate about.html with zero gap and standardized typography
    generate_full_about_page()

    # 2. Process all remaining files
    for f in all_files:
        if f == 'about.html':
            continue
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        
        # Apply standardization
        updated = standardize_hero_and_h2(content)
        
        # Specifically check home1 (index.html) to ensure exact class
        if f == 'index.html':
            # Ensure hero h1 has exact consistent font size
            updated = re.sub(
                r'<h1 class="[^"]*text-[^"]*"',
                '<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 uppercase text-center"',
                updated,
                count=1
            )
            # Ensure subtitle has consistent styling
            updated = re.sub(
                r'<p class="text-base sm:text-xl text-slate-200 leading-relaxed font-normal mb-10 max-w-2xl text-center mx-auto">',
                '<p class="text-base sm:text-xl text-slate-200 leading-relaxed font-normal mb-10 max-w-3xl text-center mx-auto">',
                updated
            )
        
        # Specifically check home2.html
        if f == 'home2.html':
            # Ensure hero section is center aligned and matches index.html
            updated = re.sub(
                r'<div class="max-w-3xl">',
                '<div class="max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center">',
                updated,
                count=1
            )
            updated = re.sub(
                r'<h1 class="[^"]*text-[^"]*"',
                '<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 uppercase text-center"',
                updated,
                count=1
            )
            updated = re.sub(
                r'<div class="flex flex-col sm:flex-row gap-4 mb-12">',
                '<div class="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto mb-12">',
                updated,
                count=1
            )

        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(updated)
        print(f"Standardized {f}")

if __name__ == '__main__':
    process_all_pages()
    print("All pages successfully updated with consistent hero font sizes, reduced h2 font weights, and zero-gap sections.")
