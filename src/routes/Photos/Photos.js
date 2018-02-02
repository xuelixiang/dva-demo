import React from 'react';
import { connect } from 'dva';
import styles from './Photos.css';
import PhotosComponent from '../../components/Photos/Photos';
import MainLayout from '../../components/MainLayout/MainLayout';

function Photos({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <PhotosComponent />
      </div>
    </MainLayout>
  );
};

export default connect()(Photos);



