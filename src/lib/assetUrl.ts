/** Resolve a path under /public so assets keep working if the site is served from a sub-path. */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
