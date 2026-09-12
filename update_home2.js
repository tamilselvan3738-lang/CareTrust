const fs = require('fs');

const file = 'home2.html';
const template = fs.readFileSync(file, 'utf8');

const headerSplit = template.split('<main class="flex-grow w-full max-w-[100vw] overflow-hidden">');
const header = headerSplit[0] + '<main class="flex-grow w-full max-w-[100vw] overflow-hidden">\n';
const footerSplit = headerSplit[1].split('</main>');
const footer = '\n</main>' + footerSplit[1];

// 5 Impressive Sections
const sec1 = `
<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b-4 border-navy">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-black/60"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 text-center">
    <span class="inline-block py-2 px-6 rounded-full bg-white/20 text-white border border-white/50 text-sm font-bold uppercase tracking-widest mb-6">Award-Winning Care</span>
    <h1 class="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 uppercase tracking-tight shadow-sm leading-tight">Premium <br/><span class="text-blue-400">Home Nursing</span></h1>
    <p class="text-xl md:text-2xl text-gray-200 font-medium mb-10 max-w-3xl mx-auto">Experience elite, compassionate medical care tailored to your family's needs, delivered right to your doorstep.</p>
    <a href="#inquire" class="inline-block px-10 py-5 bg-white text-navy font-extrabold uppercase tracking-widest text-sm hover:bg-blue-100 hover:scale-105 transition-all shadow-2xl rounded-full">Explore Care Plans</a>
  </div>
</section>`;

const sec2 = `
<section class="py-24 bg-gray-50 text-black">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 text-navy uppercase tracking-widest">Our Elite Services</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div class="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-navy">
        <i class="fas fa-user-nurse text-5xl text-navy mb-6"></i>
        <h3 class="text-2xl font-bold mb-4">24/7 Dedicated RN Care</h3>
        <p class="text-gray-600 leading-relaxed">Continuous, round-the-clock monitoring and advanced clinical care by Registered Nurses for complete peace of mind.</p>
      </div>
      <div class="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-500">
        <i class="fas fa-procedures text-5xl text-blue-500 mb-6"></i>
        <h3 class="text-2xl font-bold mb-4">Post-Operative Recovery</h3>
        <p class="text-gray-600 leading-relaxed">Accelerate healing with specialized wound care, pain management, and mobility assistance directly following surgery.</p>
      </div>
      <div class="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-navy">
        <i class="fas fa-heartbeat text-5xl text-navy mb-6"></i>
        <h3 class="text-2xl font-bold mb-4">Chronic Illness Management</h3>
        <p class="text-gray-600 leading-relaxed">Expert, empathetic management of chronic conditions such as diabetes, COPD, and heart failure at home.</p>
      </div>
    </div>
  </div>
</section>`;

const sec3 = `
<section class="py-24 bg-white text-black overflow-hidden border-y border-gray-200">
  <div class="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
    <div class="w-full lg:w-1/2">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-8 text-navy uppercase tracking-widest leading-tight">Clinical Excellence <br><span class="text-gray-400">Meets Compassion</span></h2>
      <p class="text-xl text-gray-600 leading-relaxed mb-8">We believe that the best healing environment is your own home. Our highly vetted team goes beyond basic medical protocols to provide deep, empathetic care.</p>
      <ul class="space-y-4 font-bold text-lg">
        <li><i class="fas fa-check-circle text-blue-500 mr-3 text-2xl align-middle"></i> Top 1% Caregiver Selection</li>
        <li><i class="fas fa-check-circle text-blue-500 mr-3 text-2xl align-middle"></i> State-of-the-art Medical Protocols</li>
        <li><i class="fas fa-check-circle text-blue-500 mr-3 text-2xl align-middle"></i> Custom Tailored Care Plans</li>
      </ul>
    </div>
    <div class="w-full lg:w-1/2 relative">
      <div class="absolute inset-0 bg-navy translate-x-4 translate-y-4 rounded-3xl"></div>
      <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000" class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl" alt="Clinical Excellence">
    </div>
  </div>
</section>`;

const sec4 = `
<section class="py-24 bg-navy text-white relative border-b-4 border-blue-500">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <h2 class="text-3xl font-extrabold text-center mb-16 uppercase tracking-widest text-blue-300">Trusted By Thousands</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div class="text-6xl font-extrabold mb-2">15+</div>
        <div class="uppercase tracking-widest text-sm font-bold text-gray-300">Years Experience</div>
      </div>
      <div>
        <div class="text-6xl font-extrabold mb-2">10k</div>
        <div class="uppercase tracking-widest text-sm font-bold text-gray-300">Families Served</div>
      </div>
      <div>
        <div class="text-6xl font-extrabold mb-2">500+</div>
        <div class="uppercase tracking-widest text-sm font-bold text-gray-300">Certified Nurses</div>
      </div>
      <div>
        <div class="text-6xl font-extrabold mb-2">24/7</div>
        <div class="uppercase tracking-widest text-sm font-bold text-gray-300">Support Available</div>
      </div>
    </div>
  </div>
</section>`;

const sec5 = `
<section id="inquire" class="py-24 bg-white text-black">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-extrabold mb-6 text-navy uppercase tracking-widest">Request Immediate Care</h2>
    <p class="text-xl text-gray-500 mb-12">Submit your details below and a senior care coordinator will contact you within 15 minutes.</p>
    <form class="bg-gray-50 p-10 rounded-3xl shadow-xl border border-gray-200 text-left">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div><label class="block text-sm font-extrabold mb-3 text-navy uppercase">Full Name</label><input type="text" class="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-navy focus:outline-none transition-colors"></div>
        <div><label class="block text-sm font-extrabold mb-3 text-navy uppercase">Phone Number</label><input type="tel" class="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-navy focus:outline-none transition-colors"></div>
      </div>
      <div class="mb-8"><label class="block text-sm font-extrabold mb-3 text-navy uppercase">Care Requirements</label><textarea class="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-navy focus:outline-none transition-colors h-32"></textarea></div>
      <button type="button" class="w-full py-5 bg-navy text-white font-extrabold text-lg uppercase tracking-widest rounded-xl hover:bg-black transition-colors shadow-lg">Submit Care Request</button>
    </form>
  </div>
</section>`;

const finalHtml = header + sec1 + sec2 + sec3 + sec4 + sec5 + footer;
fs.writeFileSync(file, finalHtml, 'utf8');
console.log('Updated home2.html with 5 impressive sections');
