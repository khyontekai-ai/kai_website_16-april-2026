import AdvisorsSection from '@/components/AdvisorsSection';

export const metadata = {
  title: 'Our Advisors | Khyontek AI',
  description: 'Meet the advisory committee guiding expertise and building impact at Khyontek AI.',
};

export default function AdvisorsPage() {
  return (
    <main className="pt-24 bg-[#020b1f] min-h-screen">
      <AdvisorsSection />
    </main>
  );
}
