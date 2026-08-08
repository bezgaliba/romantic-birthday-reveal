import React, { useState, useEffect } from 'react';

// Configure your customized partner details here!
const PARTNER_NAME = "My Love";
const BIRTHDAY_MESSAGE = `
  Happy Birthday to the most incredible person in my life. You bring so much light, 
  laughter, and love into my world every single day. Today is all about celebrating you, 
  your beautiful heart, and everything that makes you unique. 
  
  I have prepared a few surprises for you to unwrap. I hope they bring a smile to 
  your face! Press the button below to start revealing them.
`;

const PRESENTS = [
  {
    id: 1,
    title: "Swimming with Dolphins!",
    emoji: "🐬🇲🇺✨",
    imageName: "gift1.png", // Placed in the public/ folder
    description: "An unforgettable adventure in Mauritius! We are going on a private early-morning boat trip into the crystal-clear ocean of Tamarin Bay to swim alongside wild, playful dolphins in their natural habitat.",
    ribbonColor: "#ec4899", // pink-500
    boxColor: "#f472b6"     // pink-400
  },
  {
    id: 2,
    title: "Mystery Game on Nintendo Switch 2",
    emoji: "🎮🕵️‍♂️🎁",
    imageName: "gift2.png", // Placed in the public/ folder
    description: "Prepare your detective skills! This is a highly anticipated, mind-bending mystery game custom-selected for your gaming nights on the brand new Nintendo Switch 2. Ready to crack the case?",
    ribbonColor: "#10b981", // emerald-500
    boxColor: "#34d399"     // emerald-400
  },
  {
    id: 3,
    title: "A Surprise Dinner in Mauritius",
    emoji: "🥂🌅🕯️",
    imageName: "gift3.png", // Placed in the public/ folder
    description: "A magical, private dining experience right on the powdery sands of Mauritius. We will enjoy local gourmet delicacies, candle lights, and matching wines while watching the spectacular tropical sunset together.",
    ribbonColor: "#8b5cf6", // violet-500
    boxColor: "#a78bfa"     // violet-400
  }
];

