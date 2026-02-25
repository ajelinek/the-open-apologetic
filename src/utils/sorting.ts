import type { CollectionEntry } from 'astro:content';

/**
 * Sort content collection entries by their order field in ascending order
 */
export function sortByOrder<T extends { data: { order: number } }>(entries: T[]): T[] {
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Filter and sort content collection entries by category
 */
export function filterAndSortByCategory<T extends CollectionEntry<'evidence'>>(
  entries: T[],
  category: string
): T[] {
  return sortByOrder(entries.filter((entry) => entry.data.category === category));
}
