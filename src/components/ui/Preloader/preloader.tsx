import React from 'react';
import styles from "./preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['loader']}></div>
    </div>
  );
}

export default Preloader;