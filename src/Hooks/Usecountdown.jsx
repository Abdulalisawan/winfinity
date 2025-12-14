import { useEffect, useState } from "react";

function getTimeRemaining(deadline) {
  if (!deadline) {
    return {
      expired: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const total = new Date(deadline).getTime() - Date.now();

  if (isNaN(total) || total <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export const useCountdown = (deadline) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(deadline)
  );

  useEffect(() => {
    if (!deadline) return;

    const interval = setInterval(() => {
      setTimeLeft(() => {
  const next = getTimeRemaining(deadline);

  if (next.expired) {
    clearInterval(interval);
  }

  return next;
});
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return timeLeft;
};