export default function App() {
  const [stage, setStage] = useState(0);
  const [hearts, setHearts] = useState([]);

  // Generate floating heart background elements
  useEffect(() => {
    const generatedHearts = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (24 - 12) + 12}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * (12 - 6) + 6}s`,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setHearts(generatedHearts);
  }, []);

  const handleNext = () => {
    if (stage < 7) {
      setStage(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setStage(0);
  };

  const HeartIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  const GiftIconClosed = ({ boxColor, ribbonColor }) => (
    <svg className="w-40 h-40 mx-auto drop-shadow-lg cursor-pointer animate-wiggle hover:scale-105 transition-transform" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Box base */}
      <rect x="40" y="80" width="120" height="90" rx="8" fill={boxColor} />
      {/* Box lid */}
      <rect x="30" y="60" width="140" height="25" rx="4" fill={boxColor} filter="brightness(1.1)" />
      {/* Horizontal Ribbon */}
      <rect x="30" y="70" width="140" height="10" fill={ribbonColor} />
      {/* Vertical Ribbon */}
      <rect x="95" y="60" width="10" height="110" fill={ribbonColor} />
      {/* Bow loops */}
      <path d="M98 60 C80 30, 60 50, 95 60 Z" fill={ribbonColor} />
      <path d="M102 60 C120 30, 140 50, 105 60 Z" fill={ribbonColor} />
    </svg>
  );

  const GiftIconOpen = ({ imageName, boxColor, ribbonColor, emoji }) => {
    // Dynamic asset base resolution (Crucial for GitHub Pages paths!)
    const resolvedImagePath = `${import.meta.env.BASE_URL}${imageName}`;

    return (
      <div className="relative w-full max-w-[260px] mx-auto flex flex-col items-center justify-center py-2">
        
        {/* Sparkles background layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <span className="absolute text-2xl animate-pulse top-0 left-2" style={{ animationDelay: '0.2s' }}>✨</span>
          <span className="absolute text-2xl animate-pulse bottom-10 right-2" style={{ animationDelay: '0.7s' }}>✨</span>
          <span className="absolute text-xl animate-pulse top-6 right-4" style={{ animationDelay: '0.4s' }}>⭐</span>
          <span className="absolute text-xl animate-pulse bottom-12 left-4" style={{ animationDelay: '1s' }}>⭐</span>
        </div>

        {/* Beautiful tilted Polaroid frame holding your image */}
        <div className="relative z-10 bg-white p-3 pb-6 rounded-lg shadow-xl border border-gray-100 rotate-[-3deg] hover:rotate-[0deg] transition-transform duration-300 w-48 sm:w-52">
          
          {/* Heart sticker on top of the polaroid */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-500 drop-shadow-sm z-20">
            <HeartIcon className="w-6 h-6 animate-pulse-slow" />
          </div>

          <div className="w-full h-36 sm:h-40 bg-gray-50 rounded overflow-hidden relative flex items-center justify-center border border-gray-100">
            <img 
              src={resolvedImagePath} 
              alt="Gift Surprise" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load or hasn't finished rendering, fallback gracefully to the emoji
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback container */}
            <div className="hidden absolute inset-0 items-center justify-center text-5xl bg-gradient-to-tr from-pink-50 to-indigo-50">
              {emoji}
            </div>
          </div>
          <div className="mt-3 text-center text-xs font-serif text-gray-500 tracking-wide">
            With love ❤️
          </div>
        </div>

        {/* Mini Opened box showing subtly behind the polaroid */}
        <div className="absolute -bottom-4 opacity-40 scale-75 pointer-events-none z-0">
          <svg className="w-20 h-20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="110" width="120" height="60" rx="8" fill={boxColor} />
            <g transform="translate(10, 40) rotate(-15 100 100)">
              <rect x="30" y="40" width="140" height="25" rx="4" fill={boxColor} filter="brightness(1.1)" />
              <rect x="30" y="50" width="140" height="8" fill={ribbonColor} />
            </g>
          </svg>
        </div>

      </div>
    );
  };

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );

  const getCurrentPresent = () => {
    if (stage === 1 || stage === 2) return { ...PRESENTS[0], isOpen: stage === 2, index: 1 };
    if (stage === 3 || stage === 4) return { ...PRESENTS[1], isOpen: stage === 4, index: 2 };
    if (stage === 5 || stage === 6) return { ...PRESENTS[2], isOpen: stage === 6, index: 3 };
    return null;
  };

  const currentPresent = getCurrentPresent();

  return (
    <div className="dynamic-height relative flex items-center justify-center p-4 overflow-hidden select-none">
      
      {/* Floating Interactive Background Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart text-rose-300"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
            opacity: h.opacity
          }}
        >
          <HeartIcon className="w-full h-full fill-current" />
        </span>
      ))}

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 transition-all duration-500 ease-out flex flex-col justify-between min-h-[480px]">
        
        {/* Progress Dots indicators */}
        {stage > 0 && stage < 7 && (
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => {
              const isActive = Math.ceil(stage / 2) === num;
              const isPassed = Math.ceil(stage / 2) > num;
              return (
                <div 
                  key={num} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-indigo-500' : isPassed ? 'w-2 bg-emerald-400' : 'w-2 bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* Dynamic Content Views */}
        <div className="flex-grow flex flex-col justify-center">
          
          {/* STAGE 0: The Birthday Greeting Letter */}
          {stage === 0 && (
            <div className="text-center animate-fade-in space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full text-rose-500 mb-2 animate-bounce-slow">
                <HeartIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 tracking-tight">
                Happy Birthday, <br />
                <span className="text-pink-600">{PARTNER_NAME}!</span>
              </h1>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-left bg-white/40 p-4 rounded-2xl border border-white/50 whitespace-pre-line shadow-inner">
                {BIRTHDAY_MESSAGE.trim()}
              </p>
            </div>
          )}

          {/* STAGES 1, 3, 5: Closed Presents */}
          {currentPresent && !currentPresent.isOpen && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">
                  Surprise {currentPresent.index} of 3
                </span>
                <h2 className="text-2xl font-bold text-gray-800">
                  Tap the box to open!
                </h2>
              </div>
              
              <div onClick={handleNext} className="py-4">
                <GiftIconClosed 
                  boxColor={currentPresent.boxColor} 
                  ribbonColor={currentPresent.ribbonColor} 
                />
              </div>

              <p className="text-xs text-gray-500 italic">
                (Clicking the gift box or the next button will open it!)
              </p>
            </div>
          )}

          {/* STAGES 2, 4, 6: Opened Presents Details */}
          {currentPresent && currentPresent.isOpen && (
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase flex items-center justify-center gap-1">
                  ✨ surprise {currentPresent.index} revealed!
                </span>
                <h2 className="text-2xl font-extrabold text-gray-800 leading-tight">
                  {currentPresent.title}
                </h2>
              </div>

              {/* Render picture inside the Polaroid */}
              <GiftIconOpen 
                imageName={currentPresent.imageName}
                boxColor={currentPresent.boxColor} 
                ribbonColor={currentPresent.ribbonColor} 
                emoji={currentPresent.emoji}
              />

              <div className="bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {currentPresent.description}
                </p>
              </div>
            </div>
          )}

          {/* STAGE 7: Final Screen */}
          {stage === 7 && (
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-indigo-500 blur opacity-75 animate-pulse-slow" />
                <span className="relative block text-5xl bg-white p-3 rounded-full shadow-md">🎉</span>
              </div>
              <h2 className="text-3xl font-black text-gray-800">
                I hope you loved your surprises!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                May this year bring you endless joy, incredible adventures, and even closer moments between us. I love you to the moon and back! ❤️
              </p>
              
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full text-xs sm:text-sm transition-colors shadow-sm inline-flex items-center gap-2 border border-gray-200 cursor-pointer"
                >
                  ↩️ Play Replay
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Interactive Action Control Footer */}
        <div className="mt-6 flex justify-end items-center border-t border-gray-200/50 pt-4">
          {stage < 7 ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base cursor-pointer"
            >
              {stage === 0 ? "Let's see the surprises" : stage % 2 === 1 ? "Open Gift" : "Next Surprise"}
              <ArrowIcon />
            </button>
          ) : (
            <p className="text-center w-full text-xs text-gray-400 font-medium italic">
              Made with love, forever and always.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}