import React, { useState } from 'react';

/* ─── Types ────────────────────────────────────────────── */

interface PitchFormData {
  Name: string;
  Company: string;
  Email: string;
  JobDescription: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface AIPitchShowcaseProps {
  onBack?: () => void;
}

/* ─── Pipeline steps ───────────────────────────────────── */

const steps = [
  {
    num: '01',
    icon: '⚡',
    title: 'API Gateway & Lambda',
    tag: 'Python 3.10',
    body: 'An HTTPS endpoint on API Gateway receives the JSON payload and forwards it to a Python 3.10 Lambda function. Cold-start is under 200ms thanks to zero third-party dependencies.',
  },
  {
    num: '02',
    icon: '🧠',
    title: 'Gemini 1.5 Flash API',
    tag: 'urllib.request',
    body: 'Lambda retrieves the Gemini API key from AWS Secrets Manager at runtime, then calls the Gemini 1.5 Flash model to analyze the job description and draft a tailored pitch.',
  },
  {
    num: '03',
    icon: '💾',
    title: 'DynamoDB Persistence',
    tag: 'RecruiterLeads',
    body: 'Every submission is written as a time-stamped item in a DynamoDB table — a durable NoSQL record of every lead, generated pitch, and delivery status.',
  },
  {
    num: '04',
    icon: '📧',
    title: 'AWS SES Email Dispatch',
    tag: 'boto3',
    body: 'Finally, Lambda uses the SES SDK to send a formatted email containing the AI-generated pitch directly to the recruiter or hiring manager.',
  },
];

/* ─── Component ────────────────────────────────────────── */

export const AIPitchShowcase: React.FC<AIPitchShowcaseProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<PitchFormData>({
    Name: '',
    Company: '',
    Email: '',
    JobDescription: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [pitch, setPitch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.Company || !formData.Email || !formData.JobDescription) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    setPitch('');

    const url = import.meta.env.VITE_API_URL || 'https://ho155l7963.execute-api.us-east-1.amazonaws.com/leads';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: formData.Name.trim(),
          Company: formData.Company.trim(),
          Email: formData.Email.trim(),
          JobDescription: formData.JobDescription.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok || res.status === 201) {
        setStatus('success');
        setPitch(data.pitch || 'Pitch generated! A confirmation email has been dispatched via AWS SES.');
        setFormData({ Name: '', Company: '', Email: '', JobDescription: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'The AWS pipeline returned an error.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Network error reaching AWS API Gateway.');
    }
  };

  /* ── Shared inline styles that match the portfolio's design tokens ── */
  const colors = {
    bgPage: '#0f172a',        // deep navy (slate-900 equivalent)
    bgCard: 'rgba(255,255,255,0.06)',
    bgCardBorder: 'rgba(255,255,255,0.1)',
    bgInput: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.12)',
    inputFocus: '#0066cc',
    accent: '#0066cc',        // same Apple blue as the main site
    accentHover: '#0077ed',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    success: '#10b981',
    error: '#ef4444',
    tagBg: 'rgba(0,102,204,0.15)',
  };

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    background: `linear-gradient(180deg, ${colors.bgPage} 0%, #1e293b 100%)`,
    color: colors.textPrimary,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  };

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    width: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(15,23,42,0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  };

  const glassCard: React.CSSProperties = {
    background: colors.bgCard,
    border: `1px solid ${colors.bgCardBorder}`,
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '24px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: colors.bgInput,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: '12px',
    padding: '14px 16px',
    color: colors.textPrimary,
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: colors.textSecondary,
    marginBottom: '8px',
  };

  return (
    <div style={pageStyle}>
      {/* ── Nav ─────────────────────────────────────── */}
      <nav style={navStyle}>
        <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textSecondary,
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.textPrimary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
          >
            ← Back to Portfolio
          </button>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            color: colors.textMuted,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: colors.success,
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }} />
            AWS us-east-1 · Live
          </span>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────── */}
      <section style={{ ...containerStyle, paddingTop: '40px', paddingBottom: '24px' }}>
        <p style={{
          color: colors.accent,
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '10px',
        }}>
          ✦ Live Engineering Demo
        </p>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          background: 'none',
          WebkitBackgroundClip: 'unset',
          WebkitTextFillColor: '#ffffff',
          margin: 0,
        }}>
          Let My Architecture Pitch Itself
        </h1>
        <p style={{
          marginTop: '12px',
          maxWidth: '640px',
          fontSize: '1.15rem',
          lineHeight: 1.65,
          color: colors.textSecondary,
        }}>
          I am a Database and Application Software Engineer who believes in building
          highly scalable, automated systems. Instead of reading a standard cover letter,
          I built this event-driven AWS pipeline to prove my skills live.
        </p>
      </section>

      {/* ── Divider ─────────────────────────────────── */}
      <div style={containerStyle}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: 0 }} />
      </div>

      {/* ── Main content: Architecture + Form ──────── */}
      <section style={{ ...containerStyle, paddingTop: '32px', paddingBottom: '48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
        }}>
          {/* Responsive grid — CSS media query via a wrapper className would be ideal,
              but since we're matching the portfolio's inline style approach we use
              the same max-width breakpoint pattern */}
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
            .pitch-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 32px;
            }
            @media (min-width: 1024px) {
              .pitch-grid {
                grid-template-columns: 1fr 1fr;
                gap: 40px;
              }
            }
            .pitch-input:focus {
              border-color: ${colors.inputFocus} !important;
              box-shadow: 0 0 0 3px rgba(0,102,204,0.15);
            }
            .pitch-input::placeholder {
              color: ${colors.textMuted};
            }
            .pitch-submit:hover:not(:disabled) {
              background-color: ${colors.accentHover} !important;
              transform: scale(1.02);
            }
            .pitch-submit:active:not(:disabled) {
              transform: scale(0.99);
            }
            .step-card:hover {
              border-color: rgba(0,102,204,0.3) !important;
              transform: translateY(-2px);
            }
          `}</style>

          <div className="pitch-grid">
            {/* ─── Left: How It Works ───────────────── */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                marginBottom: '8px',
              }}>
                Test My Compatibility
              </h2>
              <p style={{
                color: colors.textSecondary,
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                Paste a job description into the form. When you hit submit, this application
                will fire a payload to a secure AWS API Gateway. A Python Lambda function will
                instantly wake up, securely retrieve my Gemini AI keys, and analyze your job
                requirements against my actual resume.
              </p>

              <p style={{
                color: colors.textSecondary,
                fontSize: '0.85rem',
                lineHeight: 1.5,
                marginBottom: '16px',
                fontStyle: 'italic',
              }}>
                Under the hood:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {steps.map((s) => (
                  <div
                    key={s.num}
                    className="step-card"
                    style={{
                      ...glassCard,
                      padding: '12px 16px',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                      transition: 'transform 0.3s cubic-bezier(0.25,1,0.5,1), border-color 0.3s',
                      cursor: 'default',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>
                      {s.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                          {s.title}
                        </h3>
                        <span style={{
                          fontSize: '0.7rem',
                          fontFamily: "'SF Mono', 'Fira Code', monospace",
                          background: colors.tagBg,
                          color: colors.accent,
                          padding: '2px 10px',
                          borderRadius: '99px',
                          fontWeight: 500,
                        }}>
                          {s.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: colors.textMuted, lineHeight: 1.5, margin: 0 }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{
                marginTop: '20px',
                fontSize: '1rem',
                color: colors.textPrimary,
                lineHeight: 1.65,
              }}>
                The result? A custom email delivered straight to your inbox in seconds,
                calculating exactly where my experience aligns with your role.
              </p>
            </div>

            {/* ─── Right: Form ──────────────────────── */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                marginBottom: '8px',
              }}>
                Generate a Custom Pitch
              </h2>
              <p style={{
                color: colors.textSecondary,
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}>
                Fill out the fields below and hit submit. Your custom pitch email will arrive in seconds.
              </p>

              <div style={glassCard}>
                {/* Error */}
                {status === 'error' && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '24px',
                    fontSize: '0.9rem',
                    color: '#fca5a5',
                  }}>
                    <strong style={{ color: '#fecaca' }}>Error:</strong> {errorMsg}
                  </div>
                )}

                {/* Success */}
                {status === 'success' && (
                  <div style={{
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.25)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                  }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.success, marginBottom: '12px' }}>
                      ✓ Pipeline Succeeded — Lead Logged & Email Dispatched
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      fontFamily: "'SF Mono', 'Fira Code', monospace",
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'rgba(16,185,129,0.7)',
                      marginBottom: '8px',
                    }}>
                      Generated Pitch Preview
                    </p>
                    <pre style={{
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      color: colors.textSecondary,
                      background: 'rgba(0,0,0,0.2)',
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      maxHeight: '260px',
                      overflowY: 'auto',
                      margin: 0,
                      fontFamily: "'SF Mono', 'Fira Code', monospace",
                    }}>
                      {pitch}
                    </pre>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Recruiter Name</label>
                      <input
                        className="pitch-input"
                        name="Name"
                        type="text"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Sarah Connor"
                        disabled={status === 'loading'}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Company</label>
                      <input
                        className="pitch-input"
                        name="Company"
                        type="text"
                        value={formData.Company}
                        onChange={handleChange}
                        placeholder="Cyberdyne Systems"
                        disabled={status === 'loading'}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Recipient Email</label>
                    <input
                      className="pitch-input"
                      name="Email"
                      type="email"
                      value={formData.Email}
                      onChange={handleChange}
                      placeholder="recruiter@company.com"
                      disabled={status === 'loading'}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>Job Description</label>
                    <textarea
                      className="pitch-input"
                      name="JobDescription"
                      rows={6}
                      value={formData.JobDescription}
                      onChange={handleChange}
                      placeholder="Paste the full text of your job listing here. The AI will scan it for key technologies and requirements..."
                      disabled={status === 'loading'}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="pitch-submit"
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      borderRadius: '99px',
                      border: 'none',
                      background: colors.accent,
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: status === 'loading' ? 0.6 : 1,
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span style={{
                          width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff', borderRadius: '50%',
                          display: 'inline-block', animation: 'spin 0.6s linear infinite',
                        }} />
                        Executing Pipeline…
                        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
                      </>
                    ) : (
                      '✦ Execute AWS Pipeline →'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPitchShowcase;
