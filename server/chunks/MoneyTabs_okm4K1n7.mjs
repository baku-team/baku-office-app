globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { r as renderTemplate } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_CDDbDglY.mjs";
import { $ as $$SectionTabs } from "./SectionTabs_D3NUmH5G.mjs";
const $$MoneyTabs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MoneyTabs;
  const { active, showInvoices = false, showBilling = false } = Astro2.props;
  const tabs = [
    { id: "accounting", href: "/accounting", label: "記録", show: true },
    { id: "invoices", href: "/invoices", label: "請求書", show: showInvoices },
    { id: "billing", href: "/billing", label: "契約・課金", show: showBilling }
  ];
  return renderTemplate`${renderComponent($$result, "SectionTabs", $$SectionTabs, { "active": active, "label": "お金", "tabs": tabs })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/MoneyTabs.astro", void 0);
export {
  $$MoneyTabs as $
};
