'use client';

// Note: Tone.js requires client-side only execution
let Tone: typeof import('tone') | null = null;

class AudioManager {
  private static instance: AudioManager;
  private isInitialized = false;
  private isMuted = true;

  private ambientSynth: InstanceType<typeof import('tone').PolySynth> | null = null;
  private uiSynth: InstanceType<typeof import('tone').Synth> | null = null;
  private reverb: InstanceType<typeof import('tone').Reverb> | null = null;
  private filter: InstanceType<typeof import('tone').Filter> | null = null;

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async initialize() {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      Tone = await import('tone');
      await Tone.start();

      // Initialize effects chain
      this.reverb = new Tone.Reverb({ decay: 4, wet: 0.3 }).toDestination();
      this.filter = new Tone.Filter(2000, 'lowpass').connect(this.reverb);

      // Initialize synths
      this.ambientSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 2, decay: 1, sustain: 0.5, release: 4 },
      }).connect(this.filter);
      this.ambientSynth.volume.value = -20;

      this.uiSynth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
      }).toDestination();
      this.uiSynth.volume.value = -15;

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  playAmbient(scrollProgress: number) {
    if (this.isMuted || !this.ambientSynth || !Tone) return;

    const chords = [
      ['C2', 'E2', 'G2'],
      ['A2', 'C3', 'E3'],
      ['F2', 'A2', 'C3'],
      ['G2', 'B2', 'D3'],
      ['C3', 'E3', 'G3'],
    ];

    const chordIndex = Math.floor(scrollProgress * (chords.length - 1));
    const chord = chords[Math.min(chordIndex, chords.length - 1)];

    this.ambientSynth.releaseAll();
    chord.forEach((note) => {
      this.ambientSynth?.triggerAttack(note, Tone!.now(), 0.1);
    });
  }

  playClick() {
    if (this.isMuted || !this.uiSynth || !Tone) return;
    this.uiSynth.triggerAttackRelease('C5', '32n');
  }

  playHover() {
    if (this.isMuted || !this.uiSynth || !Tone) return;
    this.uiSynth.triggerAttackRelease('E5', '64n', Tone.now(), 0.3);
  }

  playSuccess() {
    if (this.isMuted || !this.uiSynth || !Tone) return;
    const now = Tone.now();
    this.uiSynth.triggerAttackRelease('C5', '16n', now);
    this.uiSynth.triggerAttackRelease('E5', '16n', now + 0.1);
    this.uiSynth.triggerAttackRelease('G5', '16n', now + 0.2);
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientSynth) {
      this.ambientSynth.releaseAll();
    }
  }

  dispose() {
    this.ambientSynth?.dispose();
    this.uiSynth?.dispose();
    this.reverb?.dispose();
    this.filter?.dispose();
  }
}

export const audioManager = AudioManager.getInstance();
