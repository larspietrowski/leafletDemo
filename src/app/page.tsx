import { redirect } from 'next/navigation';

// Redirect to the default locale (German)
export default function RootPage() {
  redirect('/de');
}
