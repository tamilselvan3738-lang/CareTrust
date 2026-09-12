const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const desktop_links_old = `<a href="about.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">About</a>
            <a href="blog.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Blog</a>
            <a href="nutrition.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Nutrition</a>
            <a href="groupclasses.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Group Classes</a>
            <a href="facilities.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Facilities</a>
            <a href="pricing.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Pricing</a>
            <a href="faq.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">FAQ</a>
            <a href="contact.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Contact</a>`;

const desktop_links_new = `<a href="about.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">About Us</a>
            <a href="services.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Services</a>
            <a href="caregivers.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Caregivers</a>
            <a href="nursing.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Nursing Care</a>
            <a href="physiotherapy.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Physiotherapy</a>
            <a href="pricing.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Pricing</a>
            <a href="start.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">How to Start</a>
            <a href="faq.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">FAQ</a>
            <a href="contact.html" class="text-xs uppercase tracking-[0.1em] font-medium text-dark-bg dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary/10">Contact</a>`;

const mobile_links_old = `<a href="about.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">About</a>
          <a href="blog.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Blog</a>
          <a href="nutrition.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Nutrition</a>
          <a href="groupclasses.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Group Classes</a>
          <a href="facilities.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Facilities</a>
          <a href="pricing.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Pricing</a>
          <a href="faq.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">FAQ</a>
          <a href="contact.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Contact</a>`;

const mobile_links_new = `<a href="about.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">About Us</a>
          <a href="services.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Services</a>
          <a href="caregivers.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Caregivers</a>
          <a href="nursing.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Nursing Care</a>
          <a href="physiotherapy.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Physiotherapy</a>
          <a href="pricing.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Pricing</a>
          <a href="start.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">How to Start</a>
          <a href="faq.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">FAQ</a>
          <a href="contact.html" class="block py-4 border-b border-gray-200 dark:border-white/10 text-dark-bg dark:text-white hover:text-primary text-xs uppercase tracking-widest font-medium">Contact</a>`;

