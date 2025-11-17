import { useState, useCallback } from 'react';
import type { NanoBananaStatus } from '../types';

interface UseNanoBananaReturn {
  status: NanoBananaStatus;
  imageUrl: string | null;
  generate: (userPhotoBase64: string, prompt: string) => Promise<void>;
  reset: () => void;
}

// NanoBanana API configuration
// Update this with your actual NanoBanana endpoint
const NANOBANANA_API_URL = import.meta.env.VITE_NANOBANANA_API_URL || 'https://api.nanobanana.dev/v1/generate';
const NANOBANANA_API_KEY = import.meta.env.VITE_NANOBANANA_API_KEY || '';

export function useNanoBanana(): UseNanoBananaReturn {
  const [status, setStatus] = useState<NanoBananaStatus>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generate = useCallback(async (userPhotoBase64: string, prompt: string) => {
    setStatus('pending');

    try {
      console.log('🎨 Generating AI meme with NanoBanana...');
      console.log('Prompt:', prompt);

      // Convert base64 to blob if needed
      const base64Data = userPhotoBase64.split(',')[1] || userPhotoBase64;

      const requestBody = {
        image: base64Data,
        prompt: prompt,
        // Add other NanoBanana-specific parameters here
      };

      const response = await fetch(NANOBANANA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(NANOBANANA_API_KEY ? { 'Authorization': `Bearer ${NANOBANANA_API_KEY}` } : {})
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`NanoBanana API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Adjust based on actual NanoBanana response structure
      const generatedImageUrl = data.imageUrl || data.image || data.output;

      if (!generatedImageUrl) {
        throw new Error('No image URL in response');
      }

      console.log('✅ AI meme generated successfully!');
      setImageUrl(generatedImageUrl);
      setStatus('ready');

    } catch (err) {
      console.error('❌ NanoBanana generation error:', err);
      setStatus('error');

      // For development: use the original photo as fallback
      // Remove this in production
      if (import.meta.env.DEV) {
        console.warn('⚠️ Using original photo as fallback (DEV mode)');
        setImageUrl(userPhotoBase64);
        setStatus('ready');
      }
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setImageUrl(null);
  }, []);

  return {
    status,
    imageUrl,
    generate,
    reset
  };
}
