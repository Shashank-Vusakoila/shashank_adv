import { create } from 'zustand';

interface AudioState {
  isMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  currentBgm: 'ambient' | 'adventure' | 'sunset' | null;
  toggleMute: () => void;
  setBgmVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  playBgm: (bgm: 'ambient' | 'adventure' | 'sunset') => void;
  stopBgm: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  bgmVolume: 0.25,
  sfxVolume: 0.5,
  currentBgm: null,

  toggleMute: () => set((state) => {
    const nextMuted = !state.isMuted;
    if (typeof window !== 'undefined') {
      // Custom event to let our Howl manager know to update mute status
      window.dispatchEvent(new CustomEvent('audio-mute-toggle', { detail: { isMuted: nextMuted } }));
    }
    return { isMuted: nextMuted };
  }),

  setBgmVolume: (vol) => set((state) => {
    const volume = Math.min(1, Math.max(0, vol));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('audio-bgm-volume', { detail: { volume } }));
    }
    return { bgmVolume: volume };
  }),

  setSfxVolume: (vol) => set((state) => {
    const volume = Math.min(1, Math.max(0, vol));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('audio-sfx-volume', { detail: { volume } }));
    }
    return { sfxVolume: volume };
  }),

  playBgm: (bgm) => set((state) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('audio-play-bgm', { detail: { bgm } }));
    }
    return { currentBgm: bgm };
  }),

  stopBgm: () => set(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('audio-stop-bgm'));
    }
    return { currentBgm: null };
  }),
}));
export default useAudioStore;
