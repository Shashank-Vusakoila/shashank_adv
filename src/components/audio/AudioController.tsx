'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/store/useAudioStore';

// Registry of royalty-free, high-quality audio files for cinematic storytelling
const AUDIO_SOURCES = {
  // Background Music tracks (looping)
  bgm: {
    ambient: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Moody/stormy synth ambient loop
    adventure: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Upbeat, epic battle march
    sunset: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // Relaxing acoustic sailing theme
  },
  // Sound Effects (one-shot)
  sfx: {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav',      // Quick interface click
    thunder: 'https://assets.mixkit.co/active_storage/sfx/1657/1657-84.wav',    // Heavy thunder crack
    haki: 'https://assets.mixkit.co/active_storage/sfx/1188/1188-84.wav',       // Energy shockwave
    slash: 'https://assets.mixkit.co/active_storage/sfx/1486/1486-84.wav',      // Sword slash swing
    punch: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav',      // Punch impact
    victory: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav',    // Level up fanfare
  }
};

declare global {
  interface Window {
    triggerSFX: (name: keyof typeof AUDIO_SOURCES.sfx) => void;
  }
}

export function AudioController() {
  const { isMuted, bgmVolume, sfxVolume } = useAudioStore();
  
  // Keep track of active audio instances
  const activeBgmRef = useRef<Howl | null>(null);
  const activeBgmNameRef = useRef<string | null>(null);
  const sfxInstancesRef = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // 1. Initialize Sound Effects
    const sfxMap: Record<string, Howl> = {};
    Object.entries(AUDIO_SOURCES.sfx).forEach(([name, url]) => {
      sfxMap[name] = new Howl({
        src: [url],
        volume: sfxVolume,
        html5: false,
        preload: true,
      });
    });
    sfxInstancesRef.current = sfxMap;

    // Expose dynamic trigger to window
    window.triggerSFX = (name) => {
      const sfx = sfxInstancesRef.current[name];
      if (sfx && !useAudioStore.getState().isMuted) {
        sfx.volume(useAudioStore.getState().sfxVolume);
        sfx.play();
      }
    };

    // 2. Set up BGM state synchronization listeners
    const handlePlayBgm = (e: Event) => {
      const customEvent = e as CustomEvent<{ bgm: keyof typeof AUDIO_SOURCES.bgm }>;
      const bgmName = customEvent.detail.bgm;
      const url = AUDIO_SOURCES.bgm[bgmName];
      
      if (!url) return;

      // If the requested BGM is already playing, do nothing
      if (activeBgmNameRef.current === bgmName && activeBgmRef.current?.playing()) {
        return;
      }

      // Stop old BGM with fade
      if (activeBgmRef.current) {
        const oldBgm = activeBgmRef.current;
        oldBgm.fade(oldBgm.volume(), 0, 500);
        setTimeout(() => oldBgm.stop(), 500);
      }

      // Start new BGM
      const store = useAudioStore.getState();
      const newBgm = new Howl({
        src: [url],
        volume: store.isMuted ? 0 : store.bgmVolume,
        loop: true,
        html5: true, // Use HTML5 audio for larger streaming music files
      });

      newBgm.play();
      // Fade in BGM
      newBgm.fade(0, store.isMuted ? 0 : store.bgmVolume, 1000);

      activeBgmRef.current = newBgm;
      activeBgmNameRef.current = bgmName;
    };

    const handleStopBgm = () => {
      if (activeBgmRef.current) {
        const oldBgm = activeBgmRef.current;
        oldBgm.fade(oldBgm.volume(), 0, 500);
        setTimeout(() => oldBgm.stop(), 500);
        activeBgmRef.current = null;
        activeBgmNameRef.current = null;
      }
    };

    const handleMuteToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isMuted: boolean }>;
      const muted = customEvent.detail.isMuted;
      
      if (activeBgmRef.current) {
        activeBgmRef.current.mute(muted);
      }
      Object.values(sfxInstancesRef.current).forEach(howl => howl.mute(muted));
    };

    const handleBgmVolume = (e: Event) => {
      const customEvent = e as CustomEvent<{ volume: number }>;
      const vol = customEvent.detail.volume;
      if (activeBgmRef.current) {
        activeBgmRef.current.volume(vol);
      }
    };

    const handleSfxVolume = (e: Event) => {
      const customEvent = e as CustomEvent<{ volume: number }>;
      const vol = customEvent.detail.volume;
      Object.values(sfxInstancesRef.current).forEach(howl => howl.volume(vol));
    };

    window.addEventListener('audio-play-bgm', handlePlayBgm);
    window.addEventListener('audio-stop-bgm', handleStopBgm);
    window.addEventListener('audio-mute-toggle', handleMuteToggle);
    window.addEventListener('audio-bgm-volume', handleBgmVolume);
    window.addEventListener('audio-sfx-volume', handleSfxVolume);

    // Initial mute sync
    if (activeBgmRef.current) {
      activeBgmRef.current.mute(isMuted);
    }

    return () => {
      // Cleanup events and sound instances on unmount
      window.removeEventListener('audio-play-bgm', handlePlayBgm);
      window.removeEventListener('audio-stop-bgm', handleStopBgm);
      window.removeEventListener('audio-mute-toggle', handleMuteToggle);
      window.removeEventListener('audio-bgm-volume', handleBgmVolume);
      window.removeEventListener('audio-sfx-volume', handleSfxVolume);
      
      if (activeBgmRef.current) {
        activeBgmRef.current.stop();
      }
      Object.values(sfxInstancesRef.current).forEach(howl => howl.unload());
    };
  }, [isMuted, bgmVolume, sfxVolume]);

  return null; // Side-effect controller only
}
export default AudioController;
