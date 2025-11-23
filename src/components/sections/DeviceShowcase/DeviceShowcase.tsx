import React from 'react';
import { DeviceCard } from '@/components/ui';
import styles from './DeviceShowcase.module.css';

interface Device {
  id: string;
  name: string;
  price: number | string;
  image: string;
}

interface DeviceShowcaseProps {
  title?: string;
  description?: string;
  devices?: Device[];
}

const DEFAULT_DEVICES: Device[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592286927505-c8d3ffeaaf78?w=300&h=400&fit=crop',
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    price: 799,
    image: 'https://images.unsplash.com/photo-1592286927505-c8d3ffeaaf78?w=300&h=400&fit=crop',
  },
  {
    id: 'iphone-xr',
    name: 'iPhone 13',
    price: 599,
    image: 'https://images.unsplash.com/photo-1592286927505-c8d3ffeaaf78?w=300&h=400&fit=crop',
  },
];

/**
 * DeviceShowcase Component
 * Displays device products in a responsive grid
 * Features:
 * - Configurable device list
 * - Responsive grid layout
 * - Optional title and description
 * - Hover effects and interactions
 */
export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({
  title = 'Choose Your Device',
  description = 'Premium devices available for immediate delivery',
  devices = DEFAULT_DEVICES,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              id={device.id}
              name={device.name}
              price={device.price}
              image={device.image}
              imageAlt={device.name}
              onViewDetails={() => console.log(`View details for ${device.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
