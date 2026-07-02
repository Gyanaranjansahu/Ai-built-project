// React hooks keep the report interactive without changing the rest of the app.
import { useEffect, useState } from "react";

// useLocation lets this page receive the generated report from navigation state.
import { useLocation } from "react-router-dom";

// These are the real report sections shown as clickable SPA tabs.
const navigationItems = [
  // Overview opens the candidate summary area.
  { id: "overview", label: "Overview", icon: "O" },
  // Technical opens the generated technical interview questions.
  { id: "technical", label: "Technical Questions", icon: "T" },
  // Behavioral opens the generated behavioral interview questions.
  { id: "behavioral", label: "Behavioral Questions", icon: "B" },
  // Skill gaps opens missing skill analysis.
  { id: "skill-gaps", label: "Skill Gaps", icon: "S" },
  // Preparation opens the generated preparation plan.
  { id: "preparation", label: "Preparation Plan", icon: "P" },
];

// This object keeps all page styling close to the component.
const styles = {
  // The page uses the same dark radial background as the Home screen.
  page: {
    minHeight: "100vh",
    margin: 0,
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    background:
      "radial-gradient(circle at top left, #1e293b, transparent 35%), radial-gradient(circle at bottom right, #312e81, transparent 35%), linear-gradient(135deg, #0f172a, #111827)",
    position: "relative",
    overflowX: "hidden",
  },
  // The blur layer recreates Home's soft glassmorphism glow without extra markup.
  backgroundGlow: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    background:
      "radial-gradient(circle at -80px -50px, rgba(59, 130, 246, 0.25), transparent 260px), radial-gradient(circle at calc(100% + 80px) calc(100% + 50px), rgba(168, 85, 247, 0.2), transparent 260px)",
    filter: "blur(18px)",
  },
  // The layout places tab titles beside the report on desktop.
  layout: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "280px minmax(0, 1fr)",
    minHeight: "100vh",
  },
  // The sidebar is a glass tab panel so it matches the Home card effect.
  sidebar: {
    position: "sticky",
    top: 0,
    height: "100vh",
    padding: "24px 18px",
    boxSizing: "border-box",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  },
  // Brand spacing separates the report title from the section title buttons.
  brand: {
    marginBottom: "28px",
  },
  // The badge is a compact visual anchor for the report page.
  brandBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    marginBottom: "14px",
    fontWeight: 800,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.35)",
  },
  // Sidebar heading names the page.
  sidebarTitle: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.25,
    fontWeight: 750,
  },
  // Sidebar subtitle explains the page context only on desktop.
  sidebarSubtitle: {
    margin: "8px 0 0",
    color: "rgba(255, 255, 255, 0.68)",
    fontSize: "13px",
    lineHeight: 1.45,
  },
  // Section title buttons stack vertically on desktop.
  navList: {
    display: "grid",
    gap: "8px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  // Each section title button is a full-width glass control.
  navButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "14px",
    border: "1px solid transparent",
    background: "transparent",
    color: "rgba(255, 255, 255, 0.78)",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: 650,
    transition: "background 180ms ease, color 180ms ease, transform 180ms ease, border-color 180ms ease",
  },
  // The active section title gets a brighter glass surface.
  navButtonActive: {
    background: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    boxShadow: "inset 3px 0 0 rgba(139, 92, 246, 0.9)",
  },
  // The icon chip keeps every section title row visually stable.
  navIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    fontWeight: 800,
    color: "#ffffff",
    background: "rgba(255, 255, 255, 0.09)",
  },
  // Main content is centered within the available space.
  mainWrap: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "28px",
    boxSizing: "border-box",
    minWidth: 0,
  },
  // Content stacks all report areas with consistent spacing.
  content: {
    width: "100%",
    maxWidth: "1120px",
    display: "grid",
    gap: "22px",
  },
  // This glass card style is reused across header, sections, and footer.
  glassCard: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  },
  // Header card holds the report title, metadata, score, and actions.
  headerCard: {
    borderRadius: "30px",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
  },
  // Small uppercase-style context text above the title.
  eyebrow: {
    margin: 0,
    color: "rgba(255, 255, 255, 0.68)",
    fontSize: "13px",
    fontWeight: 750,
    letterSpacing: "0",
  },
  // Main report heading.
  title: {
    margin: "8px 0 0",
    fontSize: "34px",
    lineHeight: 1.15,
    fontWeight: 750,
  },
  // Header pills show real metadata when report data exists.
  headerMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "14px",
  },
  // Metadata pills use the same translucent input look as Home.
  pill: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.78)",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  // The score ring uses the real match score when available.
  scoreRing: {
    width: "124px",
    height: "124px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.28)",
  },
  // The score center makes the number readable over the gradient ring.
  scoreInner: {
    width: "92px",
    height: "92px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    color: "#ffffff",
    fontWeight: 800,
    background: "rgba(15, 23, 42, 0.86)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  // Buttons sit together and wrap on small screens.
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  // Primary action mirrors the Home generate button gradient.
  primaryButton: {
    border: "none",
    outline: "none",
    cursor: "pointer",
    padding: "14px 18px",
    borderRadius: "16px",
    fontSize: "0.98rem",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.35)",
  },
  // Secondary action stays translucent and quieter.
  secondaryButton: {
    cursor: "pointer",
    padding: "13px 17px",
    borderRadius: "16px",
    fontSize: "0.98rem",
    fontWeight: 700,
    color: "#ffffff",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  // Summary cards form a responsive KPI grid from real report counts.
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  // Each KPI card uses the same glass panel treatment.
  summaryCard: {
    borderRadius: "22px",
    padding: "18px",
    transition: "transform 180ms ease, box-shadow 180ms ease",
  },
  // KPI label is secondary.
  mutedLabel: {
    margin: 0,
    color: "rgba(255, 255, 255, 0.65)",
    fontSize: "13px",
  },
  // KPI value is the important number.
  summaryValue: {
    margin: "10px 0 0",
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: 1,
    fontWeight: 800,
  },
  // The active section is shown as one glass card instead of many scrolling blocks.
  section: {
    borderRadius: "26px",
    padding: "24px",
  },
  // Section heading establishes hierarchy.
  sectionTitle: {
    margin: 0,
    fontSize: "23px",
    lineHeight: 1.2,
    fontWeight: 750,
  },
  // Section intro text stays muted.
  sectionHint: {
    margin: "8px 0 0",
    color: "rgba(255, 255, 255, 0.66)",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  // Item grid keeps generated report entries organized.
  itemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
    marginTop: "18px",
  },
  // Item cards show one generated question, skill, or plan day.
  itemCard: {
    minHeight: "118px",
    padding: "16px",
    borderRadius: "18px",
    color: "#ffffff",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  // Item title makes the main content scannable.
  itemTitle: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.35,
    fontWeight: 750,
  },
  // Item text displays answers and explanations.
  itemText: {
    margin: "10px 0 0",
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: "14px",
    lineHeight: 1.55,
  },
  // Empty state replaces all dummy data when no generated report exists.
  emptyState: {
    padding: "26px",
    borderRadius: "22px",
    color: "rgba(255, 255, 255, 0.78)",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px dashed rgba(255, 255, 255, 0.18)",
    lineHeight: 1.6,
  },
  // Footer aligns the bottom actions to the right on desktop.
  actionFooter: {
    borderRadius: "26px",
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "flex-end",
  },
};

