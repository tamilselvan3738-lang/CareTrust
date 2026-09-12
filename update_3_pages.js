const fs = require('fs');

// --- FIX HOME2 VISIBILITY ---
let home2 = fs.readFileSync('home2.html', 'utf8');
const badSec = `<section class="py-24 bg-navy text-white relative border-b-4 border-blue-500">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <h2 class="text-3xl font-extrabold text-center mb-16 uppercase tracking-widest text-blue-300">Trusted By Thousands</h2>`;
    
const fixedSec = `<section class="py-24 bg-gray-900 text-white relative border-b-4 border-blue-500">
  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
  <div class="absolute inset-0 bg-black/80"></div>
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <h2 class="text-3xl font-extrabold text-center mb-16 uppercase tracking-widest text-blue-400">Trusted By Thousands</h2>`;

if(home2.includes("opacity-10")) {
    home2 = home2.replace(badSec, fixedSec);
    fs.writeFileSync('home2.html', home2, 'utf8');
    console.log("Fixed home2.html visibility!");
}


// --- REBUILD ABOUT, BLOG, NUTRITION ---
const template = fs.readFileSync('index.html', 'utf8');
const headerSplit = template.split('<main class="flex-grow w-full max-w-[100vw] overflow-hidden">');
const header = headerSplit[0] + '<main class="flex-grow w-full max-w-[100vw] overflow-hidden">\n';
const footerSplit = headerSplit[1].split('</main>');
const footer = '\n</main>' + footerSplit[1];

function hero(title, subtitle, img) {
    return `
<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b-4 border-blue-900">
  <div class="absolute inset-0 bg-[url('${img}')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-black/60"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 text-center">
    <span class="inline-block py-2 px-6 rounded-full bg-white/20 text-white border border-white/50 text-sm font-bold uppercase tracking-widest mb-6">CareTrust Nursing</span>
    <h1 class="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 uppercase tracking-tight shadow-sm leading-tight">${title}</h1>
    <p class="text-xl md:text-2xl text-gray-200 font-medium mb-10 max-w-3xl mx-auto">${subtitle}</p>
    <a href="#content" class="inline-block px-10 py-5 bg-white text-blue-900 font-extrabold uppercase tracking-widest text-sm hover:bg-blue-100 hover:scale-105 transition-all shadow-2xl rounded-full">Learn More</a>
  </div>
</section>`;
}

function grid(title, items) {
    let itemsHtml = items.map(item => `
      <div class="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-900">
        <i class="${item.icon} text-5xl text-blue-900 mb-6"></i>
        <h3 class="text-2xl font-bold mb-4 text-black">${item.title}</h3>
        <p class="text-gray-600 leading-relaxed">${item.desc}</p>
      </div>
    `).join('');
    return `
<section id="content" class="py-24 bg-gray-50 text-black">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-900 uppercase tracking-widest">${title}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">${itemsHtml}</div>
  </div>
</section>`;
}

function textImage(title, text, img, reverse=false) {
    const order1 = reverse ? 'lg:order-2' : 'lg:order-1';
    const order2 = reverse ? 'lg:order-1' : 'lg:order-2';
    return `
<section class="py-24 bg-white text-black overflow-hidden border-y border-gray-200">
  <div class="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
    <div class="w-full lg:w-1/2 ${order1}">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-8 text-blue-900 uppercase tracking-widest leading-tight">${title}</h2>
      <p class="text-xl text-gray-600 leading-relaxed">${text}</p>
    </div>
    <div class="w-full lg:w-1/2 ${order2} relative">
      <div class="absolute inset-0 bg-blue-900 translate-x-4 translate-y-4 rounded-3xl"></div>
      <img src="${img}" class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl" alt="${title}">
    </div>
  </div>
</section>`;
}

