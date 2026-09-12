const fs = require('fs');

const template = fs.readFileSync('index.html', 'utf8');
// Split by the main tag to inject our custom mains
const headerSplit = template.split('<main class="flex-grow w-full max-w-[100vw] overflow-hidden">');
const header = headerSplit[0] + '<main class="flex-grow w-full max-w-[100vw] overflow-hidden">\n';
const footerSplit = headerSplit[1].split('</main>');
const footer = '\n</main>' + footerSplit[1];

function hero(title, subtitle, img) {
    return `
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b-4 border-navy">
  <div class="absolute inset-0 bg-[url('${img}')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 text-center">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">${title}</h1>
    <p class="text-lg md:text-xl text-gray-200 font-medium mb-10 max-w-3xl mx-auto">${subtitle}</p>
  </div>
</section>`;
}

function grid(title, items) {
    let itemsHtml = items.map(item => `
      <div class="bg-white border-2 border-black p-6 rounded shadow-sm hover:bg-navy hover:text-white transition group">
        <h3 class="text-xl font-bold mb-3">${item.title}</h3>
        <p class="text-sm">${item.desc}</p>
      </div>
    `).join('');
    return `
<section class="py-20 bg-gray-50 border-b border-gray-300 text-black">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12 text-navy uppercase tracking-widest">${title}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${itemsHtml}</div>
  </div>
</section>`;
}

function textImage(title, text, img, reverse=false) {
    const order1 = reverse ? 'lg:order-2' : 'lg:order-1';
    const order2 = reverse ? 'lg:order-1' : 'lg:order-2';
    return `
<section class="py-20 bg-white border-b border-gray-300 text-black">
  <div class="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
    <div class="w-full lg:w-1/2 ${order1}">
      <h2 class="text-3xl font-bold mb-6 text-navy uppercase tracking-widest">${title}</h2>
      <p class="text-lg leading-relaxed">${text}</p>
    </div>
    <div class="w-full lg:w-1/2 ${order2}">
      <img src="${img}" class="w-full h-80 object-cover rounded-xl shadow-lg border-2 border-navy" alt="${title}">
    </div>
  </div>
</section>`;
}

function cta(title, text) {
    return `
<section class="py-20 bg-black text-white text-center border-y-4 border-navy">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-6 uppercase tracking-widest">${title}</h2>
    <p class="text-lg mb-10 text-gray-300">${text}</p>
    <a href="contact.html" class="inline-block px-10 py-4 bg-navy border-2 border-white text-white font-bold uppercase tracking-widest rounded hover:bg-white hover:text-black transition">Get Started</a>
  </div>
</section>`;
}

function formSection() {
    return `
<section class="py-20 bg-white text-black">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-8 text-navy uppercase tracking-widest">Inquire Now</h2>
    <form class="space-y-6 border-2 border-black p-8 rounded shadow-lg bg-gray-50">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label class="block text-sm font-bold mb-2">Name</label><input type="text" class="w-full p-3 border border-gray-400 rounded"></div>
        <div><label class="block text-sm font-bold mb-2">Phone</label><input type="tel" class="w-full p-3 border border-gray-400 rounded"></div>
      </div>
      <div><label class="block text-sm font-bold mb-2">Message / Requirements</label><textarea class="w-full p-3 border border-gray-400 rounded h-32"></textarea></div>
      <button type="button" class="w-full py-4 bg-navy text-white font-bold rounded hover:bg-black transition">Submit Request</button>
    </form>
  </div>
</section>`;
}

