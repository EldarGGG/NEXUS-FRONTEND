import React from 'react';
import { memo } from 'react';
import styles from './screen.module.scss';

const MapWrapper = memo(() => {
  return <div className={styles['map']} id='mapContainer'></div>;
});

MapWrapper.displayName = 'MapWrapper';

export default MapWrapper;
