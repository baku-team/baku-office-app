globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BsChfIDK.mjs';
import { manifest } from './manifest_D0z4JZx2.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/accounting/export.csv.astro.mjs');
const _page2 = () => import('./pages/accounting.astro.mjs');
const _page3 = () => import('./pages/activate.astro.mjs');
const _page4 = () => import('./pages/admin/data.astro.mjs');
const _page5 = () => import('./pages/api/a2a/inbound.astro.mjs');
const _page6 = () => import('./pages/api/a2a/manage.astro.mjs');
const _page7 = () => import('./pages/api/agent-actions.astro.mjs');
const _page8 = () => import('./pages/api/auth/google/relay.astro.mjs');
const _page9 = () => import('./pages/api/auth/_provider_/callback.astro.mjs');
const _page10 = () => import('./pages/api/auth/_provider_/start.astro.mjs');
const _page11 = () => import('./pages/api/autopilot.astro.mjs');
const _page12 = () => import('./pages/api/billing/start.astro.mjs');
const _page13 = () => import('./pages/api/capabilities.astro.mjs');
const _page14 = () => import('./pages/api/chat.astro.mjs');
const _page15 = () => import('./pages/api/chat-sessions.astro.mjs');
const _page16 = () => import('./pages/api/cron/drain.astro.mjs');
const _page17 = () => import('./pages/api/data.astro.mjs');
const _page18 = () => import('./pages/api/docs.astro.mjs');
const _page19 = () => import('./pages/api/drive/callback.astro.mjs');
const _page20 = () => import('./pages/api/drive/start.astro.mjs');
const _page21 = () => import('./pages/api/drive.astro.mjs');
const _page22 = () => import('./pages/api/files.astro.mjs');
const _page23 = () => import('./pages/api/google/callback.astro.mjs');
const _page24 = () => import('./pages/api/google/start.astro.mjs');
const _page25 = () => import('./pages/api/google.astro.mjs');
const _page26 = () => import('./pages/api/import.astro.mjs');
const _page27 = () => import('./pages/api/invoices.astro.mjs');
const _page28 = () => import('./pages/api/join.astro.mjs');
const _page29 = () => import('./pages/api/keys.astro.mjs');
const _page30 = () => import('./pages/api/line/webhook.astro.mjs');
const _page31 = () => import('./pages/api/login.astro.mjs');
const _page32 = () => import('./pages/api/members.astro.mjs');
const _page33 = () => import('./pages/api/membership.astro.mjs');
const _page34 = () => import('./pages/api/notifications.astro.mjs');
const _page35 = () => import('./pages/api/personal.astro.mjs');
const _page36 = () => import('./pages/api/report.astro.mjs');
const _page37 = () => import('./pages/api/review.astro.mjs');
const _page38 = () => import('./pages/api/settings.astro.mjs');
const _page39 = () => import('./pages/api/site/join.astro.mjs');
const _page40 = () => import('./pages/api/site/stripe-webhook.astro.mjs');
const _page41 = () => import('./pages/api/site.astro.mjs');
const _page42 = () => import('./pages/api/skills.astro.mjs');
const _page43 = () => import('./pages/api/store.astro.mjs');
const _page44 = () => import('./pages/api/tx.astro.mjs');
const _page45 = () => import('./pages/api/update.astro.mjs');
const _page46 = () => import('./pages/api/usage.astro.mjs');
const _page47 = () => import('./pages/approvals.astro.mjs');
const _page48 = () => import('./pages/apps.astro.mjs');
const _page49 = () => import('./pages/billing.astro.mjs');
const _page50 = () => import('./pages/calendar.astro.mjs');
const _page51 = () => import('./pages/chat.astro.mjs');
const _page52 = () => import('./pages/diagnostics.astro.mjs');
const _page53 = () => import('./pages/drive.astro.mjs');
const _page54 = () => import('./pages/files/_id_.astro.mjs');
const _page55 = () => import('./pages/files.astro.mjs');
const _page56 = () => import('./pages/gmail.astro.mjs');
const _page57 = () => import('./pages/import.astro.mjs');
const _page58 = () => import('./pages/invoices.astro.mjs');
const _page59 = () => import('./pages/join.astro.mjs');
const _page60 = () => import('./pages/legal.astro.mjs');
const _page61 = () => import('./pages/login.astro.mjs');
const _page62 = () => import('./pages/lp/_slug_.astro.mjs');
const _page63 = () => import('./pages/meet.astro.mjs');
const _page64 = () => import('./pages/membership.astro.mjs');
const _page65 = () => import('./pages/minutes.astro.mjs');
const _page66 = () => import('./pages/personal.astro.mjs');
const _page67 = () => import('./pages/review.astro.mjs');
const _page68 = () => import('./pages/schedule.astro.mjs');
const _page69 = () => import('./pages/settings/a2a.astro.mjs');
const _page70 = () => import('./pages/settings/advanced.astro.mjs');
const _page71 = () => import('./pages/settings/domain.astro.mjs');
const _page72 = () => import('./pages/settings/google-setup.astro.mjs');
const _page73 = () => import('./pages/settings/keys.astro.mjs');
const _page74 = () => import('./pages/settings/members.astro.mjs');
const _page75 = () => import('./pages/settings/site.astro.mjs');
const _page76 = () => import('./pages/settings/theme.astro.mjs');
const _page77 = () => import('./pages/settings/update.astro.mjs');
const _page78 = () => import('./pages/settings.astro.mjs');
const _page79 = () => import('./pages/site.astro.mjs');
const _page80 = () => import('./pages/usage.astro.mjs');
const _page81 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/accounting/export.csv.ts", _page1],
    ["src/pages/accounting/index.astro", _page2],
    ["src/pages/activate.astro", _page3],
    ["src/pages/admin/data.astro", _page4],
    ["src/pages/api/a2a/inbound.ts", _page5],
    ["src/pages/api/a2a/manage.ts", _page6],
    ["src/pages/api/agent-actions.ts", _page7],
    ["src/pages/api/auth/google/relay.ts", _page8],
    ["src/pages/api/auth/[provider]/callback.ts", _page9],
    ["src/pages/api/auth/[provider]/start.ts", _page10],
    ["src/pages/api/autopilot.ts", _page11],
    ["src/pages/api/billing/start.ts", _page12],
    ["src/pages/api/capabilities.ts", _page13],
    ["src/pages/api/chat.ts", _page14],
    ["src/pages/api/chat-sessions.ts", _page15],
    ["src/pages/api/cron/drain.ts", _page16],
    ["src/pages/api/data.ts", _page17],
    ["src/pages/api/docs.ts", _page18],
    ["src/pages/api/drive/callback.ts", _page19],
    ["src/pages/api/drive/start.ts", _page20],
    ["src/pages/api/drive.ts", _page21],
    ["src/pages/api/files.ts", _page22],
    ["src/pages/api/google/callback.ts", _page23],
    ["src/pages/api/google/start.ts", _page24],
    ["src/pages/api/google.ts", _page25],
    ["src/pages/api/import.ts", _page26],
    ["src/pages/api/invoices.ts", _page27],
    ["src/pages/api/join.ts", _page28],
    ["src/pages/api/keys.ts", _page29],
    ["src/pages/api/line/webhook.ts", _page30],
    ["src/pages/api/login.ts", _page31],
    ["src/pages/api/members.ts", _page32],
    ["src/pages/api/membership.ts", _page33],
    ["src/pages/api/notifications.ts", _page34],
    ["src/pages/api/personal.ts", _page35],
    ["src/pages/api/report.ts", _page36],
    ["src/pages/api/review.ts", _page37],
    ["src/pages/api/settings.ts", _page38],
    ["src/pages/api/site/join.ts", _page39],
    ["src/pages/api/site/stripe-webhook.ts", _page40],
    ["src/pages/api/site.ts", _page41],
    ["src/pages/api/skills.ts", _page42],
    ["src/pages/api/store.ts", _page43],
    ["src/pages/api/tx.ts", _page44],
    ["src/pages/api/update.ts", _page45],
    ["src/pages/api/usage.ts", _page46],
    ["src/pages/approvals.astro", _page47],
    ["src/pages/apps.astro", _page48],
    ["src/pages/billing.astro", _page49],
    ["src/pages/calendar.astro", _page50],
    ["src/pages/chat.astro", _page51],
    ["src/pages/diagnostics.astro", _page52],
    ["src/pages/drive.astro", _page53],
    ["src/pages/files/[id].ts", _page54],
    ["src/pages/files/index.astro", _page55],
    ["src/pages/gmail.astro", _page56],
    ["src/pages/import.astro", _page57],
    ["src/pages/invoices.astro", _page58],
    ["src/pages/join.astro", _page59],
    ["src/pages/legal.astro", _page60],
    ["src/pages/login.astro", _page61],
    ["src/pages/lp/[slug].astro", _page62],
    ["src/pages/meet.astro", _page63],
    ["src/pages/membership.astro", _page64],
    ["src/pages/minutes.astro", _page65],
    ["src/pages/personal.astro", _page66],
    ["src/pages/review.astro", _page67],
    ["src/pages/schedule.astro", _page68],
    ["src/pages/settings/a2a.astro", _page69],
    ["src/pages/settings/advanced.astro", _page70],
    ["src/pages/settings/domain.astro", _page71],
    ["src/pages/settings/google-setup.astro", _page72],
    ["src/pages/settings/keys.astro", _page73],
    ["src/pages/settings/members.astro", _page74],
    ["src/pages/settings/site.astro", _page75],
    ["src/pages/settings/theme.astro", _page76],
    ["src/pages/settings/update.astro", _page77],
    ["src/pages/settings/index.astro", _page78],
    ["src/pages/site.astro", _page79],
    ["src/pages/usage.astro", _page80],
    ["src/pages/index.astro", _page81]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
