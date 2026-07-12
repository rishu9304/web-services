import React, { useState } from 'react';
import './App.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqgrnnl';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'Product-grade SaaS platforms, internal tools, dashboards, and business applications built for real workflows, clean ownership, and long-term maintainability.',
    points: ['SaaS MVPs', 'Admin portals', 'Workflow automation'],
    accent: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Modern Website Development',
    description:
      'Fast, responsive, SEO-ready websites and web applications that communicate trust, load quickly, and turn visitors into qualified leads.',
    points: ['Business websites', 'Landing pages', 'SEO foundations'],
    accent: 'bg-indigo-100 text-indigo-700'
  },
  {
    title: 'Backend & API Engineering',
    description:
      'Reliable backend systems, integrations, APIs, event-driven services, and database-backed platforms using the technology stack that best fits your product.',
    points: ['API platforms', 'Integrations', 'Scalable services'],
    accent: 'bg-cyan-100 text-cyan-700'
  },
  {
    title: 'Cloud Infrastructure Consulting',
    description:
      'Cloud architecture, deployment pipelines, containerized services, monitoring, scaling, and cost-conscious infrastructure across AWS or any cloud platform your product needs.',
    points: ['AWS consulting', 'Any cloud infra', 'Monitoring setup'],
    accent: 'bg-emerald-100 text-emerald-700'
  },
  {
    title: 'Architecture Consulting',
    description:
      'Technical guidance for stack selection, architecture review, cloud readiness, performance, security basics, and migration planning.',
    points: ['Tech stack review', 'System design', 'Cloud strategy'],
    accent: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Performance & Reliability',
    description:
      'Improve slow products, unstable systems, and expensive cloud setups with profiling, caching, database tuning, and operational best practices.',
    points: ['Speed audits', 'Cost optimization', 'Reliability fixes'],
    accent: 'bg-orange-100 text-orange-700'
  }
];

const capabilities = [
  'Custom Software',
  'Website Design',
  'Web Applications',
  'APIs',
  'Backend Systems',
  'Cloud Infrastructure',
  'AWS Consulting',
  'DevOps',
  'Databases',
  'Integrations',
  'MVPs',
  'Technical Consulting'
];

const proofPoints = [
  {
    value: 'Product mindset',
    label: 'Engineers with product-company delivery experience'
  },
  {
    value: 'Flexible stack',
    label: 'We choose technology around your product, team, budget, and future roadmap'
  },
  {
    value: 'End-to-end',
    label: 'Architecture, build, launch, cloud, and support'
  }
];

const processSteps = [
  {
    title: 'Discover',
    description:
      'We map your business goal, user flows, data needs, integrations, and launch constraints before writing code.'
  },
  {
    title: 'Architect',
    description:
      'We choose the right technology approach, define the system boundaries, plan cloud infrastructure, and reduce delivery risk early.'
  },
  {
    title: 'Build',
    description:
      'We ship clean, maintainable features with pragmatic reviews, reusable components, and production-aware engineering.'
  },
  {
    title: 'Launch & Improve',
    description:
      'We deploy, monitor, document, hand over, and continue improving performance, reliability, and conversion.'
  }
];

const consultingAreas = [
  'MVP scope and technical roadmap',
  'AWS or cloud architecture and deployment strategy',
  'Backend architecture review',
  'API and integration planning',
  'Performance, database, and cloud cost review',
  'Product engineering process improvements'
];

