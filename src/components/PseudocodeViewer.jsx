import { useState } from 'react';
import './PseudocodeViewer.css';

const LANGUAGES = ['english', 'javascript', 'python'];
const LANG_LABELS = { english: '📝 English', javascript: '🟨 JavaScript', python: '🐍 Python' };

export default function PseudocodeViewer({ algorithm, currentPseudocodeLine }) {
  const [language, setLanguage] = useState('english');

  if (!algorithm) return null;

  const pseudocode = algorithm.pseudocode?.[language] || [];

  return (
    <div className="pseudocode-viewer" id="pseudocode-viewer">
      <div className="pseudocode-header">
        <span className="label">Pseudocode</span>
        <div className="lang-toggle">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              className={`lang-btn ${language === lang ? 'active' : ''}`}
              onClick={() => setLanguage(lang)}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>
      <div className="pseudocode-body">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`code-line ${index === currentPseudocodeLine ? 'code-line-active' : ''}`}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-content">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
