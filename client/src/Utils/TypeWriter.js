import { useEffect, useState } from "react";

const TypeWriter = (props) => {
  const { text } = props;
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentPosition < text.length) {
        setCurrentPosition((value) => value + 1);
      }
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  useEffect(() => {
    setCurrentPosition(0);
  }, [text]);

  return text.substring(0, currentPosition);
};

export default TypeWriter;
