"use client";

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AgreementPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const handleContinue = async () => {
    if (termsAccepted && privacyPolicyAccepted) {
      try {
        const res = await fetch('/api/auth/accept-agreement', {
          method: 'POST',
        });
        if (res.ok) {
          signOut({ callbackUrl: '/auth/upgrade' });
        } else {
          console.error('Failed to accept agreement');
        }
      } catch (error) {
        console.error('Failed to accept agreement', error);
      }
    }
  };

  const handleDecline = async () => {
    try {
      await fetch('/api/auth/decline-agreement', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to decline agreement', error);
    } finally {
      signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8">
      <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
        <h1 className="text-2xl font-bold text-white">Almost there!</h1>
        <p className="text-gray-400 mt-6 mb-6">Before you can start using CodeCred, please review and accept our terms of use and privacy policy.</p>

        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <span className="ml-3">I have read and agree to the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Terms of Use</a>.</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                checked={privacyPolicyAccepted}
                onChange={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
              />
              <span className="ml-3">I have read and agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Privacy Policy</a>.</span>
            </label>
          </div>
        </div>

        <p className="text-gray-400 mt-6 mb-6">You will be logged out. Just log in again and start using CodeCred!</p>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleDecline}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Decline & Delete My Account
          </button>
          <button
            onClick={handleContinue}
            disabled={!termsAccepted || !privacyPolicyAccepted}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