// 10 Distinct pages, each with exactly 6 sections
const pagesData = {
    'home2.html': {
        sections: [
            hero('Premium Home Nursing', 'Experience the highest standard of personalized medical care delivered directly to your doorstep.', 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=2000'),
            textImage('Why Choose Us', 'We provide unmatched medical expertise with a compassionate approach. Our team consists of highly qualified registered nurses and caregivers who prioritize patient safety and comfort above all else.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('Our Top Services', [{title:'Post-Operative Care', desc:'Comprehensive recovery support.'},{title:'Elderly Support', desc:'Daily living assistance.'},{title:'Chronic Illness', desc:'Long-term management.'}]),
            textImage('Certified Professionals', 'Every member of our staff undergoes rigorous background checks and continuous medical training to ensure compliance with global healthcare standards.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            cta('Ready for Care?', 'Contact our coordinators today to schedule an initial consultation and assessment.'),
            formSection()
        ]
    },
    'about.html': {
        sections: [
            hero('About CareTrust', 'Learn about our mission, our history, and our unwavering commitment to patient well-being.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80'),
            textImage('Our Mission', 'Our mission is to bring hospital-quality care to the comfort of your home. We believe that healing happens best in familiar surroundings surrounded by loved ones.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('Our Values', [{title:'Compassion', desc:'Treating every patient like family.'},{title:'Integrity', desc:'Honest and transparent communication.'},{title:'Excellence', desc:'Maintaining the highest medical standards.'}]),
            textImage('Our History', 'Founded in 2010, CareTrust has grown from a small local agency to a leading provider of home nursing services, trusted by thousands of families across the region.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            grid('Leadership', [{title:'Dr. Sarah Jenkins', desc:'Chief Medical Officer'},{title:'Mark Dawson', desc:'Director of Nursing'},{title:'Elena Rostova', desc:'Head of Patient Relations'}]),
            cta('Join Our Family', 'Experience the CareTrust difference today.')
        ]
    },
    'services.html': {
        sections: [
            hero('Our Services', 'Comprehensive in-home medical and companion care tailored to your specific needs.', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=2000&q=80'),
            grid('Medical Services', [{title:'Post-Surgery Care', desc:'Wound care, vital monitoring, and pain management.'},{title:'Medication Management', desc:'Timely administration of complex medication regimes.'},{title:'Wound Dressing', desc:'Sterile dressing changes by certified nurses.'}]),
            textImage('Elderly Companion Care', 'We provide daily assistance with grooming, meal prep, light housekeeping, and mobility, ensuring seniors maintain their independence and dignity at home.', 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=2000'),
            grid('Specialized Therapy', [{title:'Physiotherapy', desc:'Restoring mobility and strength.'},{title:'Speech Therapy', desc:'Assistance with communication and swallowing.'},{title:'Occupational Therapy', desc:'Rebuilding daily living skills.'}]),
            textImage('24/7 Monitoring', 'For patients requiring constant supervision, our rotational shifts ensure continuous, awake, and alert monitoring day and night.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
            cta('Request a Service', 'Let us build a customized care plan for you.')
        ]
    },
    'caregivers.html': {
        sections: [
            hero('Our Caregivers', 'Meet the dedicated professionals who make compassionate care a reality every day.', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80'),
            textImage('Rigorous Hiring Process', 'We hire only the top 5% of applicants. Every caregiver undergoes extensive background checks, license verification, and rigorous clinical interviews before joining our team.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('Our Staff Profiles', [{title:'Registered Nurses (RN)', desc:'Handle all clinical and complex medical needs.'},{title:'Licensed Practical Nurses (LPN)', desc:'Assist with routine medical care and monitoring.'},{title:'Certified Nursing Assistants', desc:'Provide personal care and daily living support.'}]),
            textImage('Continuous Training', 'Medicine and care standards are always evolving. Our staff receives monthly continuing education and simulated training to stay at the forefront of patient care.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            grid('Specializations', [{title:'Dementia Care', desc:'Certified Alzheimer\'s support.'},{title:'Cardiac Care', desc:'Post-heart attack recovery.'},{title:'Palliative Care', desc:'End-of-life comfort and support.'}]),
            cta('Need a Caregiver?', 'We will match you with the perfect professional.')
        ]
    },
    'nursing.html': {
        sections: [
            hero('Nursing Care', 'Advanced clinical care delivered in the comfort and privacy of your own home.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2000&q=80'),
            grid('Clinical Services', [{title:'IV Therapy', desc:'At-home intravenous medications and fluids.'},{title:'Ventilator Support', desc:'Management for respiratory patients.'},{title:'Catheter Care', desc:'Insertion, maintenance, and removal.'}]),
            textImage('ICU at Home', 'For stable patients who require intensive monitoring, we provide hospital-grade equipment and specialized critical care nurses to create an ICU environment at home.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('Chronic Disease Management', [{title:'Diabetes Management', desc:'Insulin administration and blood sugar monitoring.'},{title:'Heart Failure', desc:'Fluid monitoring and symptom management.'},{title:'COPD Support', desc:'Oxygen therapy and respiratory care.'}]),
            textImage('Pain Management', 'Our nurses work closely with your physician to administer pain relief effectively and safely, ensuring maximum comfort during recovery or illness.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            cta('Consult a Nurse', 'Speak with our clinical director today.')
        ]
    },
    'physiotherapy.html': {
        sections: [
            hero('Physiotherapy', 'Restore your mobility and strength with targeted, personalized physical therapy sessions.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2000&q=80'),
            textImage('Why In-Home Therapy?', 'Traveling to a clinic can be difficult and painful. Our licensed physiotherapists bring the necessary equipment to you, allowing you to rehabilitate in your real-world environment.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000'),
            grid('Therapy Focus Areas', [{title:'Orthopedic Rehab', desc:'Post-joint replacement and fracture recovery.'},{title:'Neurological Rehab', desc:'Stroke, Parkinson\'s, and MS therapies.'},{title:'Cardiopulmonary', desc:'Building endurance after cardiac events.'}]),
            textImage('Pain & Mobility Management', 'Through manual therapy, prescribed exercises, and modalities like ultrasound or TENS, we help reduce pain and improve your functional mobility safely.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', true),
            grid('Our Process', [{title:'Assessment', desc:'Initial mobility evaluation.'},{title:'Custom Plan', desc:'Tailored exercise regimen.'},{title:'Progression', desc:'Gradual intensity increase.'}]),
            cta('Book a Session', 'Start your rehabilitation journey today.')
        ]
    },
    'pricing.html': {
        sections: [
            hero('Transparent Pricing', 'Clear, straightforward pricing plans with no hidden fees. Quality care that fits your budget.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80'),
            grid('Standard Packages', [{title:'Hourly Rate: $35/hr', desc:'Flexible scheduling, minimum 4 hours.'},{title:'Daily Package: $250/day', desc:'12-hour continuous dedicated care.'},{title:'Weekly Plan: $1,600/wk', desc:'Full 7-day coverage with discounted rates.'}]),
            textImage('Customized Care Plans', 'Every patient is unique. We offer customized billing and care plans designed specifically around the clinical needs and financial capabilities of your family.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('Accepted Insurance', [{title:'Medicare', desc:'Covered for eligible clinical services.'},{title:'Private Insurance', desc:'We work with BlueCross, Aetna, etc.'},{title:'Long-Term Care', desc:'Assistance with LTC policy claims.'}]),
            textImage('Financial Assistance', 'Our billing specialists will guide you through the process of claiming insurance, applying for state aid, or setting up a flexible payment plan.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            cta('Request a Quote', 'Get a detailed, no-obligation cost estimate.')
        ]
    },
    'start.html': {
        sections: [
            hero('How to Start', 'A simple, seamless process to get the medical assistance you need without delay.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80'),
            grid('The 3-Step Process', [{title:'1. Initial Call', desc:'Discuss your needs with a care coordinator.'},{title:'2. Assessment', desc:'A nurse visits to evaluate clinical requirements.'},{title:'3. Match & Begin', desc:'We assign the right caregiver and care starts.'}]),
            textImage('The In-Home Assessment', 'Our clinical director visits your home to assess not just the patient\'s health, but also the safety and accessibility of the home environment to ensure optimal care delivery.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            grid('What to Prepare', [{title:'Medical Records', desc:'Recent hospital discharge papers.'},{title:'Medication List', desc:'Current prescriptions and dosages.'},{title:'Emergency Contacts', desc:'Family and physician phone numbers.'}]),
            textImage('Caregiver Matching', 'We don\'t just assign anyone. We carefully match our caregivers to your clinical needs, personality preferences, and scheduling requirements to ensure a harmonious relationship.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000', true),
            cta('Start Today', 'Call us now or submit an online request.')
        ]
    },
    'faq.html': {
        sections: [
            hero('FAQ', 'Find answers to common questions about our services, pricing, and caregivers.', 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=2000&q=80'),
            grid('General Questions', [{title:'What areas do you serve?', desc:'We serve the entire metro region and surrounding counties.'},{title:'Do I need a doctor\'s order?', desc:'Only for specific clinical nursing services and therapies.'},{title:'Are your services available 24/7?', desc:'Yes, we provide round-the-clock care and support.'}]),
            grid('Caregiver Questions', [{title:'Can I change my caregiver?', desc:'Yes, your comfort is our priority. We can reassign if needed.'},{title:'Are caregivers insured?', desc:'Yes, all staff are fully bonded and insured.'},{title:'Do caregivers drive?', desc:'Some are authorized to provide transportation to appointments.'}]),
            grid('Billing Questions', [{title:'Do you bill insurance directly?', desc:'Yes, we handle claims for approved insurance providers.'},{title:'How am I invoiced?', desc:'We send detailed bi-weekly invoices.'},{title:'Are there cancellation fees?', desc:'No fees if cancelled 24 hours in advance.'}]),
            textImage('Still have questions?', 'Our dedicated support team is available during normal business hours to address any unique concerns or specific medical requirements you might have.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'),
            formSection()
        ]
    },
    'contact.html': {
        sections: [
            hero('Contact Us', 'We are here to help. Reach out for immediate care inquiries or general questions.', 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=2000&q=80'),
            grid('Get in Touch', [{title:'Phone', desc:'+1 (234) 567-8900 (Available 24/7)'},{title:'Email', desc:'care@caretrust.com'},{title:'Office', desc:'100 Medical Plaza, Suite 400'}]),
            textImage('Emergency Admissions', 'If you require immediate post-hospitalization care, our rapid response team can deploy a certified nurse to your home within 4 hours of your initial call.', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000'),
            grid('Office Hours', [{title:'Monday - Friday', desc:'8:00 AM - 6:00 PM'},{title:'Saturday', desc:'9:00 AM - 2:00 PM'},{title:'Clinical Support', desc:'24/7 on-call nurse line.'}]),
            formSection(),
            cta('Request a Callback', 'Leave your number and we will call you within 15 minutes.')
        ]
    }
};

for (const [file, data] of Object.entries(pagesData)) {
    const sectionsHtml = data.sections.join('\\n');
    const finalHtml = header + sectionsHtml + footer;
    fs.writeFileSync(file, finalHtml, 'utf8');
    console.log('Generated custom page: ' + file);
}
