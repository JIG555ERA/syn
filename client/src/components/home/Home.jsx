import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser'
emailjs.init('thBChfHFUlNiKnO2Q')
import { motion } from 'framer-motion';
import './Home.css';
import icon01 from '../../assets/icons/icon01.svg';
import icon02 from '../../assets/icons/icon02.svg';
import icon03 from '../../assets/icons/icon03.svg';
import icon04 from '../../assets/icons/icon04.svg';
import successIcon from '../../assets/icons/successIcon.svg';
import brandLogo from '../../assets/icons/brandLogo.svg';

const Home = () => {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);
  const [highlightError, setHighlightError] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [hiddenFrame, setHiddenFrame] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const delayCycle = [9, 4, 2];
  const [delayIndex, setDelayIndex] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  const validateEmail = (value) => {
    return emailRegex.test(value);
  };

  const cardContext = [
    { id: 'design', icon: icon01, header: 'Design' },
    { id: 'dev', icon: icon02, header: 'Development' },
    { id: 'ai', icon: icon03, header: 'AI / Machine Learning' },
    { id: 'iot', icon: icon04, header: 'IOT' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayIndex((prev) => (prev + 1) % delayCycle.length);
    }, delayCycle[delayIndex] * 1000);
    return () => clearTimeout(timer);
  }, [delayIndex]);

  useEffect(() => {
    const delay = setTimeout(() => setShowCards(true), 5500);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (hiddenFrame && selected.length === 0) {
      setHiddenFrame(false);
    }
  }, [selected, hiddenFrame]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validName = nameRegex.test(name.trim());
    const validEmail = validateEmail(email);
    const isFormValid = name && email && message && validName && validEmail;

    setIsValid(validEmail);
    setValidationError(!isFormValid);

    if (isFormValid) {
      const templateParams = {
        name,
        email,
        message,
        selectedServices: selected.join(', ')
      };

      emailjs.send(
      "service_h9dzxdd",         // ✅ service ID
      "template_lpdommr",        // ✅ updated template ID
      {
        title: "Service Enquiry",               // Subject
        name: name,                             // From user input
        email: email,                           // From user input
        selectedServices: selected.join(', '),  // Checkbox list
        message: message                        // User message
      }
      )
      .then((res) => {
        console.log("✅ Email sent:", res.status);
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("❌ Failed to send email:", err);
      });
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

  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStuck(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const screenHeight = window.innerHeight;
  const yOffset01 = screenHeight * 0.38;
  const yOffset02 = screenHeight * 0.1;

  return (
    <div className="w-full h-[100vh] bg-[#181818] flex justify-center items-center overflow-hidden relative">
      {/* Background Spinner */}
      <div
        className="absolute z-10 w-[85vw] h-[85vw] rounded-full custom-spin translate-y-[110vh] blur-3xl mix-blend-screen opacity-60 animate-[pulse_8s_ease-in-out_infinite] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at center,
              rgba(10, 10, 11, 0.05) 60%,
              rgba(10, 10, 11, 0.25) 75%,
              rgba(10, 10, 11, 0.9) 100%
            ),
            conic-gradient(
              rgba(34, 2, 8, 0.8) 0deg 50deg,
              rgba(1, 31, 44, 0.8) 60deg 210deg,
              rgba(11, 1, 34, 0.8) 220deg 360deg
            ),
            radial-gradient(circle at 30% 30%, 
              rgba(82, 73, 255, 0.2) 0%, 
              transparent 60%
            ),
            radial-gradient(circle at 70% 70%, 
              rgba(0, 255, 255, 0.15) 0%, 
              transparent 70%
            ),
            radial-gradient(circle at center,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(255, 255, 255, 0.01) 40%,
              transparent 100%
            ),
            radial-gradient(circle at 40% 60%,
              rgba(100, 255, 255, 0.03) 0%,
              transparent 80%
            )
          `,
          backgroundBlendMode: 'screen, screen, lighten, lighten, screen, lighten',
        }}
      />

      {/* Main Container */}
      <div className="2xl:w-[1440px] 2xl:h-[100vh] w-[100vw] flex flex-col justify-center items-center text-[#EDEDED] absolute z-20">
        {/* Brand Logo */}
        <motion.img
          initial={{ y: 0, scale: 2.5 }}
          animate={{ y: -yOffset01, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
          src={brandLogo}
          className={`2xl:w-[250px] w-[160px] 2xl:h-[110px] h-[70px] absolute`}
        />

        {/* Intro Section */}
        {!hiddenFrame && (
          <motion.div>
            <motion.h2
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: -25, opacity: 1 }}
              transition={{ delay: 4, duration: 1, ease: 'easeInOut' }}
              className="2xl:text-[54px] text-[28px] font-['Geist'] font-semibold text-center 2xl:translate-y-[0px] translate-y-[70px]"
            >
              Where All technological <span className="block sm:hidden" /> solutions arrives
            </motion.h2>

            <motion.h3
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 50, opacity: 1 }}
              transition={{ delay: 4.8, duration: 0.8, ease: 'easeInOut' }}
              className="2xl:text-[24px] text-[18px] font-['Geist'] font-semibold text-center 2xl:translate-y-[0px] translate-y-[25px]"
            >
              Let us know what we can bring for you
            </motion.h3>

            <motion.div
              animate={showCards ? 'visible' : 'hidden'}
              className="2xl:w-[1300px] 2xl:translate-y-[50px] translate-y-[60px] 2xl:h-[75px] flex 2xl:flex-row flex-col justify-between mt-10  gap-4 "
            >
              {cardContext.map((card, i) => {
                const isSelected = selected.includes(card.id);
                const reverseIndex = cardContext.length - 1 - i;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ x: -1800, opacity: 0 }}
                    animate={showCards ? {
                      x: 0,
                      opacity: 1,
                      transition: { delay: reverseIndex }
                    } : {}}
                    transition={{ ease: 'easeInOut' }}
                    onClick={() => handleSelected(card.id)}
                    className={`relative flex items-center gap-3 px-6 2xl:h-[75px] h-[53px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-1000 ease-in-out z-10 ${isSelected ? 'border border-[#5249FF] bg-[#10101a]' : 'bg-gradient-to-r from-[#EDEDED]/12 via-[#EDEDED]/7 to-[#1A1A1A]/3 border-0 border-[#5249FF]/1'}`}
                    whileHover={{ scale: 1.03 }}
                  >
                    {highlightError && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-2xl border-2 border-[#5F8AFF] bg-gradient-to-r from-[#EDEDED]/12 to-[#181733]/99 z-0 transition-all duration-800 ease-in-out"
                      />
                    )}
                    <div className={`z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-700 ease-in-out ${isSelected ? 'border-[#6B4EFF]' : 'border-white'}`}>
                      {isSelected && <div className="w-[8px] h-[8px] rounded-full bg-[#5249FF] transition-all duration-700 ease-in-out" />}
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
                animate={{ x: 450, y: 25 }}
                transition={{ duration: 0.75 }}
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
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 1, delay: 0.5, ease:'easeInOut' }}
            className="w-full flex justify-center items-center z-30 translate-y-[100px]"
          >
            <div className="w-full text-white flex flex-col items-center gap-8">
              <div className="w-full flex flex-wrap justify-center gap-6 ">
                {cardContext.map((card) => {
                  const isSelected = selected.includes(card.id);
                  if (!isSelected) return null;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleSelected(card.id)}
                      className="relative flex items-center gap-3 pl-6 pr-10 py-3 2xl:h-[75px] h-[53px] rounded-2xl cursor-pointer bg-[#181733] border border-[#5249FF]"
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

              <div className="2xl:w-[750px] w-[90vw] flex flex-col gap-6 2xl:text-[24px] text-[16px] font-normal font-['Geist']">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Good Name" className="w-full bg-transparent border-b border-white/30 placeholder-[#A7A7A7] focus:placeholder-[#A7A7A7]/40 px-2 py-3 outline-none text-[#F9F9F9]" />
                {!nameRegex.test(name.trim()) && name && (
                  <p className="text-[16px] text-center font-normal text-[#932426] 2xl:translate-y-[-20px] 2xl:translate-x-[-185px]">
                    Name should contain only letters and spaces
                  </p>
                )}
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email ID" className="w-full bg-transparent border-b border-white/30 placeholder-[#A7A7A7] focus:placeholder-[#A7A7A7]/40 px-2 py-3 outline-none text-[#F9F9F9]" />
                {!isValid && email && (
                  <p className="text-[16px] text-center font-normal text-[#932426] 2xl:translate-y-[-20px] 2xl:translate-x-[-275px]">
                    Enter a valid email id
                  </p>
                )}
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Your Message" className="w-full bg-transparent border-b border-[#A7A7A7] placeholder-white/70 focus:placeholder-[#A7A7A7]/40 px-2 py-3 outline-none text-[#F9F9F9] resize-none" />
              </div>

              <p className={`text-[16px] text-center font-normal ${validationError ? 'text-[#932426] 2xl:translate-y-[-20px] 2xl:translate-x-[-275px]' : 'text-red-600/0'}`}>
                All fields are mandatory
              </p>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="2xl:w-[750px] w-[90vw] mx-auto 2xl;translate-y-[50px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center items-center">
              <h1 className="text-white font-semibold 2xl:text-[42px] text-[32px] text-center">Thank You!</h1>
              <h1 className="text-white font-semibold 2xl:text-[42px] text-[32px] text-center 2xl;translate-y-[-25px]">We have your Enquiry</h1>
              <motion.img src={successIcon} className="2xl:w-[300px] 2xl:h-[300px] w-[190px] h-[190px] 2xl:mt-[10px] mt-[40px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease:'easeInOut' }} />
            </motion.div>
          </div>
        )}

        {/* Bottom Button */}
        <div className="mx-auto translate-y-[10vh] transition-all delay-1000 ease-in-out">
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delayCycle[delayIndex], duration: 2, ease:'easeInOut' }}
            onClick={(e) => {
              if (!hiddenFrame && !submitted) handleEnquire();
              else if (hiddenFrame && !submitted) handleSubmit(e);
              else if (submitted) handleSubmitAnotherResponse();
            }}
            className="relative 2xl:h-[70px] h-[53px] 2xl:w-auto w-[90vw] rounded-full flex justify-center items-center cursor-pointer px-8 overflow-hidden transition-all delay-1000 ease-in-out"
          >
            <div
              className="absolute inset-0 blur-md rounded-full transition-all delay-1000 ease-in-out"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(1, 23, 167, 0.2),
                  rgba(6, 127, 180, 0.2),
                  rgba(253, 6, 58, 0.2)
                )`
              }}
            ></div>

            <h1 className="relative font-['Geist'] text-[20px] font-normal text-[#EDEDED] z-10 transition-all delay-1000 ease-in-out">
              {!hiddenFrame && !submitted
                ? 'Enquire now'
                : hiddenFrame && !submitted
                ? 'Submit'
                : 'Submit another response'}
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
