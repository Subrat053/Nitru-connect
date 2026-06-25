import React, { useState } from 'react';
import { DollarSign, Award, ArrowRight } from 'lucide-react';

const FundingCalculator = ({ onOpenQuote }) => {
  const [monthlySales, setMonthlySales] = useState(15000);
  const [businessAge, setBusinessAge] = useState(2);

  // Eligibility logic: up to 1.5x of monthly card sales if business is older than 1 year, else 0.8x
  const calculateFunding = () => {
    const multiplier = businessAge >= 1 ? 1.5 : 0.8;
    const amount = Math.min(Math.round(monthlySales * multiplier), 250000);
    return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
  };

  return (
    <section id="funding" className="scroll-mt-24 py-10 md:py-20 px-6 md:px-12 bg-neutral-light relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Persuasive copy on the left */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Business Funding Estimator</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold tracking-tight text-neutral leading-tight">
              Get Fast, Unsecured Capital For Your Business Growth
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Skip the long bank queues. Secure funding from £5,000 up to £250,000 based on your card sales volume and general monthly turnover. 
            </p>
            <ul className="flex flex-col gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Award size={18} className="text-primary shrink-0" />
                <span>Approval decisions in under 24 hours</span>
              </li>
              <li className="flex items-center gap-2">
                <Award size={18} className="text-primary shrink-0" />
                <span>Flexible repayments synced to card transaction percentages</span>
              </li>
              <li className="flex items-center gap-2">
                <Award size={18} className="text-primary shrink-0" />
                <span>No daily interest compounding or hidden fees</span>
              </li>
            </ul>
          </div>

          {/* Calculator UI card on the right */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl smooth-shadow border-t-8 border-primary flex flex-col gap-8">
            
            {/* Input Slider 1: Monthly sales */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-montserrat text-sm font-semibold text-neutral">Average Monthly Card/Online Sales</label>
                <span className="text-primary font-bold text-lg">
                  {monthlySales.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>£1k</span>
                <span>£50k</span>
                <span>£100k+</span>
              </div>
            </div>

            {/* Input Slider 2: Business Age */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-montserrat text-sm font-semibold text-neutral">Time In Business</label>
                <span className="text-primary font-bold text-lg">
                  {businessAge === 0 ? 'Less than 6 months' : businessAge === 1 ? '1 year' : `${businessAge} years`}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="1"
                value={businessAge}
                onChange={(e) => setBusinessAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>New Biz</span>
                <span>1 Year</span>
                <span>5+ Years</span>
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block">Estimated Eligible Funding</span>
                <span className="text-3xl font-extrabold text-primary font-montserrat mt-1 block">
                  {calculateFunding()}
                </span>
              </div>
              <button 
                onClick={onOpenQuote}
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-montserrat text-sm font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all active:scale-95 shrink-0"
              >
                Apply Now
                <ArrowRight size={16} />
              </button>
            </div>
            
            <p className="text-[11px] text-gray-400 text-center leading-normal">
              * This is an estimate calculator. All credit applications are subject to full statement reviews and credit policy approvals.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FundingCalculator;
