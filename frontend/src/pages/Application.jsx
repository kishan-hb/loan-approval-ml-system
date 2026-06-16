import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { ThemeContext } from '../context/ThemeContext';

const LoanApplicationForm = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    applicant_income: '',
    co_applicant_income: '',
    loan_amount: '',
    loan_term: '',
    credit_history: '',
    employment_status: '',
    property_area: '',
    dependents: '',
    education: '',
    marital_status: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      'applicant_income', 'loan_amount', 'loan_term', 
      'employment_status', 'property_area', 'education'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitStatus(response.ok ? 'success' : 'error');
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable dynamic classes with Dark Mode support
  const inputClasses = (name) => `
    w-full px-4 py-3 border rounded-xl transition-all outline-none
    bg-white dark:bg-slate-800 
    text-[#0f172a] dark:text-white
    placeholder-slate-400 dark:placeholder-slate-500
    ${errors[name] 
      ? 'border-red-500 ring-1 ring-red-500' 
      : 'border-slate-200 dark:border-slate-700 focus:border-[#00779b] dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}
  `;

  const labelClasses = "block text-sm font-bold text-[#0f172a] dark:text-slate-300 mb-2";
  const cardClasses = "bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-6";
  const sectionTitleClasses = "text-xl font-bold text-[#0f172a] dark:text-white";
  const iconBoxClasses = "w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-[#00779b] dark:text-blue-400 flex items-center justify-center";

  return (
    <Layout>
      <div className="min-h-screen bg-[#fcf8fa] dark:bg-[#0f172a] font-sans pb-40 text-[#1c1b1c] dark:text-slate-100 transition-colors duration-300">
        <main className="pt-20 px-6 max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-10 text-center space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-[#0f172a] dark:text-white">Loan Application</h1>
            <p className="text-[#494548] dark:text-slate-400 text-lg leading-relaxed">
              Complete the form below for a precision-calculated credit line.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Financial Details */}
            <div className={cardClasses}>
              <div className="flex items-center gap-4 mb-2">
                <div className={iconBoxClasses}>
                </div>
                <h2 className={sectionTitleClasses}>Financial Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Applicant Income *</label>
                  <input type="number" name="applicant_income" value={formData.applicant_income} onChange={handleInputChange} placeholder="Monthly income" className={inputClasses('applicant_income')} />
                </div>
                <div>
                  <label className={labelClasses}>Co-applicant Income</label>
                  <input type="number" name="co_applicant_income" value={formData.co_applicant_income} onChange={handleInputChange} placeholder="Optional income" className={inputClasses('co_applicant_income')} />
                </div>
                <div>
                  <label className={labelClasses}>Loan Amount *</label>
                  <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleInputChange} placeholder="Total amount" className={inputClasses('loan_amount')} />
                </div>
                <div>
                  <label className={labelClasses}>Term (Months) *</label>
                  <input type="number" name="loan_term" value={formData.loan_term} onChange={handleInputChange} placeholder="e.g. 12, 36" className={inputClasses('loan_term')} />
                </div>
              </div>
            </div>

            {/* Section: Personal Context */}
            <div className={cardClasses}>
              <div className="flex items-center gap-4 mb-2">
                <div className={iconBoxClasses}>
                </div>
                <h2 className={sectionTitleClasses}>Personal Context</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Employment *</label>
                  <select name="employment_status" value={formData.employment_status} onChange={handleInputChange} className={inputClasses('employment_status')}>
                    <option value="">Select Status</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Self-employed">Self-employed</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Education *</label>
                  <select name="education" value={formData.education} onChange={handleInputChange} className={inputClasses('education')}>
                    <option value="">Select Level</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Undergraduate">Not Graduate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Risk Indicators */}
            <div className={cardClasses}>
              <div className="flex items-center gap-4 mb-2">
                <div className={iconBoxClasses}>
                </div>
                <h2 className={sectionTitleClasses}>Risk Indicators</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Credit History *</label>
                  <select name="credit_history" value={formData.credit_history} onChange={handleInputChange} className={inputClasses('credit_history')}>
                    <option value="">Select History</option>
                    <option value="1.0">Good (1.0)</option>
                    <option value="0.0">Poor (0.0)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Property Area *</label>
                  <select name="property_area" value={formData.property_area} onChange={handleInputChange} className={inputClasses('property_area')}>
                    <option value="">Select Area</option>
                    <option value="Urban">Urban</option>
                    <option value="Semiurban">Semiurban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="p-5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl text-green-800 dark:text-green-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                <span className="material-symbols-outlined">check_circle</span>
                Application submitted! Our AI is processing your request.
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 active:scale-[0.99] transition-all shadow-xl
                bg-[#0f172a] dark:bg-blue-600 text-white 
                shadow-slate-200 dark:shadow-blue-900/30 
                ${isSubmitting ? 'opacity-70' : 'hover:bg-[#1e293b] dark:hover:bg-blue-700'}`}
            >
              {isSubmitting ? 'Processing...' : 'Submit Application'}
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default LoanApplicationForm;