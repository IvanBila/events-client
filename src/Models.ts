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

export interface Faq {
  key: string;
  title: string;
  description: string;
}

export interface EventItemProps {
  event: Event;
  edit: (event: Event) => void;
  remove: (event: Event) => void;
}
