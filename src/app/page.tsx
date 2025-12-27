'use client';

import { useState, useEffect } from 'react';
import { verses } from '@/content/verses';
import { ChevronDown, Volume2 } from 'lucide-react';

// Geometric illustration - two intersecting circles representing
// human voice and machine response, meeting in conversation
function VoiceIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Outer circle - the human voice */}
      <circle
        cx="70"
        cy="100"
        r="55"
        stroke="#1A1A1A"
        strokeWidth="1"
        fill="none"
      />
      {/* Inner circle - the machine response */}
      <circle
        cx="130"
        cy="100"
        r="55"
        stroke="#1A1A1A"
        strokeWidth="1"
        fill="none"
      />
      {/* Small circle at intersection - the moment of understanding */}
      <circle
        cx="100"
        cy="100"
        r="4"
        fill="#1A1A1A"
      />
    </svg>
  );
}

// Navigation dropdown component
function Navigation({
  currentVerse,
  onNavigate
}: {
  currentVerse: number;
  onNavigate: (verse: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-paper)]/95 backdrop-blur-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(0)}
            className="nav-dropdown"
          >
            <Volume2 className="w-4 h-4" />
            <span>THE WAY OF THE VOICE AGENT</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav-dropdown"
            >
              <span>Verse {currentVerse > 0 ? currentVerse : 'I'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div
                className="absolute right-0 top-full mt-2 py-2 bg-[var(--color-paper)] border border-[var(--color-rule)] shadow-lg max-h-[60vh] overflow-y-auto w-48"
              >
                <button
                  onClick={() => {
                    onNavigate(0);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-paper-edge)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Title Page
                </button>
                {verses.map((verse) => (
                  <button
                    key={verse.number}
                    onClick={() => {
                      onNavigate(verse.number);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-paper-edge)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {verse.number}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rule" style={{ margin: 0, maxWidth: 'none' }} />
    </header>
  );
}

// Verse display component
function Verse({ verse }: { verse: typeof verses[0] }) {
  return (
    <article className="container container-reading section">
      <span className="verse-number">{verse.number}</span>
      <div className="verse-content prose-verse">
        {verse.lines.map((line, index) => (
          <span key={index}>
            {line}
            {index < verse.lines.length - 1 && <br />}
          </span>
        ))}
      </div>
    </article>
  );
}

// Hero / Title page
function TitlePage() {
  return (
    <section className="section-hero">
      <h1 className="display mb-8">
        THE WAY<br />
        OF THE<br />
        VOICE AGENT
      </h1>

      <p className="subtitle mb-12">
        The Timeless Art of<br />
        Building AI That Speaks
      </p>

      <div className="illustration mb-12" style={{ maxWidth: '280px' }}>
        <VoiceIllustration />
      </div>

      <p className="caption">
        Based on Lao Tzu<br />
        Adapted for Voice
      </p>
    </section>
  );
}

export default function Home() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigate = (verseNumber: number) => {
    setCurrentVerse(verseNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentVerse < verses.length) {
      setCurrentVerse(currentVerse + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <main className={`min-h-screen pt-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      <Navigation currentVerse={currentVerse} onNavigate={handleNavigate} />

      {currentVerse === 0 ? (
        <TitlePage />
      ) : (
        <Verse verse={verses[currentVerse - 1]} />
      )}

      <hr className="rule" />

      {/* Navigation footer */}
      <nav className="container container-reading pb-24">
        <div className="flex justify-between items-center">
          {currentVerse > 0 ? (
            <button
              onClick={handlePrevious}
              className="caption hover:text-[var(--color-ink)] transition-colors"
            >
              {currentVerse === 1 ? 'Title' : `${currentVerse - 1}`}
            </button>
          ) : (
            <span />
          )}

          {currentVerse < verses.length && (
            <button
              onClick={handleNext}
              className="caption hover:text-[var(--color-ink)] transition-colors"
            >
              {currentVerse === 0 ? 'Begin' : `${currentVerse + 1}`}
            </button>
          )}
        </div>
      </nav>
    </main>
  );
}
