import { useTranslations } from "next-intl";
import { ShieldIcon, TruckIcon } from "@/design-system/components/icons";
import type { ProductPageSectionProps } from "../interfaces/product-page";
import { deliveryKind } from "../utils/product-page";

export function DeliveryInfo({ product }: ProductPageSectionProps) {
  const t = useTranslations("product");
  return (
    <ul className="flex flex-col gap-2 text-sm">
      <li className="flex items-start gap-2">
        <TruckIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-link" />
        {t(`delivery.${deliveryKind(product)}`)}
      </li>
      {product.kind === "test" && (
        <li className="flex items-start gap-2 text-muted">
          <ShieldIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-link" />
          {t("qualificationNote", { level: product.qualification })}
        </li>
      )}
    </ul>
  );
}
