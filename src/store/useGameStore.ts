import { create } from 'zustand';

interface BossBattleState {
  health: number;
  defeated: boolean;
  currentAnim: 'idle' | 'hit' | 'victory';
}

interface GameState {
  loadingProgress: number;
  isLoaded: boolean;
  gameStarted: boolean;
  gearState: 'normal' | 'haki' | 'gear5';
  activeSkillFruit: string | null;
  bossBattles: Record<string, BossBattleState>;
  totalBounty: number;
  unlockedBounties: string[];

  setProgress: (val: number) => void;
  setLoaded: (loaded: boolean) => void;
  startGame: () => void;
  setGearState: (state: 'normal' | 'haki' | 'gear5') => void;
  selectFruit: (fruitId: string | null) => void;
  attackBoss: (projectId: string, damage: number) => void;
  setBossAnim: (projectId: string, anim: 'idle' | 'hit' | 'victory') => void;
  resetBoss: (projectId: string) => void;
  claimBounty: (bountyId: string, value: number) => void;
  resetGame: () => void;
}

const initialBossState = {
  reyansh: { health: 100, defeated: false, currentAnim: 'idle' as const },
  orvexa: { health: 100, defeated: false, currentAnim: 'idle' as const },
  relaxin: { health: 100, defeated: false, currentAnim: 'idle' as const },
  cakesss: { health: 100, defeated: false, currentAnim: 'idle' as const },
};

export const useGameStore = create<GameState>((set) => ({
  loadingProgress: 0,
  isLoaded: false,
  gameStarted: false,
  gearState: 'normal',
  activeSkillFruit: null,
  bossBattles: { ...initialBossState },
  totalBounty: 0,
  unlockedBounties: [],

  setProgress: (val) => set((state) => {
    const progress = Math.min(100, Math.max(state.loadingProgress, val));
    return {
      loadingProgress: progress,
      isLoaded: progress >= 100,
    };
  }),

  setLoaded: (loaded) => set({ isLoaded: loaded, loadingProgress: loaded ? 100 : 0 }),

  startGame: () => set({ gameStarted: true }),

  setGearState: (gearState) => set({ gearState }),

  selectFruit: (fruitId) => set({ activeSkillFruit: fruitId }),

  attackBoss: (projectId, damage) => set((state) => {
    const current = state.bossBattles[projectId];
    if (!current || current.defeated) return {};

    const newHealth = Math.max(0, current.health - damage);
    const defeated = newHealth <= 0;
    
    // Reward bounty on defeat
    let addedBounty = 0;
    let newUnlockedBounties = [...state.unlockedBounties];
    if (defeated && !newUnlockedBounties.includes(projectId)) {
      newUnlockedBounties.push(projectId);
      addedBounty = projectId === 'reyansh' ? 250000000 
                  : projectId === 'orvexa' ? 320000000 
                  : projectId === 'relaxin' ? 180000000 
                  : 120000000; // cakesss
    }

    return {
      bossBattles: {
        ...state.bossBattles,
        [projectId]: {
          health: newHealth,
          defeated,
          currentAnim: defeated ? 'victory' : 'hit',
        }
      },
      totalBounty: state.totalBounty + addedBounty,
      unlockedBounties: newUnlockedBounties,
    };
  }),

  setBossAnim: (projectId, anim) => set((state) => {
    const current = state.bossBattles[projectId];
    if (!current) return {};
    return {
      bossBattles: {
        ...state.bossBattles,
        [projectId]: {
          ...current,
          currentAnim: anim,
        }
      }
    };
  }),

  resetBoss: (projectId) => set((state) => {
    const current = state.bossBattles[projectId];
    if (!current) return {};
    return {
      bossBattles: {
        ...state.bossBattles,
        [projectId]: {
          health: 100,
          defeated: false,
          currentAnim: 'idle',
        }
      }
    };
  }),

  claimBounty: (bountyId, value) => set((state) => {
    if (state.unlockedBounties.includes(bountyId)) return {};
    return {
      unlockedBounties: [...state.unlockedBounties, bountyId],
      totalBounty: state.totalBounty + value,
    };
  }),

  resetGame: () => set({
    gameStarted: false,
    gearState: 'normal',
    activeSkillFruit: null,
    bossBattles: { ...initialBossState },
    totalBounty: 0,
    unlockedBounties: [],
  }),
}));
