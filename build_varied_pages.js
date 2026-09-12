const fs = require('fs');

const template = fs.readFileSync('index.html', 'utf8');
const headerSplit = template.split('<main class="flex-grow w-full max-w-[100vw] overflow-hidden">');
const header = headerSplit[0] + '<main class="flex-grow w-full max-w-[100vw] overflow-hidden">\n';
const footerSplit = headerSplit[1].split('</main>');
const footer = '\n</main>' + footerSplit[1];

function hero(title, subtitle, img) { 
    return `<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b-4 border-blue-900"><div class="absolute inset-0 bg-[url('${img}')] bg-cover bg-center bg-no-repeat bg-fixed"></div><div class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-black/60"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 text-center"><span class="inline-block py-2 px-6 rounded-full bg-white/20 text-white border border-white/50 text-sm font-bold uppercase tracking-widest mb-6">CareTrust Nursing</span><h1 class="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 uppercase tracking-tight shadow-sm leading-tight">${title}</h1><p class="text-xl md:text-2xl text-gray-200 font-medium mb-10 max-w-3xl mx-auto">${subtitle}</p><a href="#content" class="inline-block px-10 py-5 bg-white text-blue-900 font-extrabold uppercase tracking-widest text-sm hover:bg-blue-100 hover:scale-105 transition-all shadow-2xl rounded-full">Explore More</a></div></section>`; 
}

function grid(title, items) { 
    let itms = items.map(i => `<div class="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-900"><i class="${i.icon} text-5xl text-blue-900 mb-6"></i><h3 class="text-2xl font-bold mb-4 text-black">${i.title}</h3><p class="text-gray-600 leading-relaxed">${i.desc}</p></div>`).join(''); 
    return `<section id="content" class="py-24 bg-gray-50 text-black border-y border-gray-200"><div class="max-w-7xl mx-auto px-4"><h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-900 uppercase tracking-widest">${title}</h2><div class="grid grid-cols-1 md:grid-cols-${Math.min(items.length, 3)} gap-10">${itms}</div></div></section>`; 
}

function textImage(title, text, img, reverse=false) { 
    const o1=reverse?'lg:order-2':'lg:order-1'; 
    const o2=reverse?'lg:order-1':'lg:order-2'; 
    return `<section class="py-24 bg-white text-black overflow-hidden border-y border-gray-200"><div class="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center"><div class="w-full lg:w-1/2 ${o1}"><h2 class="text-4xl md:text-5xl font-extrabold mb-8 text-blue-900 uppercase tracking-widest leading-tight">${title}</h2><p class="text-xl text-gray-600 leading-relaxed">${text}</p></div><div class="w-full lg:w-1/2 ${o2} relative"><div class="absolute inset-0 bg-blue-900 translate-x-4 translate-y-4 rounded-3xl"></div><img src="${img}" class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl" alt="${title}"></div></div></section>`; 
}

function statsGrid(title, stats) { 
    let itms = stats.map(s => `<div><div class="text-6xl font-extrabold mb-2">${s.val}</div><div class="uppercase tracking-widest text-sm font-bold text-gray-300">${s.lbl}</div></div>`).join(''); 
    return `<section class="py-24 bg-gray-900 text-white relative border-y-4 border-blue-500"><div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div><div class="absolute inset-0 bg-black/85"></div><div class="max-w-7xl mx-auto px-4 relative z-10"><h2 class="text-3xl font-extrabold text-center mb-16 uppercase tracking-widest text-blue-400">${title}</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">${itms}</div></div></section>`; 
}

function testimonials(title, reviews) { 
    let itms = reviews.map(r => `<div class="bg-gray-50 p-8 rounded-2xl relative shadow-md border border-gray-200"><i class="fas fa-quote-left text-4xl text-blue-200 absolute top-4 left-4"></i><p class="text-gray-700 italic relative z-10 mb-6 font-medium leading-relaxed pt-6">"${r.quote}"</p><div class="font-extrabold text-blue-900 uppercase tracking-widest text-sm">- ${r.author}</div></div>`).join(''); 
    return `<section class="py-24 bg-white text-black border-y border-gray-200"><div class="max-w-7xl mx-auto px-4"><h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-900 uppercase tracking-widest">${title}</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${itms}</div></div></section>`; 
}

