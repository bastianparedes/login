import React from 'react';

import { Modal } from 'bastianparedes/components';

import styles from './styles.module.scss';

interface props {
  children: React.ReactNode;
  setModalVisible: any;
}

const WarningModal = ({ setModalVisible, children }: props): JSX.Element => (
  <Modal setModalVisible={setModalVisible}>
    <div className={styles.container}>{children}</div>
  </Modal>
);

export default WarningModal;
