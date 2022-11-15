import { Faq } from './Models';
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const links = [
  {
    link: '/sign-in',
    label: 'Sign in',
  },
];

const faq: Faq[] = [
  {
    key: 'how-to-add-event',
    title: 'How Can I add events?',
    description:
      'You can click the create event button or access /create-event',
  },
  {
    key: 'is-product-paid',
    title: 'Is the product paid?',
    description:
      'For the beta phase the app is free and will remain so until further notice',
  },
  {
    key: 'can-i-send-invites',
    title: 'Can I send invites to other users?',
    description:
      'For the time being you can only send invites to your own email',
  },
];

export { BASE_URL, links, faq };
