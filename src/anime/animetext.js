import React, { useEffect, useState } from 'react';

const AnimatedText = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleText.length < text.length) {
        setVisibleText(prevText => prevText + text.charAt(visibleText.length));
      } else {
        clearInterval(interval);
      }
    }, 100); // délai entre chaque lettre (en millisecondes), vous pouvez ajuster selon vos préférences

    return () => clearInterval(interval);
  }, [text, visibleText.length]);

  return <span>{visibleText}</span>;
};

export default AnimatedText;
