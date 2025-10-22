import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import "./style.css";
import "./appSection.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["Home", "About", "Apps", "Platform", "Products", "Contact"];

  // 3D Hover motion values for About Section (kept as you had them)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const posX = event.clientX - rect.left - rect.width / 2;
    const posY = event.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Slider controls (kept your logic but tuned easing & delays)
  const controls = useAnimation();
  const images = [
    "../hero.jpg",
    "../hero2.jpg",
    "../hero3.jpg",
    "../hero4.jpg",
  ];

  // --- Preload images for smoothness ---
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      try {
        await Promise.all(
          images.map(
            (src) =>
              new Promise((res) => {
                const img = new Image();
                img.src = src;
                img.onload = () => res(true);
                img.onerror = () => res(true);
              })
          )
        );
        if (!cancelled) {
          setTimeout(() => setImagesLoaded(true), 80);
        }
      } catch {
        if (!cancelled) setImagesLoaded(true);
      }
    };
    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Smooth auto slider ---
  useEffect(() => {
    if (!imagesLoaded) return;

    let isCancelled = false;
    const totalSlides = images.length;
    let currentIndex = 0;

    const run = async () => {
      while (!isCancelled) {
        currentIndex++;
        await controls.start({
          x: `-${currentIndex * 100}%`,
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        });

        if (currentIndex === totalSlides) {
          await new Promise((r) => setTimeout(r, 2400));
          await controls.start({ x: "0%", transition: { duration: 0 } });
          currentIndex = 0;
        }
        await new Promise((r) => setTimeout(r, 3000));
      }
    };

    const t = setTimeout(() => run(), 50);
    return () => {
      isCancelled = true;
      clearTimeout(t);
    };
  }, [controls, imagesLoaded, images.length]);


  // Product / filter state (unchanged)
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      name: "Protein Powder",
      img: "../product.jpg",
      category: "protein",
      desc: "High-quality protein powder to support muscle recovery.",
    },
    {
      name: "Creatine Monohydrate",
      img: "../product2.webp",
      category: "creatine",
      desc: "Boost your performance and strength with pure creatine.",
    },
    {
      name: "Vitamin Supplements",
      img: "../product3.jpg",
      category: "protein",
      desc: "Essential vitamins to boost your daily wellness.",
    },
    {
      name: "Energy Drinks",
      img: "../product4.jpg",
      category: "protein",
      desc: "Instant energy boost for intense workouts.",
    },
    {
      name: "Pre-Workout Boost",
      img: "../product5.jpg",
      category: "creatine",
      desc: "Maximize performance and focus before workouts.",
    },
    {
      name: "Protein Box",
      img: "../product6.jpg",
      category: "protein",
      desc: "All-in-one protein meal box for busy days.",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [flippedCard, setFlippedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);

      // simple auto-hide nav on scroll down, show on scroll up
      const current = window.scrollY;
      if (current < 80) {
        setNavVisible(true);
      } else {
        setNavVisible(lastScrollRef.current > current);
      }
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Apps content (unchanged)
  const apps = [
    {
      id: "soul",
      title: "SoulWhispers",
      tag: "Pocket-Sized Wellness",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
      features: [
        "Your PocketSized Wellness Companion SoulWhispers is a mindfulness and emotional wellness app designed to help users reconnect with their inner calm. Through guided meditations, reflective journaling, and AIpowered mood tracking, SoulWhispers nurtures mental clarity and emotional resilience in a fastpaced world.",
      ],
      keyfeatures: [
        "Telehealth and diagnostics",
        "Mood journaling with AI insights",
        "Personalized providers",
        "Seamless booking & check-in for consultation sessions",
      ],
    },
    {
      id: "gym",
      title: "GymKey",
      tag: "Smart Access to Fitness",
      image:
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
      features: [
        "Smart Access to Fitness, Anytime GymKey is your digital passport to fitness freedom. Whether you're a gym owner or a fitness enthusiast, GymKey connects users with partner gyms, tracks workouts, and simplifies access—all from a single app.",
      ],
      keyfeatures: [
        "Seamless checkin at partner gyms",
        "Workout tracking and performance analytics",
        "Membership management for gym owners",
      ],
    },
  ];

  // small utility for fade variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
    }),
  };

  // wrapper for on-scroll reveal using useInView (for elements inside sections)
  const Reveal = ({ children, delayIndex = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const controls = useAnimation();
    useEffect(() => {
      if (inView) controls.start("visible");
    }, [inView, controls]);
    return (
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={controls}
        custom={delayIndex}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-white bg-black scroll-smooth">
      {/* animated gradient blobs & subtle noise */}
      <div className="bg-lights">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ===== NAVBAR ===== */}
      <motion.header
        animate={{ y: navVisible ? 0 : -86 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="fixed w-full z-40 backdrop-blur-md bg-black/55 py-4 border-b border-gray-900/60"
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-orange-400 to-purple-600 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110 shadow-md">
              W
            </div>
            <span className="font-semibold text-gray-100 group-hover:text-orange-400 transition">
              Wellnex
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 items-center text-sm">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-orange-400 transition duration-200 relative px-1 py-1 group"
                >
                  <span>{link}</span>
                  <span className="nav-underline" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sm px-3 py-2 rounded bg-gradient-to-br from-orange-500 to-purple-600 text-white shadow"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed top-16 left-0 w-full bg-gradient-to-br from-orange-500/90 to-purple-600/90 text-black font-semibold z-30 px-6 py-6 border-b border-gray-900 backdrop-blur-md flex flex-col items-center space-y-4 text-center"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block w-full text-lg py-2 border border-white/30 rounded-lg hover:border-white hover:text-white transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </motion.div>

      )}

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-28 pb-20 hero-anim"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Side */}
          <div className="w-full lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={imagesLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08,
              }}
              className="text-4xl md:text-5xl font-extrabold leading-tight text-white"
            >
              Wellnex Systems
              <span className="block mt-2 bg-gradient-to-br from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Wellness, Reimagined for the Next Generation
              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={imagesLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 1.1,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 text-gray-400 text-lg"
            >
              A digital wellness ecosystem designed to help you live better —
              combining mindfulness, fitness, and health insights powered by AI
              and innovation.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={imagesLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 1.1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="#platform"
                className="inline-block px-6 py-3 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 text-white font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                Join the Movement
              </a>
              <a
                href="#apps"
                className="inline-block px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium transition-all duration-300 ease-in-out hover:bg-gray-800 hover:border-gray-500 hover:scale-105"
              >
                Explore Our Apps
              </a>
            </motion.div>
          </div>

          {/* Right Side - Smooth Infinite Slider */}
          <div className="w-full lg:w-1/2 flex justify-center relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl h-[400px] hero-anim">
            {/* glowing animated background blob */}
            <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/12 via-purple-600/6 rounded-full blur-3xl animate-blob" />

            <motion.div
              animate={controls}
              className="flex relative z-10 hero-anim"
              style={{
                width: `${(images.length + 1) * 100}%`,
                display: "flex",
              }}
            >
              {[...images, images[0]].map((src, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 h-[400px] hero-anim"
                >
                  <img
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-[400px] object-cover rounded-2xl shadow-inner hero-anim"
                    draggable={false}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ===== ABOUT ===== */}
      <div className="bg-black text-white">
        <section id="about" className="max-w-6xl mx-auto px-6 py-20">
          <div style={{ textAlign: "center", paddingBottom: "40px" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>
              <span className="bg-gradient-to-br from-orange-500 to-purple-600 bg-clip-text text-transparent  mr-4">
                About
              </span>
              <span style={{ color: "white" }}>Wellnex</span>

            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.img
              src="/about2.png" // image must be in /public folder
              alt="Wellness Lifestyle"
              className="rounded-2xl shadow-lg w-full transform-style preserve-3d"
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
                cursor: "pointer",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-semibold mb-4 text-white">
                Where Wellness Meets What’s Next
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We combine human insight with technology to help people stay
                physically active, mentally balanced, and emotionally resilient.
              </p>
              <p className="text-gray-400 font-medium">
                From gyms to meditation, Wellnex bridges the gap between
                well-being and innovation — creating a future where wellness is
                connected, effortless, and intelligent.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ===== APPS ===== */}
      <section id="apps" className="bg-black py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            Our Flagship Apps
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {apps.map((app, i) => (
              <motion.div
                key={app.id}
                className="relative w-full perspective"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => setFlippedCard(flippedCard === app.id ? null : app.id)}
              >
                <div
                  className={`relative min-h-[440px] rounded-2xl border border-gray-700 shadow-md transform-style preserve-3d transition-transform duration-700 cursor-pointer ${flippedCard === app.id ? "rotate-y-180" : ""
                    }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl backface-hidden flex flex-col justify-between">
                    <div>
                      <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-48 object-cover rounded-lg mb-5"
                      />
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm text-gray-500">{app.tag}</div>
                          <div className="text-xl font-semibold mt-1 text-white">
                            {app.title}
                          </div>
                        </div>
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-400 to-purple-600 text-black flex items-center justify-center font-bold text-lg shadow">
                          {app.title[0]}
                        </div>
                      </div>
                      <p className="mt-4 text-gray-400 text-sm leading-relaxed line-clamp-4">
                        {app.features.join(" ")}
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 text-black rounded-2xl p-6 rotate-y-180 backface-hidden flex flex-col items-center justify-center text-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{app.title}</h3>
                      <ul className="list-none text-sm text-black/80 mb-6 max-h-40 overflow-y-auto pr-2 flex flex-col items-center">
                        {app.keyfeatures.map((k) => (
                          <li key={k} className="relative pl-5 mb-1 w-[220px] text-left">
                            <span className="absolute left-0 top-0">•</span>
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <a className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition">
                        Download
                      </a>
                      <a className="px-4 py-2 rounded-md border border-black text-black text-sm hover:bg-black hover:text-white transition">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll To Top Button */}
          {showScroll && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed bottom-6 right-6 px-4 py-2 bg-gradient-to-br from-orange-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 z-50"
            >
              ↑ Top
            </motion.button>
          )}
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section
        id="products"
        className="bg-gradient-to-b from-black to-gray-900 py-20 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className=" bg-gradient-to-br from-orange-500 to-purple-600 bg-clip-text text-transparent text-3xl font-semibold mb-6">
            Our Premium Products
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Explore our range of wellness products — designed to fuel your body, mind,
            and performance.
          </p>

          {/* === Filter Controls === */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            {/* Category Dropdown */}
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              <option value="protein">Protein</option>
              <option value="creatine">Creatine</option>
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-orange-500 w-full md:w-1/3"
            />
          </div>

          {/* === Product Grid === */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
                  className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:border-orange-500 hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <img src={p.img} alt={p.name} className="w-full h-52 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {p.desc}
                    </p>
                    <button className="bg-gradient-to-br from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-3">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM ===== */}
      <section
        id="platform"
        className="bg-gradient-to-b from-gray-900 to-black py-20 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className=" bg-gradient-to-br from-orange-500 to-purple-600 bg-clip-text text-transparent text-3xl font-semibold mb-6">
            Our Integrated Platform
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            The Wellnex Platform connects fitness, mental wellness, and lifestyle
            tools into one seamless ecosystem — empowering both users and
            businesses to thrive.
          </p>

          {/* Coming Soon Section */}
          <h3 className="text-2xl font-bold mb-8 text-white">
            🚀 Coming Soon Features
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition duration-300"
            >
              <div className="text-orange-500 text-4xl mb-4">⌚</div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Wearable Integration
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sync with smartwatches and health trackers to monitor steps,
                sleep, heart rate, and activity directly in the Wellnex dashboard.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition duration-300"
            >
              <div className="text-orange-500 text-4xl mb-4">🥗</div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Nutrition & Meal Planning
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Personalized nutrition guidance and meal plans to help users
                achieve their wellness goals with smart recommendations.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition duration-300"
            >
              <div className="text-orange-500 text-4xl mb-4">🏢</div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Corporate Wellness Dashboards
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                A data-driven dashboard for companies to promote healthy
                lifestyles, track employee engagement, and improve wellbeing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="relative py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        {/* Subtle glowing background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,102,0,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.h2
            className="bg-gradient-to-br from-orange-500 to-purple-600 bg-clip-text text-transparent text-4xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let’s Connect
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Have questions or want to collaborate? Drop your message below and
            we’ll get back to you soon.
          </motion.p>

          {/* 📨 Contact Form */}
          <motion.form
            className="max-w-lg mx-auto bg-white/8 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 text-left">
              <label className="block text-sm mb-2 text-gray-300">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="mb-6 text-left">
              <label className="block text-sm mb-2 text-gray-300">Your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="mb-6 text-left">
              <label className="block text-sm mb-2 text-gray-300">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-orange-500"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-br from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold rounded-md transition-transform duration-300 hover:scale-105 shadow-md"
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black border-t border-gray-900 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-gray-400">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Wellnex Systems</h3>
            <p className="text-sm leading-relaxed mb-4">
              Empowering wellness through smart technology — connecting mind,
              body, and data in one seamless ecosystem.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
                >About Us</a>
              </li>
              <li>
                <a href="#platform" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
                >Our Platform</a>
              </li>
              <li>
                <a href="#apps" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
                >Our Apps</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#apps" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >SoulWhispers</a></li>
              <li><a href="#apps" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >GymKey</a></li>
              <li><a href="#platform" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >Wellnex Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >Help Center</a></li>
              <li><a href="#contact" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >Contact Us</a></li>
              <li><a href="#contact" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
              >Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>
            <a href="#" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
            >📧info@wellnexsystems.com</a>
            <span className="mx-3">•</span>
            <a href="#" className="transition hover:bg-gradient-to-br hover:from-orange-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
            >🌐 www.wellnexsystems.com</a>
          </p>
          <p>© {new Date().getFullYear()} Wellnex Systems — All Rights Reserved.</p>
          <p className="mt-2">Developed by Sameer and Shayan Mentor Sir Umair Warsi from Aptech SFC ❤️.</p>
        </div>
      </footer>

    </div>
  );
}