const new_main = `<main class="flex-grow w-full max-w-[100vw] overflow-hidden">
    <!-- 1. HERO SECTION -->
    <section class="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/60"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
        <div class="animate-fade-in max-w-3xl">
          <span class="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/50 text-xs font-medium uppercase tracking-widest mb-6">Patient Safety Certified</span>
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-medium leading-tight tracking-tight text-white mb-6 uppercase">
            Compassionate Care.<br/>
            <span class="text-transparent bg-clip-text bg-gradient-primary">In Your Own Home.</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed font-medium mb-10 max-w-2xl">
            Our trustworthy caregivers and registered nurses provide top-tier home nursing, ensuring patient safety, comfort, and peace of mind.
          </p>
          <div class="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
            <a href="contact.html" class="w-full sm:w-[240px] px-8 py-4 border-2 border-transparent bg-gradient-primary text-white font-medium uppercase tracking-widest text-sm transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,0,128,0.4)] rounded-full text-center flex items-center justify-center">
              Inquire Now <i class="fas fa-arrow-right ml-2"></i>
            </a>
            <a href="services.html" class="w-full sm:w-[240px] px-8 py-4 border-2 border-white/50 text-white hover:border-white hover:bg-white hover:text-dark-bg font-medium uppercase tracking-widest text-sm transition-all duration-300 rounded-full text-center flex items-center justify-center">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. SERVICES SECTION -->
    <section class="py-20 md:py-28 bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-medium text-dark-bg dark:text-white uppercase tracking-tight mb-4">
            Our <span class="text-primary">Services</span>
          </h2>
          <div class="w-24 h-1.5 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <i class="fas fa-user-md text-lg text-primary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">Post-Surgery Care</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">Professional assistance to ensure a smooth and safe recovery at home following major procedures.</p>
          </div>
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
              <i class="fas fa-hands-helping text-lg text-secondary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">Elderly Companion</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">Daily assistance, companionship, and emotional support for seniors living independently.</p>
          </div>
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <i class="fas fa-crutch text-lg text-primary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">Physiotherapy</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">In-home physical therapy assistance to restore mobility, strength, and daily function safely.</p>
          </div>
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
              <i class="fas fa-band-aid text-lg text-secondary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">Wound Dressing</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">Expert wound care, cleaning, and dressing changes by certified healthcare professionals.</p>
          </div>
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <i class="fas fa-pills text-lg text-primary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">Medication Management</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">Timely administration and continuous monitoring of prescribed medications by trained staff.</p>
          </div>
          <div class="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary p-6 transition-all duration-300 group shadow-sm rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
              <i class="fas fa-heartbeat text-lg text-secondary group-hover:text-white"></i>
            </div>
            <h3 class="text-base font-bold text-dark-bg dark:text-white uppercase mb-2">24/7 Monitoring</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">Round-the-clock observation and care for patients with critical or advanced medical needs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CAREGIVERS OVERVIEW -->
    <section class="py-20 md:py-28 bg-white dark:bg-[#172033] border-b border-gray-200 dark:border-primary/20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-16 items-center">
          <div class="w-full lg:w-1/2">
            <div class="relative rounded-xl overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" alt="Caregivers" class="w-full h-full object-cover">
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <h2 class="text-3xl md:text-5xl font-extrabold text-dark-bg dark:text-white uppercase tracking-tight mb-4">
              Nurse & <span class="text-primary">Caregiver</span> Qualifications
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mb-8 text-sm font-medium max-w-md">
              Our team goes through rigorous vetting and continuous training. We ensure every member meets the highest standards of medical safety and compassionate care.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5"><i class="fas fa-certificate text-primary text-xs"></i></div>
                <div><h4 class="text-xs font-bold text-dark-bg dark:text-white uppercase mb-1">Registered Nurses (RN)</h4><p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Licensed professionals for complex needs.</p></div>
              </div>
              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-secondary/10 flex-shrink-0 flex items-center justify-center mt-0.5"><i class="fas fa-id-card text-secondary text-xs"></i></div>
                <div><h4 class="text-xs font-bold text-dark-bg dark:text-white uppercase mb-1">Certified Caregivers</h4><p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Specialists in daily personal assistance.</p></div>
              </div>
              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-secondary/10 flex-shrink-0 flex items-center justify-center mt-0.5"><i class="fas fa-shield-alt text-secondary text-xs"></i></div>
                <div><h4 class="text-xs font-bold text-dark-bg dark:text-white uppercase mb-1">Background Checked</h4><p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Comprehensive security screening.</p></div>
              </div>
              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5"><i class="fas fa-book-medical text-primary text-xs"></i></div>
                <div><h4 class="text-xs font-bold text-dark-bg dark:text-white uppercase mb-1">Continuous Training</h4><p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Regular updates on patient safety protocols.</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. PRICING SECTION -->
    <section class="py-20 md:py-28 bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-extrabold text-dark-bg dark:text-white uppercase tracking-tight mb-4">
            Care <span class="text-primary">Packages</span>
          </h2>
          <div class="w-24 h-1.5 bg-gradient-primary mx-auto rounded-full mb-6"></div>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium max-w-2xl mx-auto">Transparent pricing options to fit your family's care schedule and budget.</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <!-- Hourly -->
          <div class="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full md:w-1/2 text-center">
            <h3 class="text-xl font-bold text-dark-bg dark:text-white uppercase mb-4">Hourly Rate</h3>
            <p class="text-5xl font-bold text-primary mb-6">$35 <span class="text-lg text-gray-500 dark:text-gray-400">/ hr</span></p>
            <ul class="text-left space-y-4 mb-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              <li><i class="fas fa-check text-primary mr-2"></i> Minimum 4 hours</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Flexible scheduling</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Basic medical assistance</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Daily companion care</li>
            </ul>
            <a href="contact.html" class="block w-full py-3 bg-gray-100 dark:bg-gray-800 text-dark-bg dark:text-white uppercase font-bold text-xs tracking-widest rounded-full hover:bg-primary hover:text-white transition-colors">Select Plan</a>
          </div>
          <!-- Daily -->
          <div class="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-2xl border-2 border-primary w-full md:w-1/2 text-center relative">
            <div class="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center"><span class="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</span></div>
            <h3 class="text-xl font-bold text-dark-bg dark:text-white uppercase mb-4">Daily Package</h3>
            <p class="text-5xl font-bold text-primary mb-6">$250 <span class="text-lg text-gray-500 dark:text-gray-400">/ day</span></p>
            <ul class="text-left space-y-4 mb-8 text-sm font-medium text-gray-600 dark:text-gray-300">
              <li><i class="fas fa-check text-primary mr-2"></i> 12-hour continuous care</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Dedicated caregiver</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Full medication management</li>
              <li><i class="fas fa-check text-primary mr-2"></i> Advanced monitoring</li>
            </ul>
            <a href="contact.html" class="block w-full py-3 bg-gradient-primary text-white uppercase font-bold text-xs tracking-widest rounded-full hover:shadow-lg transition-all">Select Plan</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. HOW TO START -->
    <section class="py-20 md:py-28 bg-white dark:bg-[#172033] border-b border-gray-200 dark:border-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-5xl font-extrabold text-dark-bg dark:text-white uppercase tracking-tight mb-4">
          HOW TO <span class="text-primary">START</span>
        </h2>
        <div class="w-24 h-1.5 bg-gradient-primary mx-auto rounded-full mb-12"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="relative">
            <div class="w-16 h-16 mx-auto bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">1</div>
            <h4 class="text-sm font-bold text-dark-bg dark:text-white uppercase mb-2">Initial Consultation</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Contact us to discuss your specific care requirements and patient medical history.</p>
          </div>
          <div class="relative">
            <div class="w-16 h-16 mx-auto bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">2</div>
            <h4 class="text-sm font-bold text-dark-bg dark:text-white uppercase mb-2">Personalized Plan</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">We design a customized care plan tailored to your health and lifestyle needs.</p>
          </div>
          <div class="relative">
            <div class="w-16 h-16 mx-auto bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">3</div>
            <h4 class="text-sm font-bold text-dark-bg dark:text-white uppercase mb-2">Begin Care</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Our matched caregiver arrives at your home to provide trusted assistance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CONTACT -->
    <section class="py-20 md:py-28 bg-gray-50 dark:bg-dark-bg">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-5xl font-extrabold text-dark-bg dark:text-white uppercase tracking-tight mb-4">
            IMMEDIATE <span class="text-primary">INQUIRY</span>
          </h2>
          <div class="w-24 h-1.5 bg-gradient-primary mx-auto rounded-full mb-6"></div>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Request care today and a coordinator will contact you within 1 hour.</p>
        </div>
        <form class="bg-white dark:bg-[#1f2937] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-dark-bg dark:text-white uppercase mb-2">Full Name</label>
              <input type="text" class="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-dark-bg dark:text-white p-3 rounded text-sm focus:border-primary focus:outline-none transition-colors">
            </div>
            <div>
              <label class="block text-xs font-bold text-dark-bg dark:text-white uppercase mb-2">Phone Number</label>
              <input type="tel" class="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-dark-bg dark:text-white p-3 rounded text-sm focus:border-primary focus:outline-none transition-colors">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-dark-bg dark:text-white uppercase mb-2">Required Services</label>
            <select class="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-dark-bg dark:text-white p-3 rounded text-sm focus:border-primary focus:outline-none transition-colors">
              <option>Post-Surgery Care</option>
              <option>Elderly Companion</option>
              <option>Physiotherapy Assistance</option>
              <option>Wound Dressing</option>
              <option>Medication Management</option>
            </select>
          </div>
          <button type="button" class="w-full py-4 bg-gradient-primary text-white font-bold uppercase tracking-widest text-xs rounded shadow-lg hover:shadow-xl transition-all">Submit Request</button>
        </form>
      </div>
    </section>
  </main>`;

