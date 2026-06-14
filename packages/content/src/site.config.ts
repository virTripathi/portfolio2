import type { SiteConfig } from '@portfolio/types';

/**
 * Single source of truth for the entire portfolio.
 *
 * Edit this file to update any content on the live site - nothing else needs
 * to change. Sections, the 3D scene, the contact form and the GitHub widget
 * can all be toggled via `features` below.
 *
 * NOTE: Replace the placeholder social/profile URLs (marked with TODO) with
 * your real links.
 */
export const siteConfig: SiteConfig = {
  // Used by the live GitHub stats widget. TODO: set to your real handle.
  githubUsername: 'virTripathi',

  profile: {
    name: 'Virat Tripathi',
    role: 'Senior Software Engineer',
    tagline:
      'Backend-focused engineer building reliable APIs, scalable architectures, and distributed systems.',
    summary:
      "I'm a Senior Software Engineer with 4+ years of experience building SaaS products and scalable web applications using PHP (Laravel, CakePHP), JavaScript/TypeScript, React, NestJS, and Python. My core focus is backend development - designing reliable APIs, scalable architectures, distributed systems, and background processing workflows - while maintaining strong frontend capabilities for delivering complete end-to-end features.",
    location: 'New Delhi, India',
    email: 'viratofficial07@gmail.com',
    phone: '+91 9695397301',
    resumeUrl: 'https://drive.google.com/file/d/14f7EecScsKZK3O5kIZ5d3p816_Cl8jnR/view?usp=sharing',
    roles: [
      'Senior Software Engineer',
      'Backend Specialist',
      'Distributed Systems',
      'API Architect',
      'AI-Native Workflows',
    ],
    socials: [
      // TODO: replace with your real profile URLs.
      { label: 'GitHub', href: 'https://github.com/virTripathi', icon: 'github', handle: '@virTripathi' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/virat-tripathi-584b67222', icon: 'linkedin' },
      { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/viratofficial07', icon: 'hackerrank' },
      { label: 'Email', href: 'mailto:viratofficial07@gmail.com', icon: 'mail' },
    ],
  },

  experience: [
    {
      company: 'Cimpress',
      title: 'Software Engineer',
      period: 'Dec 2024 - Present',
      startDate: '2024-12',
      summary:
        'Distributed microservices handling high-volume ecommerce workflows across customer, order-management, invoicing, fulfillment, and artwork systems.',
      highlights: [
        'Contributed to a distributed microservices architecture handling high-volume ecommerce workflows across customer, order-management, invoicing, fulfillment, and artwork systems.',
        'Created multiple agentic workflows for code reviews, documentation, and API development.',
        'Contributed in NestJS to the Laravel-to-NestJS migration of a legacy codebase using AI-native workflows.',
      ],
      stack: ['NestJS', 'Laravel', 'Microservices', 'AWS', 'AI Agents'],
    },
    {
      company: 'Excelledia Ventures',
      title: 'Software Engineer',
      period: 'Feb 2024 - Dec 2024',
      startDate: '2024-02',
      summary: 'Flagship SaaS product - ISOROBOT.',
      highlights: [
        'Worked alongside a team of 20 to develop customized solutions for our flagship SaaS product, ISOROBOT.',
        'Worked with the latest Laravel practices and gained a deeper understanding of the Laravel ecosystem.',
      ],
      stack: ['Laravel', 'PHP', 'MySQL', 'SaaS'],
    },
    {
      company: 'VDK Eduventures',
      title: 'Full Stack Developer',
      period: 'April 2023 - Feb 2024',
      startDate: '2023-04',
      highlights: [
        'Created features such as an in-house loan module and a fully fledged payroll processing system in the company HRMS software built on top of Django.',
        'Developed a Single-Sign-On (SSO) mechanism using OAuth2 for seamless authentication across various in-house projects.',
      ],
      stack: ['PHP', 'Laravel', 'OAuth2', 'PostgreSQL'],
    },
    {
      company: 'VDK Eduventures',
      title: 'Full Stack Intern',
      period: 'Jan 2023 - April 2023',
      startDate: '2023-01',
      highlights: [
        'Developed a POS frontend built on top of the Angular framework for the company at the World Book Fair 2023 held in New Delhi.',
        'Developed an in-house banners module in the company primary project, drishtiias, built on top of CakePHP.',
      ],
      stack: ['Angular', 'CakePHP', 'PHP', 'Laravel'],
    }
  ],

  skills: [
    {
      category: 'Programming & Scripting',
      skills: ['PHP (Laravel, CakePHP)', 'JavaScript / TypeScript', 'Python'],
    },
    {
      category: 'Frameworks & Libraries',
      skills: ['React.js', 'Inertia', 'Express.js', 'Angular', 'NestJS', 'Next.js'],
    },
    {
      category: 'Databases & Tools',
      skills: ['MySQL', 'MSSQL', 'PostgreSQL', 'phpMyAdmin', 'Redis'],
    },
    {
      category: 'DevOps & Cloud',
      skills: ['Linux', 'Apache', 'Docker', 'AWS (EC2, S3, CloudWatch, SQS, SNS)', 'GCP', 'CI/CD'],
    },
    {
      category: 'AI & Automation',
      skills: [
        'LLM Integration',
        'AI Agents',
        'Workflow Automation',
        'Gemini APIs',
        'AI-Assisted Development',
      ],
    },
    {
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
    },
    {
      category: 'Core Concepts',
      skills: [
        'WebSockets',
        'Queues & Jobs',
        'System Design (HLD/LLD)',
        'Data Structures & Algorithms',
      ],
    },
  ],

  projects: [
    {
      name: 'VIRA',
      tagline: 'A virtual AI-assistant for scheduling reminders and Google Meet meetings.',
      description:
        'A virtual AI-assistant that schedules reminders and Google Meet meetings through text and voice based commands. Built and shipped solo as an independent contractor over 3 months.',
      stack: ['React', 'Inertia', 'Laravel', 'Tailwind CSS', 'Gemini API', 'Reverb'],
      highlights: [
        'Integrated Google Calendar and the Gemini API to handle user requests and schedule meetings.',
        'Integrated WebSockets using Reverb for real-time asynchronous communication between the user and the app.',
        'Worked closely with Stripe APIs and webhooks to implement Connect accounts and receive/transfer payments globally.',
        'Implemented an in-house analytics management system.',
      ],
      links: [],
      featured: true,
    },
    {
      name: 'Tradmed',
      tagline: 'A centralized digital repository of medicinal plants of North-East India.',
      description:
        'A plant repository cataloguing medicinal herbs and plants native to the northeastern region of India - built to serve researchers, Ayurveda practitioners, and policymakers with reliable, open-access data on traditional medicinal flora.',
      stack: ['Database Design', 'Data Pipelines', 'Geospatial Metadata', 'Search'],
      highlights: [
        'Architected the database schema and data ingestion pipeline for botanical, ethnobotanical, and geospatial metadata across hundreds of species.',
        'Delivered advanced search, taxonomic classification, and image storage.',
      ],
      links: [],
      featured: true,
    }
  ],

  writings: [
    // TODO: replace href "#" with the real article links.
    {
      title: 'Angular Guide',
      description: 'A practical guide to building with Angular.',
      href: 'https://docs.google.com/document/d/1sUdzsIFVb0NQ9kEaACEgnKS3s67Tkmt86bH7_3Z2Flk/edit?tab=t.0',
      tag: 'Angular',
    },
    {
      title: 'JavaScript Guide',
      description: 'Core JavaScript concepts explained.',
      href: 'https://docs.google.com/document/d/1j7pMeF_f5iJb_LzRVszjzGKEyY-t_j8g2xymC7qEcMA/edit?tab=t.0',
      tag: 'JavaScript',
    },
    {
      title: 'RxJs Guide',
      description: 'Reactive programming with RxJS.',
      href: 'https://docs.google.com/document/d/1qYkpKYFhYQZ0hoT2k5BxxVQXzBU_FYLM6cZohAFgmas/edit?tab=t.0',
      tag: 'RxJS',
    },
  ],

  education: [
    {
      institution: 'Jamia Millia Islamia, New Delhi',
      degree: 'MSc Bioinformatics',
      grade: 'CGPA 8.89',
      details: 'Project: Tradmed - A plant repository.',
    },
    {
      institution: 'Ewing Christian College, Prayagraj, India',
      degree: 'Bachelor of Science',
      field: 'Majors: Physics and Biophysics',
      grade: 'CGPA 6.16',
    },
  ],

  theme: {
    // Deep slate + desaturated periwinkle - calm, modern, single-accent.
    accent: '#a5b0ec',
    accentSecondary: '#7681c9',
    background: '#0a0b12',
  },

  features: {
    three: true,
    contactForm: true,
    githubStats: true,
    sections: {
      about: true,
      experience: true,
      skills: true,
      projects: true,
      writings: true,
      education: true,
      contact: true,
    },
  },
};

export default siteConfig;
