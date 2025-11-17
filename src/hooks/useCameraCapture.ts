import { useState, useCallback, useRef } from 'react';

interface UseCameraCaptureReturn {
  capturePhoto: () => Promise<string | null>;
  isCapturing: boolean;
  error: string | null;
}

export function useCameraCapture(): UseCameraCaptureReturn {
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const capturePhoto = useCallback(async (): Promise<string | null> => {
    setIsCapturing(true);
    setError(null);

    try {
      // Request camera access (front-facing camera)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;

      // Create hidden video element
      const video = document.createElement('video');
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      videoRef.current = video;

      // Wait for video to be ready
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          // Give it a moment to stabilize
          setTimeout(resolve, 500);
        };
      });

      // Create canvas and capture frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 JPEG
      const photoBase64 = canvas.toDataURL('image/jpeg', 0.9);

      // Clean up - stop all tracks
      stream.getTracks().forEach(track => track.stop());

      setIsCapturing(false);
      return photoBase64;

    } catch (err) {
      console.error('Camera capture error:', err);
      setError(err instanceof Error ? err.message : 'Failed to capture photo');
      setIsCapturing(false);

      // Clean up on error
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      return null;
    }
  }, []);

  return {
    capturePhoto,
    isCapturing,
    error
  };
}