const faqs = [
  {
    question: 'What kind of clients are the best fit?',
    answer:
      'Startups, founders, small teams, and growing businesses that need high-quality websites, web applications, backend systems, cloud infrastructure, or technical consulting.'
  },
  {
    question: 'Do you only build websites?',
    answer:
      'No. Websites are one offering, but the core focus is high-quality software: custom platforms, APIs, backend services, infrastructure, internal tools, and product consulting.'
  },
  {
    question: 'Which technologies do you work with?',
    answer:
      'We are technology-flexible. We can work with the stack your product needs or advise on the best stack based on performance, budget, hiring, maintenance, and cloud requirements.'
  },
  {
    question: 'Can you help before development starts?',
    answer:
      'Yes. We can help with discovery, architecture, cloud planning, scope definition, MVP roadmap, performance review, and technical decision-making.'
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
          message: `*New lead from theEasy Build*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Contact:* ${formData.contact || 'N/A'}\n*Project:* ${formData.query}`
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
          <a href="#home" className="brand" aria-label="theEasy Build home">
            theEasy Build
          </a>
          <div className="nav-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#approach" className="nav-link">Approach</a>
            <a href="#consulting" className="nav-link">Consulting</a>
            <a href="#contact" className="nav-link nav-cta">Free Consultation</a>
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
              <p className="eyebrow">Product-company engineers for modern software delivery</p>
              <h1 className="hero-title">
                Ship high-quality software, websites, and cloud infrastructure faster.
              </h1>
              <p className="hero-description">
                We help startups and growing businesses design, build, and launch reliable products using the right technology for the job. From product websites and custom software to backend systems, AWS consulting, and cloud infrastructure, we bring a product engineering mindset to every engagement.
              </p>

              <div className="hero-buttons">
                <a href="#contact" className="btn-primary">
                  Book a Free Consultation
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <a href="#services" className="btn-white">
                  Explore Services
                </a>
              </div>

              <div className="hero-stack" aria-label="Core capabilities">
                {capabilities.slice(0, 8).map((capability) => (
                  <span key={capability}>{capability}</span>
                ))}
              </div>
            </div>

            <div className="hero-panel" aria-label="Service highlights">
              <div className="panel-label">What we help you ship</div>
              <div className="panel-list">
                <div>
                  <strong>Websites that convert</strong>
                  <span>Modern, fast, SEO-ready business sites.</span>
                </div>
                <div>
                  <strong>Custom software products</strong>
                  <span>MVPs, dashboards, portals, and internal tools.</span>
                </div>
                <div>
                  <strong>Cloud-native backends</strong>
                  <span>APIs, services, databases, CI/CD, AWS, and cloud infrastructure.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Why clients choose theEasy Build">
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
              <h2 className="section-title">Modern software engineering services for serious builders.</h2>
              <p className="section-description">
                We focus on outcomes: reliable products, maintainable code, scalable infrastructure, and a smoother path from idea to production.
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
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="section-padding">
          <div className="container split-section">
            <div>
              <p className="eyebrow dark">Why us</p>
              <h2 className="section-title text-left">Product-company delivery experience, applied to your business.</h2>
              <p className="section-description text-left">
                Our developers understand how product teams think: quality, speed, user value, maintainability, deployment, monitoring, and iteration. We do not just write code; we help you make better technical decisions and ship with confidence.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">01</div>
                  <div>
                    <h3 className="feature-title">Quality without slow delivery</h3>
                    <p className="feature-description">Pragmatic architecture, clean implementation, and focused scope so you move fast without creating technical debt from day one.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">02</div>
                  <div>
                    <h3 className="feature-title">Cloud-ready from the start</h3>
                    <p className="feature-description">Deployment, monitoring, security basics, and cost awareness are planned with the product, not added as an afterthought.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">03</div>
                  <div>
                    <h3 className="feature-title">Business-first consulting</h3>
                    <p className="feature-description">We help clarify scope, choose the right technology approach, and translate business goals into a technical roadmap your team can trust.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="approach-card">
              <p className="card-kicker">Engineering principles</p>
              <h3>Built for launch and ownership</h3>
              <ul>
                <li>Clear architecture and handover documentation</li>
                <li>Readable code and maintainable service boundaries</li>
                <li>Production deployment on AWS or the right cloud platform</li>
                <li>Performance, reliability, and monitoring basics</li>
                <li>Transparent milestones and communication</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="consulting" className="section-padding cloud-section">
          <div className="container">
            <div className="cloud-content">
              <p className="eyebrow">Consulting</p>
              <h2 className="section-title light">Technical guidance before, during, and after the build.</h2>
              <p className="section-description light">
                Not every engagement starts with development. We can help you validate the scope, review the architecture, plan infrastructure, optimize performance, or create a roadmap before you invest deeply.
              </p>

              <div className="consulting-grid">
                {consultingAreas.map((area) => (
                  <div className="consulting-pill" key={area}>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow dark">Process</p>
              <h2 className="section-title">A simple path from idea to production.</h2>
              <p className="section-description">
                Every project needs momentum and control. Our process keeps the work clear, measurable, and ready for real users.
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
          <div className="container split-section reverse">
            <div className="stack-card">
              {capabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>

            <div>
              <p className="eyebrow dark">Technology</p>
              <h2 className="section-title text-left">Technology choices should serve the product, not the other way around.</h2>
              <p className="section-description text-left">
                We can build with the technology your product requires or help you choose the right stack from scratch. The decision depends on your business goals, performance needs, budget, hiring plans, infrastructure, timeline, and long-term ownership.
              </p>
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
              <h2 className="section-title">Tell us what you want to build.</h2>
              <p className="section-description">
                Share your idea, current challenge, or technical question. We will respond within 24 hours with the next best step.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-panel">
                <h3>Book a free project consultation</h3>
                <p>
                  Use this for software development, websites, cloud infrastructure, architecture consulting, or performance improvements.
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
                    <strong>MVPs, websites, APIs, AWS, cloud infra, consulting</strong>
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
                      placeholder="Tell us about your product, website, backend, cloud infrastructure, timeline, or consulting need..."
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
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
            <div className="footer-brand">theEasy Build</div>
            <p>High-quality software, websites, cloud infrastructure, and consulting.</p>
          </div>
          <p>© 2026 theEasy Build. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
