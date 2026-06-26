import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  icon: string
  title: string
  description: string
}

interface ValuePoint {
  icon: string
  title: string
  description: string
}

interface UseCase {
  tag: string
  title: string
  description: string
  color: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: ServiceCard[] = [
  {
    icon: '⬡',
    title: 'AI Decision Support',
    description:
      'Intelligent data analysis and recommendation engines that augment leadership decisions with structured, explainable AI insights.',
  },
  {
    icon: '◈',
    title: 'AI Workflow Automation',
    description:
      'End-to-end process automation integrating AI agents into existing operations — reducing friction, accelerating execution.',
  },
  {
    icon: '◉',
    title: 'Digital Human & Interactive Experience',
    description:
      'Lifelike digital ambassadors and conversational AI interfaces that redefine how organisations engage their audiences.',
  },
  {
    icon: '◎',
    title: 'Education & Business AI Prototypes',
    description:
      'Rapid-prototype AI tools for learning platforms, assessment systems, and internal business intelligence dashboards.',
  },
]

const values: ValuePoint[] = [
  {
    icon: '01',
    title: 'Business-First AI Design',
    description:
      'Every solution is architected around measurable business outcomes, not technology showcase.',
  },
  {
    icon: '02',
    title: 'Fast Prototype to Deployment',
    description:
      'From concept to working product in days, not months — enabling rapid validation and iteration.',
  },
  {
    icon: '03',
    title: 'Human + AI Decision Intelligence',
    description:
      'We keep humans in the loop, amplifying judgement rather than replacing it with black-box automation.',
  },
  {
    icon: '04',
    title: 'Flexible System Integration',
    description:
      'Modular architecture that slots into your current stack — no rip-and-replace, no vendor lock-in.',
  },
]

const useCases: UseCase[] = [
  {
    tag: 'Education',
    title: 'Campus Decision System',
    description:
      'Unified AI platform for academic institutions to streamline administrative decisions, resource allocation, and student outcome tracking.',
    color: 'from-brand-600/20 to-brand-900/10',
  },
  {
    tag: 'Finance',
    title: 'Project Evaluation Intelligence',
    description:
      'AI-driven scoring and risk assessment for investment proposals, tender evaluations, and business case reviews.',
    color: 'from-accent-600/20 to-accent-900/10',
  },
  {
    tag: 'Enterprise',
    title: 'Business Process Copilot',
    description:
      'An embedded AI assistant that guides teams through complex workflows, surfaces relevant knowledge, and automates routine steps.',
    color: 'from-violet-600/20 to-violet-900/10',
  },
  {
    tag: 'Digital',
    title: 'AI Showcase & Digital Entry Point',
    description:
      'Interactive AI experience hubs that serve as both public-facing brand touchpoints and internal innovation portals.',
    color: 'from-sky-600/20 to-sky-900/10',
  },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Solutions', href: '#services' },
    { label: 'Why L2AI', href: '#why' },
    { label: 'Use Cases', href: '#usecases' },
    { label: 'About', href: '#about' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-900/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-500/30">
            L2
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            L2AI
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-lg shadow-brand-600/20"
        >
          Contact Us
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-surface-800/98 backdrop-blur-lg border-b border-white/5 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors text-center"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-8 animate-fade-in">
          <div className="glow-dot" />
          Lin &amp; Lyn Holding Group
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 animate-fade-up">
          <span className="text-gradient">L2AI</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-2xl md:text-3xl font-semibold text-slate-200 mb-5 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Practical AI Solutions for Business Growth
        </p>

        {/* Supporting text */}
        <p
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          AI-powered decision support, workflow automation, and digital experience solutions
          by Lin &amp; Lyn Holding Group.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            Explore Solutions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 hover:bg-white/5"
          >
            Contact Us
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-20 flex flex-col items-center gap-2 text-slate-600 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const ref = useScrollReveal()

  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade-in">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Solutions That Drive{' '}
              <span className="text-gradient">Real Results</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From strategy to deployment — we build AI that works inside your existing operations.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="group relative rounded-2xl bg-surface-800 card-border card-border-hover p-6 flex flex-col gap-4"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-600/15 border border-brand-500/20 flex items-center justify-center text-brand-300 text-2xl font-thin group-hover:bg-brand-600/25 transition-colors">
                  {svc.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-white font-semibold text-base mb-2">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{svc.description}</p>
                </div>

                {/* Bottom accent */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="text-brand-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  const ref = useScrollReveal()

  return (
    <section id="why" className="py-28 px-6 bg-surface-800/40">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade-in">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Why L2AI
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Built for Business,{' '}
                <span className="text-gradient">Powered by AI</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We don't build AI to impress — we build AI to work. Every solution we deliver
                is measured by its impact on the people and processes it serves.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-600/20"
              >
                Start a conversation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right — value grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl bg-surface-700 card-border card-border-hover p-5"
                >
                  <div className="text-brand-400 font-black text-xs tracking-widest mb-3 font-mono">
                    {v.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  const ref = useScrollReveal()

  return (
    <section id="usecases" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade-in">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Use Cases
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI in{' '}
              <span className="text-gradient">Action</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Real-world applications delivering measurable value across industries.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <div
                key={uc.title}
                className={`group rounded-2xl bg-gradient-to-br ${uc.color} card-border card-border-hover p-8 flex flex-col gap-4`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/10 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {uc.tag}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl">{uc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="py-28 px-6 bg-surface-800/40">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="section-fade-in text-center">
          {/* Label */}
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            About Us
          </p>

          {/* Group name */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Lin &amp; Lyn Holding Group
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-brand-500/40" />
            <div className="glow-dot" />
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-brand-500/40" />
          </div>

          {/* Copy */}
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            Lin &amp; Lyn Holding Group focuses on AI-driven business innovation, education technology,
            and decision intelligence. Through <strong className="text-white">L2AI</strong>, we help organisations
            explore, prototype, and deploy practical AI solutions that create lasting operational value.
          </p>

          <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
            We believe the most powerful AI is the kind that makes your existing people and processes
            smarter — not the kind that replaces them.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-glow-indigo pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div ref={ref} className="section-fade-in text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's Build Practical AI{' '}
            <span className="text-gradient">Together.</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Whether you're exploring possibilities or ready to deploy — we'd love to hear from you.
          </p>

          {/* Contact card */}
          <div className="rounded-2xl bg-surface-800 card-border p-8 md:p-10 flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-1">Email us at</p>
              <a
                href="mailto:contact@linlyn.ai"
                className="text-white font-semibold text-xl hover:text-brand-300 transition-colors"
              >
                contact@linlyn.ai
              </a>
            </div>

            <a
              href="mailto:contact@linlyn.ai"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-brand-500/20">
            L2
          </div>
          <span className="font-bold text-base text-white">L2AI</span>
        </div>

        <p className="text-slate-600 text-sm text-center">
          © {new Date().getFullYear()} Lin &amp; Lyn Holding Group. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {['Solutions', 'Why L2AI', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '')}`}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-surface-900 text-white">
      <NavBar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <UseCasesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
