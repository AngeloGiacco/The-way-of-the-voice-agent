// Chapter types
export interface Chapter {
  id: string;
  label: string;
  title: string;
  description?: string;
}

// Audio types
export interface AudioState {
  isEnabled: boolean;
  isInitialized: boolean;
  volume: number;
}

// Scroll types
export interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  activeChapter: string;
}

// Interactive component types
export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

export interface Integration {
  id: string;
  label: string;
  category: 'knowledge' | 'action' | 'channel' | 'orchestration';
  description: string;
  example: {
    user: string;
    agent: string;
  };
  position: { x: number; y: number };
}

export interface Version {
  id: string;
  label: string;
  date: string;
  changes: string[];
  metrics: {
    satisfaction: number;
    completionRate: number;
    avgLatency: number;
  };
  branch?: string;
}

// Pipeline stage types
export interface PipelineStage {
  id: string;
  label: string;
  color: 'warm' | 'cool' | 'bright';
  description?: string;
}

// Journey stage types
export interface JourneyStage {
  id: string;
  title: string;
  description: string;
  skills: string[];
}
