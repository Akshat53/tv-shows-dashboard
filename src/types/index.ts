// types/index.ts
export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  } | null;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}

export interface MainContentProps {
  shows: Show[];
  setShows: (shows: Show[]) => void;
  onShowSelect: (show: Show | null) => void;
  handleDrawerToggle: () => void;
}
export interface RightPaneProps {
  selectedShow: Show | null;
  onClose: () => void;
  onUpdate: (updatedShow: Show) => void;
}

export interface FormFieldProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export interface ShowDetailsModalProps {
  show: Show | null;
  onClose: () => void;
}

export interface StatusBadgeProps {
  status: 'Running' | string; 
}

