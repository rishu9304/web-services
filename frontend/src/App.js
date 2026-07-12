import React, { useState } from 'react';
import './App.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqgrnnl';

const services = [
  {
    title: 'Business Websites',
    description:
      'Professional, mobile-friendly websites that clearly explain your services, build trust, and help customers contact you.',
    points: ['Service pages', 'Lead capture', 'SEO foundations'],
    accent: 'bg-blue-100 text-blue-700',
    href: '/website-design-development.html'
  },
  {
    title: 'E-commerce Development',
    description:
      'Online stores and product catalogs designed for smooth browsing, secure checkout flows, and easier business management.',
    points: ['Storefronts', 'Payments', 'Admin workflows'],
    accent: 'bg-indigo-100 text-indigo-700',
    href: '/website-design-development.html'
  },
  {
    title: 'Custom Web Applications',
    description:
      'Dashboards, portals, SaaS MVPs, internal tools, and business systems built around your workflows and users.',
    points: ['SaaS MVPs', 'Portals', 'Dashboards'],
    accent: 'bg-cyan-100 text-cyan-700',
    href: '/custom-software-development.html'
  },
  {
    title: 'Backend API Development',
    description:
      'Reliable APIs, integrations, databases, and backend systems that connect your product, team, and business operations.',
    points: ['APIs', 'Integrations', 'Databases'],
    accent: 'bg-emerald-100 text-emerald-700',
    href: '/api-development.html'
  },
  {
    title: 'AI & Automation',
    description:
      'Practical automation for repetitive tasks, internal workflows, reporting, customer support, and business operations.',
    points: ['Workflow automation', 'AI tools', 'Reporting'],
    accent: 'bg-purple-100 text-purple-700',
    href: '/technical-consulting.html'
  },
  {
    title: 'Website Maintenance',
    description:
      'Ongoing updates, fixes, monitoring, content changes, backups, and support after your website or software goes live.',
    points: ['Bug fixes', 'Updates', 'Support'],
    accent: 'bg-pink-100 text-pink-700',
    href: '/technical-consulting.html'
  },
  {
    title: 'Performance Optimization',
    description:
      'Improve slow websites and applications with speed audits, caching, technical fixes, and better user experience.',
    points: ['Speed audits', 'SEO readiness', 'Reliability fixes'],
    accent: 'bg-orange-100 text-orange-700',
    href: '/cloud-infrastructure-consulting.html'
  },
  {
    title: 'Cloud Deployment',
    description:
      'Launch and operate products on AWS or the right cloud infrastructure with deployment, monitoring, and scaling basics.',
    points: ['AWS consulting', 'Cloud setup', 'Monitoring'],
    accent: 'bg-teal-100 text-teal-700',
    href: '/cloud-infrastructure-consulting.html'
  }
];

const capabilities = [
  'Business Websites',
  'E-commerce',
  'Website Design',
  'Web Applications',
  'APIs',
  'AI & Automation',
  'Maintenance',
  'AWS Consulting',
  'Cloud Deployment'
];

const proofPoints = [
  {
    value: 'Experienced engineers',
    label: 'A flexible team across multiple technologies and product needs'
  },
  {
    value: 'Clear milestones',
    label: 'Transparent communication, scope, estimates, and delivery checkpoints'
  },
  {
    value: 'Long-term support',
    label: 'Launch help, maintenance, improvements, and support after delivery'
  }
];

const whyChoose = [
  'Experienced engineers across multiple technologies',
  'Transparent communication from start to finish',
  'Cost-effective without compromising quality',
  'Scalable team based on project needs',
  'Long-term support after launch'
];

