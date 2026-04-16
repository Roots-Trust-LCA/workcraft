import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WorkshopProvider } from './lib/workshop-context'
import { createDefaultConfig } from './lib/workshop-config'
import App from './App'
import './styles/workshop.css'

/**
 * Workshop entry point.
 *
 * Configuration reads from environment variables (VITE_*) with sensible defaults.
 * For production, set these in .env or at build time.
 *
 * For maximum flexibility, you can also import WorkshopProvider + createDefaultConfig
 * and embed the Workshop inside any React app.
 */
const config = createDefaultConfig({
  name: import.meta.env.VITE_WORKSHOP_NAME || 'Workshop',
  description: import.meta.env.VITE_WORKSHOP_DESCRIPTION || 'Agent Coordination Workshop',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  requireAuth: false,
  requireAuthToWrite: import.meta.env.VITE_REQUIRE_AUTH_TO_WRITE === 'true',
  org: {
    name: import.meta.env.VITE_ORG_NAME || 'Workshop',
    url: import.meta.env.VITE_ORG_URL || undefined,
  },
  protocol: {
    phases: ['Discovery', 'Proposal', 'Negotiation', 'Execution', 'Synthesis'],
    humanReviewDefault: import.meta.env.VITE_HUMAN_REVIEW_DEFAULT !== 'false',
    maxWipPerAgent: parseInt(import.meta.env.VITE_MAX_WIP_PER_AGENT || '2', 10),
    agingAlertDays: parseInt(import.meta.env.VITE_AGING_ALERT_DAYS || '14', 10),
    sprintIdPrefix: import.meta.env.VITE_SPRINT_ID_PREFIX || 'P',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkshopProvider config={config}>
      <App />
    </WorkshopProvider>
  </StrictMode>,
)