// This helper reads saved report JSON without crashing on invalid storage data.
function readStoredReport() {
  // Browser storage is only available in the client.
  if (typeof window === "undefined") return null;

  // These keys support either a future exact key or an older/latest key.
  const savedReport = localStorage.getItem("interviewReport") || localStorage.getItem("latestInterviewReport");

  // No saved data means the report page should show the empty state.
  if (!savedReport) return null;

  // Parsing is wrapped so broken JSON does not break the whole page.
  try {
    return JSON.parse(savedReport);
  } catch {
    return null;
  }
}

// This helper extracts the actual report object from possible API response shapes.
function normalizeReport(value) {
  // Missing values should stay null instead of becoming fake report data.
  if (!value) return null;

  // Backend responses use { interviewReport }, while route state may pass the report directly.
  return value.interviewReport || value.report || value;
}

// This hook tracks whether the viewport needs the compact stacked layout.
function useCompactLayout() {
  // The initial state reads the current screen width.
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 900);

  // The effect updates layout state whenever the browser is resized.
  useEffect(() => {
    // This function recalculates the compact breakpoint.
    const updateLayout = () => setIsCompact(window.innerWidth < 900);

    // Listen to resize events while the component is mounted.
    window.addEventListener("resize", updateLayout);

    // Remove the listener when the component unmounts.
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Return the current layout mode to the component.
  return isCompact;
}

// Section renders a titled glass report block.
function Section({ id, title, hint, children }) {
  return (
    <section id={id} style={{ ...styles.glassCard, ...styles.section }} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} style={styles.sectionTitle}>
        {title}
      </h2>
      <p style={styles.sectionHint}>{hint}</p>
      {children}
    </section>
  );
}

// EmptySection gives a clear message instead of rendering dummy report content.
function EmptySection({ message }) {
  return <div style={styles.emptyState}>{message}</div>;
}

// QuestionCard renders either a technical or behavioral generated question.
function QuestionCard({ item }) {
  return (
    <article style={styles.itemCard}>
      <h3 style={styles.itemTitle}>{item.question}</h3>
      <p style={styles.itemText}>Intention: {item.intention}</p>
      <p style={styles.itemText}>Suggested answer: {item.answer}</p>
    </article>
  );
}

