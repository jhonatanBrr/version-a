import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/design-system/components/Container";
import { BuyBox } from "@/domains/product/components/BuyBox";
import { DeliveryInfo } from "@/domains/product/components/DeliveryInfo";
import { ProductBreadcrumb } from "@/domains/product/components/ProductBreadcrumb";
import { ProductDetails } from "@/domains/product/components/ProductDetails";
import { ProductGallery } from "@/domains/product/components/ProductGallery";
import { ProductSummary } from "@/domains/product/components/ProductSummary";
import { RelatedProducts } from "@/domains/product/components/RelatedProducts";
import { buildProductJsonLd, shortName } from "@/domains/product/utils/product-page";
import { getCategories, getProductBySlug, getRelatedProducts, productImageUrl } from "@/shared/catalog/queries";
import type { AppLocale } from "@/shared/i18n/routing";

/** Server-rendered on every request (prices and stock could change). */
export const dynamic = "force-dynamic";

type Props = PageProps<"/[locale]/prodotti/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const description = product.summary[locale as AppLocale];
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [{ url: `${productImageUrl(product.image.photoId)}&w=1200`, alt: product.image.alt[locale as AppLocale] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([getCategories(), getRelatedProducts(product, 3)]);
  const categoryLabel = categories.find((c) => c.id === product.category)?.label[locale] ?? "";
  const jsonLd = buildProductJsonLd(product, locale, `${productImageUrl(product.image.photoId)}&w=1200`);
  const editions = product.editions.map((edition) => ({
    id: edition.id,
    label: edition.label[locale],
    detail: edition.detail[locale],
    price: edition.price,
    salePrice: edition.salePrice,
  }));

  return (
    <Container className="flex flex-col gap-8 py-8 lg:gap-12 lg:py-12">
      <script
        type="application/ld+json"
        // Escapes "<" so catalog text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="ds-enter">
        <ProductBreadcrumb kind={product.kind} categoryLabel={categoryLabel} current={shortName(product)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="ds-enter-scale ds-delay-1 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery product={product} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="ds-enter ds-delay-2">
            <ProductSummary product={product} categoryLabel={categoryLabel} />
          </div>
          <div className="ds-enter ds-delay-3">
            <BuyBox productId={product.id} editions={editions} />
          </div>
          <div className="ds-enter ds-delay-4">
            <DeliveryInfo product={product} />
          </div>
          <div className="ds-enter ds-delay-5">
            <ProductDetails product={product} categoryLabel={categoryLabel} />
          </div>
        </div>
      </div>

      <div className="ds-reveal">
        <RelatedProducts products={related} categories={categories} />
      </div>
    </Container>
  );
}
