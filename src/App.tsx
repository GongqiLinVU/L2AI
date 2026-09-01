import { useEffect, useRef, useState, useCallback, type RefObject } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceData {
  icon: string
  title: string
  description: string
  positioning: string
  whatItSolves: string
  useCases: string[]
  businessValue: string[]
}

interface ValuePoint {
  icon: string
  title: string
  description: string
}

interface CaseStudy {
  shortLabel: string
  category: string
  title: string
  description: string
  capabilities: string[]
  businessValue: string[]
  challenge: string
  solution: string
  workflow: string[]
  outcome: string
  accentFrom: string
  accentTo: string
  badgeColor: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: ServiceData[] = [
  {
    icon: '⬡',
    title: 'AI Decision Support',
    description:
      'Intelligent data analysis and recommendation engines that augment leadership decisions with structured, explainable AI insights.',
    positioning: 'Turn complex information into clear, explainable decisions.',
    whatItSolves:
      'Many organisations have data, documents, reports, and expert opinions, but decision-makers still struggle to see the real options, risks, and evidence. L2AI helps structure decision contexts, compare alternatives, and generate explainable recommendations.',
    useCases: [
      'Project evaluation and scoring',
      'Campus or organisational decision systems',
      'Compliance and risk review',
      'Executive decision briefing',
      'Investment or partnership assessment',
    ],
    businessValue: [
      'Faster and more consistent decisions',
      'Clear evidence trail',
      'Reduced dependency on individual judgement',
      'Better alignment between human experts and AI insights',
    ],
  },
  {
    icon: '◈',
    title: 'AI Workflow Automation',
    description:
      'End-to-end process automation integrating AI agents into existing operations — reducing friction, accelerating execution.',
    positioning: 'Use AI agents to reduce repetitive work and improve operational speed.',
    whatItSolves:
      'Teams spend too much time on manual checking, summarising, routing, reporting, and follow-up tasks. L2AI designs practical AI workflows that connect people, systems, and data to improve execution.',
    useCases: [
      'Document review and summarisation',
      'Internal process copilots',
      'Report generation',
      'Task routing and follow-up',
      'Customer or staff support automation',
    ],
    businessValue: [
      'Lower manual workload',
      'Faster response time',
      'More consistent output quality',
      'Better use of staff expertise',
    ],
  },
  {
    icon: '◉',
    title: 'Digital Human & Interactive Experience',
    description:
      'Lifelike digital ambassadors and conversational AI interfaces that redefine how organisations engage their audiences.',
    positioning: 'Create AI-powered digital entry points that engage users and guide them to real services.',
    whatItSolves:
      'Many digital human or showcase platforms look impressive but lack real business depth. L2AI helps connect digital humans, virtual spaces, QR experiences, and interactive interfaces with practical business workflows and decision points.',
    useCases: [
      'Digital reception or event guide',
      'AI ambassador for exhibitions',
      'Interactive campus or business showcase',
      'Product explanation assistant',
      'Link-based entry to business systems',
    ],
    businessValue: [
      'Stronger first impression',
      'Better user engagement',
      'Clear pathway from showcase to real action',
      'More memorable brand experience',
    ],
  },
  {
    icon: '◎',
    title: 'Education & Business AI Prototypes',
    description:
      'Rapid-prototype AI tools for learning platforms, assessment systems, and internal business intelligence dashboards.',
    positioning: 'Build fast, practical AI prototypes that prove value before large investment.',
    whatItSolves:
      'Many organisations want to explore AI but are unsure where to start. L2AI helps design and build focused prototypes for education, business operations, assessment, analytics, and internal decision support.',
    useCases: [
      'Student project evaluation systems',
      'AI learning assistants',
      'Business intelligence dashboards',
      'Proof-of-concept AI tools',
      'Internal innovation demos',
    ],
    businessValue: [
      'Faster validation of ideas',
      'Lower early-stage development cost',
      'Clearer product direction',
      'Easier stakeholder demonstration',
    ],
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

const caseStudies: CaseStudy[] = [
  {
    shortLabel: 'Evaluation',
    category: 'Education / Assessment Intelligence',
    title: 'AI Project Evaluation Platform',
    description:
      'An AI-assisted evaluation system that supports project marking, feedback generation, risk detection, and supervisor review.',
    capabilities: [
      'AI + human review workflow',
      'Rubric-based assessment',
      'Project risk detection',
      'Feedback generation',
      'Evaluation consistency analysis',
    ],
    businessValue: [
      'Reduce manual marking effort',
      'Improve feedback quality',
      'Support fairer and more consistent evaluation',
      'Help identify high-potential student projects',
    ],
    challenge:
      'Project evaluation often depends heavily on individual judgement, limited review time, and inconsistent interpretation of criteria.',
    solution:
      'L2AI structures the evaluation process using rubrics, AI-generated analysis, supervisor review, and explainable scoring evidence.',
    workflow: [
      'Student submission',
      'AI preliminary evaluation',
      'Risk and strength detection',
      'Supervisor review',
      'Final mark and feedback',
      'Improvement insights',
    ],
    outcome:
      'A more transparent, scalable, and consistent evaluation process that supports both teaching quality and student development.',
    accentFrom: 'from-brand-600/15',
    accentTo: 'to-brand-900/5',
    badgeColor: 'bg-brand-500/15 text-brand-300 border-brand-500/25',
  },
  {
    shortLabel: 'LegalFront',
    category: 'Legal / Client Intake AI',
    title: 'LegalFront — AI Client Intake Assistant',
    description:
      'An AI intake assistant for law firms that runs a short, structured conversation with website visitors, qualifies serious clients, and books a real consultation — so lawyers stop spending time on chats that never convert.',
    capabilities: [
      '5-turn structured intake conversation',
      'Case type & urgency classification',
      'Lead qualification before human handoff',
      'Consultation booking integration',
      'Conversation summary for the lawyer',
      'Filters out non-serious inquiries',
    ],
    businessValue: [
      'Saves lawyers hours of unqualified chat time',
      'Faster response to real, paying clients',
      'Higher chat-to-booking conversion rate',
      'Consistent, professional first impression',
    ],
    challenge:
      'Many visitors start a chat on a law firm’s website but never intend to book a paid consultation — lawyers end up spending significant time chatting before learning whether a lead is even real.',
    solution:
      'L2AI designed a 5-turn AI intake flow that collects the essentials — case type, situation summary, urgency, and contact details — then routes qualified leads straight to booking a real consultation slot.',
    workflow: [
      'Visitor opens chat',
      'AI asks 5 structured intake questions',
      'AI classifies case type and urgency',
      'Qualified lead prompted to book consultation',
      'Consultation booked on lawyer’s calendar',
      'Lawyer receives conversation summary',
    ],
    outcome:
      'Lawyers spend less time on chats that go nowhere and more time with real clients, while serious inquiries convert faster into booked consultations.',
    accentFrom: 'from-accent-600/15',
    accentTo: 'to-accent-900/5',
    badgeColor: 'bg-accent-500/15 text-accent-300 border-accent-500/25',
  },
  {
    shortLabel: 'Compliance',
    category: 'Enterprise / Compliance AI',
    title: 'Enterprise Compliance Copilot',
    description:
      'An explainable AI assistant that helps teams review compliance logic, understand rules, generate professional reports, and support internal decision-making.',
    capabilities: [
      'Explainable decision logic',
      'Rule and calculation explanation',
      'Compliance issue summary',
      'Report drafting support',
      'Source data traceability',
      'Internal workflow assistance',
    ],
    businessValue: [
      'Improve compliance transparency',
      'Reduce repetitive review work',
      'Support internal quality control',
      'Make reports clearer and more professional',
    ],
    challenge:
      'Compliance work is complex, rule-heavy, and often difficult to explain clearly to internal teams or external stakeholders.',
    solution:
      'L2AI provides AI-assisted reasoning, structured explanation, traceability, and report improvement tools to support compliance professionals.',
    workflow: [
      'Input compliance data',
      'Analyse rules and calculations',
      'Generate explanation',
      'Highlight issues',
      'Human review',
      'Produce professional report',
    ],
    outcome:
      'More explainable, efficient, and professional compliance workflows.',
    accentFrom: 'from-violet-600/15',
    accentTo: 'to-violet-900/5',
    badgeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  },
  {
    shortLabel: 'Digital Human',
    category: 'Digital Engagement / AI Interface',
    title: 'Digital Human Experience Platform',
    description:
      'An AI-powered digital entry point that connects digital humans, QR experiences, virtual spaces, and real business workflows.',
    capabilities: [
      'Digital human interface',
      'Smart QR navigation',
      'Interactive showcase',
      'AI concierge',
      'Service recommendation',
      'Workflow integration',
    ],
    businessValue: [
      'Improve visitor engagement',
      'Convert attention into real action',
      'Strengthen brand experience',
      'Connect showcase experiences with business systems',
    ],
    challenge:
      'Many digital human and showcase platforms look impressive but fail to guide users toward meaningful actions.',
    solution:
      'L2AI turns the digital human into an intelligent business entry point, connecting conversation, navigation, service recommendation, and workflow execution.',
    workflow: [
      'Visitor scans QR or enters digital space',
      'AI greets and understands intent',
      'Recommends service or solution',
      'Opens relevant workflow',
      'Captures engagement insight',
    ],
    outcome:
      'A more practical digital engagement experience that goes beyond display and supports real business conversion.',
    accentFrom: 'from-sky-600/15',
    accentTo: 'to-sky-900/5',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Traps Tab/Shift+Tab focus inside `containerRef` while `active` is true,
 * focuses the first focusable element on activation, and restores focus to
 * whatever was focused beforehand once `active` goes false.
 */
function useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean) {
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const container = containerRef.current
    const focusFirst = () => {
      const first = container?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    }
    // Wait a tick so the enter-transition mount has settled before focusing.
    const t = setTimeout(focusFirst, 20)

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container) return
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', handleTab)
      previouslyFocused.current?.focus()
    }
  }, [active, containerRef])
}

