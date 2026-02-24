import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-31T23:59:59").getTime();

const DiscountTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center md:justify-center gap-4 my-6">

      <TimeBlock label="Days" value={timeLeft.days} />
      <TimeBlock label="Hrs" value={timeLeft.hours} />
      <TimeBlock label="Min" value={timeLeft.minutes} />
      <TimeBlock label="Sec" value={timeLeft.seconds} />

    </div>
  );
};

const TimeBlock = ({ label, value }) => (
  <div className="min-w-20 bg-white/10 backdrop-blur-md px-4 py-4 rounded-xl text-center shadow-lg">
    <div className="text-3xl font-bold text-pink-500">
      {value.toString().padStart(2, "0")}
    </div>
    <div className="text-xs uppercase font-bold text-black mt-1">
      {label}
    </div>
  </div>
);

export default DiscountTimer;