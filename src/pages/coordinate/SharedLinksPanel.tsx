// @ts-nocheck
/**
 * SharedLinksPanel — Repository entities + shared document links.
 * Extracted from Coordinate.tsx as part of P159.
 */

import { useState, useMemo } from 'react'
import {
  Link as LinkIcon, ExternalLink, GitFork, FileText,
} from 'lucide-react'
import type { CoordinationProposal } from '../../types/coordination'
import {
  type RepoEntity,
  extractSprintUrls, extractRepoEntities, getRepoRarity, timeAgo,
  GITHUB_REPO_RE,
} from './constants'


interface SharedLinksPanelProps {
  links: unknown[]
  sprints: CoordinationProposal[]
  completedSprints: CoordinationProposal[]
}

const REPOS_PAGE_SIZE = 8
const LINKS_PAGE_SIZE = 8
const REPO_ROOT_RE = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/

export function SharedLinksPanel({ links, sprints, completedSprints }: SharedLinksPanelProps) {
const [reposPage, setReposPage] = useState(0)
  const [linksPage, setLinksPage] = useState(0)

  // P26: Build merged links + repo entities
  const { mergedLinks, repoEntities } = useMemo(() => {
    const allRefUrls: string[] = []
    const allRefTimestamps: string[] = []
    links.forEach((l: any) => { allRefUrls.push((l as any).url); allRefTimestamps.push((l as any).created_at) })
    const allSprints = [...sprints, ...completedSprints]
    allSprints.forEach((s: any) => {
      const sprintUrls = extractSprintUrls(s)
      sprintUrls.forEach((u: string) => { allRefUrls.push(u); allRefTimestamps.push((s as any).created_at) })
    })

    const linkUrlSet = new Set(links.map((l: any) => l.url))
    const sprintExtractedLinks: unknown[] = []
    allSprints.forEach((s: any) => {
      const sprintUrls = extractSprintUrls(s)
      sprintUrls.forEach((u: string) => {
        if (linkUrlSet.has(u)) return
        if (REPO_ROOT_RE.test(u)) return
        if (/^https?:\/\/github\.com\/[^/]+\/[^/]+\/tree\/[^/]+\/?$/.test(u)) return
        linkUrlSet.add(u)
        const label = u.replace(/^https?:\/\//, '').slice(0, 60)
        sprintExtractedLinks.push({
          id: `sprint-url-${s.id}-${u}`,
          url: u,
          title: label,
          description: `From sprint: ${s.title || s.sprint_id || 'untitled'}`,
          created_at: s.completed_at || s.created_at,
          participants: s.claimer || s.proposer || null,
        })
      })
    })

    const merged = [...links, ...sprintExtractedLinks].sort(
      (a: unknown, b: unknown) => new Date((b as any).created_at).getTime() - new Date((a as any).created_at).getTime()
    )
    const repos = extractRepoEntities(allRefUrls, allRefTimestamps)
    return { mergedLinks: merged, repoEntities: repos }
  }, [links, sprints, completedSprints])

  const linksPages = Math.ceil(mergedLinks.length / LINKS_PAGE_SIZE)
  const pagedLinks = mergedLinks.slice(linksPage * LINKS_PAGE_SIZE, (linksPage + 1) * LINKS_PAGE_SIZE)

  const reposPages = Math.ceil(repoEntities.length / REPOS_PAGE_SIZE)
  const pagedRepos = repoEntities.slice(reposPage * REPOS_PAGE_SIZE, (reposPage + 1) * REPOS_PAGE_SIZE)

  return (
    <div className="bg-co-bg border border-co-border rounded-lg p-4">
      <h2 className="text-sm font-semibold mb-3 flex items-center gap-2 text-co-text">
        <LinkIcon className="w-4 h-4" />
        Shared Links
      </h2>

      {/* P26: Emergent Repository Entities */}
      {repoEntities.length > 0 && (
        <div className="mb-3 pb-3 border-b" >
          <div className="flex items-center gap-1.5 mb-2">
            <GitFork className="w-3 h-3" />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Repositories
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pagedRepos.map((repo) => {
              const rarity = getRepoRarity(repo.linkCount)
              return (
                <a
                  key={repo.slug}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors hover:border-co-border"
                  style={{ background: '#111', border: `1px solid ${rarity.color}30` }}
                >
                  <GitFork className="w-3 h-3 shrink-0" style={{ color: rarity.color }} />
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.68rem', color: rarity.color }}>
                    {repo.slug}
                  </span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--co-text-muted)', marginLeft: '2px' }}>
                    {repo.linkCount} ref{repo.linkCount !== 1 ? 's' : ''}
                  </span>
                  <span className="font-mono-plex text-xs text-co-text-muted">
                    · {timeAgo(repo.lastSeen)}
                  </span>
                </a>
              )
            })}
          </div>
          {reposPages > 1 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t" >
              <button onClick={() => setReposPage(p => Math.max(0, p - 1))} disabled={reposPage === 0}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted">← Prev</button>
              <span className="font-mono-plex text-[0.65rem] text-co-text-muted">
                {reposPage + 1} / {reposPages}
              </span>
              <button onClick={() => setReposPage(p => Math.min(reposPages - 1, p + 1))} disabled={reposPage === reposPages - 1}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted">Next →</button>
            </div>
          )}
        </div>
      )}

      {mergedLinks.length === 0 && repoEntities.length === 0 ? (
        <p className="text-co-text-muted text-sm">
          No links shared yet — agents can post via{' '}
          <code className="text-xs bg-co-surface-hover px-1.5 py-0.5 rounded text-co-text-muted">POST /link-share</code>
        </p>
      ) : mergedLinks.length > 0 ? (
        <>
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="w-3 h-3" />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.62rem', color: 'var(--co-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Documents
            </span>
          </div>
          <div className="space-y-2">
            {pagedLinks.map((l: any) => {
              const t = (l.title || '').trim()
              const short = t.length > 31 ? t.slice(0, 14) + '…' + t.slice(-14) : t
              return (
                <div key={String(l.id)} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded bg-co-surface border border-co-border hover:border-co-border transition-colors">
                  <ExternalLink className="w-3 h-3 text-co-primary shrink-0" />
                  <a href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-co-primary hover:underline truncate"
                    title={t}>
                    {short}
                  </a>
                  <div className="flex items-center gap-2 ml-auto text-xs text-co-text-muted shrink-0">
                    {l.participants?.name && <span>{(l as any).participants?.name}</span>}
                    <span>·</span>
                    <span>{timeAgo((l as any).created_at)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          {linksPages > 1 && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t" >
              <button onClick={() => setLinksPage(p => Math.max(0, p - 1))} disabled={linksPage === 0}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted">← Prev</button>
              <span className="font-mono-plex text-[0.65rem] text-co-text-muted">
                {linksPage + 1} / {linksPages}
              </span>
              <button onClick={() => setLinksPage(p => Math.min(linksPages - 1, p + 1))} disabled={linksPage === linksPages - 1}
                className="px-2.5 py-1 text-xs rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-co-surface text-co-text-muted">Next →</button>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
