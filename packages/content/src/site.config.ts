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
    role: 'Software Engineer',
    tagline:
      'Software Engineer specializing in large-scale systems, distributed architectures, and SaaS products.',
    summary:
      "Software Engineer with 3.5+ years of experience specializing in Large-scale systems, distributed architectures, and SaaS products. Demonstrated Customer Obsession by delivering high-availability services handling 20M+ weekly requests. Proven track record in Innovation across the Full Software Development Life Cycle (SDLC), including Architecture & Design of financial workflows and credit management systems. Strong background in Mentorship, TDD, and AWS infrastructure management.",
    location: 'New Delhi, India',
    email: 'viratofficial07@gmail.com',
    phone: '+91 9695397301',
    resumeUrl: 'https://drive.google.com/file/d/14f7EecScsKZK3O5kIZ5d3p816_Cl8jnR/view?usp=sharing',
    roles: [
      'Software Engineer',
      'Distributed Systems',
      'AWS',
      'Backend & Full-Stack Engineering',
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
      company: 'Cimpress (Pixartprinting)',
      title: 'Software Engineer, Core Engineering Team',
      period: 'Dec 2024 - Present',
      startDate: '2024-12',
      summary:
        'Core Engineering Team - Shared distributed services supporting 20M+ API requests weekly.',
      highlights: [
        'Own Architecture & Design for shared distributed services supporting 20M+ API requests weekly across 10+ global B2B/B2C channels.',
        'Lead the Full SDLC of a credit-limit management system, ensuring high data integrity and consistency for financial workflows.',
        'Build production backend services using PHP, Laravel, MySQL, Redis, and AWS, with hands-on use of SQS/FIFO SQS, SNS, S3, CloudWatch, Parameter Store, and AWS infrastructure tooling.',
        'Drive system modernization by migrating legacy PHP services to NestJS microservices, maintaining 100% business behavior parity.',
        'Work within a strict peer-review culture, regularly reviewing production changes and design/implementation decisions; contribute to engineering quality through TDD, automated testing, refactoring, and static analysis.',
        'Participated in a rotating production-support schedule every 6 sprints, handling support requests from multiple engineering teams, monitoring CloudWatch for API spikes and service degradation, investigating third-party service outages, and preparing recurring support reports.',
        'Work across the SDLC from requirements and technical design through implementation, testing, code review, deployment, monitoring, and production support using IaaS-based infrastructure and CI/CD pipelines.',
        'Mentorship & Leadership: Onboarded and mentored 2 engineers through technical guidance and peer code reviews in an Agile environment.',
        'Apply GDPR and data-privacy requirements to customer data handling and production APIs.',
        'Develop internal interfaces and business workflows using Laravel Filament; also contribute to AI-assisted and agentic engineering workflows for development, analysis, documentation, and testing.',
        'Developed and maintained a multi-tenant React-based internal platform supporting multiple domain-specific custom applications, enabling teams to build and manage workflows on a shared frontend architecture.',
      ],
      stack: ['NestJS', 'PHP', 'Laravel', 'AWS', 'Microservices', 'TDD', 'React'],
    },
    {
      company: 'Excelledia Ventures',
      title: 'Software Engineer',
      period: 'Feb 2024 - Dec 2024',
      startDate: '2024-02',
      summary: 'Engineered backend modules for ISOROBOT, a multi-tenant SaaS platform.',
      highlights: [
        'Engineered backend modules for ISOROBOT, a multi-tenant SaaS platform serving government organizations across the Middle East.',
        'Designed and maintained core product functionality and client-facing API workflows using PHP and Laravel within a shared multi-tenant architecture.',
        'Built and maintained Stripe Connect integrations for customer payments and merchant payouts, handling external transaction workflows and webhooks.',
        'Collaborated within a 20-person engineering team to deliver customized functionality while maintaining shared platform behavior and backend engineering standards.',
      ],
      stack: ['Laravel', 'PHP', 'Stripe Connect', 'SaaS', 'API Workflows'],
    },
    {
      company: 'VDK Eduventures',
      title: 'Full Stack Developer',
      period: 'Apr 2023 - Feb 2024',
      startDate: '2023-04',
      highlights: [
        'Optimized the Drishti IAS platform to support 10M+ monthly active users, focusing on scalability and performance.',
        'Architected and implemented a Laravel-based SSO platform for centralized authentication across internal and product-facing applications.',
        'Designed and developed an employee loan-processing workflow and automated payroll-processing system that ingested attendance data to generate payroll inputs and salary slips, with emphasis on business-rule correctness and reliable processing.',
      ],
      stack: ['PHP', 'Laravel', 'SSO', 'Scalability'],
    },
    {
      company: 'VDK Eduventures',
      title: 'Full Stack Intern',
      period: 'Jan 2023 - Apr 2023',
      startDate: '2023-01',
      highlights: [
        'Developed an Angular POS frontend and integrated internal modules for production web applications.',
      ],
      stack: ['Angular', 'Frontend Development'],
    }
  ],

  skills: [
    {
      category: 'Backend & Architecture',
      skills: ['PHP', 'Laravel', 'Node.js', 'NestJS', 'REST APIs', 'Microservices', 'System Design', 'Database Design', 'Authentication & Authorization', 'Queues', 'Background Processing', 'Event-Driven Workflows'],
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS (SQS, FIFO SQS, SNS, S3, CloudWatch, Parameter Store, EC2)', 'CloudFormation', 'CodePipeline', 'Docker', 'Linux', 'CI/CD', 'IaaS'],
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'Redis', 'Query Optimization'],
    },
    {
      category: 'Frontend',
      skills: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Inertia', 'Tailwind CSS'],
    },
    {
      category: 'Quality & Engineering',
      skills: ['TDD', 'Unit/Integration Testing', 'Code Reviews', 'Static Analysis', 'Refactoring', 'Secure API Development', 'GDPR/Data Privacy'],
    },
    {
      category: 'Integrations & AI',
      skills: ['Stripe Connect', 'Payment APIs', 'Webhooks', 'OAuth2', 'Third-Party APIs', 'LLM Integrations', 'AI-Assisted Development'],
    },
  ],

  projects: [
    {
      name: 'VIRA — AI Virtual Assistant',
      tagline: 'An AI-powered assistant for scheduling reminders and Google Calendar meetings.',
      description:
        'A virtual AI-assistant that schedules reminders and Google Calendar meetings through text and voice commands. Features real-time asynchronous communication and Gemini API integration.',
      stack: ['React', 'Inertia', 'Laravel', 'Tailwind CSS', 'Gemini API', 'Google Calendar', 'WebSockets'],
      highlights: [
        'Engineered an AI-powered assistant for scheduling reminders and Google Calendar meetings through text and voice commands.',
        'Integrated Gemini API for natural-language request interpretation and Google Calendar for scheduling workflows.',
        'Implemented real-time asynchronous communication using Laravel Reverb and WebSockets.',
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