// ─── Service Modal ────────────────────────────────────────────────────────────

function ServiceModal({
  detail,
  onClose,
}: {
  detail: ServiceData | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Trigger enter transition after mount
  useEffect(() => {
    if (detail) {
      const t = setTimeout(() => setVisible(true), 10)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [detail])

  // Body scroll lock
  useEffect(() => {
    if (detail) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [detail])

  // Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    if (detail) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [detail, handleKey])

  useFocusTrap(panelRef, !!detail)

  if (!detail) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={detail.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, centered card on sm+ */}
      <div
        ref={panelRef}
        className={`relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto
          rounded-t-3xl sm:rounded-2xl
          bg-surface-800 border border-ink/10
          shadow-2xl shadow-black/60
          transition-all duration-300
          ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-ink/20" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 pt-5 pb-4 bg-surface-800/95 backdrop-blur-sm border-b border-ink/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/25 flex items-center justify-center text-brand-300 text-xl flex-shrink-0">
              {detail.icon}
            </div>
            <h2 className="text-ink font-bold text-lg leading-tight">{detail.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-ink hover:bg-ink/10 transition-colors mt-0.5"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-7">
          {/* Positioning */}
          <p className="text-brand-300 text-base font-semibold leading-snug border-l-2 border-brand-500 pl-4">
            {detail.positioning}
          </p>

          {/* What it solves */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">
              What it solves
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{detail.whatItSolves}</p>
          </div>

          {/* Use cases + Business value side-by-side on sm+ */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-3">
                Typical use cases
              </h3>
              <ul className="flex flex-col gap-2">
                {detail.useCases.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-3">
                Business value
              </h3>
              <ul className="flex flex-col gap-2">
                {detail.businessValue.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-ink/8">
            <a
              href="mailto:linlynholding@gmail.com"
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-600/25 hover:-translate-y-0.5"
            >
              Discuss this solution
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (study) {
      const t = setTimeout(() => setVisible(true), 10)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [study])

  useEffect(() => {
    if (study) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [study])

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    if (study) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [study, handleKey])

  useFocusTrap(panelRef, !!study)

  if (!study) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`relative w-full sm:max-w-2xl max-h-[94vh] sm:max-h-[90vh] overflow-y-auto
          rounded-t-3xl sm:rounded-2xl
          bg-surface-800 border border-ink/10
          shadow-2xl shadow-black/70
          transition-all duration-300
          ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-ink/20" />
        </div>

        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 pt-5 pb-4 bg-surface-800/95 backdrop-blur-sm border-b border-ink/8">
          <div className="flex flex-col gap-1.5">
            <span className={`self-start px-2.5 py-0.5 rounded-full border text-xs font-semibold ${study.badgeColor}`}>
              {study.category}
            </span>
            <h2 className="text-ink font-bold text-lg leading-tight">{study.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-ink hover:bg-ink/10 transition-colors mt-0.5"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-7">

          {/* Challenge */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">Challenge</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{study.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-2">Solution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{study.solution}</p>
          </div>

          {/* Workflow */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4">Example Workflow</h3>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-0">
              {study.workflow.map((step, i) => (
                <div key={step} className="flex items-center gap-0">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400 text-[10px] font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-slate-300 text-xs font-medium whitespace-nowrap">{step}</span>
                  </div>
                  {i < study.workflow.length - 1 && (
                    <svg className="w-4 h-4 text-slate-600 flex-shrink-0 mx-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Expected outcome */}
          <div className="rounded-xl bg-brand-600/8 border border-brand-500/20 px-5 py-4">
            <h3 className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-2">Expected Outcome</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{study.outcome}</p>
          </div>

          {/* Capabilities + Business value */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-3">Key Capabilities</h3>
              <ul className="flex flex-col gap-2">
                {study.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-3">Business Value</h3>
              <ul className="flex flex-col gap-2">
                {study.businessValue.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-ink/8">
            <a
              href="mailto:linlynholding@gmail.com"
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-600/25 hover:-translate-y-0.5"
            >
              Talk to L2AI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

type Theme = 'dark' | 'light'

function ThemeToggle({
  theme,
  onToggle,
  className = '',
}: {
  theme: Theme
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-ink hover:bg-ink/5 transition-colors ${className}`}
    >
      {theme === 'dark' ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  )
}

function NavBar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
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
    { label: 'Case Studies', href: '#usecases' },
    { label: 'About', href: '#about' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-900/95 backdrop-blur-md border-b border-ink/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-500/30">
            L2
          </div>
          <span className="font-bold text-lg tracking-tight text-ink">L2AI</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-ink transition-colors rounded-lg hover:bg-ink/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-lg shadow-brand-600/20"
          >
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          className="p-2 text-slate-400 hover:text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-surface-800/98 backdrop-blur-lg border-b border-ink/5 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-ink hover:bg-ink/5 rounded-lg transition-colors"
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
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
      {/* Grid lines use the theme-adaptive `ink` color so they stay visible in light mode too */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--ink-rgb) / 0.8) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink-rgb) / 0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-8 animate-fade-in">
          <div className="glow-dot" />
          Lin &amp; Lyn Holding Group
        </div>

        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 hero-l2ai-blink">
          <span className="text-gradient">L2AI</span>
        </h1>

        <p
          className="text-2xl md:text-3xl font-semibold mb-5 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-slate-200">Practical </span>
          <span className="hero-ai-solutions">AI Solutions</span>
          <span className="text-slate-200"> for </span>
          <span className="hero-biz-growth">Business Growth</span>
        </p>

        <p
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          AI-powered decision support, workflow automation, and digital experience solutions
          by Lin &amp; Lyn Holding Group.
        </p>

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
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-ink/15 hover:border-ink/30 text-slate-200 hover:text-ink font-semibold text-base transition-all duration-200 hover:bg-ink/5"
          >
            Contact Us
          </a>
        </div>

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
  const [activeService, setActiveService] = useState<ServiceData | null>(null)

  return (
    <section id="services" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade-in">
          <div className="text-center mb-16">
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              AI Solutions That Drive{' '}
              <span className="text-gradient">Real Results</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From strategy to deployment — we build AI that works inside your existing operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="group relative rounded-2xl bg-surface-800 card-border card-border-hover p-6 flex flex-col gap-4"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600/15 border border-brand-500/20 flex items-center justify-center text-brand-300 text-2xl font-thin group-hover:bg-brand-600/25 transition-colors">
                  {svc.icon}
                </div>

                <div>
                  <h3 className="text-ink font-semibold text-base mb-2">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{svc.description}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-ink/5">
                  <button
                    onClick={() => setActiveService(svc)}
                    className="text-brand-400 hover:text-brand-300 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Learn more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceModal detail={activeService} onClose={() => setActiveService(null)} />
    </section>
  )
}

function WhySection() {
  const ref = useScrollReveal()

  return (
    <section id="why" className="py-28 px-6 bg-surface-800/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade-in">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Why L2AI
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl bg-surface-700 card-border card-border-hover p-5"
                >
                  <div className="text-brand-400 font-black text-xs tracking-widest mb-3 font-mono">
                    {v.icon}
                  </div>
                  <h3 className="text-ink font-semibold text-sm mb-2">{v.title}</h3>
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

function CaseStudiesSection() {
  const ref = useScrollReveal()
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const cs = caseStudies[activeTab]

  return (
    <section id="usecases" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="section-fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Proven AI Applications
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Click any tab for the full breakdown.
            </p>
          </div>

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Case studies"
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {caseStudies.map((tab, i) => (
              <button
                key={tab.title}
                role="tab"
                aria-selected={i === activeTab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  i === activeTab
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                    : 'text-slate-400 hover:text-ink bg-ink/5 hover:bg-ink/10'
                }`}
              >
                {tab.shortLabel}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div
            key={cs.title}
            className={`rounded-2xl bg-gradient-to-br ${cs.accentFrom} ${cs.accentTo} bg-surface-800 card-border p-7 flex flex-col gap-5 animate-fade-in`}
          >
            <div>
              <span className={`inline-block mb-3 px-2.5 py-1 rounded-full border text-xs font-semibold leading-none ${cs.badgeColor}`}>
                {cs.category}
              </span>
              <h3 className="text-ink font-bold text-xl mb-2 leading-snug">{cs.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{cs.description}</p>
            </div>

            {/* Business value highlight — first item */}
            <div className="flex items-start gap-2.5 rounded-xl bg-ink/5 border border-ink/6 px-4 py-3">
              <svg className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-slate-300 text-xs leading-relaxed">{cs.businessValue[0]}</span>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => setActiveStudy(cs)}
                className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-xs font-semibold hover:gap-2.5 transition-all"
              >
                Click for details
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />
    </section>
  )
}

function AboutSection() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden scroll-mt-20">
      {/* Soft twin glows — the only "case study" this section makes is a visual one */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 w-[380px] h-[380px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div ref={ref} className="section-fade-in">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-6">
            About Us
          </p>

          <blockquote className="text-3xl md:text-5xl font-bold leading-tight text-ink mb-8">
            We don&rsquo;t build AI to impress.
            <br />
            <span className="text-gradient">We build AI that works.</span>
          </blockquote>

          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="glow-dot" />
            <p className="text-slate-500 text-sm">
              Lin &amp; Lyn Holding Group — the team behind{' '}
              <span className="text-ink font-semibold">L2AI</span>
            </p>
          </div>

          {/* Credibility strip — quiet facts, not another case-study recap */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Est. 2023 · Melbourne, Australia
            </span>
            <span className="hidden sm:inline text-ink/15">|</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              AI Experts &amp; Dedicated Research Team
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {['Universities', 'Law Firms', 'Accounting Firms', 'Overseas Enterprises'].map((p) => (
              <span
                key={p}
                className="px-3.5 py-1.5 rounded-full border border-ink/10 bg-ink/5 text-slate-400 text-xs font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-glow-indigo pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div ref={ref} className="section-fade-in text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
            Let's Build Practical AI{' '}
            <span className="text-gradient">Together.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Whether you're exploring possibilities or ready to deploy — we'd love to hear from you.
          </p>
          <div className="rounded-2xl bg-surface-800 card-border p-8 md:p-10 flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Email us at</p>
              <a
                href="mailto:linlynholding@gmail.com"
                className="text-ink font-semibold text-xl hover:text-brand-300 transition-colors"
              >
                linlynholding@gmail.com
              </a>
            </div>
            <a
              href="mailto:linlynholding@gmail.com"
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
    <footer className="border-t border-ink/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-brand-500/20">
            L2
          </div>
          <span className="font-bold text-base text-ink">L2AI</span>
        </div>
        <p className="text-slate-600 text-sm text-center">
          © {new Date().getFullYear()} Lin &amp; Lyn Holding Group. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {([['Solutions', '#services'], ['Why L2AI', '#why'], ['Contact', '#contact']] as [string, string][]).map(([label, href]) => (
            <a
              key={label}
              href={href}
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
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('l2ai-theme') as Theme | null) ?? 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('l2ai-theme', theme)
    } catch {
      /* localStorage unavailable (private mode, etc.) — theme just won't persist */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <div className="min-h-screen bg-surface-900 text-ink">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <CaseStudiesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
