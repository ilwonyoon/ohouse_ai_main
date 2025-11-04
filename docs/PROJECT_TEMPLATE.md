# New Project Template

Use this template when creating a new project in the workspace.

## Setup Checklist

- [ ] Create project folder: `mkdir projects/[project-name]`
- [ ] Initialize Next.js
- [ ] Update `package.json` with tech stack dependencies
- [ ] Create `README.md` with project overview
- [ ] Set up environment variables template
- [ ] Create base folder structure
- [ ] Update root `README.md` with new project info

## Quick Setup Script

```bash
# Create project folder
mkdir projects/[your-project-name]
cd projects/[your-project-name]

# Initialize Next.js with our stack
yarn create next-app . --typescript --eslint --tailwind=no --app=yes

# Install additional tech stack dependencies
yarn add @emotion/react @emotion/styled emotion
yarn add jotai
yarn add @tanstack/react-query
yarn add @radix-ui/react-checkbox @radix-ui/react-toast @radix-ui/react-tooltip
yarn add lucide-react
yarn add framer-motion lottie-react
```

## Project Structure Template

```
projects/[project-name]/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   ├── types/
│   └── styles/
├── public/
├── .env.example
├── next.config.ts
├── tsconfig.json
└── README.md
```

## README Sections (for new projects)

- Overview
- Features checklist
- Project structure
- Setup & development
- Configuration
- State management approach
- Key integrations
- Development workflow

## Environment Variables Template

Create `.env.example`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
# Add project-specific vars
```

---

Once set up, update the root `README.md` with your new project info!
