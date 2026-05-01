import React from 'react';
import { useToast } from '../App';
import { getContactEmail } from '../constants';

interface MailtoPostSubmitProps {
  subject: string;
  body: string;
  onClose: () => void;
}

const MailAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7.45-6.126a2 2 0 012.32 0l7.45 6.126A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-5.5L12 15l2.25-1.5L21 19" /></svg>;


const MailtoPostSubmit: React.FC<MailtoPostSubmitProps> = ({ subject, body, onClose }) => {
  const { showToast } = useToast();
  const email = getContactEmail();

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleOpenEmail = () => {
    window.location.href = mailtoLink;
    setTimeout(onClose, 500); // Give the browser a moment to process mailto before closing
  };
  
  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} copied to clipboard!`, 'success');
    } catch (err) {
      showToast(`Failed to copy ${type}.`, 'error');
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-brand-dark mb-2">Your Email is Ready to Send</h3>
      <p className="text-slate-600 mb-6">
        Click the button below to open your default email app with your inquiry pre-filled.
      </p>

      <div className="my-8">
        <button 
          type="button" 
          onClick={handleOpenEmail} 
          className="w-full inline-flex items-center justify-center bg-brand-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-400/50"
        >
          <MailAppIcon />
          Open in Email App
        </button>
      </div>
      
      <details className="text-left">
          <summary className="text-sm font-semibold text-slate-500 hover:text-brand-dark cursor-pointer">
              Or, copy details manually
          </summary>
          <div className="mt-4 space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
             <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">To:</label>
              <div className="flex">
                <input type="text" readOnly value={email} className="w-full px-3 py-1.5 border border-slate-300 rounded-l-md bg-slate-100 text-sm" />
                <button type="button" onClick={() => handleCopy(email, 'Email')} className="bg-slate-200 hover:bg-slate-300 px-3 rounded-r-md font-semibold text-slate-700 text-sm">Copy</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject:</label>
              <div className="flex">
                <input type="text" readOnly value={subject} className="w-full px-3 py-1.5 border border-slate-300 rounded-l-md bg-slate-100 text-sm" />
                <button type="button" onClick={() => handleCopy(subject, 'Subject')} className="bg-slate-200 hover:bg-slate-300 px-3 rounded-r-md font-semibold text-slate-700 text-sm">Copy</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Body:</label>
               <div className="relative">
                <textarea readOnly value={body} rows={5} className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-slate-100 no-scrollbar text-sm" />
                <button type="button" onClick={() => handleCopy(body, 'Body')} className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-semibold text-slate-700 text-xs">Copy</button>
              </div>
            </div>
          </div>
      </details>
       <div className="text-center mt-6">
        <button type="button" onClick={onClose} className="font-semibold text-slate-600 hover:text-brand-dark text-sm">
            Cancel
        </button>
      </div>
    </div>
  );
};

export default MailtoPostSubmit;

