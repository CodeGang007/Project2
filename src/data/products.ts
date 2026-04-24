// Structured product catalog — scraped 1:1 from https://www.dynai.com/products1/typeid/*.html
// Add more categories by appending to `productData` using the same shape.

export type ProductItem = {
  id: string;
  nameZh: string;
  nameEn: string;
  /** Absolute URL to the MSDS/SDS file on dynai.com (or local /public path) */
  msdsUrl?: string;
  /** URL of the detail page on the original site, if migrated */
  detailHref?: string;
};

export type ProductSubSeries = {
  titleZh: string;
  titleEn: string;
  products: ProductItem[];
};

export type ProductCategory = {
  slug: string;
  /** Hero banner at the top of the category page (from dynai.com /Uploads/) */
  heroImage?: string;
  overview: { zh: string; en: string };
  applications?: { zh: string[]; en: string[] };
  series: ProductSubSeries[];
};

export const productData: Record<string, ProductCategory> = {
  '13': {
    slug: '13',
    heroImage: 'https://www.dynai.com/Uploads/676129e43a507.jpg',
    overview: {
      zh: '二元醇醚及醋酸酯溶剂因其优良的溶解性能和化学稳定性，在多个领域有着广泛的应用。它们可用作乳胶漆的助聚结剂、多彩涂料和乳液涂料的溶剂，还常用于金属、家具喷漆，以及保护性涂料、染料、树脂、皮革、油墨的溶剂。此外，这类溶剂也用于金属、玻璃等硬表面清洗剂的配方中，并可作为化学试剂使用，展现了其多样化的应用价值和广泛的适用性。',
      en: 'Glycol ethers and acetate solvents are widely used across many industries thanks to their excellent solvency and chemical stability. They serve as coalescing agents in latex paints; as solvents for multi-colour coatings, emulsion paints, metal and furniture spray paints, and in protective coatings, dyes, resins, leather and inks. They also appear in hard-surface cleaner formulations for metal and glass, and serve as chemical reagents — demonstrating broad, versatile applicability.'
    },
    applications: {
      zh: ['涂料与油漆', '乳胶漆助聚结剂', '印刷油墨', '皮革与染料', '硬表面清洗剂', '化学试剂'],
      en: ['Coatings & paints', 'Latex paint coalescent', 'Printing inks', 'Leather & dyes', 'Hard-surface cleaners', 'Chemical reagents']
    },
    series: [
      {
        titleZh: '二元醇醚系列',
        titleEn: 'Glycol Ether Series',
        products: [
          {
            id: '2',
            nameZh: '乙二醇单甲醚系列',
            nameEn: 'Ethylene Glycol Monomethyl Ether (EM, DEM, TEM, PEM)',
            msdsUrl: 'https://www.dynai.com/Uploads/6751546962b06.zip',
            detailHref: 'https://www.dynai.com/products_detail/id/2.html'
          },
          {
            id: '3',
            nameZh: '乙二醇单乙醚系列',
            nameEn: 'Ethylene Glycol Monoethyl Ether (EE, DE, TEE, PEE)',
            msdsUrl: 'https://www.dynai.com/Uploads/67515c61deaae.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/3.html'
          },
          {
            id: '4',
            nameZh: '乙二醇单丁醚系列',
            nameEn: 'Ethylene Glycol Monobutyl Ether (EB, DEB, TEB, PEB)',
            msdsUrl: 'https://www.dynai.com/Uploads/67515e62871dd.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/4.html'
          },
          {
            id: '5',
            nameZh: '乙二醇丙醚系列',
            nameEn: 'Ethylene Glycol Propyl Ether (EP, DEP)',
            msdsUrl: 'https://www.dynai.com/Uploads/6751604642276.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/5.html'
          },
          {
            id: '6',
            nameZh: '丙二醇单甲醚系列',
            nameEn: 'Propylene Glycol Monomethyl Ether (PM, DPM)',
            msdsUrl: 'https://www.dynai.com/Uploads/675161787b4f3.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/6.html'
          },
          {
            id: '7',
            nameZh: '丙二醇单乙醚系列',
            nameEn: 'Propylene Glycol Monoethyl Ether (PE, DPE)',
            msdsUrl: 'https://www.dynai.com/Uploads/67516241b6201.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/7.html'
          },
          {
            id: '8',
            nameZh: '丙二醇丁醚系列',
            nameEn: 'Propylene Glycol Butyl Ether (PNB, DPNB)',
            detailHref: 'https://www.dynai.com/products_detail/id/8.html'
          },
          {
            id: '9',
            nameZh: '丙二醇丙醚系列',
            nameEn: 'Propylene Glycol Propyl Ether (PP, DPP)',
            msdsUrl: 'https://www.dynai.com/Uploads/6751643f9f1ec.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/9.html'
          }
        ]
      },
      {
        titleZh: '二元醇醚醋酸酯系列',
        titleEn: 'Glycol Ether Acetate Series',
        products: [
          {
            id: '10',
            nameZh: '乙二醇乙醚醋酸酯系列',
            nameEn: 'Ethylene Glycol Ethyl Ether Acetate (CAC, DCAC)',
            msdsUrl: 'https://www.dynai.com/Uploads/675164f2282af.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/10.html'
          },
          {
            id: '11',
            nameZh: '乙二醇丁醚醋酸酯系列',
            nameEn: 'Ethylene Glycol Butyl Ether Acetate (BAC, DBAC)',
            msdsUrl: 'https://www.dynai.com/Uploads/675166507e254.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/11.html'
          },
          {
            id: '12',
            nameZh: '丙二醇甲醚醋酸酯系列',
            nameEn: 'Propylene Glycol Methyl Ether Acetate (PMA, DPMA)',
            msdsUrl: 'https://www.dynai.com/Uploads/6751670d4952f.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/12.html'
          },
          {
            id: '13',
            nameZh: '乙二醇乙醚丙酸酯 (ECP)',
            nameEn: 'Ethylene Glycol Ethyl Ether Propionate (ECP)',
            detailHref: 'https://www.dynai.com/products_detail/id/13.html'
          },
          {
            id: '14',
            nameZh: '丙二醇甲醚丙酸酯 (PMP)、丙二醇乙醚醋酸酯 (PEA)',
            nameEn: 'Propylene Glycol Methyl Ether Propionate (PMP), Propylene Glycol Ethyl Ether Acetate (PEA)',
            msdsUrl: 'https://www.dynai.com/Uploads/675168498ce46.pdf',
            detailHref: 'https://www.dynai.com/products_detail/id/14.html'
          },
          {
            id: '15',
            nameZh: '乙二醇二醋酸酯 (EGDA)、丙二醇二醋酸酯 (PGDA)',
            nameEn: 'Ethylene Glycol Diacetate (EGDA), Propylene Glycol Diacetate (PGDA)',
            detailHref: 'https://www.dynai.com/products_detail/id/15.html'
          }
        ]
      }
    ]
  }

  // Categories 14-20 intentionally omitted — scrape the matching
  // /products1/typeid/{14..20}.html pages on Dynai and follow the same shape.
};
