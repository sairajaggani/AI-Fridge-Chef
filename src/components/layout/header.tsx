import { ChefHat } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card shadow-sm">
      <div className="container mx-auto">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-headline text-foreground transition-opacity hover:opacity-80">
          <ChefHat className="h-8 w-8 text-primary" />
          <span>FridgeChef</span>
        </Link>
      </div>
    </header>
  );
}
