import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

interface CountdownTimerProps {
  /** Target date to count down to */
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * CountdownTimer - Real-time countdown timer
 *
 * Features:
 * - Counts down to a target date/time
 * - Updates every second
 * - Displays Days, Hours, Minutes, Seconds
 * - Black background with gradient blur effect
 * - Responsive design
 *
 * @param targetDate - The date/time to count down to
 */
export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.timer} role="timer" aria-live="polite">
      {/* Days */}
      <div className={styles.segment}>
        <div className={styles.number} aria-label={`${timeLeft.days} days`}>
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className={styles.label}>Days</div>
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Hours */}
      <div className={styles.segment}>
        <div className={styles.number} aria-label={`${timeLeft.hours} hours`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className={styles.label}>Hours</div>
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Minutes */}
      <div className={styles.segment}>
        <div className={styles.number} aria-label={`${timeLeft.minutes} minutes`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className={styles.label}>Minutes</div>
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Seconds */}
      <div className={styles.segment}>
        <div className={styles.number} aria-label={`${timeLeft.seconds} seconds`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className={styles.label}>Seconds</div>
      </div>
    </div>
  );
}

/**
 * Calculate time remaining until target date
 */
function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  // If countdown is over, return zeros
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
