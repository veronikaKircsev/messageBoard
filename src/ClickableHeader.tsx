import React, { useState } from 'react';
import styles from './style.module.css';
type Props = {
    title: string;
    onClick(): void;
    role?: string;
    'aria-selected'?: boolean;
    };

export default function ClickableHeader({ title, onClick}: Props) {


  return (
    <h2 onClick={onClick} style={{fontStyle: 'italic'}}>
      {title}
    </h2>
  );
}