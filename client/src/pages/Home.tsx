/*
 * BINGE FREE LANDING PAGE
 * Design: Neo-Brutalist Soft - Like the app
 * 
 * Features:
 * - Thick borders, solid shadows
 * - Cream background fixed (no white gaps)
 * - Message focused on REDUCING binges and GAINING CONTROL
 * - Dynamic counter starting at 219
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Import images - using absolute paths
const heroGradientBg = '/images/hero-gradient-bg.png';
const glassesbluedog = '/images/glassesbluedog.png';
const mockuppap = '/images/mockuppap.jpg';

// Base count starts at 219
const BASE_COUNT = 219;

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [emailBottom, setEmailBottom] = useState("");
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false);
  const [isSuccessBottom, setIsSuccessBottom] = useState(false);
  
  // Dynamic counter - starts at 219, increases with each signup stored in localStorage
  const [waitlistCount, setWaitlistCount] = useState(BASE_COUNT);
  
  useEffect(() => {
    // Get additional signups from localStorage
    const additionalSignups = parseInt(localStorage.getItem('bingefree_signups') || '0', 10);
    setWaitlistCount(BASE_COUNT + additionalSignups);
  }, []);
  
  const incrementCounter = () => {
    const currentAdditional = parseInt(localStorage.getItem('bingefree_signups') || '0', 10);
    const newAdditional = currentAdditional + 1;
    localStorage.setItem('bingefree_signups', newAdditional.toString());
    setWaitlistCount(BASE_COUNT + newAdditional);
  };

  // Handle Mailchimp form submission
  const handleSubmit = async (e: React.FormEvent, isBottom = false) => {
    e.preventDefault();
    
    const currentEmail = isBottom ? emailBottom : email;
    const setCurrentSubmitting = isBottom ? setIsSubmittingBottom : setIsSubmitting;
    const setCurrentSuccess = isBottom ? setIsSuccessBottom : setIsSuccess;
    const setCurrentEmail = isBottom ? setEmailBottom : setEmail;
    
    if (!currentEmail || !currentEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    
    setCurrentSubmitting(true);
    
    // Create a hidden iframe for Mailchimp submission
    const iframe = document.createElement('iframe');
    iframe.name = 'mailchimp-iframe-' + (isBottom ? 'bottom' : 'top');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Create and submit form to iframe
    const form = document.createElement('form');
    form.action = 'https://gmail.us11.list-manage.com/subscribe/post?u=4af11ee24947c1ac4353a2d04&id=c83cc28c68&f_id=004115e1f0';
    form.method = 'POST';
    form.target = iframe.name;
    
    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'EMAIL';
    emailInput.value = currentEmail;
    form.appendChild(emailInput);
    
    // Honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'hidden';
    honeypot.name = 'b_4af11ee24947c1ac4353a2d04_c83cc28c68';
    honeypot.value = '';
    form.appendChild(honeypot);
    
    document.body.appendChild(form);
    form.submit();
    
    // Cleanup and show success
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);
    
    // Increment counter
    incrementCounter();
    
    setCurrentSuccess(true);
    setCurrentEmail("");
    setCurrentSubmitting(false);
    toast.success("You're in! Check your email to confirm");
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Fixed Background - Covers entire page */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#F5F0E8',
          backgroundImage: `url(${heroGradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="brutal-card px-5 py-3 flex items-center justify-between"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <img 
                src={glassesbluedog} 
                alt="Binge Free mascot" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-xl text-foreground">Binge Free</span>
            </div>
            <a 
              href="#waitlist"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Join waitlist
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            {/* Content */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-block brutal-badge px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="text-sm font-semibold text-foreground">
                  Coming Soon
                </span>
              </motion.div>

              {/* Headline - Focused on REDUCING binges */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
                Stop binge eating.
                <br />
                <span className="text-primary">Take back control.</span>
              </h1>

              {/* Subheadline - Tools to reduce binges */}
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                The app to reduce binge eating and gain control over food.
              </p>

              {/* Phone Mockup - Above the form */}
              <motion.div
                className="relative flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Phone Container */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Phone Frame - Brutalista style */}
                  <div className="relative w-[280px] sm:w-[320px]">
                    <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-3 border-4 border-foreground">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-xl z-20" />
                      
                      {/* Screen */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-[#F5F0E8]">
                        <img 
                          src={mockuppap} 
                          alt="Binge Free App" 
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating mascot */}
                  <motion.div
                    className="absolute -bottom-2 -left-6 z-20"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [-3, 3, -3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="brutal-card p-3">
                      <img 
                        src={glassesbluedog} 
                        alt="Binge Free mascot" 
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* CTA Form */}
              <motion.div
                id="waitlist"
                className="brutal-card p-6 max-w-md mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {!isSuccess ? (
                  <>
                    <p className="text-sm font-semibold text-foreground mb-4">
                      Get early access to the tools
                    </p>
                    <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="brutal-input flex-1 h-14 px-4 text-xl text-foreground placeholder:text-muted-foreground"
                        required
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="brutal-btn h-14 px-6 text-foreground flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Join waitlist
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-3">
                      No spam. Just launch updates.
                    </p>
                  </>
                ) : (
                  <motion.div
                    className="text-center py-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="font-bold text-foreground">You're on the list!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check your email to confirm
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Social Proof - Dynamic Counter */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary border-2 border-foreground flex items-center justify-center text-xs font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground">
                  <span className="font-bold">{waitlistCount}</span> people waiting
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t-3 border-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={glassesbluedog} 
                alt="Binge Free" 
                className="w-7 h-7 object-contain"
              />
              <span className="font-bold text-foreground">Binge Free</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Binge Free. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
