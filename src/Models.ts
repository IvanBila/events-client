import React from 'react';
import { TablerIcon } from '@tabler/icons';

export interface Event {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

export interface HashedEvents {
  [key: string]: Event[];
}

export interface FormBody {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface HomeLinks {
  links: { link: string; label: string }[];
}

export interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

export interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}
