import GoogleTranslate from "./GoogleTranslate";
import React, { useState, useRef, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Advisor from "./Advisor";
import Home from "./Home";
import Resources from "./Resources";
import CropGuide from "./CropGuide";
import {
  FaHome,
  FaComments,
  FaInfoCircle,
  FaLeaf,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import How from "./How";
import { NavLink } from "react-router-dom";

import "./App.css";

/* ---------------- LANGUAGE ---------------- */

const LANGUAGE_OPTIONS = [
  { value: "en", label: "🌍 English" },
  { value: "hi", label: "🇮🇳 हिंदी" },
  { value: "mr", label: "🇮🇳 मराठी" },
  { value: "bn", label: "🇮🇳 বাংলা" },
  { value: "ta", label: "🇮🇳 தமிழ்" },
  { value: "te", label: "🇮🇳 తెలుగు" },
  { value: "gu", label: "🇮🇳 ગુજરાતી" },
  { value: "pa", label: "🇮🇳 ਪੰਜਾਬੀ" },
  { value: "kn", label: "🇮🇳 ಕನ್ನಡ" },
  { value: "ml", label: "🇮🇳 മലയാളം" },
  { value: "or", label: "🇮🇳 ଓଡ଼ିଆ" },
  { value: "as", label: "🇮🇳 অসমীয়া" },
];

const getInitialLanguage = () => {
  try {
    const stored = localStorage.getItem("preferredLanguage");
    return LANGUAGE_OPTIONS.some((l) => l.value === stored)
      ? stored
      : "en";
  } catch {
    return "en";
  }
};

/* ---------------- GOOGLE TRANSLATE CONTROL ---------------- */

const applyGoogleTranslate = (lang) => {
  const el = document.querySelector(".goog-te-combo");
  if (!el) return false;

  el.value = lang;
  el.dispatchEvent(new Event("change"));
  return true;
};

const syncLanguage = (lang, setLang) => {
  setLang(lang);
  localStorage.setItem("preferredLanguage", lang);
  applyGoogleTranslate(lang);
};

/* ---------------- APP ---------------- */

function App() {
<<<<<<< HEAD
  const [loginLang, setLoginLang] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sunlight, setSunlight] = useState(false);

  const [name, setName] = useState(localStorage.getItem("farmerName") || "");
  const [inputName, setInputName] = useState("");
  const [preferredLang, setPreferredLang] = useState(
    localStorage.getItem("preferredLanguage") || "",
  );

  // Auto-apply preferred language using Google Translate
  useEffect(() => {
    if (!preferredLang) return;

    const applyLang = () => {
      const select = document.querySelector(".goog-te-combo");
      if (!select) return false;

      if (select.value !== preferredLang) {
        select.value = preferredLang;
        select.dispatchEvent(new Event("change"));
      }
      return true;
    };

    if (applyLang()) return;

    const observer = new MutationObserver(() => {
      if (applyLang()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [preferredLang]);
=======
  const [preferredLang, setPreferredLang] = useState(getInitialLanguage);
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [name, setName] = useState(localStorage.getItem("farmerName") || "");
  const [inputName, setInputName] = useState("");

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    document.documentElement.classList.toggle(
      "theme-dark",
      theme === "dark"
    );
    localStorage.setItem("theme", theme);
  }, [theme]);
>>>>>>> upstream/main

  /* ---------------- LANGUAGE AUTO APPLY ---------------- */
  useEffect(() => {
    if (applyGoogleTranslate(preferredLang)) return;

    const id = setInterval(() => {
      if (applyGoogleTranslate(preferredLang)) clearInterval(id);
    }, 300);

    return () => clearInterval(id);
  }, [preferredLang]);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e) => {
    e.preventDefault();

    if (!inputName.trim()) {
      alert("Name is required");
      return;
    }

<<<<<<< HEAD
    if (!loginLang) {
      alert("Please select a language");
      return;
    }
    localStorage.setItem("farmerName", inputName);
    localStorage.setItem("preferredLanguage", loginLang);

    setName(inputName);
    setPreferredLang(loginLang);

=======
    localStorage.setItem("farmerName", inputName);
    setName(inputName);
>>>>>>> upstream/main
    setInputName("");
    window.location.href = "/";
  };

  const handleLogout = () => {
    localStorage.removeItem("farmerName");
    setName("");
<<<<<<< HEAD
    setPreferredLang("");
    window.location.href = "/login";
=======
    window.location.href = "/";
>>>>>>> upstream/main
  };

  const handleThemeToggle = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  /* ---------------- UI ---------------- */

  return (
<<<<<<< HEAD
  <Router>
    <GoogleTranslate lang={preferredLang} />
      <div className={sunlight ? "app sunlight" : "app"}>
=======
    <Router>
      <div className={`app ${theme === "dark" ? "theme-dark" : ""}`}>

        {/* NAVBAR */}
>>>>>>> upstream/main
        <nav className="navbar">
          <div className="nav-left">
            <FaLeaf className="icon" />
            <Link to="/" className="brand">
              Fasal Saathi
            </Link>
          </div>

          <ul className={`nav-center ${isOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/advisor" onClick={() => setIsOpen(false)}>
                <FaComments /> Chat
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
                <FaInfoCircle /> How It Works
              </Link>
            </li>
            <li>
              <Link to="/crop-guide" onClick={() => setIsOpen(false)}>
                <FaLeaf className="icon" /> Crop Guide
              </Link>
            </li>
          </ul>

          <div className="nav-right">
            <button onClick={handleThemeToggle}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <select
              className="lang-select notranslate"
<<<<<<< HEAD
              translate="no"
=======
>>>>>>> upstream/main
              value={preferredLang}
              onChange={(e) =>
                syncLanguage(e.target.value, setPreferredLang)
              }
            >
<<<<<<< HEAD
              <option value="">Select Language</option>
              <option value="en">🌍 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="mr">🇮🇳 मराठी</option>
              <option value="bn">🇮🇳 বাংলা</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="te">🇮🇳 తెలుగు</option>
              <option value="gu">🇮🇳 ગુજરાતી</option>
              <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
              <option value="kn">🇮🇳 ಕನ್ನಡ</option>
              <option value="ml">🇮🇳 മലയാളം</option>
              <option value="or">🇮🇳 ଓଡ଼ିଆ</option>
=======
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
>>>>>>> upstream/main
            </select>

            <div className="nav-user">
              {name ? (
                <>
<<<<<<< HEAD
                  👋 Welcome, {name}!
                  <button className="logout-btn" onClick={handleLogout}>
                    Change User
                  </button>
=======
                  👋 {name}
                  <button onClick={handleLogout}>Change User</button>
>>>>>>> upstream/main
                </>
              ) : (
                <Link to="/login">Get Started</Link>
              )}
            </div>
          </div>

          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

<<<<<<< HEAD
        {showAlert && (
          <div className="alert-bar">
            🌧️ Weather Alert: Heavy rainfall expected in parts of Maharashtra
            this evening.
            <button className="close-btn" onClick={() => setShowAlert(false)}>
              <FaTimes />
            </button>
          </div>
        )}

=======
        {/* ROUTES */}
>>>>>>> upstream/main
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/how-it-works" element={<How />} />

          <Route
            path="/login"
            element={
              <div className="login-page">
                <div className="login-card">
<<<<<<< HEAD
                  <h2>👨‍🌾 Get Started</h2>
                  <p>
                    Set up your profile to get personalized farming assistance.
                  </p>
                  <form onSubmit={handleLogin} noValidate>
=======
                  <h2>👨‍🌾 Farmer Login</h2>

                  <form onSubmit={handleLogin}>
>>>>>>> upstream/main
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                    />
<<<<<<< HEAD
                    <select
                      className="notranslate"
                      translate="no"
                      value={loginLang}
                      onChange={(e) => setLoginLang(e.target.value)}
                    >
                      <option value="">Select Language</option>
                      <option value="en">🌍 English</option>
                      <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                      <option value="mr">🇮🇳 मराठी (Marathi)</option>
                      <option value="bn">🇮🇳 বাংলা (Bengali)</option>
                      <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                      <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                      <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
                      <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
                      <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
                      <option value="ml">🇮🇳 മലയാളം (Malayalam)</option>
                      <option value="or">🇮🇳 ଓଡ଼ିଆ (Odia)</option>
                    </select>
                    <button type="submit">Continue</button>
=======

                    <button type="submit">Login</button>
>>>>>>> upstream/main
                  </form>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