const processSteps = [
  {
    title: 'Discovery Call',
    description:
      'We understand your business, goals, users, timeline, budget, and what success should look like.'
  },
  {
    title: 'Requirement Analysis',
    description:
      'We turn the idea into clear features, priorities, workflows, technical needs, and acceptance criteria.'
  },
  {
    title: 'Proposal & Timeline',
    description:
      'You get a transparent plan with scope, milestones, delivery timeline, and estimated investment.'
  },
  {
    title: 'Design & Development',
    description:
      'We design and build the product with regular updates, reviews, and visible progress.'
  },
  {
    title: 'Testing & Quality Assurance',
    description:
      'We test important flows, responsiveness, performance, edge cases, and production readiness before launch.'
  },
  {
    title: 'Launch',
    description:
      'We deploy the website or software, configure the basics, and make sure the handover is clear.'
  },
  {
    title: 'Ongoing Support',
    description:
      'We stay available for fixes, improvements, maintenance, and new feature development after launch.'
  }
];

const industries = [
  'Healthcare',
  'Education',
  'Restaurants',
  'Retail',
  'Real Estate',
  'Manufacturing',
  'Startups',
  'Professional Services'
];

const clientReasons = [
  'Clear communication',
  'Fixed milestones',
  'Secure development practices',
  'Modern technologies',
  'Responsive support',
  'Focus on long-term relationships'
];

const featuredProjects = [
  {
    title: 'Business Website',
    description:
      'A professional service website with clear positioning, service pages, contact flow, and SEO foundation.'
  },
  {
    title: 'E-commerce Store',
    description:
      'A product storefront with catalog, checkout planning, admin workflows, and customer-focused design.'
  },
  {
    title: 'Inventory Management System',
    description:
      'A dashboard for tracking stock, updates, reports, alerts, and operational visibility.'
  },
  {
    title: 'CRM',
    description:
      'A customer management tool for leads, follow-ups, status tracking, and internal team workflows.'
  },
  {
    title: 'AI Automation Tool',
    description:
      'A workflow assistant for reducing manual tasks, generating reports, and improving response speed.'
  }
];

