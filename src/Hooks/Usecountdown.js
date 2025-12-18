import { useEffect, useState } from "react";


export const useCountdown = (deadline) => {
  const [timeLeft, setTimeLeft] = useState({
    expired: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!deadline) return; 

    const calculate = () => {
      const diff = new Date(deadline).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({
          expired: true,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        expired: false,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return timeLeft;
};
