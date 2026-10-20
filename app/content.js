export const me = {
  name: 'Divyesh Pawar',
  email: 'divyeshhere@gmail.com',
  phone: '+1 548 390 6338',
  linkedin: 'https://linkedin.com/in/divyesh-pawar-b11524219',
  github: 'https://github.com/divyesh314',
  cv: '/Divyesh_Pawar_Resume.pdf',
  about: [
    "Hi! I'm Divyesh, a software engineer from Gujarat, now building in Kitchener, Ontario.",
    'I like taking a simple question and turning it into a system that answers it reliably: APIs, data pipelines, and full-stack apps that hold up in production.',
    "Lately I've been going deep on retrieval and LLMs, building RAG systems from first principles and measuring whether they actually work.",
  ],
}

export const jobs = [
  ['Software Engineer', 'Life Analytics', 'Mar 2025 – Apr 2026', 'Built backend services and REST APIs (Django REST Framework, PostgreSQL) in an agile team, cutting data processing time 30%. Shipped through CI/CD with Docker and Kubernetes on AWS.'],
  ['Freelance Full-Stack Developer', 'Self-employed', 'Mar 2023 – now', 'Designed, built and deployed client web apps end to end with React, Next.js, Python and Node.js. 95%+ client satisfaction; automated deploys cut turnaround 50%.'],
  ['Data Engineer (volunteer)', 'DataAnnotation', 'Jun 2023 – Nov 2024', 'Built Python data-validation pipelines that reduced labeling errors 25%, and evaluated LLM outputs against quality standards.'],
]

export const tools = {
  'Languages & frontend': ['Python', 'TypeScript', 'JavaScript', 'React', 'Next.js'],
  'Backend & data': ['Django', 'DRF', 'Flask', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB'],
  'Cloud & delivery': ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel'],
  'AI / retrieval': ['RAG', 'BM25', 'Embeddings', 'Rank fusion', 'Cross-encoders', 'IR evaluation'],
  'Design & 3D': ['Figma', 'Adobe XD', 'Blender', 'Shopify'],
}

export const projects = [
  {
    id: 'tripsignal', stamp: 'LIVE', title: 'TripSignal', kind: 'Web app · 2026',
    line: 'One traffic-light signal for a whole US trip.',
    body: 'Checks weather, FAA airport status and news for every airport on a route, connections included, and turns seven data sources into one clear answer with the evidence behind it. A concurrency-safe Postgres job queue (SKIP LOCKED) re-checks trips on a schedule, a MongoDB cache cuts repeat calls, and retry/fallback handling covers sources that go down. 15 automated tests.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Vercel'],
    links: [['Live app', 'https://tripsignal-lfff.vercel.app'], ['GitHub', 'https://github.com/divyesh314/tripsignal']],
    imgs: ['trip1', 'trip5', 'trip3'],
  },
  {
    id: 'rag', stamp: 'SHIPPED', title: 'Ask the documents', kind: 'RAG pipeline + ablation study',
    line: 'Every answer cites the passage it came from.',
    body: 'A retrieval-augmented search-and-answer app built from first principles: BM25 and dense embeddings fused with Reciprocal Rank Fusion, a cross-encoder reranker, and an LLM answer that must cite what it used. The companion study benchmarks BM25-only, dense-only, hybrid and hybrid-with-reranking on the same queries (Precision@K, Recall@K, MRR, nDCG@K) and reports where an approach underperformed.',
    stack: ['Python', 'FastAPI', 'BM25', 'Embeddings', 'Cross-encoder'],
    links: [['rag-pipeline', 'https://github.com/divyesh314/rag-pipeline'], ['hybrid-rag-pipeline', 'https://github.com/divyesh314/hybrid-rag-pipeline']],
    imgs: ['rag1', 'rag2', 'rag4'],
  },
  {
    id: 'runown', stamp: 'IN PROGRESS', title: 'RunOwn', kind: 'Mobile + web · in progress',
    line: 'Run a loop, claim the streets inside it.',
    body: 'A GPS running app where the routes you run become territory on the map. A Ruby on Rails API with real-time updates serves an Expo / React Native mobile client and a Next.js dashboard, with the same component and data-fetching patterns across web and mobile.',
    stack: ['Ruby on Rails', 'Expo', 'React Native', 'Next.js'],
    links: [['GitHub', 'https://github.com/divyesh314/runITownIT']],
    imgs: ['run3', 'run2', 'run1'],
  },
]

export const stickers = [
  ['python', '#F5C518', '#111', -8], ['REACT', '#111', '#7FD3F7', 6], ['next.js', '#EFE7D3', '#111', -3],
  ['TypeScript', '#2F5BEA', '#fff', 10], ['200 OK', '#3DB86A', '#0b2a16', -12], ['postgres', '#EFE7D3', '#2F5BEA', 4],
  ['docker', '#1BA39C', '#fff', -5], ['git push --force?', '#E5484D', '#fff', 8], ['AWS', '#F27B35', '#111', -14],
  ['mongoDB', '#111', '#3DB86A', 3], ['Blender', '#F27B35', '#fff', 12], ['figma', '#F28DB2', '#111', -6],
  ['RAG', '#111', '#F5C518', -2], ['Django', '#0C4B33', '#EFE7D3', 7], ['shopify', '#95BF47', '#111', -9],
  ['k8s', '#2F5BEA', '#fff', 15], ['works on my machine', '#EFE7D3', '#E5484D', -4], ['Adobe XD', '#470137', '#FF61F6', 9],
]
