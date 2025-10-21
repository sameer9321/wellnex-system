import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./style.css";

export default function App() {
  const controls = useAnimation();
  const images = [
    "../hero.jpg",
    "../hero2.jpg",
    "../hero3.jpg",
    "../hero4.jpg"
  ];

  useEffect(() => {
    const totalSlides = images.length;
    let currentIndex = 0;
    const loopSlider = async () => {
      while (true) {
        // move to next image
        currentIndex++;
        await controls.start({
          x: `-${currentIndex * 100}%`,
          transition: { duration: 1, ease: "easeInOut" },
        });
        // if reached duplicate (last), instantly reset to start
        if (currentIndex === totalSlides) {
          await new Promise((r) => setTimeout(r, 3000)); // pause before loop
          await controls.start({
            x: "0%",
            transition: { duration: 0 },
          });
          currentIndex = 0;
        }
        // wait between slides
        await new Promise((r) => setTimeout(r, 3000));
      }
    };
    loopSlider();
  }, [controls, images.length]);
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

// === FILTERED PRODUCTS LOGIC ===
const filteredProducts = products.filter((p) => {
  const matchesCategory = category === "all" || p.category === category;
  const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesCategory && matchesSearch;
});

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
        "Realtime class schedules and bookings",
      ],
    },
  ];

  return (
    <div className="min-h-screen font-sans text-white bg-black scroll-smooth">
      {/* ===== NAVBAR ===== */}
      <header className="fixed w-full z-40 backdrop-blur-md bg-black/60 py-4 border-b border-gray-800">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
              W
            </div>
            <span className="font-semibold text-gray-100 group-hover:text-orange-400 transition">
              Wellnex
            </span>
          </a>
          <ul className="hidden md:flex gap-6 items-center text-sm">
            {["Home", "About", "Apps", "Platform", "Products", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-orange-400 transition duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <a
              href="#menu"
              className="text-sm px-3 py-2 rounded bg-orange-500 text-white"
            >
              Menu
            </a>
          </div>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-28 pb-20"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Side */}
          <div className="w-full lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Wellnex Systems
              <span className="block text-orange-500 mt-2">
                Wellness, Reimagined for the Next Generation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-gray-400 text-lg"
            >
              A digital wellness ecosystem designed to help you live better —
              combining mindfulness, fitness, and health insights powered by AI
              and innovation.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#platform"
                className="inline-block px-6 py-3 rounded-lg bg-orange-500 text-white font-medium transition-all duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 hover:shadow-lg"
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
          <div className="w-full lg:w-1/2 flex justify-center relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl h-[400px]">
            <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-3xl"></div>

            <motion.div
              animate={controls}
              className="flex relative z-10"
              style={{
                width: `${(images.length + 1) * 100}%`,
                display: "flex",
              }}
            >
              {[...images, images[0]].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-[400px] object-cover flex-shrink-0 rounded-2xl"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "3rem", }}>
            <span style={{ color: "orange" }}>About</span>{" "}
            <span style={{ color: "white" }}>Wellnex</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.img
            src="../about.jpeg"
            alt="Wellness Lifestyle"
            className="rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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

      {/* ===== APPS ===== */}
      <section id="apps" className="bg-black py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            Our Flagship Apps
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {apps.map((a, i) => (
              <motion.div
                key={a.id}
                className="relative w-full h-[420px] perspective"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl border border-gray-700 shadow-md transform-style-preserve-3d cursor-pointer"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 bg-gray-900 p-6 rounded-2xl backface-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-48 object-cover rounded-lg mb-5"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-500">{a.tag}</div>
                        <div className="text-xl font-semibold mt-1 text-white">
                          {a.title}
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-lg bg-orange-500 text-black flex items-center justify-center font-bold text-lg">
                        {a.title[0]}
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                      {a.features.join(" ")}
                    </p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 bg-orange-500 text-black rounded-2xl p-6 rotateY-180 backface-hidden flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold mb-4">{a.title}</h3>

                    {/* Key Features List */}
                    {a.keyfeatures && (
                      <ul className="list-disc list-inside text-sm text-black/80 mb-6 text-left max-w-xs">
                        {a.keyfeatures.map((k) => (
                          <li key={k}>{k}</li>
                        ))}
                      </ul>
                    )}

                    <div className="flex gap-3">
                      <a className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition">
                        Download
                      </a>
                      <a className="px-4 py-2 rounded-md border border-black text-black text-sm hover:bg-black hover:text-white transition">
                        Learn more
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      {/* ===== PRODUCTS SECTION ===== */}
      <section
        id="products"
        className="bg-gradient-to-b from-black to-gray-900 py-20 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-orange-500">
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
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:border-orange-500 hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <img src={p.img} alt={p.name} className="w-full h-52 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {p.desc}
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-transform transform hover:scale-105">
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
          <h2 className="text-3xl font-semibold mb-6 text-orange-500">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,102,0,0.15),transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-4 text-orange-500"
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
            className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
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
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-transform duration-300 hover:scale-105 shadow-md"
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info Below Form */}
          <motion.div
            className="mt-12 text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
          </motion.div>
        </div>
      </section>


      {/* ===== FOOTER ===== */}
      <footer className="bg-black border-t border-gray-800 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-gray-400">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Wellnex Systems
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Empowering wellness through smart technology — connecting mind,
              body, and data in one seamless ecosystem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-orange-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#platform" className="hover:text-orange-500 transition">
                  Our Platform
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-orange-500 transition">
                  Our Apps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#apps" className="hover:text-orange-500 transition">
                  SoulWhispers
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-orange-500 transition">
                  GymKey
                </a>
              </li>
              <li>
                <a href="#platform" className="hover:text-orange-500 transition">
                  Wellnex Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#contact" className="hover:text-orange-500 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>
            <a href="#" className="hover:text-orange-500 transition">📧info@wellnexsystems.com</a>
            <a href="#" className="hover:text-orange-500 transition">🌐 www.wellnexsystems.com</a>
          </p>
          <p>© {new Date().getFullYear()} Wellnex Systems — All Rights Reserved.</p>
          <p className="mt-2">Made with ❤️ for a healthier tomorrow.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition"
        >
          ↑
        </button>
      )}
    </div>
  );
}
