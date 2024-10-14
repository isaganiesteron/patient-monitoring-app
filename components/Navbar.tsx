'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { ModeToggle } from '@/components/mode-toggle';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant={pathname === '/dashboard' ? 'default' : 'ghost'}>Dashboard</Button>
          </Link>
          <Link href="/dashboard/cases">
            <Button variant={pathname.startsWith('/dashboard/cases') ? 'default' : 'ghost'}>Cases</Button>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </div>
    </nav>
  );
}