function formSection() {
    return `
<section class="py-24 bg-gray-900 text-white">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-extrabold mb-6 text-white uppercase tracking-widest">Request More Information</h2>
    <p class="text-xl text-gray-400 mb-12">Submit your details below and our team will get back to you shortly.</p>
    <form class="bg-gray-800 p-10 rounded-3xl shadow-xl text-left border border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Full Name</label><input type="text" class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none"></div>
        <div><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Phone Number</label><input type="tel" class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none"></div>
      </div>
      <div class="mb-8"><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Your Message</label><textarea class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none h-32"></textarea></div>
      <button type="button" class="w-full py-5 bg-blue-600 text-white font-extrabold text-lg uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors shadow-lg">Submit Request</button>
    </form>
  </div>
</section>`;
}

const pages = {
    'about.html': [
        hero('About CareTrust', 'Dedicated to bringing exceptional healthcare directly into your home with unmatched compassion and expertise.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000'),
        textImage('Our Mission', 'To improve the quality of life for our patients by delivering compassionate, high-quality, and reliable in-home healthcare services. We believe that true healing takes place when patients feel safe, respected, and deeply cared for in their own familiar environment.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        grid('Our Core Values', [
            {icon:'fas fa-heart', title:'Compassion', desc:'We treat every patient like our own family, bringing warmth to every visit.'},
            {icon:'fas fa-star', title:'Excellence', desc:'We hold ourselves to the highest clinical and professional standards.'},
            {icon:'fas fa-shield-alt', title:'Integrity', desc:'Honest communication and unwavering transparency with families.'}
        ]),
        textImage('Our History', 'Since our founding, CareTrust has proudly served thousands of families, growing from a small team of passionate nurses to a premier regional network of healthcare professionals dedicated to transforming in-home care.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
        formSection()
    ],
    'blog.html': [
        hero('Nursing Insights', 'The latest news, tips, and expert medical advice on home healthcare, senior living, and patient recovery.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000'),
        grid('Latest Articles', [
            {icon:'fas fa-newspaper', title:'Post-Op Care Guide', desc:'Essential tips for a safe and speedy recovery at home following major surgery.'},
            {icon:'fas fa-apple-alt', title:'Senior Diet Planning', desc:'How to manage nutrition effectively for elderly patients with chronic conditions.'},
            {icon:'fas fa-running', title:'Mobility Exercises', desc:'Simple daily movements to maintain strength and prevent falls in the home.'}
        ]),
        textImage('Featured: Mental Health', 'Why a familiar environment accelerates both physical and mental recovery. Our clinical research highlights the profound impact of family proximity and familiar surroundings on recovery timelines.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
        textImage('Expert Advice Series', 'Every week, our senior Registered Nurses answer your most pressing questions about medication management, wound care, and communicating effectively with your primary physician.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', true),
        formSection()
    ],
    'nutrition.html': [
        hero('Patient Nutrition', 'Fueling recovery and promoting long-term health with medically tailored, in-home diet plans.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000'),
        textImage('Why Nutrition Matters', 'Proper nutrition is the cornerstone of healing. Our registered dietitians work alongside your nursing team to design meal plans that support tissue repair, boost immunity, and manage chronic symptoms.', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80'),
        grid('Specialized Diets', [
            {icon:'fas fa-heartbeat', title:'Cardiac Care', desc:'Low-sodium, heart-healthy plans designed to manage hypertension and recovery.'},
            {icon:'fas fa-cubes', title:'Diabetic Management', desc:'Strict glycemic control meals to stabilize blood sugar safely.'},
            {icon:'fas fa-utensils', title:'Post-Surgical Healing', desc:'High-protein diets tailored to accelerate wound healing and tissue regeneration.'}
        ]),
        textImage('In-Home Meal Prep', 'Our caregivers are specially trained to prepare balanced, delicious, and strictly medically-compliant meals right in your kitchen, taking the stress of dietary planning off your family\'s shoulders.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', true),
        formSection()
    ]
};

for (const [file, sections] of Object.entries(pages)) {
    const finalHtml = header + sections.join('\\n') + footer;
    fs.writeFileSync(file, finalHtml, 'utf8');
    console.log('Updated ' + file);
}