// ActiveReportSection returns only the section selected by the clicked title.
function ActiveReportSection({ activeSection, hasReport, matchScore, report }) {
  // Overview is the default section and shows the highest-level report values.
  if (activeSection === "overview") {
    return (
      <Section id="overview" title="Overview" hint="Candidate summary, recommendation, strengths, and weaknesses from the generated report.">
        {hasReport ? (
          <div style={styles.itemGrid}>
            <article style={styles.itemCard}>
              <h3 style={styles.itemTitle}>Report Title</h3>
              <p style={styles.itemText}>{report.title}</p>
            </article>
            <article style={styles.itemCard}>
              <h3 style={styles.itemTitle}>Match Score</h3>
              <p style={styles.itemText}>{matchScore}% match with the job description.</p>
            </article>
          </div>
        ) : (
          <EmptySection message="No interview report has been generated yet. Once the Home form sends real data to the backend, this page will show the returned report here." />
        )}
      </Section>
    );
  }

  // Technical shows generated technical questions only when real data exists.
  if (activeSection === "technical") {
    return (
      <Section id="technical" title="Technical Questions" hint="Generated technical questions with intention and suggested answer.">
        {report?.technicalQuestions?.length ? (
          <div style={styles.itemGrid}>
            {report.technicalQuestions.map((item, index) => (
              <QuestionCard key={`${item.question}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <EmptySection message="No technical questions are available yet." />
        )}
      </Section>
    );
  }

  // Behavioral shows generated behavioral questions only when real data exists.
  if (activeSection === "behavioral") {
    return (
      <Section id="behavioral" title="Behavioral Questions" hint="Generated behavioral questions with intention and suggested answer.">
        {report?.behavioralQuestions?.length ? (
          <div style={styles.itemGrid}>
            {report.behavioralQuestions.map((item, index) => (
              <QuestionCard key={`${item.question}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <EmptySection message="No behavioral questions are available yet." />
        )}
      </Section>
    );
  }

  // Skill gaps shows generated weakness areas only when real data exists.
  if (activeSection === "skill-gaps") {
    return (
      <Section id="skill-gaps" title="Skill Gap Analysis" hint="Missing or weaker skills detected from the resume and job description.">
        {report?.skillGaps?.length ? (
          <div style={styles.itemGrid}>
            {report.skillGaps.map((item, index) => (
              <article style={styles.itemCard} key={`${item.skill}-${index}`}>
                <h3 style={styles.itemTitle}>{item.skill}</h3>
                <p style={styles.itemText}>Severity: {item.severity}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptySection message="No skill gap analysis is available yet." />
        )}
      </Section>
    );
  }

  // Preparation shows the generated plan when the selected tab is preparation.
  return (
    <Section id="preparation" title="7-Day Preparation Plan" hint="Generated preparation plan with daily focus areas and tasks.">
      {report?.preparationPlan?.length ? (
        <div style={styles.itemGrid}>
          {report.preparationPlan.map((item, index) => (
            <article style={styles.itemCard} key={`${item.day}-${item.focus}-${index}`}>
              <h3 style={styles.itemTitle}>Day {item.day}: {item.focus}</h3>
              <p style={styles.itemText}>{item.tasks?.join(", ")}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptySection message="No preparation plan is available yet." />
      )}
    </Section>
  );
}

// InterviewReport is the main report page component.
function InterviewReportCard() {
  // Location may contain the freshly generated report after navigation.
  const location = useLocation();

  // report stores real generated data only; it never falls back to dummy content.
  const [report] = useState(() => normalizeReport(location.state) || normalizeReport(readStoredReport()));

  // activeSection controls which SPA section is visible.
  const [activeSection, setActiveSection] = useState("overview");

  // hoveredCard adds a small interactive lift to KPI cards.
  const [hoveredCard, setHoveredCard] = useState("");

  // isCompact switches the sidebar into a top navigation bar.
  const isCompact = useCompactLayout();

  // hasReport is true only when real generated report data is available.
  const hasReport = Boolean(report);

  // matchScore stays inside 0-100 when the backend provides it.
  const matchScore = Math.max(0, Math.min(100, Number(report?.matchScore || 0)));

  // summaryCards are calculated from real report arrays and the real match score.
  const summaryCards = [
    { label: "Match Score", value: hasReport ? `${matchScore}%` : "No data" },
    { label: "Technical Questions", value: report?.technicalQuestions?.length || 0 },
    { label: "Behavioral Questions", value: report?.behavioralQuestions?.length || 0 },
    { label: "Skill Gaps", value: report?.skillGaps?.length || 0 },
    { label: "Preparation Days", value: report?.preparationPlan?.length || 0 },
  ];

  // This effect makes the browser root use the same background while this page is mounted.
  useEffect(() => {
    const previousBodyBackground = document.body.style.background;
    const previousHtmlBackground = document.documentElement.style.background;
    const rootElement = document.getElementById("root");
    const previousRootBackground = rootElement?.style.background;
    const previousRootMinHeight = rootElement?.style.minHeight;

    document.body.style.background = "#0f172a";
    document.documentElement.style.background = "#0f172a";

    if (rootElement) {
      rootElement.style.background = "#0f172a";
      rootElement.style.minHeight = "100vh";
    }

    return () => {
      document.body.style.background = previousBodyBackground;
      document.documentElement.style.background = previousHtmlBackground;

      if (rootElement) {
        rootElement.style.background = previousRootBackground || "";
        rootElement.style.minHeight = previousRootMinHeight || "";
      }
    };
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlow} />

      <div style={{ ...styles.layout, ...(isCompact ? { gridTemplateColumns: "1fr" } : {}) }}>
        <aside
          style={{
            ...styles.sidebar,
            ...(isCompact
              ? {
                  position: "sticky",
                  height: "auto",
                  zIndex: 10,
                  borderRight: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "14px",
                  overflow: "hidden",
                }
              : {}),
          }}
        >
          <div style={{ ...styles.brand, ...(isCompact ? { marginBottom: "12px" } : {}) }}>
            <div style={styles.brandBadge}>IR</div>
            <h1 style={styles.sidebarTitle}>Interview Report</h1>
            {!isCompact && <p style={styles.sidebarSubtitle}>Generated analysis appears here after the interview form runs.</p>}
          </div>

          <nav aria-label="Interview report section titles">
            <ul
              style={{
                ...styles.navList,
                ...(isCompact ? { display: "flex", flexWrap: "wrap" } : {}),
              }}
            >
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    style={{
                      ...styles.navButton,
                      ...(activeSection === item.id ? styles.navButtonActive : {}),
                      ...(isCompact ? { width: "max-content" } : {}),
                    }}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span style={styles.navIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main style={{ ...styles.mainWrap, ...(isCompact ? { padding: "16px" } : {}) }}>
          <div style={styles.content}>
            <header style={{ ...styles.glassCard, ...styles.headerCard }}>
              <div>
                <p style={styles.eyebrow}>{hasReport ? "Generated Interview Report" : "No Generated Data Yet"}</p>
                <h2 style={styles.title}>{report?.title || "Interview Analysis Report"}</h2>
                <div style={styles.headerMeta}>
                  <span style={styles.pill}>{report?.jobDescription ? "Job description added" : "Job description not available"}</span>
                  <span style={styles.pill}>{report?.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Generated date not available"}</span>
                  <span style={styles.pill}>{hasReport ? "Candidate report ready" : "Generate a report from Home"}</span>
                </div>
              </div>

              <div
                style={{
                  ...styles.scoreRing,
                  background: `conic-gradient(#8b5cf6 ${matchScore * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`,
                }}
                aria-label="Match score"
              >
                <div style={styles.scoreInner}>{hasReport ? `${matchScore}%` : "No data"}</div>
              </div>

              <div style={styles.buttonRow}>
                <button type="button" style={styles.secondaryButton} onClick={() => window.print()}>
                  Export PDF
                </button>
                <button type="button" style={styles.primaryButton} onClick={() => window.print()}>
                  Download
                </button>
              </div>
            </header>

            <section aria-label="Dashboard summary" style={styles.summaryGrid}>
              {summaryCards.map((card) => (
                <article
                  key={card.label}
                  style={{
                    ...styles.glassCard,
                    ...styles.summaryCard,
                    ...(hoveredCard === card.label
                      ? {
                          transform: "translateY(-4px)",
                          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                        }
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredCard(card.label)}
                  onMouseLeave={() => setHoveredCard("")}
                >
                  <p style={styles.mutedLabel}>{card.label}</p>
                  <p style={styles.summaryValue}>{card.value}</p>
                </article>
              ))}
            </section>

            <ActiveReportSection activeSection={activeSection} hasReport={hasReport} matchScore={matchScore} report={report} />

            <footer style={{ ...styles.glassCard, ...styles.actionFooter }} aria-label="Report actions">
              <button type="button" style={styles.primaryButton} onClick={() => window.print()}>
                Download Report
              </button>
              <button type="button" style={styles.secondaryButton} onClick={() => window.location.assign("/")}>
                Start New Interview
              </button>
              <button type="button" style={styles.secondaryButton} onClick={() => window.location.assign("/")}>
                Back to Home
              </button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

// Exporting the component allows App.jsx routes to render this page.
export default InterviewReportCard;