function featureList(title, features, img, reverse=false) { 
    const o1=reverse?'lg:order-2':'lg:order-1'; 
    const o2=reverse?'lg:order-1':'lg:order-2'; 
    let itms = features.map(f => `<li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mt-1 mr-4 text-2xl"></i><div><h4 class="font-extrabold text-xl mb-1">${f.title}</h4><p class="text-gray-600">${f.desc}</p></div></li>`).join(''); 
    return `<section class="py-24 bg-gray-50 text-black border-y border-gray-200"><div class="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center"><div class="w-full lg:w-1/2 ${o2}"><img src="${img}" class="w-full h-auto object-cover rounded-3xl shadow-xl border-4 border-white" alt="Features"></div><div class="w-full lg:w-1/2 ${o1}"><h2 class="text-4xl md:text-5xl font-extrabold mb-10 text-blue-900 uppercase tracking-widest leading-tight">${title}</h2><ul class="space-y-8">${itms}</ul></div></div></section>`; 
}

function cta(title, text) { 
    return `<section class="py-24 bg-blue-900 text-white text-center border-y-4 border-blue-500"><div class="max-w-4xl mx-auto px-4"><h2 class="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-widest">${title}</h2><p class="text-xl mb-12 text-blue-100 font-medium">${text}</p><a href="contact.html" class="inline-block px-12 py-5 bg-white text-blue-900 font-extrabold uppercase tracking-widest rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">Contact Us Today</a></div></section>`; 
}

function formSection() { 
    return `<section class="py-24 bg-gray-900 text-white"><div class="max-w-5xl mx-auto px-4 text-center"><h2 class="text-4xl font-extrabold mb-6 text-white uppercase tracking-widest">Inquire Today</h2><p class="text-xl text-gray-400 mb-12">Submit your details below and our senior care coordinator will contact you within 15 minutes.</p><form class="bg-gray-800 p-10 rounded-3xl shadow-xl text-left border border-gray-700"><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><div><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Full Name</label><input type="text" class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none"></div><div><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Phone Number</label><input type="tel" class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none"></div></div><div class="mb-8"><label class="block text-sm font-extrabold mb-3 text-gray-300 uppercase">Your Message</label><textarea class="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-xl focus:border-blue-500 text-white outline-none h-32"></textarea></div><button type="button" class="w-full py-5 bg-blue-600 text-white font-extrabold text-lg uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors shadow-lg">Submit Request</button></form></div></section>`; 
}

