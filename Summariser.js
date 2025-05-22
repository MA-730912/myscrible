'use client';

import { useState, useEffect } from 'react';

export default function Summariser() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    setListening(prev => !prev);
  };

  useEffect(() => {
    let recognition;
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };

      if (listening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [listening]);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleListening}
        className={`px-4 py-2 rounded text-white ${listening ? 'bg-red-600' : 'bg-green-600'}`}
      >
        {listening ? 'Stop Dictation' : 'Start Dictation'}
      </button>
      <textarea
        value={transcript}
        readOnly
        rows={10}
        className="w-full border rounded p-2"
        placeholder="Transcript will appear here..."
      />
    </div>
  );
}
