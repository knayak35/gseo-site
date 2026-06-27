"use client";

import {
  ArrowUpRight,
  BookOpen,
  Brain,
  ChevronDown,
  FlaskConical,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Newspaper,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetBase = `${basePath}/assets/gseo`;

const navItems = [
  ["Papers", "research"],
  ["Articles", "education"],
  ["Latest", "publications"],
  ["Sections", "sections"],
  ["Join", "join"],
  ["Team", "leadership"],
  ["Contact", "contact"]
];

const stats = [
  ["Free", "Global access"],
  ["43", "YouTube videos"],
  ["11", "YouTube subscribers"],
  ["12+", "Eligible disciplines"],
];

const featuredPapers = [
  {
    title: "Postprandial Cognition Among High School Adolescents",
    authors: "Samiksha Shivkumar",
    category: "Biology",
    status: "Featured",
    url: "https://drive.google.com/file/d/16sSfHNwnKGUaZdEY-xCaGWxawqaEJaEg/view?usp=sharing",
    image: `${assetBase}/raven.png`,
    abstract:
      "A student research article examining cognition, nutrition, and measurable academic performance signals."
  },
  {
    title: "Using Machine Learning to Accelerate Quantum Dot Production for The Development of Next-Generation Green Technology",
    authors: "Jhala Hraday, Ankit Rathi, Xie Yundi",
    category: "Computer Science",
    status: "Peer reviewed",
    url: "https://drive.google.com/file/d/1Cldih94vcYc9n6Kly3nrYeYvafuFZ3xH/view",
    image: `${assetBase}/semiconductor.png`,
    abstract:
      "A technical paper exploring how machine learning can accelerate materials research for greener technology."
  },
  {
    title: "The Relationship Between Financial Literacy, Delayed Gratification, and Career Resilience Among High School Students",
    authors: "Jacklin Wang",
    category: "Finance",
    status: "Published",
    url: "https://drive.google.com/file/d/1DVNeqpjL0K2hNd10umboCF-y3zuVUudX/view",
    image: `${assetBase}/woocheol.png`,
    abstract:
      "A student-led analysis connecting financial literacy, decision-making habits, and long-term career resilience."
  },
  {
    title: "Validating Mathematical Modeling for Genetic Switch Analysis",
    authors: "Alicia Chan, Maha Essadi, Rohan Chhaya, Saraswati Sridhar",
    category: "Mathematics",
    status: "Published",
    url: "https://docs.google.com/document/d/1PeUrb1ORmBE99-bMZfvb0AYsQJUZYSMm/edit?tab=t.0",
    image: `${assetBase}/dida.png`,
    abstract:
      "A modeling-focused research paper testing how mathematical frameworks can support genetic switch analysis."
  },
  {
    title: "Digital Age's Social Media Privacy Issues in Relation to Informed Consent",
    authors: "Samantha Alvarez",
    category: "Technology",
    status: "Published",
    url: "https://drive.google.com/file/d/1Eqgr1yXOygil7iYgQeazRUMYGouWOOmD/view",
    image: `${assetBase}/kaka.png`,
    abstract:
      "A policy and ethics paper about consent, privacy, and platform responsibility in the digital age."
  },
  {
    title: "The Shift in Arab American Demands for Legal Representation Between the Early 20th and 21st Centuries",
    authors: "Zachary Samuel Rodger",
    category: "International Relations",
    status: "Published",
    url: "https://drive.google.com/file/d/1fGH9UFGGq1YY7XTmVb-KKnohK_H1-Q1H/view",
    image: `${assetBase}/logan.png`,
    abstract:
      "A historical and social analysis of changing legal representation demands across Arab American communities."
  }
];

const paperCategories = ["All", "Biology", "Technology", "Mathematics", "Computer Science", "Finance", "International Relations"];

const latestArticles = [
  {
    type: "Research Papers",
    title: "Original student research across disciplines",
    deck: "Scientific research, engineering projects, computer science research, economic analyses, and social science studies.",
    meta: "Originality - methodology - integrity"
  },
  {
    type: "Educational Articles",
    title: "Concept explainers and academic guides",
    deck: "Accessible writing on physics, AI, technology, economics, mathematics, and international relations.",
    meta: "Learning - clarity - discussion"
  },
  {
    type: "Interviews",
    title: "Academic experiences and research pathways",
    deck: "Conversations with students, teachers, researchers, and outstanding high school students around the world.",
    meta: "University life - advice - careers"
  },
  {
    type: "Guidance",
    title: "Career and academic opportunity support",
    deck: "University applications, scholarships, research opportunities, career exploration, and skill development resources.",
    meta: "Opportunity - growth - access"
  }
];

const educationalArticles = [
  {
    title: "AI and Jobs in Indonesia",
    topic: "Economics",
    url: "https://medium.com/@technology.gseo/ais-effect-on-employment-in-indonesia-s-service-sector-fef0837e5910",
    deck:
      "AI is reshaping Indonesia's service sector and raising new questions for workers, businesses, and policy."
  },
  {
    title: "The First Three Parent Baby",
    topic: "Biology",
    url: "https://medium.com/@technology.gseo/the-worlds-first-three-parent-baby-the-study-of-mitochondrial-replacement-therapy-b078dcef4459",
    deck:
      "Mitochondrial replacement therapy offers hope against genetic disease while opening important ethical debate."
  },
  {
    title: "Niobium Boosts Hydrogen Fuel Cells",
    topic: "Chemistry",
    url: "https://medium.com/@technology.gseo/niobium-doped-titanium-dioxide-greatly-improves-hydrogen-fuel-cells-d37f8f230f80",
    deck:
      "Niobium-doped TiO2 improves conductivity and durability for cleaner hydrogen energy technology."
  }
];

const sections: Array<[string, string, LucideIcon]> = [
  ["Research Papers", "Original student research in natural sciences, technology, finance, economics, social science, and more.", BookOpen],
  ["Educational Articles", "Clear explanations of academic concepts, theories, discoveries, and emerging developments.", FlaskConical],
  ["Interviews", "Conversations about university life, research opportunities, admissions advice, and career pathways.", Users],
  ["Career Guidance", "Scholarship guides, application advice, research opportunities, and skill development resources.", Brain],
  ["Opinion & Perspectives", "Well-reasoned analysis on emerging technologies, education, economics, and global affairs.", Newspaper],
  ["Multimedia Content", "Infographics, educational videos, research summaries, short-form academic content, and webinars.", PenLine]
];

const joinSteps = [
  {
    title: "Prepare a clear submission",
    copy:
      "Write in professional English, define your contribution, and include citations or references where applicable."
  },
  {
    title: "Submit with integrity",
    copy:
      "Submissions must avoid plagiarism, fabrication, citation manipulation, and misrepresentation of authorship."
  },
  {
    title: "Academic Division review",
    copy:
      "Reviewers evaluate accuracy, clarity, research quality, citation practices, and relevance to GSEO's mission."
  },
  {
    title: "Revise before publication",
    copy:
      "GSEO may request revisions before publication so student work meets strong academic standards."
  },
  {
    title: "Publish with authorship retained",
    copy:
      "Authors retain ownership while granting GSEO permission to publish, distribute, and promote their work with credit."
  }
];

const leaders = [
  ["Kartik Nayak", "President", `${assetBase}/kartik.png`],
  ["Aisha Kaka", "Vice President", `${assetBase}/kaka.png`]
];

const interviews = [
  {
    school: "UPenn",
    logo: `${assetBase}/universities/upenn.svg`,
    copy: "An interview with a UPenn student, Katherine Yusuf.",
    url: "https://youtu.be/RDitsFPltjw?si=XTZ5FKtpszqPjJMA"
  },
  {
    school: "UT Austin",
    logo: `${assetBase}/universities/ut-austin.svg`,
    copy: "An interview with a UT Austin student, Shashank Ganta.",
    url: "https://youtu.be/2dAScZl5j98?si=FzHlwG8JbFZL2OmW"
  },
  {
    school: "Yale University",
    logo: `${assetBase}/universities/yale.svg`,
    copy: "An interview with a Yale University student, Samantha Alvarez.",
    url: "https://youtu.be/uFreiWHk2oQ?si=saYGBUewaNr_kQok"
  },
  {
    school: "NYU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/New_York_University_Seal.svg/1280px-New_York_University_Seal.svg.png",
    copy: "An interview with an NYU student, Peter Ma.",
    url: "https://youtu.be/O1er-F2HHoo?si=pUPUvxCkUZjzl0c5"
  },
  {
    school: "UPenn",
    logo: `${assetBase}/universities/upenn.svg`,
    copy: "An interview with a UPenn student, Zachary Rodger.",
    url: "https://youtu.be/fRcHhOLeWd8?si=jbaM0wxvzZV55tvV"
  },
  {
    school: "Interview Collection",
    logo: `${assetBase}/official-logo.png`,
    copy: "Explore GSEO's Framer interview collection.",
    url: "https://gseo.framer.ai/interviews"
  }
];

const teams = [
  ["Leadership Team", "President, Vice President, Secretary, and division heads coordinating strategy, standards, and operations."],
  ["Academic Division", "Physics, chemistry, biology, mathematics, computer science, finance, economics, international relations, and mental health members."],
  ["Content Division", "Writers, interviewers, newsletter members, and video-content members producing educational material."],
  ["Growth Division", "Marketing, outreach, ambassador, and partnership members expanding GSEO's global reach."],
  ["Technology Division", "Website, data, analytics, and technical-support members building the platform infrastructure."]
];

const faqs = [
  ["What is GSEO?", "Global Scholars Excellence Organization is a student-founded initiative making high-quality high school and university-level research accessible to learners worldwide, free of charge."],
  ["What is GSEO's mission?", "To make student research and educational content freely accessible while fostering a global community of scholarship, curiosity, and academic excellence."],
  ["What can I publish?", "Research papers, educational articles, interviews, career guidance, opinion pieces, perspectives, infographics, videos, research summaries, and webinars."],
  ["Which disciplines are eligible?", "Physics, chemistry, biology, mathematics, computer science, AI, engineering, finance, economics, international relations, psychology, mental health, environmental science, humanities, and social sciences."],
  ["How does review work?", "Academic Division members evaluate accuracy, clarity, research quality, citation practices, and relevance to GSEO's mission. Revisions may be requested."],
  ["Can I use AI tools?", "AI tools may support brainstorming, editing, and clarity, but authors must remain the primary creators and are responsible for accuracy."]
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numeric = Number.parseInt(value, 10);
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 72, damping: 20 });
  const [display, setDisplay] = useState(Number.isNaN(numeric) ? value : "0+");

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    count.set(numeric);
    const unsubscribe = rounded.on("change", (latest) => {
      const suffix = value.includes("+") ? "+" : "";
      setDisplay(`${Math.round(latest)}${suffix}`);
    });
    return unsubscribe;
  }, [count, inView, numeric, rounded, value]);

  return <span ref={ref}>{Number.isNaN(numeric) ? value : display}</span>;
}

