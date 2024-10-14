import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8">Welcome to Patient Monitoring</h1>
      <Link href="/login">
        <Button size="lg">Login</Button>
      </Link>
    </div>
  );
}