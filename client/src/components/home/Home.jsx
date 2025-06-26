import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import icon01 from '../../assets/icons/icon01.svg';
import icon02 from '../../assets/icons/icon02.svg';
import icon03 from '../../assets/icons/icon03.svg';
import icon04 from '../../assets/icons/icon04.svg';
import successIcon from '../../assets/icons/successIcon.svg';

const Home = () => {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);
  const [highlightError, setHighlightError] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [hiddenFrame, setHiddenFrame] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const delayCycle = [10, 4, 2];
  const [delayIndex, setDelayIndex] = useState(0);

  const cardContext = [
    { id: 'design', icon: icon01, header: 'Design' },
    { id: 'dev', icon: icon02, header: 'Development' },
    { id: 'ai', icon: icon03, header: 'AI / Machine Learning' },
    { id: 'iot', icon: icon04, header: 'IOT' },
  ];

  // Loop button delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayIndex((prev) => (prev + 1) % delayCycle.length);
    }, delayCycle[delayIndex] * 1000);

    return () => clearTimeout(timer);
  }, [delayIndex]);

  // Show cards after delay
  useEffect(() => {
    const delay = setTimeout(() => setShowCards(true), 5500);
    return () => clearTimeout(delay);
  }, []);

  // Auto-reset hidden form if no selected services
  useEffect(() => {
    if (hiddenFrame && selected.length === 0) {
      setHiddenFrame(false);
    }
  }, [selected, hiddenFrame]);

  // Clear error when selection is made
  useEffect(() => {
    if (selected.length > 0 && error) setError(false);
  }, [selected, error]);

  const handleSelected = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEnquire = () => {
    if (selected.length === 0) {
      setError(true);
      setHighlightError(true);
      setTimeout(() => setHighlightError(false), 1500);
    } else {
      setError(false);
      setHighlightError(false);
      setHiddenFrame(true);
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setValidationError(true);
    } else {
      setValidationError(false);
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(true);
    }
  };

  const handleSubmitAnotherResponse = () => {
    setSubmitted(false);
    setHiddenFrame(false);
    setSelected([]);
    setName('');
    setEmail('');
    setMessage('');
    setValidationError(false);
  };

  return (
    <div className="w-full h-screen bg-[#0A0A0B] flex justify-center items-center overflow-hidden relative">
      {/* Background Spinner */}
      <div
        className="absolute z-10 w-[1200px] h-[1200px] rounded-full custom-spin translate-y-[600px] blur-3xl"
        style={{
          background: `conic-gradient(#220208 0deg 115deg, #220208 115deg, #011F2C 125deg 235deg, #011F2C 235deg, #0B0122 245deg 360deg)`
        }}
      />

      {/* Main Container */}
      <div className="w-[1440px] h-[100vh] flex flex-col justify-center items-center text-[#EDEDED] absolute z-20">
        {/* Heading */}
        <motion.h1
          initial={{ y: 0, scale: 2 }}
          animate={{ y: -290, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
          className="text-[48px] font-normal font-['Gugi'] absolute text-center"
        >
          SY<div className="text-[24px]">DART TECH</div>
        </motion.h1>

        {/* Intro Section */}
        {!hiddenFrame && (
          <motion.div>
            <motion.h2
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: -25, opacity: 1 }}
              transition={{ delay: 4, duration: 1, ease: 'easeInOut' }}
              className="text-[54px] font-['Geist'] font-semibold text-center"
            >
              Where All technological solutions arrives
            </motion.h2>

            <motion.h3
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 50, opacity: 1 }}
              transition={{ delay: 4.8, duration: 0.8, ease: 'easeInOut' }}
              className="text-[24px] font-['Geist'] font-semibold text-center"
            >
              Let us know what we can bring for you
            </motion.h3>

            <motion.div
              animate={showCards ? 'visible' : 'hidden'}
              className="w-[1300px] translate-y-[50px] h-[75px] flex justify-between mt-10"
            >
              {cardContext.map((card, i) => {
                const isSelected = selected.includes(card.id);
                const reverseIndex = cardContext.length - 1 - i;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ x: -1500, opacity: 0 }}
                    animate={showCards ? {
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: reverseIndex,
                        type: 'spring',
                        stiffness: 110
                      }
                    } : {}}
                    onClick={() => handleSelected(card.id)}
                    className={`relative flex items-center gap-3 px-6 h-[75px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 z-10 ${isSelected ? 'border border-[#5249FF] bg-[#10101a]' : 'bg-gradient-to-r from-[#1A1A1A]/99 to-[#1A1A1A]/20'}`}
                    whileHover={{ scale: 1.03 }}
                  >
                    {highlightError && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 rounded-2xl border-2 border-[#5F8AFF] z-0"
                      />
                    )}
                    <div className={`z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#6B4EFF]' : 'border-white'}`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-[#5249FF]" />}
                    </div>
                    <img src={card.icon} alt={card.header} className="w-6 h-6 z-10" />
                    <span className="text-white text-[20px] font-medium z-10">{card.header}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {error && (
              <motion.h2
                initial={{ x: 450, y: 400 }}
                animate={{ x: 450, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-['Geist'] text-[20px] font-normal text-[#5F8AFF] mt-6 translate-y-[50px]"
              >
                Kindly select the service you are looking for
              </motion.h2>
            )}

            {!error && (
              <motion.h2 className="font-['Geist'] text-[20px] font-normal text-white/0 mt-6">
                Placeholder to avoid layout shift
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Form Section */}
        {hiddenFrame && !error && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center items-center z-30"
          >
            <div className="w-full text-white flex flex-col items-center gap-8">
              <div className="w-full flex flex-wrap justify-center gap-6 mt-[80px]">
                {cardContext.map((card) => {
                  const isSelected = selected.includes(card.id);
                  if (!isSelected) return null;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleSelected(card.id)}
                      className="relative flex items-center gap-3 pl-6 pr-10 py-3 h-[75px] rounded-2xl cursor-pointer bg-[#181733] border border-[#5249FF] transition-all duration-300"
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelected(card.id);
                        }}
                        className="absolute right-[10px] w-5 h-5 flex items-center justify-center bg-white text-black rounded-full text-sm font-bold cursor-pointer"
                      >✕</div>
                      <img src={card.icon} alt={card.header} className="w-6 h-6" />
                      <span className="text-white text-[20px] font-medium">{card.header}</span>
                    </div>
                  );
                })}
              </div>

              <div className="w-[750px] flex flex-col gap-6">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Good Name" className="w-full bg-transparent border-b border-white/30 placeholder-white/70 px-2 py-3 outline-none text-white" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email ID" className="w-full bg-transparent border-b border-white/30 placeholder-white/70 px-2 py-3 outline-none text-white" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Your Message" className="w-full bg-transparent border-b border-white/30 placeholder-white/70 px-2 py-3 outline-none text-white resize-none" />
              </div>

              <p className={`text-[20px] text-center font-normal ${validationError ? 'text-red-600 translate-y-[-20px]' : 'text-red-600/0'}`}>
                All fields are mandatory
              </p>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="w-[750px] mx-auto translate-y-[10px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center items-center">
              <h1 className="text-white font-semibold text-[42px] text-center">Thank You!</h1>
              <h1 className="text-white font-semibold text-[42px] text-center">We have your Enquiry</h1>
              <motion.img src={successIcon} className="w-[300px] h-[300px] mt-[20px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />
            </motion.div>
          </div>
        )}

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delayCycle[delayIndex], duration: 1 }}
            className="h-[70px] bg-[#EDEDED]/10 rounded-full flex justify-center items-center cursor-pointer px-8"
            onClick={() => {
              if (!hiddenFrame && !submitted) handleEnquire();
              else if (hiddenFrame && !submitted) handleSubmit();
              else if (submitted) handleSubmitAnotherResponse();
            }}
          >
            <h1 className="font-['Geist'] text-[20px] font-normal text-[#EDEDED]">
              {!hiddenFrame && !submitted ? 'Enquire now' : hiddenFrame && !submitted ? 'Submit' : 'Submit another response'}
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
