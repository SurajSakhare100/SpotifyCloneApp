// src/components/Modal.js

import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="w-full">
        <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-w-2xl relative transition-transform transform scale-100 duration-300">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl text-white"
          >
            <FaTimes />
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
};

export default Modal;