function ResearchVisual() {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-black/10 bg-[#111315] shadow-glow dark:border-white/10">
      <img
        src={`${assetBase}/semiconductor.png`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(78,116,171,0.42),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.78))]" />
      <div className="absolute inset-0 research-grid opacity-40" />
      <div className="relative flex min-h-[520px] flex-col justify-between p-6 text-white">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/62">
          <span>Editorial pipeline</span>
          <span>Live review</span>
        </div>
        <div className="grid gap-3">
          {["Question", "Methods", "Peer Review", "Publication"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.12 }}
              className="grid grid-cols-[36px_1fr_auto] items-center gap-4 rounded border border-white/12 bg-white/10 p-4 backdrop-blur"
            >
              <span className="text-sm font-black text-sky-200">0{index + 1}</span>
              <span className="font-semibold">{item}</span>
              <span className="h-2 w-20 rounded-full bg-white/16">
                <span className="block h-full rounded-full bg-sky-200" style={{ width: `${42 + index * 17}%` }} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paperFilter, setPaperFilter] = useState("All");
  const [articleQuery, setArticleQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filteredPapers = useMemo(
    () =>
      featuredPapers.filter(
        (paper) => paperFilter === "All" || paper.category === paperFilter
      ),
    [paperFilter]
  );

  const filteredArticles = useMemo(
    () =>
      latestArticles.filter((article) =>
        `${article.type} ${article.title} ${article.deck}`
          .toLowerCase()
          .includes(articleQuery.toLowerCase())
      ),
    [articleQuery]
  );

  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink transition-colors duration-500 dark:bg-[#0b0f14] dark:text-paper">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-paper/82 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0f14]/82">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="GSEO home">
            <span className="rounded bg-white px-2 py-1">
              <img src={`${assetBase}/official-logo.png`} alt="GSEO" className="h-8 w-auto" />
            </span>
            <span className="hidden text-sm font-black tracking-[0.22em] sm:inline">GSEO</span>
          </a>
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em] text-black/58 dark:text-white/60 md:flex">
            {navItems.map(([item, id]) => (
              <a key={item} href={`#${id}`} className="transition hover:text-ink dark:hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#join" className="hidden h-10 items-center gap-2 rounded-full border border-black/12 px-4 text-sm font-bold transition hover:bg-ink hover:text-white dark:border-white/12 dark:hover:bg-white dark:hover:text-ink sm:flex">
              Join GSEO <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 md:hidden dark:border-white/10 dark:bg-white/5"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-black/10 bg-paper px-5 py-4 dark:border-white/10 dark:bg-[#0b0f14] md:hidden">
            {navItems.map(([item, id]) => (
              <a key={item} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block py-3 text-sm">
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="relative px-5 pt-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(44,111,187,0.16),transparent_26%),radial-gradient(circle_at_82%_4%,rgba(181,144,72,0.12),transparent_24%)]" />
        <div className="absolute inset-0 research-grid opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-12 pb-16 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black/62 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/64">
              <ShieldCheck size={14} /> Global Scholars Excellence Organization
            </p>
            <div className="mb-8 inline-flex rounded-lg bg-white p-3 shadow-soft">
              <img src={`${assetBase}/official-logo.png`} alt="GSEO - Empowering scholars. Expanding futures." className="h-20 w-auto max-w-[300px] object-contain sm:h-24 sm:max-w-[420px]" />
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Empowering scholars. Expanding futures.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/66 dark:text-white/68 md:text-xl">
              GSEO makes high-quality high school and university-level research accessible to students around the world, free of charge.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#research" className="inline-flex h-12 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-paper dark:text-ink">
                Explore Research <ArrowUpRight size={17} />
              </a>
              <a href="#join" className="inline-flex h-12 items-center justify-center gap-2 rounded border border-black/14 bg-white/70 px-6 text-sm font-semibold transition hover:-translate-y-0.5 dark:border-white/14 dark:bg-white/5">
                Join GSEO <PenLine size={17} />
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.12 }}>
            <ResearchVisual />
          </motion.div>
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="bg-paper/92 p-5 backdrop-blur dark:bg-[#0b0f14]/92">
              <div className="text-3xl font-black md:text-4xl"><AnimatedNumber value={value} /></div>
              <div className="mt-1 text-sm text-black/56 dark:text-white/56">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="px-5 py-28 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">About GSEO</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">A global platform for scholarship, curiosity, and academic excellence.</h2>
          </div>
          <div className="space-y-7 text-lg leading-8 text-black/66 dark:text-white/68">
            <p>Global Scholars Excellence Organization is a student-founded digital platform publishing research, articles, interviews, and educational content across a wide range of disciplines.</p>
            <p>Its vision is to become a leading global platform for student-led research, helping young scholars share knowledge, collaborate across borders, and contribute to education and innovation.</p>
            <div className="grid gap-4 md:grid-cols-3">
              {["Excellence", "Accessibility", "Integrity", "Collaboration", "Curiosity"].map((item, index) => (
                <div key={item} className="border-l border-black/12 pl-5 dark:border-white/12">
                  <span className="text-xs font-bold text-accent">0{index + 1}</span>
                  <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="research" className="border-y border-black/10 bg-white/44 px-5 py-28 dark:border-white/10 dark:bg-white/[0.03] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Research & Publication Policy</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Standards for student research shared with a global audience.</h2>
            </div>
            <div className="flex max-w-xl flex-wrap gap-2">
              {paperCategories.map((category) => (
                <button key={category} type="button" onClick={() => setPaperFilter(category)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${paperFilter === category ? "border-accent bg-accent text-white" : "border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/5"}`}>
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPapers.map((paper) => (
              <Reveal key={paper.title}>
                <article className="group flex min-h-[360px] flex-col rounded-lg border border-black/10 bg-paper p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft dark:border-white/10 dark:bg-[#11161c]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      {paper.category}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight">{paper.title}</h3>
                  <p className="mt-3 text-sm font-medium text-black/54 dark:text-white/58">Authors: {paper.authors}</p>
                  <p className="mt-5 leading-7 text-black/64 dark:text-white/68">{paper.abstract}</p>
                  <div className="mt-auto pt-7">
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded border border-black/10 px-4 text-sm font-semibold text-accent transition group-hover:border-accent/40 dark:border-white/10">
                      Read paper <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Educational Articles</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Readable explainers on science, technology, and global change.</h2>
            </div>
            <a href="https://medium.com/@technology.gseo" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded border border-black/14 bg-white/70 px-6 text-sm font-semibold transition hover:-translate-y-0.5 dark:border-white/14 dark:bg-white/5">
              View all articles <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {educationalArticles.map((article, index) => (
              <Reveal key={article.title}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-[310px] flex-col rounded-lg border border-black/10 bg-white/58 p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">{article.topic}</span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-black/32 dark:text-white/32">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-3xl font-black leading-tight tracking-tight">{article.title}</h3>
                  <p className="mt-5 leading-7 text-black/62 dark:text-white/66">{article.deck}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
                    Read article <ArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Content Categories</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Research, guidance, interviews, and multimedia learning.</h2>
            </div>
            <div className="relative self-end">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/42 dark:text-white/42" size={18} />
              <input value={articleQuery} onChange={(event) => setArticleQuery(event.target.value)} placeholder="Search content categories" className="h-12 w-full rounded border border-black/12 bg-white/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/42 focus:border-accent dark:border-white/12 dark:bg-white/[0.06] dark:placeholder:text-white/42" />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredArticles.map((article) => (
              <Reveal key={article.title}>
                <article className="min-h-72 rounded-lg border border-black/10 bg-white/58 p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{article.type}</p>
                  <h3 className="mt-8 text-2xl font-bold leading-tight">{article.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-black/58 dark:text-white/60">{article.deck}</p>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/42 dark:text-white/42">{article.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sections" className="bg-ink px-5 py-28 text-white dark:bg-black lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Knowledge Hub</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">The official GSEO publishing ecosystem.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/12 md:grid-cols-2 lg:grid-cols-3">
            {sections.map(([title, copy, Icon]) => (
              <article key={title as string} className="min-h-64 bg-ink p-6 transition hover:bg-white/[0.06] dark:bg-black">
                <Icon className="text-sky-300" size={24} />
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-white/64">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="interviews" className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Interviews</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Academic experiences, university life, research opportunities, and career pathways.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {interviews.map((interview) => (
              <Reveal key={interview.url}>
                <article className="rounded-lg border border-black/10 bg-white/58 p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="grid h-20 w-28 place-items-center rounded border border-black/10 bg-white p-3 shadow-soft dark:border-white/10">
                    <img src={interview.logo} alt={`${interview.school} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold">{interview.school}</h3>
                  <p className="mt-4 text-sm leading-6 text-black/58 dark:text-white/60">{interview.copy}</p>
                  <a href={interview.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">Watch interview <ArrowUpRight size={16} /></a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="border-y border-black/10 bg-white/44 px-5 py-28 dark:border-white/10 dark:bg-white/[0.03] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Submission Requirements</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Clear standards for responsible scholarship.</h2>
            <p className="mt-6 text-lg leading-8 text-black/64 dark:text-white/66">GSEO promotes academic excellence through originality, clarity, citations, review, and responsible authorship.</p>
          </Reveal>
          <div className="grid gap-3">
            {joinSteps.map((step, index) => (
              <Reveal key={step.title}>
                <article className="grid gap-4 rounded-lg border border-black/10 bg-paper p-5 dark:border-white/10 dark:bg-[#11161c] md:grid-cols-[52px_1fr]">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-sm font-black dark:border-white/10 dark:bg-white/5">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-7 text-black/62 dark:text-white/64">{step.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Team</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">The students building GSEO's global research community.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {leaders.map(([name, role, image]) => (
              <Reveal key={name}>
                <article className="group overflow-hidden rounded-lg border border-black/10 bg-white/58 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="grid aspect-[4/5] place-items-center bg-black/[0.03] p-5 dark:bg-white/[0.03]">
                    <img src={image} alt="" className="h-full w-full object-contain grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="mt-1 text-sm text-black/54 dark:text-white/56">{role}</p>
                    <div className="mt-5 flex gap-2">
                      <a href="#contact" aria-label={`${name} LinkedIn`} className="grid h-9 w-9 place-items-center rounded border border-black/10 dark:border-white/10"><Linkedin size={16} /></a>
                      <a href="#contact" aria-label={`${name} publications`} className="grid h-9 w-9 place-items-center rounded border border-black/10 dark:border-white/10"><Newspaper size={16} /></a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/50 px-5 py-28 dark:bg-white/[0.03] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Our Teams</p>
            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Build GSEO across research, content, growth, and technology.</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-black/64 dark:text-white/66">Members contribute to research review, educational writing, interviews, outreach, partnerships, website development, analytics, and operations.</p>
              </div>
              <a href="#footer" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded bg-ink px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-paper dark:text-ink">
                Join Our Team <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {teams.map(([name, copy], index) => (
              <Reveal key={name}>
                <article className="min-h-64 rounded-lg border border-black/10 bg-paper p-5 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-[#11161c]">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-bold leading-tight">{name}</h3>
                  <p className="mt-4 text-sm leading-6 text-white">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">FAQ</h2>
            <div className="mt-10 divide-y divide-black/10 rounded-lg border border-black/10 dark:divide-white/10 dark:border-white/10">
              {faqs.map(([question, answer], index) => (
                <div key={question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold">
                    {question}
                    <ChevronDown className={`shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`} size={18} />
                  </button>
                  {openFaq === index && <p className="px-5 pb-5 leading-7 text-black/62 dark:text-white/64">{answer}</p>}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Academic integrity</h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {["No plagiarism", "No data fabrication", "No citation manipulation", "No false authorship", "AI as support only", "Authors remain responsible"].map((item) => (
                <a key={item} href="#contact" className="rounded border border-black/10 bg-white/58 p-5 font-semibold transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]">{item}</a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="bg-ink px-5 py-28 text-white dark:bg-black lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Contact</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Share knowledge openly. Build scholarship globally.</h2>
            <p className="mt-6 text-lg leading-8 text-white/66">Connect with GSEO to submit research, contribute educational content, join a division, or support the global student scholarship community.</p>
            <div className="mt-10 space-y-4 text-white/68">
              <p className="flex items-center gap-3"><Mail size={18} /> technology.gseo@gmail.com</p>
              <p className="flex items-center gap-3"><Globe2 size={18} /> Weekly articles, interviews, and research submissions</p>
              <p className="flex items-center gap-3"><Github size={18} /> Student-led research infrastructure</p>
            </div>
          </Reveal>
          <Reveal>
            <form className="grid gap-4 rounded-lg border border-white/12 bg-white/[0.06] p-5" onSubmit={(event) => event.preventDefault()}>
              <input aria-label="Name" placeholder="Name" className="h-12 rounded border border-white/12 bg-black/20 px-4 outline-none focus:border-sky-300" />
              <input aria-label="Email" type="email" placeholder="Email" className="h-12 rounded border border-white/12 bg-black/20 px-4 outline-none focus:border-sky-300" />
              <select aria-label="Interest" className="h-12 rounded border border-white/12 bg-black/20 px-4 outline-none focus:border-sky-300">
                <option>Submit research</option>
                <option>Write educational content</option>
                <option>Join a division</option>
                <option>Support outreach or technology</option>
              </select>
              <textarea aria-label="Message" placeholder="Share your topic, division interest, publication idea, or collaboration proposal." rows={5} className="rounded border border-white/12 bg-black/20 p-4 outline-none focus:border-sky-300" />
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-6 text-sm font-bold text-ink transition hover:-translate-y-0.5">
                Submit Interest <ArrowUpRight size={17} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer id="footer" className="bg-[#090b0c] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-black tracking-[0.22em]">GSEO</p>
            <p className="mt-3 max-w-md text-sm text-white/48">Empowering scholars. Expanding futures.</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
              Join Our Team <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="grid gap-3 text-sm text-white/58 sm:grid-cols-3 sm:gap-10">
            <a href="#research">Research</a>
            <a href="#publications">Categories</a>
            <a href="#sections">Knowledge Hub</a>
            <a href="#interviews">Interviews</a>
            <a href="#join">Policy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
