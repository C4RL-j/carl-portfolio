import Link from "next/link";

export default function NotFound() {
  return <main className="not-found-page"><span className="eyebrow">CARL.OS / ERROR 404</span><h1>This window wandered off.</h1><p>The workshop is still here. This particular page isn&apos;t.</p><Link className="button button-primary" href="/">Back to the workshop →</Link></main>;
}
