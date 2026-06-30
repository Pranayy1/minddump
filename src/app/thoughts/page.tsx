import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHead } from "@/components/ui/PageHead";
import { getAllThoughts, getAllCategories, CATEGORIES } from "@/content/thoughts";
import { ThoughtVaultClient } from "./ThoughtVaultClient";

export const metadata = {
  title: "Thought Vault",
  description:
    "A personal collection of quotes, observations, opinions, and lessons worth remembering.",
};

export default function ThoughtVaultPage() {
  const allThoughts = getAllThoughts();
  const activeCategories = getAllCategories();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHead
          title="Thought Vault"
          subtitle="A personal collection of quotes, observations, opinions, and lessons worth remembering."
        />
        <ThoughtVaultClient
          allThoughts={allThoughts}
          activeCategories={activeCategories}
          categories={CATEGORIES}
        />
      </div>
    </PageWrapper>
  );
}
