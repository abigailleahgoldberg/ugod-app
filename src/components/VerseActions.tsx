'use client';
import { useState, useCallback } from 'react';
import { addBookmark, removeBookmark, isBookmarked as checkBookmarked, saveProgress } from '@/lib/bookmarks';

interface Props {
  verseId: string;
  text: string;
  reference: string;
  tradition: string;
  traditionKey: string;
  emoji: string;
  url: string;
  verse: number;
  bookId: string;
  chapter: number;
}

export function VerseActions({ verseId, text, reference, tradition, traditionKey, emoji, url, verse, bookId, chapter }: Props) {
  const [bookmarked, setBookmarked] = useState(() => typeof window !== 'undefined' ? checkBookmarked(verseId) : false);
  const [speaking, setSpeaking] = useState(false);

  const toggleBookmark = useCallback(() => {
    if (bookmarked) {
      removeBookmark(verseId);
      setBookmarked(false);
    } else {
      addBookmark({ id: verseId, text: text.slice(0, 300), reference, tradition, traditionKey, emoji, url, savedAt: Date.now() });
      setBookmarked(true);
    }
    // Save reading progress
    saveProgress({ traditionKey, bookId, chapter, verse, lastRead: Date.now(), label: reference });
  }, [bookmarked, verseId, text, reference, tradition, traditionKey, emoji, url, verse, bookId, chapter]);

  const speak = useCallback(() => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  }, [text, speaking]);

  return (
    <span className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
      <button
        onClick={speak}
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] hover:bg-[var(--cream-warm)] transition-colors"
        title={speaking ? 'Stop' : 'Listen'}
      >
        {speaking ? '⏹' : '🔊'}
      </button>
      <button
        onClick={toggleBookmark}
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] hover:bg-[var(--cream-warm)] transition-colors"
        title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
      >
        {bookmarked ? '⭐' : '☆'}
      </button>
    </span>
  );
}

// Speak all verses on the page
export function SpeakAll({ texts }: { texts: string[] }) {
  const [speaking, setSpeaking] = useState(false);

  const toggleSpeak = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const fullText = texts.join('. ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  return (
    <button onClick={toggleSpeak} className="btn-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5">
      {speaking ? '⏹ Stop' : '🔊 Listen to All'}
    </button>
  );
}
