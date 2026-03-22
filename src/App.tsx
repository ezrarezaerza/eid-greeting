"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Star, Mail, MessageCircle, Music, Heart, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 7}s`,
      animationDelay: `-${Math.random() * 10}s`,
      size: `${Math.random() * 0.3 + 0.2}rem`,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes snow {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
          100% { transform: translateY(110vh) translateX(25px) rotate(360deg); }
        }
      `}</style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            left: flake.left,
            top: '-10%',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snow ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

const SLIDESHOW_IMAGES = [
  "https://images.pexels.com/photos/5649468/pexels-photo-5649468.jpeg",
  "https://images.pexels.com/photos/36311562/pexels-photo-36311562.jpeg",
  "https://images.pexels.com/photos/36225582/pexels-photo-36225582.jpeg",
  "https://images.pexels.com/photos/36232558/pexels-photo-36232558.png",
  "https://images.unsplash.com/photo-1736421062407-a735287d8a5b"
];

const MESSAGES = [
  "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ\nوَتَقَبَّلْ ياَ كَرِيْمُ\nTaqabbalallahu minna wa minkum.",
  "Selamat Hari Raya Idul Fitri \n 1 Syawal 1447 H.",
  "Semoga Allah menerima amal ibadah kita, puasa kita, dan mengembalikan kita pada keadaan yang suci.",
  "Di hari yang fitri ini, dengan segala kerendahan hati...",
  "Kami memohon maaf atas segala khilaf, salah kata, dan perbuatan yang mungkin pernah menggores luka di hati.",
  "Semoga di hari yang fitri ini, kita semua dilimpahi keberkahan, kesehatan, dan kebahagiaan yang berlipat ganda.",
  "Minal Aidin Wal Faizin \n Mohon maaf lahir & batin. \n Selamat Lebaran ya!"
];

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [surname, setSurname] = useState("Keluarga Kami");
  const [waNumber, setWaNumber] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const splashRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const surnameParam = searchParams.get('surname');
    const waParam = searchParams.get('WA_number');

    if (surnameParam) setSurname(surnameParam);
    if (waParam) setWaNumber(waParam);
  }, []);

  const handleOpenGreeting = () => {
    // Autoplay music on user interaction
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
      setIsPlaying(true);
    }

    if (splashRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsOpened(true)
      });
      
      tl.to(splashRef.current.querySelector('.splash-content'), {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.in"
      })
      .to(splashRef.current, {
        y: "-100vh",
        duration: 1.4,
        ease: "expo.inOut"
      }, "-=0.4");
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (isOpened && contentRef.current) {
      // Animate Hero Section
      gsap.fromTo('.hero-element', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "expo.out", 
          scrollTrigger: { trigger: '#hero', start: "top 80%" } 
        }
      );

      // Animate Reply Section
      gsap.fromTo('.reply-element', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "expo.out", 
          scrollTrigger: { trigger: '#reply', start: "top 80%" } 
        }
      );

      // Horizontal Scroll for Message Section
      if (scrollContainerRef.current && horizontalRef.current) {
        const panels = gsap.utils.toArray(horizontalRef.current.children);
        
        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + horizontalRef.current!.offsetWidth * 1.5, // Extended scroll distance for smoother feel
            id: "horizontalScroll"
          }
        });

        // Text reveal for each paper
        panels.forEach((panel) => {
          const words = (panel as HTMLElement).querySelectorAll('.word');
          if (words.length > 0) {
            gsap.fromTo(words, 
              { opacity: 0, y: 30, filter: 'blur(8px)', rotationX: -15 },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                rotationX: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: panel as HTMLElement,
                  containerAnimation: scrollTween,
                  start: "left 65%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [isOpened]);

  return (
    <div className="relative min-h-screen w-full font-sans text-blue-950 overflow-hidden bg-slate-50">
      <Snowfall />
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        loop 
        src="/mp3/Lebaran.mp3" 
      />

      {/* Splash Screen */}
      {!isOpened && (
        <div 
          ref={splashRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-50 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e3a8a\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          {/* Reorganized Islamic Elements */}
          <div className="absolute top-12 right-12 md:top-24 md:right-32 flex items-center justify-center">
            <Moon className="w-32 h-32 md:w-48 md:h-48 text-blue-300 opacity-40 rotate-12" strokeWidth={1} />
            <Star className="absolute top-4 right-20 md:right-32 w-8 h-8 md:w-12 md:h-12 text-blue-300 opacity-60" fill="currentColor" />
            <Star className="absolute bottom-4 left-0 w-4 h-4 md:w-6 md:h-6 text-blue-200 opacity-70" fill="currentColor" />
          </div>
          
          <div className="absolute bottom-12 left-12 md:bottom-24 md:left-32 flex items-center justify-center">
            <Moon className="w-40 h-40 md:w-56 md:h-56 text-blue-200 opacity-30 -rotate-45" strokeWidth={1} />
            <Star className="absolute top-10 left-24 md:left-40 w-10 h-10 md:w-16 md:h-16 text-blue-300 opacity-50" fill="currentColor" />
          </div>

          <div className="splash-content text-center space-y-12 p-8 max-w-4xl mx-auto z-10 relative">
            <div className="space-y-10">
              <div className="inline-block px-8 py-3 border-2 border-blue-200 rounded-full bg-white/70 backdrop-blur-md shadow-sm">
                <p className="text-sm md:text-base text-blue-700 tracking-[0.3em] uppercase font-bold">
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-blue-950 tracking-[0.05em] leading-tight drop-shadow-sm">
                Selamat <br /> Hari Raya <br /> Idul Fitri
              </h1>
              <p className="text-sm md:text-lg text-slate-600 font-semibold tracking-[0.3em] uppercase pt-8 border-t-2 border-blue-200 w-4/5 mx-auto">
                {surname}
              </p>
            </div>
            
            <div className="pt-20">
              <button
                onClick={handleOpenGreeting}
                className="group flex items-center justify-center gap-4 mx-auto px-8 py-4 bg-white text-blue-950 rounded-full text-sm md:text-base font-bold tracking-[0.25em] uppercase hover:bg-blue-50 hover:scale-105 transition-all duration-500 shadow-[0_15px_50px_rgba(30,58,138,0.2)] border-2 border-blue-100"
              >
                <span>Buka Ucapan</span>
                <Mail className="w-5 h-5 group-hover:translate-x-2 transition-transform text-blue-600" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel (Desktop Visuals) */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen w-[60vw] bg-blue-50 items-center justify-center overflow-hidden">
        {SLIDESHOW_IMAGES.map((src, index) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply z-10"></div>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="z-20 flex flex-col items-center justify-center p-20 backdrop-blur-xl bg-white/60 rounded-[2.5rem] border-2 border-white/70 shadow-[0_30px_80px_rgba(30,58,138,0.3)] max-w-2xl text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>

          <p className="text-base md:text-lg font-bold tracking-[0.3em] text-blue-700 uppercase">
            Taqabbalallahu Minna Wa Minkum. Minal Aidin Wal Faizin.
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-blue-950 leading-tight drop-shadow-md">
            Mohon maaf lahir & batin.
          </h2>
          <div className="w-24 h-[3px] bg-blue-400 mx-auto rounded-full"></div>
          <p className="text-base md:text-lg font-serif tracking-[0.3em] text-slate-800 uppercase font-medium">
            {surname}
          </p>
        </div>
      </div>

      {/* Right Panel (Main Content & Mobile View) */}
      <div ref={contentRef} className="w-full lg:w-[40vw] lg:ml-[60vw] min-h-screen overflow-y-auto bg-slate-50 relative">
        
        {/* Right Panel Fixed Background */}
        <div className="fixed inset-0 lg:left-[60vw] lg:w-[40vw] pointer-events-none z-0 flex flex-col justify-between overflow-hidden">
          <img src="/img/Top.png" alt="Top Illustration" className="w-full h-auto max-h-[35vh] object-cover object-bottom opacity-20 mix-blend-multiply" style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }} />
          
          <img src="/img/Bottom.png" alt="Bottom Illustration" className="w-full h-auto max-h-[35vh] object-cover object-top opacity-20 mix-blend-multiply" style={{ maskImage: 'linear-gradient(to top, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)' }} />
        </div>

        {/* Fixed Animated Clouds */}
        <style>{`
          @keyframes cloud-drift-1 {
            0% { transform: translateX(-5%) translateY(0); }
            50% { transform: translateX(5%) translateY(-15px); }
            100% { transform: translateX(-5%) translateY(0); }
          }
          @keyframes cloud-drift-2 {
            0% { transform: translateX(5%) translateY(0); }
            50% { transform: translateX(-5%) translateY(15px); }
            100% { transform: translateX(5%) translateY(0); }
          }
        `}</style>
        <div className="fixed inset-0 lg:left-[60vw] lg:w-[40vw] pointer-events-none z-20 flex items-center justify-center overflow-hidden">
           <img src="/img/Cloud.png" alt="Cloud" className="absolute top-[10%] -left-50 w-[24rem] md:w-[28rem] opacity-70 mix-blend-multiply animate-[cloud-drift-1_20s_ease-in-out_infinite] drop-shadow-xl object-contain" />
           <img src="/img/Cloud.png" alt="Cloud" className="absolute bottom-[10%] -right-50 w-[24rem] md:w-[28rem] opacity-70 mix-blend-multiply animate-[cloud-drift-2_25s_ease-in-out_infinite] drop-shadow-xl object-contain" />
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e3a8a\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        {/* Section 1: Hero */}
        <section id="hero" className="py-32 px-6 flex flex-col items-center justify-center text-center space-y-10 relative z-10 min-h-screen">
          <div className="hero-element opacity-0 relative">
            <div className="absolute inset-[-16px] rounded-full border-4 border-blue-200/60 animate-[spin_12s_linear_infinite]"></div>
            <div className="absolute inset-[-28px] rounded-full border-2 border-blue-100 animate-[spin_20s_linear_infinite_reverse]"></div>
            <img
              src="/img/Profile.png"
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-8 border-white shadow-2xl relative z-10"
            />
          </div>
          <div className="hero-element opacity-0 space-y-6">
            <p className="text-xs md:text-sm text-blue-600 tracking-[0.4em] uppercase font-bold">
              1 Syawal 1447 H
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 drop-shadow-sm">
              {surname}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 tracking-[0.3em] uppercase font-semibold">
              Mengucapkan
            </p>
          </div>
        </section>

        {/* Section 2: The Message & Apology */}
        <section id="message" ref={scrollContainerRef} className="relative z-10 w-full lg:w-[40vw] h-screen overflow-hidden">
          <div ref={horizontalRef} className="flex h-full w-[600vw] lg:w-[240vw]">
            {MESSAGES.map((msg, i) => (
              <div key={i} className="w-screen lg:w-[40vw] h-full flex-shrink-0 flex items-center justify-center p-6 md:p-12">
                
                {/* 1x1 Letter / Book Shape Container */}
                <div className="bg-[#fdfcf8] w-full max-w-[400px] aspect-square rounded-xl shadow-[0_20px_60px_rgba(30,58,138,0.15)] border-[8px] md:border-[12px] border-white flex flex-col items-center justify-center p-8 md:p-10 text-center relative overflow-hidden mx-auto">
                  
                  {/* Inner Letter Styling */}
                  <div className="absolute inset-2 md:inset-3 border border-blue-200/60 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-3 md:inset-4 border border-blue-100/40 rounded-md pointer-events-none"></div>
                  
                  {/* Paper Texture Lines */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 28px, #1e3a8a 29px)', backgroundPositionY: '14px' }}></div>
                  
                  {/* Corner Ornaments */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-300/50 rounded-tl-md"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-300/50 rounded-tr-md"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-300/50 rounded-bl-md"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-300/50 rounded-br-md"></div>
                  
                  {i === 0 && <Moon className="w-10 h-10 text-blue-400 mb-4 opacity-80 drop-shadow-sm" strokeWidth={1.5} />}
                  
                  <div className={`relative z-10 font-serif text-blue-950 leading-relaxed flex flex-col justify-center items-center gap-3 ${i === 0 ? 'text-2xl md:text-3xl leading-loose font-medium' : 'text-lg md:text-xl'}`}>
                    {msg.split('\n').map((line, lineIdx) => (
                      <div key={lineIdx} className="w-full flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                        {line.split(' ').map((word, j) => (
                          <span key={j} className="word opacity-0 inline-block drop-shadow-sm" style={{ perspective: '1000px' }}>
                            {word}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Reply / Call to Action */}
        <section id="reply" className="py-32 px-6 flex flex-col items-center justify-center text-center space-y-10 relative z-10 min-h-screen">
          <Heart className="reply-element opacity-0 w-12 h-12 text-blue-500 opacity-90 drop-shadow-md" strokeWidth={1.5} fill="currentColor" />
          
          <div className="reply-element opacity-0 space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif text-blue-950 drop-shadow-sm">
              Sambung Silaturahmi
            </h3>
            <p className="text-xs md:text-sm text-slate-600 tracking-[0.2em] uppercase max-w-md mx-auto leading-relaxed font-semibold">
              Jarak tak menjadi penghalang untuk saling memaafkan. Sampaikan balasan hangat Anda.
            </p>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=Taqabbalallahu%20minna%20wa%20minkum.%20Sama-sama%20mohon%20maaf%20lahir%20dan%20batin.`}
            target="_blank"
            rel="noopener noreferrer"
            className="reply-element opacity-0 group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-blue-50 text-blue-950 text-xs md:text-sm uppercase tracking-[0.2em] font-bold rounded-full overflow-hidden shadow-[0_10px_40px_rgba(30,58,138,0.15)] hover:shadow-[0_15px_50px_rgba(30,58,138,0.25)] transition-all duration-500 border-2 border-blue-200"
          >
            <div className="absolute inset-0 bg-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <MessageCircle className="w-5 h-5 relative z-10 text-blue-600 group-hover:text-blue-800 transition-colors" strokeWidth={2} />
            <span className="relative z-10">Kirim Pesan WA</span>
          </a>
        </section>

        {/* Floating Music Control */}
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-[0_8px_30px_rgba(30,58,138,0.15)] text-blue-600 hover:text-blue-800 hover:bg-white hover:scale-110 transition-all duration-300"
        >
          {isPlaying ? (
            <Music className="w-5 h-5 animate-pulse" strokeWidth={2} />
          ) : (
            <VolumeX className="w-5 h-5 opacity-70" strokeWidth={2} />
          )}
        </button>

      </div>
    </div>
  );
}
