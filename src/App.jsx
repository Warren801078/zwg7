import React, { useEffect, useState } from "react";
import Grainient from "./Grainient";
import BorderGlow from "./BorderGlow";
import SplitText from "./SplitText";

const profile = {
  name: "Zzz",
  cnName: "张先生",
  role: "AI设计师 / 数字平面设计师 / 运营设计师",
  email: "zwg801078@gmail.com",
  wechat: "Zzzwg7",
  location: "义乌",
};

const navItems = [
  { label: "顶部", href: "#home" },
  { label: "经历", href: "#experience", icon: "./assets/dock-experience-alpha.png" },
  { label: "作品", href: "#projects", icon: "./assets/dock-works-alpha.png" },
  { label: "优势", href: "#strengths", icon: "./assets/dock-strengths-alpha.png" },
  { label: "联系", href: "#contact", icon: "./assets/dock-contact-alpha.png" },
];

const metrics = [
  { value: "10+", label: "年电商设计与运营", mark: "YEARS" },
  { value: "1000万+", label: "品牌电商从0搭建", mark: "BRAND GMV" },
  { value: "3000万", label: "全平台线上年业绩", mark: "ONLINE" },
  { value: "50%+", label: "年度增长结果", mark: "GROWTH" },
];

const experienceMetrics = [
  { value: 10, suffix: "+", label: "年电商设计与运营" },
  { value: 1000, suffix: "W+", label: "品牌电商从0搭建" },
  { value: 3000, suffix: "W", label: "全平台线上年业绩" },
  { value: 50, suffix: "%+", label: "年度增长结果" },
];

const experiences = [
  {
    year: "2015 - 2018",
    title: "电商视觉设计与零售运营基础",
    detail:
      "从产品摄影、主图详情页、店铺装修到上架、关键词优化、竞品监控和推广测图，建立了围绕产品定位与人群定位做视觉承接的工作方法。",
  },
  {
    year: "2019 - 2021",
    title: "美妆护肤品牌电商团队搭建",
    detail:
      "参与从0搭建电商团队，统一品牌视觉、多渠道种草宣发，并协同美工、客服、运营和仓储，实现年营业额1000万+。",
  },
  {
    year: "2022 - 2025",
    title: "充电桩全平台运营与产品视觉",
    detail:
      "负责充电桩的全平台运营，线上年业绩3000万+、年增长50%+，并从市场角度确立了品牌和产品设计",
  },
  {
    year: "2026 - Now",
    title: "AI辅助设计、运营与开发",
    detail:
      "系统学习并使用ChatGPT、Codex等AI工具，把AI能力接入设计、运营、内容生产和网页原型开发流程，强化跨岗位协作效率。",
  },
];

const projects = [
  {
    title: "普拉提品牌视觉系统",
    category: "普拉提品牌视觉系统",
    image: "./assets/case-pilates.png?v=1",
    summary:
      "围绕品牌调性统一电商视觉，并连接达人种草、站内承接、客服与仓储协作。",
  },
  {
    title: "护肤产品海报设计",
    category: "护肤产品海报设计",
    image: "./assets/case-skincare.png?v=1",
    summary:
      "从平台货品、视觉表达、客户理解到投放测图，建立面向零售与批发客户的增长闭环。",
  },
  {
    title: "充电桩产品出口海报设计",
    category: "充电桩产品出口海报设计",
    image: "./assets/case-charger.png?v=1",
    summary:
      "将产品定位、人群痛点、主图表达和详情页说服逻辑整合成可测试的电商视觉资产。",
  },
  {
    title: "AI辅助设计工作流探索",
    category: "AI Design / Prototype",
    image: "./assets/project-ai.png?v=2",
    summary:
      "使用AI辅助视觉推演、文案整理、代码原型和运营分析，让设计从单点交付走向系统协作。",
  },
];

