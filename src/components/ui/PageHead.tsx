import { Heading } from "@/components/typography/Heading";
import { AccentLine } from "@/components/typography/AccentLine";

interface PageHeadProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export function PageHead({ title, subtitle, accent = true }: PageHeadProps) {
  return (
    <div className="text-center mb-16">
      <Heading as="h1" className="mb-4">
        {title}
      </Heading>
      {accent && <AccentLine className="mx-auto mb-6" />}
      {subtitle && (
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
