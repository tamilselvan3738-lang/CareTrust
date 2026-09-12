const fs = require('fs');

// --- 1. LOGIN & REGISTER LOGO FIX ---
['login.html', 'register.html'].forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Ensure logo is CareTrust and not IronPulse
        content = content.replace(/fa-dumbbell/g, 'fa-heartbeat');
        content = content.replace(/Iron<span class="text-primary">Pulse<\/span>/g, 'Care<span class="text-primary">Trust</span>');
        content = content.replace(/IronPulse/g, 'CareTrust');
        // Also update standard logo strings just in case
        content = content.replace(/Iron<span class="text-blue-600">Pulse<\/span>/g, 'Care<span class="text-blue-600">Trust</span>');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated logo in ${file}`);
    }
});

// --- 2. 5 IMPRESSIVE SECTIONS FOR THE 5 PAGES ---
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
    <h2 class="text-4xl font-extrabold mb-6 text-white uppercase tracking-widest">Inquire Today</h2>
    <p class="text-xl text-gray-400 mb-12">Submit your details below and our senior care coordinator will contact you within 15 minutes.</p>
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
    'groupclasses.html': [
        hero('Support & Therapy', 'Empowering patients and families through guided support groups and community wellness sessions.', 'https://images.unsplash.com/photo-1529156069898-49953eb1b5e6?auto=format&fit=crop&q=80&w=2000'),
        grid('Our Programs', [
            {icon:'fas fa-users', title:'Family Support Groups', desc:'Guided sessions for families managing chronic illness or post-operative care.'},
            {icon:'fas fa-brain', title:'Cognitive Therapy', desc:'Group activities designed for seniors with dementia or Alzheimer\'s.'},
            {icon:'fas fa-hands-helping', title:'Grief Counseling', desc:'Compassionate support networks led by certified medical social workers.'}
        ]),
        textImage('Why Group Therapy?', 'Healing isn\'t just physical. Mental and emotional support from peers facing similar health challenges drastically improves overall well-being and recovery speed.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000'),
        textImage('Community Connection', 'Our weekly virtual and local community meetups allow patients and families to share experiences, exchange tips, and build lasting relationships with dedicated medical staff.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
        formSection()
    ],
    'facilities.html': [
        hero('Medical Equipment', 'Hospital-grade care requires hospital-grade equipment. We bring the clinical facility directly to you.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000'),
        grid('Available Equipment', [
            {icon:'fas fa-bed', title:'ICU Beds & Mattresses', desc:'Fully adjustable hospital beds with anti-bedsore air mattresses.'},
            {icon:'fas fa-lungs', title:'Oxygen Concentrators', desc:'High-capacity respiratory support and continuous positive airway pressure machines.'},
            {icon:'fas fa-wheelchair', title:'Mobility Aids', desc:'Advanced wheelchairs, hoists, and physical therapy walkers.'}
        ]),
        textImage('Setting up the ICU at Home', 'For patients needing intensive care, our clinical logistics team transforms your bedroom into a fully functional ICU, complete with vital monitors and emergency response systems.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=2000'),
        textImage('Quality & Safety Standards', 'All equipment is rigorously sterilized, regularly calibrated, and maintained by certified biomedical technicians to guarantee flawless operation when you need it most.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000', true),
        formSection()
    ],
    'pricing.html': [
        hero('Transparent Pricing', 'Clear, straightforward pricing plans with no hidden fees. Quality medical care that fits your budget.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000'),
        grid('Care Plans', [
            {icon:'fas fa-clock', title:'Hourly Rate: $35/hr', desc:'Flexible scheduling, minimum 4 hours. Perfect for basic medical assistance and daily companion care.'},
            {icon:'fas fa-calendar-day', title:'Daily Package: $250/day', desc:'12-hour continuous dedicated care including medication management and monitoring.'},
            {icon:'fas fa-calendar-week', title:'Weekly Plan: $1,600/wk', desc:'Full 7-day coverage with discounted rates. Ideal for post-operative recovery.'}
        ]),
        textImage('Customized Care Plans', 'Every patient is unique. We offer customized billing and care plans designed specifically around the clinical needs and financial capabilities of your family. Only pay for the care you require.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        textImage('Insurance & Financial Aid', 'Our dedicated billing specialists will guide you through the complex process of claiming Medicare, private insurance, or setting up a flexible payment plan.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
        formSection()
    ],
    'faq.html': [
        hero('FAQ', 'Find answers to common questions about our services, clinical processes, pricing, and certified caregivers.', 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&q=80&w=2000'),
        grid('General Questions', [
            {icon:'fas fa-map-marker-alt', title:'What areas do you serve?', desc:'We serve the entire metro region and surrounding counties with rapid dispatch capabilities.'},
            {icon:'fas fa-file-medical', title:'Do I need a doctor\'s order?', desc:'A physician\'s order is only required for specific clinical nursing services, IVs, and therapies.'},
            {icon:'fas fa-moon', title:'Are your services available 24/7?', desc:'Yes, our nurses and care coordinators operate 24 hours a day, 365 days a year.'}
        ]),
        textImage('Caregiver Matching Process', 'We don\'t just assign the next available nurse. We carefully match caregivers to your specific clinical needs, personality preferences, and schedule to ensure a harmonious environment.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        grid('Billing & Insurance', [
            {icon:'fas fa-file-invoice-dollar', title:'Do you bill insurance directly?', desc:'Yes, we handle claims for approved private insurance providers and Medicare.'},
            {icon:'fas fa-receipt', title:'How am I invoiced?', desc:'We send detailed bi-weekly invoices outlining all services and hourly logs.'},
            {icon:'fas fa-times-circle', title:'Are there cancellation fees?', desc:'There are absolutely no fees if services are cancelled at least 24 hours in advance.'}
        ]),
        formSection()
    ],
    'contact.html': [
        hero('Contact Us', 'We are here to help. Reach out for immediate care inquiries, emergency dispatch, or general questions.', 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=2000'),
        grid('Get in Touch', [
            {icon:'fas fa-phone-alt', title:'24/7 Phone Line', desc:'+1 (234) 567-8900 (Emergency dispatch available)'},
            {icon:'fas fa-envelope', title:'Email Inquiries', desc:'care@caretrust.com (Replies within 1 hour)'},
            {icon:'fas fa-building', title:'Main Office', desc:'100 Medical Plaza, Suite 400, Healthcare City'}
        ]),
        textImage('Emergency Admissions', 'If you require immediate post-hospitalization care, our rapid response team can deploy a certified nurse to your home within 4 hours of your initial call to ensure a safe transition.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000'),
        textImage('Our Coverage Area', 'Our network spans across the entire state. With decentralized hubs and local caregivers, we guarantee rapid response times and consistent, reliable care no matter where you live.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000', true),
        formSection()
    ]
};

for (const [file, sections] of Object.entries(pages)) {
    if (fs.existsSync(file)) {
        const finalHtml = header + sections.join('\\n') + footer;
        fs.writeFileSync(file, finalHtml, 'utf8');
        console.log('Updated ' + file);
    } else {
        console.log('File not found: ' + file);
    }
}
