import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  loading = 'lazy',
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Générer des versions responsives de l'image
  const generateSrcSet = (baseSrc: string) => {
    // Pour les images locales, nous pourrions générer plusieurs tailles
    // En attendant, nous utilisons l'image originale
    return baseSrc;
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Placeholder pendant le chargement
  const PlaceholderDiv = () => (
    <div 
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-gray-400 text-sm">
        📷 Chargement...
      </div>
    </div>
  );

  // Fallback en cas d'erreur
  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-gray-300 border-dashed flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image non disponible</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!imageLoaded && <PlaceholderDiv />}
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
        } ${className}`}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchpriority={loading === 'eager' ? 'high' : 'low'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </>
  );
};

export default OptimizedImage;