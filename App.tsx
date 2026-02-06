
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import InputView from './components/InputView';
import PreviewView from './components/PreviewView';
import HeartBackground from './components/HeartBackground';
import MobileDesktopNotification from './components/MobileDesktopNotification';
import { CardData } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <MobileDesktopNotification />
      <div className="min-h-screen relative overflow-hidden">
        <HeartBackground />
        <div className="relative z-10 w-full min-h-screen">
          <Routes>
            <Route path="/" element={<InputViewWrapper />} />
            <Route path="/card" element={<PreviewViewWrapper />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

const InputViewWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<CardData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('valentine_card_data');
    if (saved) {
      setInitialData(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = (data: CardData) => {
    localStorage.setItem('valentine_card_data', JSON.stringify(data));
    navigate('/card');
  };

  return <InputView onGenerate={handleGenerate} initialData={initialData} />;
};

const PreviewViewWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('valentine_card_data');
    if (saved) {
      setCardData(JSON.parse(saved));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!cardData) return null;

  return <PreviewView data={cardData} onEdit={() => navigate('/')} />;
};

export default App;
