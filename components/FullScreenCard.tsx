import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

interface FullScreenCardProps {
  content: React.ReactElement;
  closeCard: () => void;
}

const FullScreenCard: React.FC<FullScreenCardProps> = ({ content, closeCard }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showIndicator, setShowIndicator] = useState<string | null>(null);
  const [indicatorOpacity, setIndicatorOpacity] = useState<number>(0);
  const [indicatorSize, setIndicatorSize] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardWidth = windowWidth < 768 ? '90%' : '30%';

  const closeIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    zIndex: 101,  // Make sure it's above other elements
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyles: React.CSSProperties = {
    maxHeight: '90%',
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'auto',
    position: 'relative',
    boxShadow: `0px ${Math.abs(indicatorSize)}px ${Math.abs(indicatorSize) * 2}px rgba(0, 0, 0, ${indicatorOpacity})`, // Dynamic shadow
  };

  const indicatorStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: `${indicatorSize}em`,  // Make it dynamic
    zIndex: 100,
    transform: 'translate(-50%, -50%)',
    opacity: indicatorOpacity,
  };

  const handleDrag = (e: any, { offset }: any) => {
    let opacityLevel =  Math.abs(offset.x) / 350;
    let sizeLevel = 5 + Math.abs(offset.x) / 80;  // Add this line
    if (opacityLevel > 1) opacityLevel = 1;

    if (offset.x > 20) {
      setShowIndicator("↪️");
      setIndicatorOpacity(opacityLevel);
      setIndicatorSize(sizeLevel);  // Add this line
    } else if (offset.x < -20) {
      setShowIndicator("↩️");
      setIndicatorOpacity(opacityLevel);
      setIndicatorSize(sizeLevel);  // Add this line
    } else {
      setShowIndicator(null);
      setIndicatorOpacity(0);
      setIndicatorSize(1);  // Reset to default size
    }
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    if (offset.x > 130) {
      closeCard();
    } else if (offset.x < -130) {
      closeCard();
    }
    setShowIndicator(null);
    setIndicatorOpacity(0);
    setIndicatorSize(1);  // Reset to default size
  };

  return (
    <div 
      style={overlayStyles} 
      onClick={closeCard}  // Add this line
    >
      <motion.div
        style={cardStyles}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, y: 50, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.5 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}  // Already in place, to prevent this click from propagating to the overlay
      >
        <CloseIcon style={closeIconStyle} onClick={closeCard} />
        {showIndicator && (
          <div style={indicatorStyles}>
            {showIndicator}
          </div>
        )}
        {content}
      </motion.div>
    </div>
  );
};

export default FullScreenCard;