const technicalTrust = [
  {
    title: 'Fast and scalable backend systems',
    description: 'So your product can support real users and business growth.'
  },
  {
    title: 'Secure cloud deployments',
    description: 'So your website or software is easier to launch, monitor, and maintain.'
  },
  {
    title: 'Mobile-friendly websites',
    description: 'So customers can browse and contact you easily from any device.'
  },
  {
    title: 'SEO-ready development',
    description: 'So Google can understand and index your pages more effectively.'
  },
  {
    title: 'Modern UI/UX',
    description: 'So your product feels trustworthy, clear, and easy to use.'
  },
  {
    title: 'Reliable APIs',
    description: 'So systems, apps, and business tools can communicate cleanly.'
  }
];

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'Every project is unique. After understanding your goals and requirements, we provide a detailed proposal with transparent pricing, milestones, and timelines.'
  },
  {
    question: 'How long does development take?',
    answer:
      'A simple business website can take a few weeks, while custom software or web applications depend on scope. We break work into milestones so progress stays visible.'
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Yes. We can help with fixes, maintenance, updates, monitoring, performance improvements, and new features after launch.'
  },
  {
    question: 'Can you improve an existing website?',
    answer:
      'Yes. We can review your existing website, improve messaging, redesign pages, fix performance issues, add SEO foundations, or rebuild it if needed.'
  },
  {
    question: 'Can you sign an NDA?',
    answer:
      'Yes. If your idea, product, or business process is confidential, we can discuss NDA requirements before starting detailed discovery.'
  },
  {
    question: 'Do I own the source code?',
    answer:
      'Yes. Ownership and handover expectations are clarified in the proposal. Our goal is to make sure you can maintain and grow the product after launch.'
  },
  {
    question: 'Can you work with international clients?',
    answer:
      'Yes. We can work remotely with businesses across locations using clear milestones, written communication, scheduled calls, and transparent delivery updates.'
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We are technology-flexible. We can work with the stack your product needs or help choose the right approach based on budget, performance, maintenance, and future growth.'
  }
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          message: `*New lead from The Easy Build*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Contact:* ${formData.contact || 'N/A'}\n*Project:* ${formData.query}`
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message was sent successfully. We will reach out within 24 hours.'
        });
        setFormData({ name: '', email: '', contact: '', query: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus({
          type: 'error',
          message: errorData.error || 'Unable to send message right now. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please check your network connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <nav className="site-nav">
        <div className="container nav-inner">
          <a href="#home" className="brand" aria-label="The Easy Build home">
            The Easy Build
          </a>
          <div className="nav-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#why-choose" className="nav-link">Why Us</a>
            <a href="#process" className="nav-link">Process</a>
            <a href="#founder" className="nav-link">Founder</a>
            <a href="#contact" className="nav-link nav-cta">Get a Quote</a>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-background">
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
              alt="Modern software engineering workspace"
              className="hero-bg-image"
            />
            <div className="hero-overlay"></div>
          </div>

          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow">Building software should not be complicated</p>
              <h1 className="hero-title">
                Software Development Made Easy
              </h1>
              <p className="hero-description">
                We help startups and businesses build websites, web applications, and custom software with experienced engineers, clear communication, transparent milestones, and dependable delivery from idea to launch.
              </p>
              <p className="brand-statement">
                The Easy Build simplifies software development by combining experienced engineering, transparent communication, and reliable delivery.
              </p>

              <div className="hero-buttons">
                <a href="#contact" className="btn-primary">
                  Get Free Consultation
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <a href="#contact" className="btn-white">
                  Get a Quote
                </a>
              </div>

              <div className="hero-stack" aria-label="Core capabilities">
                {capabilities.slice(0, 8).map((capability) => (
                  <span key={capability}>{capability}</span>
                ))}
              </div>
            </div>

            <div className="hero-panel" aria-label="Service highlights">
              <div className="panel-label">The Easy Build promise</div>
              <div className="panel-list">
                <div>
                  <strong>Experienced engineers</strong>
                  <span>We connect your project with the right engineering capability for the work.</span>
                </div>
                <div>
                  <strong>Transparent delivery</strong>
                  <span>Clear scope, milestones, updates, and estimates before and during the build.</span>
                </div>
                <div>
                  <strong>Quality with affordability</strong>
                  <span>Cost-effective delivery without sacrificing reliability, security, or long-term value.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Why clients choose The Easy Build">
          <div className="container proof-grid">
            {proofPoints.map((item) => (
              <div className="proof-item" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section-padding bg-gray-50">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Services</p>
              <h2 className="section-title">Services that make your business easier to build and grow.</h2>
              <p className="section-description">
                We do more than say “website development.” We break the work into clear services so you know exactly how we can help.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className={`service-icon ${service.accent}`}>
                    <span>{service.title.charAt(0)}</span>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-points">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a className="service-link" href={service.href}>
                    Learn more
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose" className="section-padding">
          <div className="container split-section">
            <div>
              <p className="eyebrow dark">Why choose The Easy Build?</p>
              <h2 className="section-title text-left">Reliable software delivery with clarity from start to finish.</h2>
              <p className="section-description text-left">
                We act like a consulting partner, not just a development vendor. Our focus is helping your business succeed with the right digital solution, clear decisions, and dependable execution.
              </p>
            </div>

            <div className="approach-card">
              <p className="card-kicker">What makes us different</p>
              <h3>Simple process. Experienced engineers. Dependable delivery.</h3>
              <ul>
                {whyChoose.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-padding cloud-section">
          <div className="container">
            <div className="cloud-content">
              <p className="eyebrow">Why clients work with us</p>
              <h2 className="section-title light">Trust without fake testimonials.</h2>
              <p className="section-description light">
                We do not use made-up testimonials. Until real client stories are available, we explain the working principles clients can expect on every project.
              </p>

              <div className="consulting-grid">
                {clientReasons.map((reason) => (
                  <div className="consulting-pill" key={reason}>
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="section-padding bg-gray-50">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Process</p>
              <h2 className="section-title">Our process makes the work predictable.</h2>
              <p className="section-description">
                People trust companies when they understand how work will be done. These are the steps we use to reduce confusion and keep projects moving.
              </p>
            </div>

            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-card" key={step.title}>
                  <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Industries</p>
              <h2 className="section-title">Industries we can serve.</h2>
              <p className="section-description">
                Every industry has different workflows, customers, and constraints. We adapt the build around the business context.
              </p>
            </div>

            <div className="pill-grid">
              {industries.map((industry) => (
                <div className="industry-pill" key={industry}>
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="section-padding bg-gray-50">
          <div className="container split-section">
            <div>
              <p className="eyebrow dark">Meet the founder</p>
              <h2 className="section-title text-left">Built from real software delivery experience.</h2>
              <p className="section-description text-left">
                The Easy Build was started with a simple belief: building software should be easier for business owners. The goal is to bring enterprise and product-engineering discipline into a clear, cost-effective, and approachable consulting partner for startups and growing businesses.
              </p>
            </div>

            <div className="founder-card">
              <p className="card-kicker">Founder focus</p>
              <h3>Reliable software, clear communication, and long-term relationships.</h3>
              <ul>
                <li>Experience building enterprise-style software and product workflows</li>
                <li>Ability to work across modern web, backend, cloud, and automation needs</li>
                <li>Motivation to make software delivery less confusing for businesses</li>
                <li>Focus on transparent milestones, quality, affordability, and support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Featured projects</p>
              <h2 className="section-title">Example projects we can build.</h2>
              <p className="section-description">
                These are demonstration project categories, not fake client claims. As The Easy Build grows, this section can be replaced with real client projects and measurable outcomes.
              </p>
            </div>

            <div className="project-grid">
              {featuredProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Technical trust</p>
              <h2 className="section-title">Technology explained through business outcomes.</h2>
              <p className="section-description">
                Business owners care less about technology names and more about what the technology makes possible.
              </p>
            </div>

            <div className="trust-grid">
              {technicalTrust.map((item) => (
                <article className="trust-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">FAQ</p>
              <h2 className="section-title">Questions clients ask before starting.</h2>
            </div>

            <div className="faq-grid">
              {faqs.map((faq) => (
                <article className="faq-card" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding contact-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Start a conversation</p>
              <h2 className="section-title">Get a free consultation or quote.</h2>
              <p className="section-description">
                Share your idea, current challenge, or website requirement. We will respond within 24 hours with the next best step.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-panel">
                <h3>Building software should not feel confusing.</h3>
                <p>
                  Use this form for websites, custom software, e-commerce, automation, maintenance, cloud deployment, or technical consulting. We will help clarify the right next step before you commit to a build.
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <span>Email</span>
                    <strong>rishabhkr@theeasybuild.com</strong>
                  </div>
                  <div className="contact-info-item">
                    <span>Response time</span>
                    <strong>Within 24 hours</strong>
                  </div>
                  <div className="contact-info-item">
                    <span>Best for</span>
                    <strong>Websites, software, automation, maintenance, cloud, consulting</strong>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact" className="form-label">Phone or WhatsApp (optional)</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Phone number or preferred contact"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="query" className="form-label">What do you want to build or improve? *</label>
                    <textarea
                      id="query"
                      name="query"
                      value={formData.query}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="form-input resize-none"
                      placeholder="Tell us about your website, software idea, business process, timeline, budget range, or support need..."
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Sending...' : 'Get Free Consultation'}
                  </button>

                  {submitStatus && (
                    <div className={`status-message ${submitStatus.type}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">The Easy Build</div>
            <p>Software development made easy with clear communication, experienced engineers, and dependable delivery.</p>
          </div>
          <p>© 2026 The Easy Build. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
