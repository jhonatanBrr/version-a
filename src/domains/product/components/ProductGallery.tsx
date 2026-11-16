import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/design-system/components/Badge";
import { productImageUrl } from "@/shared/catalog/queries";
import type { AppLocale } from "@/shared/i18n/routing";
import type { ProductPageSectionProps } from "../interfaces/product-page";

export function ProductGallery({ product }: ProductPageSectionProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("product");

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-ds bg-soft">
      <Image
        src={productImageUrl(product.image.photoId)}
        alt={product.image.alt[locale]}
        fill
        priority
        sizes="(min-width: 1024px) 600px, 100vw"
        className="object-cover [[data-theme=dark]_&]:brightness-[.85] [[data-theme=dark]_&]:saturate-[.7]"
      />
      {product.isNew && (
        <Badge tone="solid" className="absolute left-4 top-4">
          {t("isNew")}
        </Badge>
      )}
    </div>
  );
}
