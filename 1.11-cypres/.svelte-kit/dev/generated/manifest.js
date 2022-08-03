const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/obstacle-course/index.svelte"),
	() => import("../../../src/routes/pokemon-search/__layout.svelte"),
	() => import("../../../src/routes/pokemon-search/index.svelte"),
	() => import("../../../src/routes/pokemon-search/[id].svelte"),
	() => import("../../../src/routes/echo-chamber/__layout.svelte"),
	() => import("../../../src/routes/echo-chamber/index.svelte"),
	() => import("../../../src/routes/echo-chamber/sign-in.svelte"),
	() => import("../../../src/routes/echo-chamber/sign-up.svelte"),
	() => import("../../../src/routes/echo-chamber/posts/__layout.svelte"),
	() => import("../../../src/routes/echo-chamber/posts/index.svelte"),
	() => import("../../../src/routes/echo-chamber/posts/[id].svelte"),
	() => import("../../../src/routes/secret-menu/index.svelte"),
	() => import("../../../src/routes/dog-facts/index.svelte"),
	() => import("../../../src/routes/jetsetter/__layout.svelte"),
	() => import("../../../src/routes/jetsetter/index.svelte"),
	() => import("../../../src/routes/stopwatch/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/obstacle-course/index.svelte
	[/^\/obstacle-course\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/pokemon-search/index.svelte
	[/^\/pokemon-search\/?$/, [c[0], c[4], c[5]], [c[1]]],

	,

	,

	,

	,

	// src/routes/pokemon-search/[id].svelte
	[/^\/pokemon-search\/([^/]+?)\/?$/, [c[0], c[4], c[6]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/echo-chamber/index.svelte
	[/^\/echo-chamber\/?$/, [c[0], c[7], c[8]], [c[1]]],

	,

	// src/routes/echo-chamber/sign-in.svelte
	[/^\/echo-chamber\/sign-in\/?$/, [c[0], c[7], c[9]], [c[1]]],

	// src/routes/echo-chamber/sign-up.svelte
	[/^\/echo-chamber\/sign-up\/?$/, [c[0], c[7], c[10]], [c[1]]],

	// src/routes/echo-chamber/posts/index.svelte
	[/^\/echo-chamber\/posts\/?$/, [c[0], c[7], c[11], c[12]], [c[1]]],

	// src/routes/echo-chamber/posts/[id].svelte
	[/^\/echo-chamber\/posts\/([^/]+?)\/?$/, [c[0], c[7], c[11], c[13]], [c[1]], (m) => ({ id: d(m[1])})],

	,

	,

	,

	,

	,

	,

	// src/routes/secret-menu/index.svelte
	[/^\/secret-menu\/?$/, [c[0], c[14]], [c[1]]],

	,

	,

	,

	// src/routes/dog-facts/index.svelte
	[/^\/dog-facts\/?$/, [c[0], c[15]], [c[1]]],

	,

	,

	,

	// src/routes/jetsetter/index.svelte
	[/^\/jetsetter\/?$/, [c[0], c[16], c[17]], [c[1]]],

	// src/routes/stopwatch/index.svelte
	[/^\/stopwatch\/?$/, [c[0], c[18]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];