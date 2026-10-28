/**
 * Put <AppearanceScript /> inside <head> of the root layout (Next.js: app/layout.tsx).
 * It sets the saved theme on <html> before the page paints, so there is no flash and no hydration mismatch.
 * Also add suppressHydrationWarning to <html>. Not a client component, so it works in a server layout.
 */
const SCRIPT = `try{var s=JSON.parse(localStorage.getItem("ui.appearance")||"{}"),d={mode:"system",dark:"midnight",light:"paper",radius:"standard",density:"comfortable",accent:"azure",nav:"surface"},a=Object.assign(d,s),r=document.documentElement,k=a.mode==="dark"||(a.mode==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);r.dataset.theme=k?"dark":"light";r.dataset.dark=a.dark;r.dataset.light=a.light;r.dataset.radius=a.radius;r.dataset.density=a.density;r.dataset.accent=a.accent;r.dataset.nav=a.nav}catch(e){}`;
export function AppearanceScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