// Ensure exactly 6 sections for EVERY page, but with diverse architectural combinations
const pages = {
    'home2.html': [
        hero('Premium Home Nursing', 'Experience elite, compassionate medical care tailored to your family.', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=2000'),
        featureList('Award Winning Standards', [{title:'Rigorous Vetting', desc:'Only top 5% accepted.'},{title:'Continuous Training', desc:'Monthly clinical updates.'},{title:'Family Portal', desc:'24/7 digital monitoring.'}], 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'),
        statsGrid('Trusted By Thousands', [{val:'15+',lbl:'Years'},{val:'10k',lbl:'Families'},{val:'500+',lbl:'Nurses'},{val:'24/7',lbl:'Support'}]),
        grid('Elite Services', [{icon:'fas fa-user-nurse', title:'24/7 RN Care', desc:'Continuous monitoring.'},{icon:'fas fa-procedures', title:'Post-Op Recovery', desc:'Accelerate healing safely.'},{icon:'fas fa-heartbeat', title:'Chronic Care', desc:'Expert disease management.'}]),
        testimonials('Client Stories', [{quote:'The nurses treated my father like their own.', author:'Sarah M.'},{quote:'Incredible professionalism and warmth.', author:'James P.'},{quote:'They transformed our recovery process.', author:'Elena R.'}]),
        formSection()
    ],
    'about.html': [
        hero('About CareTrust', 'Bringing exceptional healthcare directly into your home.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000'),
        textImage('Our Mission', 'To improve the quality of life for our patients by delivering compassionate, high-quality, and reliable in-home healthcare services.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
        featureList('Why Families Choose Us', [{title:'Clinical Excellence', desc:'Hospital-grade protocols.'},{title:'Deep Compassion', desc:'Empathetic care.'},{title:'Transparency', desc:'Clear communication.'}], 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'),
        grid('Core Values', [{icon:'fas fa-heart', title:'Compassion', desc:'Treating every patient like family.'},{icon:'fas fa-star', title:'Excellence', desc:'High standards.'},{icon:'fas fa-shield-alt', title:'Integrity', desc:'Honest care.'}]),
        statsGrid('Our Impact', [{val:'50+',lbl:'Awards'},{val:'99%',lbl:'Satisfaction'},{val:'30+',lbl:'Specialties'},{val:'0',lbl:'Hidden Fees'}]),
        formSection()
    ],
    'services.html': [
        hero('Our Services', 'Comprehensive in-home medical and companion care.', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=2000&q=80'),
        grid('Medical Care', [{icon:'fas fa-syringe', title:'Post-Surgery Care', desc:'Wound care & pain management.'},{icon:'fas fa-pills', title:'Medication', desc:'Administration & monitoring.'},{icon:'fas fa-band-aid', title:'Wound Dressing', desc:'Sterile changes.'}]),
        textImage('Elderly Companion Care', 'We provide daily assistance with grooming, meal prep, and mobility.', 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=2000'),
        grid('Specialized Therapy', [{icon:'fas fa-crutch', title:'Physiotherapy', desc:'Restoring mobility.'},{icon:'fas fa-comments', title:'Speech Therapy', desc:'Communication help.'},{icon:'fas fa-hands-helping', title:'Occupational', desc:'Daily skills.'}]),
        featureList('Advanced Care', [{title:'24/7 Monitoring', desc:'Round-the-clock observation.'},{title:'ICU Setup', desc:'Hospital beds at home.'}], 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
        cta('Request a Service', 'Let us build a customized care plan for you.')
    ],
    'caregivers.html': [
        hero('Our Caregivers', 'Meet the dedicated professionals making compassionate care a reality.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80'),
        textImage('Rigorous Hiring', 'We hire only the top 5% of applicants after extensive background checks.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        statsGrid('Our Team', [{val:'100%',lbl:'Vetted'},{val:'200+',lbl:'RNs'},{val:'150+',lbl:'Specialists'},{val:'24/7',lbl:'Availability'}]),
        testimonials('What Patients Say', [{quote:'My nurse was a lifesaver.', author:'John K.'},{quote:'They brought so much joy.', author:'Mary S.'},{quote:'Expertise and kindness.', author:'Paul T.'}]),
        featureList('Staff Profiles', [{title:'Registered Nurses', desc:'Complex clinical needs.'},{title:'Certified Assistants', desc:'Daily living support.'}], 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800', true),
        formSection()
    ],
    'nursing.html': [
        hero('Nursing Care', 'Advanced clinical care delivered in the privacy of your own home.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2000&q=80'),
        featureList('Clinical Capabilities', [{title:'IV Therapy', desc:'Intravenous meds.'},{title:'Ventilator Support', desc:'Respiratory care.'},{title:'Catheters', desc:'Maintenance.'}], 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        grid('Disease Management', [{icon:'fas fa-tint', title:'Diabetes', desc:'Insulin & sugar monitoring.'},{icon:'fas fa-heartbeat', title:'Heart Failure', desc:'Symptom management.'},{icon:'fas fa-lungs', title:'COPD', desc:'Oxygen therapy.'}]),
        textImage('ICU at Home', 'We provide hospital-grade equipment for intensive care patients.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', true),
        statsGrid('Care Metrics', [{val:'98%',lbl:'Recovery Rate'},{val:'15m',lbl:'Response Time'},{val:'100%',lbl:'Compliance'},{val:'24',lbl:'Hour Care'}]),
        cta('Consult a Nurse', 'Speak with our clinical director today.')
    ],
    'physiotherapy.html': [
        hero('Physiotherapy', 'Restore your mobility and strength with targeted physical therapy.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2000&q=80'),
        grid('Therapy Focus', [{icon:'fas fa-bone', title:'Orthopedic', desc:'Post-joint recovery.'},{icon:'fas fa-brain', title:'Neurological', desc:'Stroke rehab.'},{icon:'fas fa-heartbeat', title:'Cardio', desc:'Endurance building.'}]),
        textImage('Why In-Home?', 'Traveling to a clinic can be painful. We bring the equipment to you.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800', true),
        testimonials('Success Stories', [{quote:'I can walk without pain again!', author:'Richard L.'},{quote:'The exercises were perfectly tailored.', author:'Susan W.'},{quote:'Regained my independence.', author:'George D.'}]),
        featureList('Our Process', [{title:'Assessment', desc:'Mobility evaluation.'},{title:'Custom Plan', desc:'Tailored regimen.'},{title:'Progression', desc:'Gradual intensity increase.'}], 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
        formSection()
    ],
    'pricing.html': [
        hero('Transparent Pricing', 'Clear pricing plans with no hidden fees.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80'),
        grid('Standard Packages', [{icon:'fas fa-clock', title:'Hourly: $35', desc:'Minimum 4 hours.'},{icon:'fas fa-calendar-day', title:'Daily: $250', desc:'12-hour continuous care.'},{icon:'fas fa-calendar-week', title:'Weekly: $1600', desc:'Full 7-day coverage.'}]),
        statsGrid('Financial Facts', [{val:'100%',lbl:'Transparency'},{val:'0',lbl:'Hidden Fees'},{val:'30+',lbl:'Insurers'},{val:'Flexible',lbl:'Payments'}]),
        featureList('Insurance & Aid', [{title:'Medicare', desc:'Covered for eligible services.'},{title:'Private Insurance', desc:'We work with major providers.'},{title:'Long-Term Care', desc:'Assistance with LTC claims.'}], 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'),
        testimonials('Value Received', [{quote:'Affordable and worth every penny.', author:'Emma S.'},{quote:'They helped with all the insurance paperwork.', author:'David G.'},{quote:'No surprise bills.', author:'Lisa T.'}]),
        cta('Request a Quote', 'Get a detailed, no-obligation cost estimate.')
    ],
    'start.html': [
        hero('How to Start', 'A simple process to get the medical assistance you need.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80'),
        featureList('The 3-Step Process', [{title:'1. Initial Call', desc:'Discuss your needs.'},{title:'2. Assessment', desc:'Clinical evaluation.'},{title:'3. Match & Begin', desc:'Care starts immediately.'}], 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
        grid('What to Prepare', [{icon:'fas fa-folder-open', title:'Medical Records', desc:'Recent discharge papers.'},{icon:'fas fa-pills', title:'Medication List', desc:'Current prescriptions.'},{icon:'fas fa-address-book', title:'Emergency Contacts', desc:'Family phone numbers.'}]),
        textImage('Caregiver Matching', 'We carefully match caregivers to your clinical needs and personality.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'),
        testimonials('Smooth Transitions', [{quote:'They made the transition home so easy.', author:'Kevin B.'},{quote:'Within 24 hours, we had a nurse.', author:'Anna M.'},{quote:'Very organized process.', author:'Tom R.'}]),
        formSection()
    ],
    'faq.html': [
        hero('FAQ', 'Answers to common questions about our services.', 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=2000&q=80'),
        grid('General Questions', [{icon:'fas fa-map', title:'What areas do you serve?', desc:'Entire metro region.'},{icon:'fas fa-file-signature', title:'Need a doctor order?', desc:'Only for clinical nursing.'},{icon:'fas fa-clock', title:'Available 24/7?', desc:'Yes, round-the-clock.'}]),
        textImage('Caregiver Matching', 'We assign nurses based on exact clinical requirements.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
        grid('Billing Questions', [{icon:'fas fa-file-invoice', title:'Direct Billing?', desc:'Yes, for approved insurance.'},{icon:'fas fa-receipt', title:'Invoices?', desc:'Sent bi-weekly.'},{icon:'fas fa-ban', title:'Cancellation Fees?', desc:'None if 24hr notice.'}]),
        testimonials('Reliability', [{quote:'All my questions were answered immediately.', author:'Rachel F.'},{quote:'Very transparent billing.', author:'Sam H.'},{quote:'Excellent customer service.', author:'Linda K.'}]),
        formSection()
    ],
    'contact.html': [
        hero('Contact Us', 'Reach out for immediate care inquiries or general questions.', 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=2000&q=80'),
        grid('Get in Touch', [{icon:'fas fa-phone', title:'24/7 Line', desc:'+1 (234) 567-8900'},{icon:'fas fa-envelope', title:'Email', desc:'care@caretrust.com'},{icon:'fas fa-building', title:'Office', desc:'100 Medical Plaza'}]),
        formSection(),
        textImage('Emergency Admissions', 'Rapid response team can deploy a nurse within 4 hours.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'),
        statsGrid('Our Network', [{val:'5',lbl:'Hubs'},{val:'20+',lbl:'Counties'},{val:'1h',lbl:'Avg Response'},{val:'24',lbl:'Hour Dispatch'}]),
        cta('Request a Callback', 'Leave your number and we will call you.')
    ],
    'groupclasses.html': [
        hero('Support & Therapy', 'Empowering patients through community wellness sessions.', 'https://images.unsplash.com/photo-1529156069898-49953eb1b5e6?auto=format&fit=crop&w=2000&q=80'),
        featureList('Our Programs', [{title:'Family Support', desc:'Guided sessions.'},{title:'Cognitive Therapy', desc:'Dementia activities.'},{title:'Grief Counseling', desc:'Compassionate support networks.'}], 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', true),
        grid('Community Impact', [{icon:'fas fa-users', title:'Peer Support', desc:'Share experiences.'},{icon:'fas fa-heart', title:'Emotional Relief', desc:'Reduce stress.'},{icon:'fas fa-hand-holding-heart', title:'Expert Guidance', desc:'Led by professionals.'}]),
        testimonials('Participant Feedback', [{quote:'The support group saved my sanity.', author:'Jane D.'},{quote:'Great cognitive activities for my dad.', author:'Mark T.'},{quote:'Felt truly heard and understood.', author:'Sarah C.'}]),
        textImage('Why Group Therapy?', 'Mental and emotional support drastically improves physical recovery.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'),
        cta('Join a Session', 'Register for our upcoming virtual meetups.')
    ],
    'facilities.html': [
        hero('Medical Equipment', 'We bring the clinical facility directly to you.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80'),
        textImage('Setting up the ICU', 'We transform your bedroom into a fully functional ICU.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
        featureList('Safety Standards', [{title:'Sterilization', desc:'Rigorously cleaned.'},{title:'Calibration', desc:'Regularly tested.'},{title:'Maintenance', desc:'24/7 tech support.'}], 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'),
        statsGrid('Equipment Specs', [{val:'100%',lbl:'Sterile'},{val:'24/7',lbl:'Tech Support'},{val:'Top',lbl:'Tier Brands'},{val:'Same Day',lbl:'Delivery'}]),
        grid('Available Gear', [{icon:'fas fa-bed', title:'ICU Beds', desc:'Fully adjustable.'},{icon:'fas fa-lungs', title:'Oxygen', desc:'Concentrators.'},{icon:'fas fa-wheelchair', title:'Mobility Aids', desc:'Advanced wheelchairs.'}]),
        formSection()
    ],
    'blog.html': [
        hero('Nursing Insights', 'The latest news, tips, and expert medical advice.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80'),
        grid('Latest Articles', [{icon:'fas fa-newspaper', title:'Post-Op Care', desc:'Essential tips for safe recovery.'},{icon:'fas fa-apple-alt', title:'Senior Diet', desc:'Manage nutrition effectively.'},{icon:'fas fa-running', title:'Mobility Exercises', desc:'Prevent falls.'}]),
        textImage('Featured: Mental Health', 'Why a familiar environment accelerates both physical and mental recovery.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
        testimonials('Reader Feedback', [{quote:'These articles are incredibly helpful.', author:'Caregiver 101'},{quote:'Practical and actionable advice.', author:'Nurse Jane'},{quote:'Shared this with my whole family.', author:'Robert Y.'}]),
        grid('Categories', [{icon:'fas fa-heart', title:'Patient Care', desc:'Daily tips.'},{icon:'fas fa-brain', title:'Mental Health', desc:'Emotional support.'},{icon:'fas fa-utensils', title:'Nutrition', desc:'Diet guides.'}]),
        formSection()
    ],
    'nutrition.html': [
        hero('Patient Nutrition', 'Fueling recovery with medically tailored diet plans.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2000&q=80'),
        featureList('In-Home Meal Prep', [{title:'Custom Planning', desc:'Dietitian designed.'},{title:'Fresh Ingredients', desc:'Locally sourced.'},{title:'Safe Prep', desc:'Strict hygiene protocols.'}], 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', true),
        textImage('Why Nutrition Matters', 'Proper nutrition is the cornerstone of healing and tissue repair.', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80'),
        grid('Specialized Diets', [{icon:'fas fa-heartbeat', title:'Cardiac Care', desc:'Low-sodium plans.'},{icon:'fas fa-cubes', title:'Diabetic Management', desc:'Glycemic control.'},{icon:'fas fa-utensils', title:'Post-Surgical', desc:'High-protein healing.'}]),
        statsGrid('Nutrition Impact', [{val:'40%',lbl:'Faster Healing'},{val:'100%',lbl:'Compliant'},{val:'3',lbl:'Meals/Day'},{val:'0',lbl:'Prep Stress'}]),
        cta('Consult a Dietitian', 'Get a personalized meal plan for your loved one.')
    ]
};

for (const [file, sections] of Object.entries(pages)) {
    if (fs.existsSync(file)) {
        const finalHtml = header + sections.join('\\n') + footer;
        fs.writeFileSync(file, finalHtml, 'utf8');
        console.log('Updated with completely diverse 6-section layout: ' + file);
    }
}
