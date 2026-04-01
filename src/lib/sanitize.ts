import DOMPurify from 'dompurify'

/**
 * Sanitize HTML output using DOMPurify.
 * Strips javascript: URLs, event handlers, and dangerous elements.
 * Allows safe markup produced by our markdown renderers.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'a', 'code', 'pre', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'class', 'style',
    ],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    // Block javascript: and data: URI schemes in href
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  })
}