for (const file of files) {
    try {
        let content = fs.readFileSync(file, 'utf-8');

        // Replace config colors
        content = content.replace(/'primary':\s*'#EF4444'/g, "'primary': '#000080'");
        content = content.replace(/'secondary':\s*'#F97316'/g, "'secondary': '#000000'");
        content = content.replace(/'gradient-primary':\s*'linear-gradient\(to right, #EF4444, #F97316\)'/g, "'gradient-primary': 'linear-gradient(to right, #000080, #000000)'");

        // Titles
        content = content.replace(/IronPulse \| Transform Your Body/g, "CareTrust | Home Nursing & Patient Care");
        content = content.replace(/IronPulse/g, "CareTrust");
        content = content.replace(/Iron<span class="text-primary">Pulse<\/span>/g, "Care<span class=\"text-primary\">Trust</span>");
        content = content.replace(/fa-dumbbell/g, "fa-heartbeat");
        content = content.replace(/© 2026 IronPulse Fitness/g, "© 2026 CareTrust Nursing");

        // Navigation links replace
        if (content.includes(desktop_links_old)) {
            content = content.replace(desktop_links_old, desktop_links_new);
        }
        if (content.includes(mobile_links_old)) {
            content = content.replace(mobile_links_old, mobile_links_new);
        }

        // Remove dashboard menus
        content = content.replace(/<!-- Dashboard Dropdown -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
        content = content.replace(/<div class="border-b border-gray-200 dark:border-white\/10 flex flex-col">\s*<div class="w-full flex items-center justify-between py-4">\s*<span class="text-xs uppercase tracking-widest font-medium text-dark-bg dark:text-white">Dashboard<\/span>[\s\S]*?<\/div>\s*<\/div>/, '');

        // Replace Main section
        content = content.replace(/<main[\s\S]*?<\/main>/, new_main);

        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.error(`Error processing ${file}: ${e}`);
    }
}
