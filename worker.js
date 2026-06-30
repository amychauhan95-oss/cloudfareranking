// _worker.js - Complete single file deployment

const TOTAL_JOBS = 2000000;
const JOBS_PER_PAGE = 20;
const TOTAL_SITEMAPS = 2000;
const SITE_URL = 'https://usa-remote-jobs.pages.dev';

// ── HTML RENDERER ─────────────────────────────────────────────────────────────
function renderHTML({ title, meta, bodyContent, schema, canonical }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${meta}"/>
${canonical ? `<link rel="canonical" href="${SITE_URL}${canonical}"/>` : ''}
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${meta}"/>
<meta property="og:type" content="website"/>
<meta name="robots" content="index, follow"/>
${schema ? `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>` : ''}
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f6fb;color:#1a1a2e;line-height:1.6}
a{color:inherit;text-decoration:none}
nav{background:#0a2540;color:#fff;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:62px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(0,0,0,.2)}
.brand{font-size:1.2rem;font-weight:800;letter-spacing:-.5px}
.brand .accent{color:#00d4aa}
.nav-links{display:flex;gap:1.5rem;font-size:.85rem}
.nav-links a{color:rgba(255,255,255,.8);transition:color .2s}
.nav-links a:hover{color:#00d4aa}
.hero{background:linear-gradient(135deg,#0a2540 0%,#1a3a5c 50%,#0d4f6b 100%);color:#fff;padding:3.5rem 1.5rem;text-align:center}
.hero h1{font-size:clamp(1.8rem,4.5vw,3rem);font-weight:900;margin-bottom:.75rem;letter-spacing:-.5px}
.hero h1 .accent{color:#00d4aa}
.hero p{font-size:1.05rem;opacity:.85;max-width:620px;margin:0 auto 1.75rem}
.hero-form{display:flex;gap:.75rem;max-width:620px;margin:0 auto;flex-wrap:wrap}
.hero-form input,.hero-form select{flex:1;min-width:170px;padding:.75rem 1rem;border-radius:10px;border:none;font-size:.9rem;outline:none}
.hero-form button{padding:.75rem 1.75rem;background:#00d4aa;color:#0a2540;border:none;border-radius:10px;font-weight:800;font-size:.9rem;cursor:pointer;white-space:nowrap}
.hero-form button:hover{background:#00b899}
.stat-bar{display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap;margin-top:2rem}
.stat strong{display:block;font-size:1.6rem;color:#00d4aa;font-weight:900}
.stat span{font-size:.78rem;opacity:.75}
.filter-row{background:#fff;border-bottom:1px solid #e8ecf0;padding:.65rem 1.5rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
.filter-wrap{max-width:960px;margin:0 auto;display:flex;gap:.5rem;flex-wrap:wrap;width:100%}
.chip{padding:.35rem .9rem;border:1.5px solid #d0d8e4;border-radius:20px;font-size:.78rem;cursor:pointer;background:#fff;transition:all .2s;white-space:nowrap;font-weight:500}
.chip.active,.chip:hover{background:#0a2540;color:#fff;border-color:#0a2540}
.container{max-width:960px;margin:0 auto;padding:1.5rem}
.page-grid{display:grid;gap:1rem}
.job-card{background:#fff;border-radius:14px;padding:1.4rem 1.6rem;border:1.5px solid #e8ecf0;transition:border-color .2s,box-shadow .2s;display:flex;flex-direction:column;gap:.8rem}
.job-card:hover{border-color:#00d4aa;box-shadow:0 4px 20px rgba(0,212,170,.1)}
.card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap}
.card-title{font-size:1.05rem;font-weight:700;color:#0a2540;margin-bottom:.2rem}
.card-co{font-size:.88rem;color:#556}
.badges{display:flex;gap:.4rem;flex-wrap:wrap}
.badge{padding:.25rem .7rem;border-radius:20px;font-size:.72rem;font-weight:600;white-space:nowrap}
.b-remote{background:#e0faf4;color:#006b55}
.b-type{background:#ede9fe;color:#5b21b6}
.b-exp{background:#fef3c7;color:#92400e}
.card-meta{display:flex;gap:1rem;flex-wrap:wrap;font-size:.82rem;color:#667}
.card-desc{font-size:.84rem;color:#556;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}
.salary{font-weight:700;color:#0a2540;font-size:.9rem}
.btn-apply{padding:.5rem 1.25rem;background:#0a2540;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:.83rem;cursor:pointer;transition:background .2s}
.btn-apply:hover{background:#00d4aa;color:#0a2540}
.job-detail{background:#fff;border-radius:14px;padding:2rem;border:1.5px solid #e8ecf0}
.job-detail h1{font-size:1.65rem;font-weight:800;color:#0a2540;margin-bottom:.4rem}
.detail-meta{display:flex;gap:.75rem;flex-wrap:wrap;margin:1rem 0;padding:1rem 0;border-top:1px solid #f0f3f8;border-bottom:1px solid #f0f3f8}
.d-chip{padding:.38rem 1rem;border-radius:8px;font-size:.82rem;font-weight:600;background:#f4f6fb;color:#334}
.d-chip.hi{background:#e0faf4;color:#006b55}
.detail-body{font-size:.9rem;color:#445;line-height:1.85;white-space:pre-line;margin:1.5rem 0}
.apply-box{background:#f4f6fb;border-radius:12px;padding:1.5rem;text-align:center;border:2px dashed #d0d8e4}
.apply-box h3{color:#0a2540;margin-bottom:.4rem}
.apply-box p{font-size:.85rem;color:#667;margin-bottom:1rem}
.btn-big{padding:.85rem 2.5rem;background:#00d4aa;color:#0a2540;border:none;border-radius:10px;font-weight:800;font-size:1rem;cursor:pointer}
.btn-big:hover{background:#00b899}
.pagination{display:flex;justify-content:center;gap:.4rem;margin:2rem 0;flex-wrap:wrap}
.pagination a,.pagination span{padding:.5rem .9rem;border-radius:8px;border:1.5px solid #e0e6ee;font-size:.85rem;background:#fff}
.pagination a:hover{border-color:#00d4aa;color:#006b55}
.pagination .cur{background:#0a2540;color:#fff;border-color:#0a2540}
.bc{font-size:.82rem;color:#889;margin-bottom:1rem}
.bc a{color:#00a080}
.info-box{background:#fff;border-radius:12px;padding:1.2rem 1.5rem;border-left:4px solid #00d4aa;margin-bottom:1rem;font-size:.88rem}
footer{background:#0a2540;color:rgba(255,255,255,.65);text-align:center;padding:1.5rem;font-size:.82rem;margin-top:3rem}
footer a{color:#00d4aa}
.remote-banner{background:#e0faf4;border:1.5px solid #00d4aa;border-radius:10px;padding:.6rem 1rem;display:inline-flex;align-items:center;gap:.5rem;font-size:.82rem;font-weight:600;color:#006b55;margin-bottom:1rem}
@media(max-width:600px){.hero-form{flex-direction:column}.stat-bar{gap:1.25rem}.card-top{flex-direction:column}}
</style>
</head>
<body>
<nav>
  <a class="brand" href="/"><span class="accent">USA</span>RemoteJobs.io</a>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/jobs">Browse Jobs</a>
    <a href="/jobs?type=fulltime">Full-time</a>
    <a href="/jobs?type=contract">Contract</a>
    <a href="/sitemap">Sitemap</a>
  </div>
</nav>
${bodyContent}
<footer>
  &copy; 2025 USARemoteJobs.io — <strong>2,000,000 Remote Jobs</strong> — Open to Applicants Worldwide |
  <a href="/jobs">Browse All</a> · <a href="/jobs?type=fulltime">Full-time</a> · <a href="/jobs?type=contract">Contract</a> · <a href="/sitemap">Sitemap</a>
</footer>
<script>
function openApply(title){
  window.open('https://remotejob09.job4intern.com/pages/job-application','_blank','noopener,noreferrer');
}
</script>
</body>
</html>`;
}

// ── Job Data ──────────────────────────────────────────────────────────────────
const jobTitles = [
  'Software Engineer','Senior Software Engineer','Staff Software Engineer','Principal Software Engineer',
  'Frontend Developer','Senior Frontend Developer','Backend Developer','Senior Backend Developer',
  'Full Stack Developer','Senior Full Stack Developer','Lead Software Engineer','Software Architect',
  'iOS Developer','Android Developer','Mobile Developer','React Native Developer',
  'DevOps Engineer','Senior DevOps Engineer','Site Reliability Engineer','Platform Engineer',
  'Cloud Engineer','AWS Solutions Architect','Azure Cloud Engineer','GCP Engineer',
  'Data Engineer','Senior Data Engineer','Machine Learning Engineer','AI Engineer',
  'Deep Learning Engineer','NLP Engineer','Computer Vision Engineer','MLOps Engineer',
  'Blockchain Developer','Smart Contract Developer','Web3 Developer','Solidity Developer',
  'Embedded Systems Engineer','Firmware Engineer','Systems Engineer','QA Engineer',
  'Automation Test Engineer','SDET','Performance Engineer','Security Engineer',
  'Cybersecurity Engineer','Penetration Tester','Application Security Engineer','InfoSec Engineer',
  'Game Developer','Unity Developer','Unreal Engine Developer','Graphics Programmer',
  'Database Engineer','DBA','PostgreSQL DBA','MySQL DBA','NoSQL Engineer',
  'API Developer','Microservices Engineer','Integration Engineer','ETL Developer',
  'Data Scientist','Senior Data Scientist','Principal Data Scientist','Data Analyst',
  'Senior Data Analyst','Business Intelligence Analyst','BI Developer','Analytics Engineer',
  'Quantitative Analyst','Research Scientist','Applied Scientist','ML Researcher',
  'Data Architect','Big Data Engineer','Spark Engineer','Kafka Engineer',
  'Product Manager','Senior Product Manager','Principal Product Manager','Group Product Manager',
  'Product Designer','Senior Product Designer','UX Designer','UI Designer','UX Researcher',
  'UX/UI Designer','Design Lead','Creative Director','Visual Designer','Interaction Designer',
  'Brand Designer','Motion Designer','Graphic Designer','Web Designer',
  'Digital Marketing Manager','SEO Specialist','SEM Specialist','Content Strategist',
  'Content Writer','Copywriter','Technical Writer','Social Media Manager',
  'Email Marketing Specialist','Growth Hacker','Performance Marketer','Demand Gen Manager',
  'Product Marketing Manager','Brand Manager','Marketing Analyst','CRO Specialist',
  'Account Executive','Senior Account Executive','Enterprise Account Executive',
  'Sales Development Representative','Business Development Manager','Partnerships Manager',
  'Customer Success Manager','Customer Success Engineer','Solutions Engineer','Sales Engineer',
  'Financial Analyst','Senior Financial Analyst','FP&A Analyst','Accounting Manager',
  'Controller','CFO','Revenue Operations Manager','Sales Operations Analyst',
  'Operations Manager','Project Manager','Program Manager','Scrum Master','Agile Coach',
  'Technical Recruiter','Senior Recruiter','Talent Acquisition Manager','HR Manager',
  'People Operations Manager','Compensation Analyst','L&D Specialist',
  'Customer Support Specialist','Technical Support Engineer','Support Team Lead',
  'Legal Counsel','Privacy Counsel','Compliance Manager','Risk Analyst',
  'Clinical Data Manager','Bioinformatics Scientist','Health Informatics Analyst',
  'Medical Writer','Regulatory Affairs Specialist','Clinical Research Associate'
];

const companies = [
  'Google','Meta','Apple','Amazon','Microsoft','Netflix','Spotify','Shopify','Stripe',
  'Airbnb','Uber','Lyft','Twitter','LinkedIn','Salesforce','Slack','Zoom','Dropbox',
  'GitHub','GitLab','Atlassian','Twilio','Cloudflare','Fastly','Datadog','Splunk',
  'HashiCorp','MongoDB','Elastic','Redis Labs','Snowflake','Databricks','Palantir',
  'Figma','Canva','Notion','Airtable','Asana','Monday.com','ClickUp','Linear',
  'HubSpot','Zendesk','Intercom','Freshworks','ServiceNow','Workday','Rippling',
  'Gusto','BambooHR','Lattice','Culture Amp','Greenhouse','Lever','Workable',
  'Coinbase','Kraken','Chainalysis','OpenSea','Alchemy','Consensys','Circle',
  'OpenAI','Anthropic','Cohere','Hugging Face','Scale AI','Weights & Biases',
  'Robinhood','Brex','Ramp','Plaid','Marqeta','Affirm','Klarna','Chime',
  'DoorDash','Instacart','Rappi','Deliveroo','Postmates','GoPuff',
  'Peloton','Calm','Headspace','Noom','Hims','Ro','Forward','Carbon Health',
  'Duolingo','Coursera','Udemy','Chegg','Kahoot','Quizlet','Masterclass',
  'Twitch','Discord','Reddit','Pinterest','Snap','TikTok','Bytedance',
  'Palantir','Anduril','Shield AI','Rebellion Defense','Samsara','Matterport',
  'Waymo','Cruise','Aurora','Rivian','Lucid Motors','Bird','Lime',
  'SpaceX','Relativity Space','Planet Labs','Rocket Lab','Astranis',
  'Vercel','Netlify','Supabase','PlanetScale','Neon','Railway','Render',
  'Grafana','New Relic','PagerDuty','OpsGenie','StatusPage','Incident.io',
  'Auth0','Okta','CrowdStrike','SentinelOne','Snyk','Wiz','Lacework',
  'Carta','Equity Bee','AngelList','Gust','Visible','Landscape',
  'Loom','Miro','Whimsical','Lucidchart','Storybook','Chromatic',
  'Postman','Insomnia','RapidAPI','Kong','Apigee','MuleSoft',
  'dbt Labs','Airbyte','Fivetran','Segment','mParticle','Rudderstack',
  'LaunchDarkly','Split.io','Optimizely','Amplitude','Mixpanel','Heap',
  'Contentful','Sanity','Strapi','Ghost','WordPress VIP','Webflow',
  'Algolia','Typesense','Elasticsearch','Solr','Meilisearch'
];

const usaStates = [
  'Remote — California, USA','Remote — New York, USA','Remote — Texas, USA',
  'Remote — Washington, USA','Remote — Florida, USA','Remote — Illinois, USA',
  'Remote — Massachusetts, USA','Remote — Colorado, USA','Remote — Georgia, USA',
  'Remote — Virginia, USA','Remote — North Carolina, USA','Remote — Oregon, USA',
  'Remote — Arizona, USA','Remote — Nevada, USA','Remote — Michigan, USA',
  'Remote — Pennsylvania, USA','Remote — Ohio, USA','Remote — Minnesota, USA',
  'Remote — Utah, USA','Remote — Tennessee, USA','Remote — Wisconsin, USA',
  'Remote — Maryland, USA','Remote — Connecticut, USA','Remote — Indiana, USA',
  'Remote — Missouri, USA','Remote — Kansas, USA','Remote — New Jersey, USA',
  'Fully Remote — USA','Fully Remote — Worldwide','Remote — Austin, TX',
  'Remote — San Francisco, CA','Remote — New York City, NY','Remote — Seattle, WA',
  'Remote — Boston, MA','Remote — Chicago, IL','Remote — Denver, CO',
  'Remote — Atlanta, GA','Remote — Los Angeles, CA','Remote — Miami, FL'
];

const industries = [
  'Software & SaaS','FinTech','HealthTech','EdTech','E-Commerce','Cybersecurity',
  'Artificial Intelligence','Blockchain & Web3','Cloud Computing','DevTools',
  'Marketing Tech','HR Tech','LegalTech','PropTech','InsurTech','Gaming',
  'Media & Entertainment','Social Media','Logistics & Supply Chain',
  'Autonomous Vehicles','Space Tech','Clean Energy','BioTech','Data & Analytics'
];

const jobTypes = ['Full-time','Contract','Part-time','Freelance','Full-time Contract'];

const experienceLevels = [
  'Entry Level (0-2 yrs)','Mid Level (2-5 yrs)','Senior Level (5-8 yrs)',
  'Lead / Staff (8+ yrs)','Principal / Director (10+ yrs)'
];

const salaryRanges = [
  '$45,000 – $65,000/yr','$60,000 – $85,000/yr','$80,000 – $110,000/yr',
  '$100,000 – $140,000/yr','$130,000 – $170,000/yr','$150,000 – $200,000/yr',
  '$180,000 – $240,000/yr','$200,000 – $280,000/yr','$60 – $80/hr','$80 – $120/hr',
  '$120 – $160/hr','$160 – $200/hr','Competitive + Equity','$90,000 – $130,000/yr',
  '$110,000 – $150,000/yr','$70,000 – $100,000/yr'
];

const allCountries = [
  'United States','United Kingdom','Canada','Australia','Germany','France','Netherlands',
  'Sweden','Norway','Denmark','Finland','Switzerland','Austria','Belgium','Ireland',
  'Spain','Portugal','Italy','Poland','Czech Republic','Romania','Hungary','Bulgaria',
  'Croatia','Slovakia','Slovenia','Estonia','Latvia','Lithuania','Greece','Cyprus',
  'Malta','Luxembourg','Iceland','Liechtenstein','Monaco','San Marino',
  'Brazil','Argentina','Chile','Colombia','Mexico','Peru','Uruguay','Ecuador',
  'Costa Rica','Panama','Paraguay','Bolivia','Venezuela','Honduras','Guatemala',
  'India','Pakistan','Bangladesh','Sri Lanka','Nepal','Philippines','Vietnam',
  'Thailand','Indonesia','Malaysia','Singapore','South Korea','Japan','China',
  'Taiwan','Hong Kong','Myanmar','Cambodia','Laos','Mongolia','Bhutan',
  'Nigeria','Kenya','South Africa','Ghana','Egypt','Morocco','Tunisia','Ethiopia',
  'Tanzania','Uganda','Rwanda','Senegal','Cameroon','Ivory Coast','Mozambique',
  'New Zealand','Fiji','Papua New Guinea','Samoa','Tonga',
  'Israel','UAE','Saudi Arabia','Jordan','Lebanon','Turkey','Georgia','Armenia',
  'Ukraine','Russia','Kazakhstan','Uzbekistan','Belarus','Serbia','Albania',
  'Bosnia and Herzegovina','North Macedonia','Kosovo','Montenegro','Moldova'
];

const descTemplates = [
  (title, company, industry) => `${company} is hiring a ${title} to join our fully remote team. We're a fast-growing ${industry} company building products used by millions worldwide.

**What You'll Do:**
• Design, build, and maintain scalable systems and features
• Collaborate with cross-functional teams across multiple time zones
• Write clean, well-tested, production-ready code
• Participate in code reviews and architectural discussions
• Mentor junior team members and contribute to engineering culture

**Requirements:**
• 3+ years of relevant experience in a similar role
• Strong problem-solving skills and attention to detail
• Experience working in agile/scrum environments
• Excellent written and verbal communication skills (remote-first team)
• Passion for building products that make a real difference

**Benefits:**
• Fully remote — work from anywhere in the world
• Competitive salary + equity package
• Health, dental, and vision insurance
• $2,000 home office stipend
• Unlimited PTO + 15 company holidays
• 401(k) with company match
• Annual learning & development budget of $1,500
• Team retreats twice a year`,

  (title, company, industry) => `Join ${company} as a ${title} and help us revolutionize the ${industry} space. This is a 100% remote position open to candidates worldwide.

**About the Role:**
As a ${title}, you will be a key player in our engineering/product organization. You'll work closely with our team to ship high-quality features and drive impact across our platform.

**Responsibilities:**
• Lead end-to-end development of major product features
• Partner with product managers, designers, and stakeholders
• Own technical quality and reliability of your domain
• Drive technical direction and best practices
• Contribute to our inclusive, remote-first engineering culture

**What We're Looking For:**
• Proven track record in a ${title} or similar role
• Strong technical foundation and eagerness to learn
• High ownership mentality — you see problems and fix them
• Async communication skills (we're remote-first)
• Experience with modern tools and workflows

**Perks & Compensation:**
• Market-competitive compensation + equity
• Remote-first culture with async flexibility
• Full benefits package (health, dental, vision)
• $1,500/year learning budget
• 4-day workweek option available
• Paid parental leave (16 weeks)`,

  (title, company, industry) => `${company} (${industry}) is looking for a talented ${title} to work remotely and help us scale our platform to the next level.

**The Mission:**
We're on a mission to transform the ${industry} industry. As a ${title}, you'll be central to achieving that goal by building reliable, performant, and user-loved products.

**Day-to-Day:**
• Ship features end-to-end with high quality and speed
• Work asynchronously with teammates across time zones
• Participate in planning, estimation, and retrospectives
• Proactively identify and resolve technical debt
• Collaborate with design, product, and data teams

**You Should Have:**
• Experience in a ${title} role or equivalent
• Strong attention to craft — you care about quality
• Comfort working independently in a remote environment
• Clear communication and documentation habits
• A growth mindset and eagerness to level up

**Why ${company}:**
• Truly remote-first (we've been remote since day one)
• Transparent culture with open salary bands
• Top-tier compensation and meaningful equity
• Flexible hours — own your schedule
• 30 days paid vacation globally
• Monthly wellness stipend ($150/mo)
• Latest MacBook Pro + accessories provided`
];

function pick(arr, seed) { 
  return arr[Math.abs(seed) % arr.length]; 
}

function getPostedDate(id) {
  const daysAgo = (id % 540);
  const d = new Date('2025-01-01');
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function getValidThrough(postedDate) {
  const d = new Date(postedDate);
  d.setDate(d.getDate() + 90);
  return d.toISOString().split('T')[0];
}

function getJobData(id) {
  const s1 = id * 7 + 13;
  const s2 = id * 11 + 97;
  const s3 = id * 17 + 53;
  const s4 = id * 23 + 31;
  const s5 = id * 29 + 71;
  const s6 = id * 37 + 19;
  const s7 = id * 41 + 83;

  const title    = pick(jobTitles, s1);
  const company  = pick(companies, s2);
  const location = pick(usaStates, s3);
  const industry = pick(industries, s4);
  const jobType  = pick(jobTypes, s5);
  const experience = pick(experienceLevels, s6);
  const salary   = pick(salaryRanges, s7);
  const postedDate = getPostedDate(id);
  const descFn   = pick(descTemplates, id * 3 + 7);
  const description = descFn(title, company, industry);

  return { 
    id, title, company, location, industry, jobType, 
    experience, salary, postedDate, description, isRemote: true 
  };
}

function getJobSchema(job) {
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedDate,
    "validThrough": getValidThrough(job.postedDate),
    "employmentType": job.jobType === 'Full-time' ? 'FULL_TIME'
                    : job.jobType === 'Part-time' ? 'PART_TIME'
                    : job.jobType === 'Contract' || job.jobType === 'Full-time Contract' ? 'CONTRACTOR'
                    : 'OTHER',
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": allCountries.map(country => ({
      "@type": "Country",
      "name": country
    })),
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "YEAR"
      }
    },
    "experienceRequirements": job.experience,
    "industry": job.industry,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Job ID",
      "value": `USA-${String(job.id).padStart(7, '0')}`
    }
  };
}

// ── Cloudflare Worker ──────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const searchParams = url.searchParams;
    const siteUrl = env.SITE_URL || 'https://usa-remote-jobs.pages.dev';
    
    // ── HOME PAGE ─────────────────────────────────────────────────────────────────
    if (path === '/') {
      const featuredIds = [1,100,500,1000,5000,10000,50000,100000];
      const featuredJobs = featuredIds.map(id => getJobData(id));

      const cards = featuredJobs.map(job => `
<a href="/jobs/${job.id}" style="display:block">
<div class="job-card">
  <div class="card-top">
    <div><div class="card-title">${job.title}</div><div class="card-co">${job.company}</div></div>
    <div class="badges">
      <span class="badge b-remote">🌐 Remote</span>
      <span class="badge b-type">${job.jobType}</span>
    </div>
  </div>
  <div class="card-meta">
    <span>📍 ${job.location}</span>
    <span>🏭 ${job.industry}</span>
    <span>📅 ${job.postedDate}</span>
  </div>
  <div class="card-desc">${job.description.substring(0,180)}...</div>
  <div class="card-foot">
    <span class="salary">${job.salary}</span>
    <button class="btn-apply" onclick="event.preventDefault();openApply('${job.title.replace(/'/g,"\\'")}')">Apply Now</button>
  </div>
</div>
</a>`).join('');

      const schema = {
        "@context":"https://schema.org",
        "@type":"WebSite",
        "name":"USARemoteJobs.io",
        "url": siteUrl,
        "description":"2,000,000 remote job listings — USA-based companies, open to applicants worldwide",
        "potentialAction":{"@type":"SearchAction","target":`${siteUrl}/jobs?q={search_term_string}`,"query-input":"required name=search_term_string"}
      };

      const body = `
<div class="hero">
  <h1>2 Million <span class="accent">Remote Jobs</span> — USA Companies</h1>
  <p>Work from anywhere in the world. All jobs are 100% remote, posted by top US companies, open to global applicants.</p>
  <form action="/jobs" method="get" class="hero-form">
    <input name="q" type="text" placeholder="Job title, skill, or company..."/>
    <select name="type">
      <option value="">All Types</option>
      <option value="fulltime">Full-time</option>
      <option value="contract">Contract</option>
      <option value="parttime">Part-time</option>
    </select>
    <button type="submit">Search Jobs →</button>
  </form>
  <div class="stat-bar">
    <div class="stat"><strong>2,000,000</strong><span>Remote Jobs</span></div>
    <div class="stat"><strong>150+</strong><span>Top US Companies</span></div>
    <div class="stat"><strong>100+</strong><span>Countries Welcome</span></div>
    <div class="stat"><strong>200+</strong><span>Job Categories</span
