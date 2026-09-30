import { Comparison } from "@/components/marketing/comparison";
import { Cta } from "@/components/marketing/cta";
import { FamilyRoles } from "@/components/marketing/family-roles";
import { Hero } from "@/components/marketing/hero";
import { Pillars } from "@/components/marketing/pillars";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Testimonial } from "@/components/marketing/testimonial";

/**
 * Public marketing home page, built from the Stitch screen
 * "Make My Marriage - Home" (projects/693186422638847542).
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-1 bg-surface pt-20">
        <Hero />
        <Comparison />
        <Pillars />
        <FamilyRoles />
        <Testimonial />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