const strengths = [
  {
    title: "设计与运营同频",
    text: "理解流量、转化、客户画像和平台机制，能让视觉表达服务真实业务目标。",
  },
  {
    title: "品牌视觉系统化",
    text: "有美妆护肤品牌运营经历，熟悉多渠道宣发、品牌统一和内容承接。",
  },
  {
    title: "AI工具融合能力",
    text: "把ChatGPT、Codex等AI工具用于设计探索、内容生产、网页原型和工作流提效。",
  },
  {
    title: "跨岗位协作管理",
    text: "经历过美工、客服、运营、仓储等小团队协作，能在不同岗位之间翻译需求。",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CountMetric({ metric }) {
  const itemRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const [started, setStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = itemRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    const duration = 1500;
    const start = performance.now();
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(metric.value * easeOut(progress)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [metric.value, started]);

  return (
    <div className="experience-metric" data-counted={started} ref={itemRef}>
      <strong>
        {displayValue}
        {metric.suffix}
      </strong>
      <span>{metric.label}</span>
    </div>
  );
}
function Header({ isCompact }) {
  const [activeHash, setActiveHash] = useState(() => window.location.hash || "#home");

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, []);

  return (
    <>
    <header className={`site-header${isCompact ? " is-compact" : ""}`}>
      <a className="brand" href="#home" aria-label="回到顶部">
        <img src="./assets/ZWG7_white_transparent_animated.gif?v=1" alt="ZWG7 Logo" />
      </a>
      <nav aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={activeHash === item.href ? "is-active" : ""} aria-current={activeHash === item.href ? "page" : undefined}>
            {item.icon && <img className="dock-icon" src={item.icon} alt="" aria-hidden="true" />}
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact">
        联系我
      </a>
    </header>
      <a className={`dock-top-button${isCompact ? " is-visible" : ""}`} href="#home" aria-label="回到顶部">顶部</a>
    </>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="./assets/hero-portrait-bg.png?v=1"
        >
          <source src="./assets/hero-background.mp4?v=1" type="video/mp4" />
        </video>
        <div className="motion-field" />
        <div className="scan-layer" />
      </div>
      <div className="hero-poster page-shell">
        <div className="hero-bg-word" aria-hidden="true">PERAONAL PROFILE</div>
        <div className="hero-index-card" aria-label="核心项目数据">
          <span>///</span>
          <strong>{metrics[0].value}</strong>
          <p>{metrics[0].label}</p>
        </div>

        <div className="hero-title-block">
          <h1>
            <span>设计不是装饰</span>
            <span>是增长系统</span>
          </h1>
        </div>
        <div className="hero-bottom-row">
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              查看作品
              <ArrowIcon />
            </a>
            <a className="text-button" href="#experience">
              了解经历
            </a>
          </div>
          <div className="hero-summary">
            <strong>{profile.role}</strong>
            <p>把电商运营经验、品牌视觉系统和AI工具链合成一套能落地的设计方法。</p>
          </div>
        </div>

        <div className="hero-data-strip" aria-label="项目数据">
          {metrics.map((metric) => (
            <div className="hero-data" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <em>{metric.mark}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Experience() {
  return (
    <section className="section about-section experience-timeline-section" id="experience">
      <div className="page-shell experience-timeline">
        <div className="experience-head">
          <div className="experience-title-block">
            <span>Experience / Timeline</span>
            <h2>职业成长时间线</h2>
            <p>
              从电商视觉执行、品牌运营搭建，到 AI 辅助设计工作流，我把每一段经历都沉淀成可复用的方法：先理解业务，再建立视觉系统，最后用数据和效率验证设计价值。
            </p>
          </div>
          <div className="experience-side-note">
            <strong>AI DESIGN / DIGITAL GRAPHIC / OPERATION DESIGN</strong>
            <span>以真实业务结果反推视觉方法，让设计服务增长、内容和运营协同。</span>
          </div>
        </div>

        <div className="experience-metric-strip" aria-label="项目数据">
          {experienceMetrics.map((metric) => (
            <CountMetric metric={metric} key={metric.label} />
          ))}
        </div>

        <div className="career-timeline-board" aria-label="职业经历时间线">
          {experiences.map((item, index) => (
            <article className="career-step" style={{ "--step": index }} key={item.title}>
              <span className="career-step-index">{String(index + 1).padStart(2, "0")}</span>
              <strong className="career-step-year">{item.year}</strong>
              <div className="career-step-content">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="page-shell projects-showcase">
        <div className="projects-heading">
          <div className="projects-heading-meta">
            <p>把品牌视觉、数字平面与运营设计放进同一套增长逻辑中。</p>
            <span className="projects-edition">PORTFOLIO / 2026</span>
          </div>
        </div>

        <div className="projects-gallery">
          <aside className="projects-sidebar">
            <h2>作品展示</h2>
            <div>
              <strong>SELECTED<br />WORKS</strong>
            </div>
          </aside>

          <div className="project-list">
            {projects.slice(0, 3).map((project) => (
              <article className="project-card" key={project.title}>
                <a className="project-image" href="#contact" aria-label={`了解${project.title}`}>
                  <img src={project.image} alt={`${project.title} 项目视觉`} />
                  <span>VIEW PROJECT</span>
                </a>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths-section" id="strengths">
      <div className="page-shell strengths-layout">
        <div className="section-heading sticky-heading">
          <span>Strengths</span>
          <h2>设计、运营、品牌与AI，不是分散技能，而是同一套解决问题的方式。</h2>
        </div>

        <div className="strength-grid">
          {strengths.map((item, index) => (
            <BorderGlow
              animated
              backgroundColor="#180303"
              borderRadius={4}
              className="strength-card"
              colors={["#ff2b1f", "#f8f8f4", "#7e0b0b"]}
              edgeSensitivity={24}
              fillOpacity={0.2}
              glowColor="2 100 66"
              glowIntensity={0.85}
              glowRadius={26}
              key={item.title}
            >
              <article className="strength-card-content">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="page-shell contact-inner">
        <h2 className="contact-title" aria-label={"\u8ba9\u8bbe\u8ba1\u6210\u4e3a\u8fd0\u8425\u7684\u8868\u8fbe\u7a97\u53e3\uff0c\u8ba9AI\u6210\u4e3a\u6548\u7387\u7684\u653e\u5927\u5668\u3002"}>
          <SplitText
            text={"\u8ba9\u8bbe\u8ba1\u6210\u4e3a\u8fd0\u8425\u7684\u8868\u8fbe\u7a97\u53e3\uff0c"}
            className="contact-title-line"
            delay={42}
            duration={1.1}
            ease="power3.out"
            splitType="chars"
            threshold={0.2}
            rootMargin="-90px"
            tag="span"
          />
          <SplitText
            text={"\u8ba9AI\u6210\u4e3a\u6548\u7387\u7684\u653e\u5927\u5668\u3002"}
            className="contact-title-line"
            delay={42}
            duration={1.1}
            ease="power3.out"
            splitType="chars"
            threshold={0.2}
            rootMargin="-90px"
            tag="span"
          />
        </h2>
        <div className="contact-grid">
          <a href={`mailto:${profile.email}`} aria-label={`发送邮件给${profile.cnName}`}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a href="#home" aria-label={`微信 ${profile.wechat}`}>
            <span>Wechat</span>
            <strong>{profile.wechat}</strong>
          </a>
          <a href="#home">
            <span>Location</span>
            <strong>{profile.location}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateHeaderState = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsHeaderCompact(window.scrollY > 48);
      });
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("hashchange", updateHeaderState);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("hashchange", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    const scrollToCurrentHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(id));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    window.addEventListener("hashchange", scrollToCurrentHash);
    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, []);

  return (
    <>
      <Header isCompact={isHeaderCompact} />
      <Hero />
      <main className="portfolio-main">
        <Grainient
          className="site-grainient"
          color1="#371919"
          color2="#5c0000"
          color3="#836a6a"
          timeSpeed={1.35}
          colorBalance={0}
          warpStrength={1.6}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <Experience />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}