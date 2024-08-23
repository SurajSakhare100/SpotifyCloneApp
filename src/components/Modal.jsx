// src/components/Modal.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaPause, FaPlay, FaTimes } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';

const Modal = () => {
  const { playTrack, track, setTrack, setIsModalOpen, pause ,playStatus, setPlayStatus} = usePlayer();
  const play = (track, e) => {
    e.preventDefault();
    playTrack(track);
    setTrack(track)
    setPlayStatus(true)
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const btnPause = ()=> {
    pause();
    setPlayStatus(false)
  }
  const handlebtn = (track, e) => {
    if(playStatus){
    btnPause()  
    }else{
    play(track, e)
    }
  };

  return (
    <div className='w-80 fixed mt-16 bg-[#111] text-white shadow-md shadow-white p-4 h-screen top-0 right-0 z-90'>
      <div className='flex items-center justify-between my-2'>
        <h2 className="text-xl font-bold">{track.name}</h2>
        <p onClick={() => handleCloseModal()} className='cursor-pointer'><FaTimes /></p>
      </div>
      <img src={track.album.images[0]?.url || 'default_image_url'} alt={track.name} className="w-full mb-2 cursor-pointer" />
      <p className='text-xl'>{track.album.name}</p>
      <p className='text-xl'>{track.artists.map(artist => artist.name).join(', ')}</p>
      <button className='bg-green-500 mt-2 rounded-full w-16 h-16 flex items-center justify-center text-black text-xl' onClick={(e) => { handlebtn(track, e) }} >{playStatus?<FaPause/>:<FaPlay />}</button>
    </div>
  );
};

export default Modal;
