import { FridgeChefPage } from '@/components/fridge-chef-page';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <div className="container mx-auto p-4 md:p-8">
            <FridgeChefPage />
        </div>
      </main>
    </div>
  );
}
