import React from 'react';
import { Button } from '@/components/ui';
import styles from './DeviceCard.module.css';

interface DeviceCardProps {
  id: string;
  name: string;
  price: string | number;
  image: string;
  imageAlt?: string;
  onViewDetails?: () => void;
}

/**
 * DeviceCard Component
 * Displays a device product with image, name, and price
 * Features:
 * - Responsive image handling
 * - Price display with primary color
 * - Optional CTA button
 * - Shadow and hover effects
 */
export const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  price,
  image,
  imageAlt = name,
  onViewDetails,
}) => {
  return (
    <div className={styles.card} key={id}>
      <div className={styles.imageContainer}>
        <img src={image} alt={imageAlt} className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>${price}</p>
      </div>

      {onViewDetails && (
        <div className={styles.cta}>
          <Button label="View Details" variant="primary" onClick={onViewDetails} />
        </div>
      )}
    </div>
  );
};
