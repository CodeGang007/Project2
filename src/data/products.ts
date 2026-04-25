// Structured product catalog — modelled on https://www.dynai.com/products1/typeid/*.html
// Extend a category by appending items to `productData[<slug>].series` below.

export type BilingualText = { zh: string; en: string };

export type ProductSpecRow = {
  label: BilingualText;
  value: string | BilingualText;
};

export type ProductDetail = {
  /** One-line summary under the title */
  summary?: BilingualText;
  /** Formula text — digits are rendered as subscripts by <MolecularFormula /> */
  formula?: string;
  cas?: string;
  molecularWeight?: string;
  appearance?: BilingualText;
  /** Tabular spec sheet — rendered in the detail page */
  spec: ProductSpecRow[];
  /** Applications — multi-paragraph descriptive content */
  applications: {
    zh: string[];
    en: string[];
  };
  packaging?: BilingualText;
  /** Transport classification (dangerous goods vs. normal goods) */
  transport?: BilingualText;
};

export type ProductItem = {
  id: string;
  nameZh: string;
  nameEn: string;
  /** Short code shown in search results and chips (e.g. "EM", "PMA") */
  shortCode?: string;
  cas?: string;
  /** Raw formula: digits become subscripts when rendered */
  formula?: string;
  /** Absolute URL to MSDS/SDS file */
  msdsUrl?: string;
  /** Human-readable size (e.g. "482 KB") */
  msdsSize?: string;
  /** Language indicator: "EN", "ZH", "EN/ZH" */
  msdsLang?: 'EN' | 'ZH' | 'EN/ZH';
  /** External legacy detail page (fallback) */
  detailHref?: string;
  /** When present, enables an internal detail page at /products/{cat}/{id} */
  details?: ProductDetail;
};

export type ProductSubSeries = {
  titleZh: string;
  titleEn: string;
  products: ProductItem[];
};

export type ProductCategory = {
  slug: string;
  /** Lead image for the category hero banner */
  heroImage: string;
  /** Keyword (used for search fallbacks) */
  keywords?: string[];
  overview: BilingualText;
  applications?: { zh: string[]; en: string[] };
  series: ProductSubSeries[];
};

// --- Shared fragments for building spec rows ---------------------------------
const L = (zh: string, en: string): BilingualText => ({ zh, en });

const commonApplications_EM: BilingualText[] = [];

// =============================================================================
// CATEGORY DATA
// =============================================================================

export const productData: Record<string, ProductCategory> = {
  '13': {
    slug: '13',
    heroImage:
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1920&q=85',
    keywords: ['glycol', 'ether', 'acetate', 'solvent', 'coating', 'paint'],
    overview: {
      zh: '二元醇醚及醋酸酯溶剂因其优良的溶解性能和化学稳定性，在多个领域有着广泛应用。它们可用作乳胶漆的助聚结剂、多彩涂料和乳液涂料的溶剂，还常用于金属、家具喷漆、保护性涂料、染料、树脂、皮革、油墨的溶剂。同时也用于金属、玻璃等硬表面清洗剂的配方，并可作为化学试剂使用，展示了多样化的应用价值。',
      en: 'Glycol ethers and acetate solvents are widely used across many industries thanks to their excellent solvency and chemical stability. They serve as coalescing agents in latex paints; as solvents for multi-colour coatings, emulsion paints, metal and furniture spray paints, protective coatings, dyes, resins, leather and inks. They also appear in hard-surface cleaner formulations for metal and glass, and serve as chemical reagents — demonstrating broad, versatile applicability.'
    },
    applications: {
      zh: ['涂料与油漆', '乳胶漆助聚结剂', '印刷油墨', '皮革与染料', '硬表面清洗剂', '化学试剂'],
      en: [
        'Coatings & paints',
        'Latex paint coalescent',
        'Printing inks',
        'Leather & dyes',
        'Hard-surface cleaners',
        'Chemical reagents'
      ]
    },
    series: [
      {
        titleZh: '二元醇醚系列',
        titleEn: 'Glycol Ether Series',
        products: [
          {
            id: '2',
            nameZh: '乙二醇单甲醚系列',
            nameEn: 'Ethylene Glycol Monomethyl Ether Series',
            shortCode: 'EM, DEM, TEM, PEM',
            cas: '109-86-4',
            formula: 'C3H8O2',
            msdsUrl: 'https://www.dynai.com/Uploads/6751546962b06.zip',
            msdsSize: '482 KB',
            msdsLang: 'EN/ZH',
            details: {
              summary: L(
                '用作油类、硝化纤维、树脂溶剂，以及涂料、染料的缓蒸发溶剂。',
                'Solvent for oils, nitrocellulose and synthetic resins; a slow-evaporation solvent for coatings and dyes.'
              ),
              formula: 'C3H8O2',
              cas: '109-86-4',
              molecularWeight: '76.09',
              appearance: L('无色透明液体', 'Colourless transparent liquid'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '109-86-4' },
                { label: L('分子式', 'Molecular formula'), value: 'C3H8O2' },
                { label: L('外观', 'Appearance'), value: L('无色透明液体', 'Colourless transparent liquid') },
                { label: L('含量 %', 'Content %'), value: '≥ 99.5' },
                { label: L('馏程 (℃ @ 760mmHg)', 'Distillation range (°C @ 760 mmHg)'), value: '122–125' },
                { label: L('水分 (卡氏法) %', 'Water (Karl Fischer) %'), value: '≤ 0.10' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.963 ± 0.002' },
                { label: L('色度 (铂-钴)', 'Colour (Pt-Co)'), value: '≤ 10' }
              ],
              applications: {
                zh: [
                  '用作油类、硝化纤维、树脂、酒精溶解的树脂以及染料的溶剂，还用作涂料工业中的缓蒸发溶剂。',
                  '还用作印染工业的染料溶剂，在印染行业作为水性染料的优良溶剂。',
                  '可作为液体燃料的低温抗冻剂和喷气燃料防冰添加剂，用于航空煤油。'
                ],
                en: [
                  'Solvent for oils, nitrocellulose, synthetic resins, alcohol-soluble resins and dyes; a slow-evaporation solvent in the coatings industry.',
                  'A superior solvent for water-based dyes in the textile-printing industry.',
                  'Anti-freeze agent for liquid fuels and an anti-icing additive for jet fuel; applied to aviation kerosene.'
                ]
              },
              packaging: L('200 KG/桶', '200 KG / drum'),
              transport: L('危险品', 'Dangerous goods')
            }
          },
          {
            id: '3',
            nameZh: '乙二醇单乙醚系列',
            nameEn: 'Ethylene Glycol Monoethyl Ether Series',
            shortCode: 'EE, DE, TEE, PEE',
            cas: '110-80-5',
            formula: 'C4H10O2',
            msdsUrl: 'https://www.dynai.com/Uploads/67515c61deaae.pdf',
            msdsSize: '318 KB',
            msdsLang: 'EN/ZH',
            details: {
              summary: L(
                '广泛用于硝化纤维、树脂、涂料、汽车制动液等领域。',
                'Widely used for nitrocellulose, synthetic resins, coatings and automotive brake fluids.'
              ),
              formula: 'C4H10O2',
              cas: '110-80-5',
              molecularWeight: '90.12',
              appearance: L('无色透明液体', 'Colourless transparent liquid'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '110-80-5' },
                { label: L('分子式', 'Molecular formula'), value: 'C4H10O2' },
                { label: L('外观', 'Appearance'), value: L('无色透明液体', 'Colourless transparent liquid') },
                { label: L('含量 %', 'Content %'), value: '≥ 99.5' },
                { label: L('馏程 (℃ @ 760mmHg)', 'Distillation range (°C @ 760 mmHg)'), value: '134–137' },
                { label: L('水分 (卡氏法) %', 'Water (Karl Fischer) %'), value: '≤ 0.10' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.930 ± 0.002' },
                { label: L('色度 (铂-钴)', 'Colour (Pt-Co)'), value: '≤ 10' }
              ],
              applications: {
                zh: [
                  '优良的有机溶剂，用于硝化纤维、合成树脂、油漆涂料等。',
                  '主要用于生产汽车制动液基础液及高级织物印花的连结剂。',
                  '作为印染行业的水性染料溶剂和快干型涂料的缓蒸发剂。'
                ],
                en: [
                  'An excellent organic solvent for nitrocellulose, synthetic resins, paints and coatings.',
                  'Primarily used to produce automotive brake-fluid base stocks and binders for high-grade textile printing.',
                  'Acts as a water-borne dye solvent in textile printing and a slow-evaporation agent in fast-drying coatings.'
                ]
              },
              packaging: L('200 KG/桶', '200 KG / drum'),
              transport: L('危险品', 'Dangerous goods')
            }
          },
          {
            id: '4',
            nameZh: '乙二醇单丁醚系列',
            nameEn: 'Ethylene Glycol Monobutyl Ether Series',
            shortCode: 'EB, DEB, TEB, PEB',
            cas: '111-76-2',
            formula: 'C6H14O2',
            msdsUrl: 'https://www.dynai.com/Uploads/67515e62871dd.pdf',
            msdsSize: '294 KB',
            msdsLang: 'EN/ZH',
            details: {
              summary: L(
                '广泛用于水性涂料、金属脱脂清洗剂及硬表面清洁。',
                'Widely used in water-borne coatings, metal-degreasing cleaners and hard-surface cleaning.'
              ),
              formula: 'C6H14O2',
              cas: '111-76-2',
              molecularWeight: '118.17',
              appearance: L('无色透明液体', 'Colourless transparent liquid'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '111-76-2' },
                { label: L('分子式', 'Molecular formula'), value: 'C6H14O2' },
                { label: L('外观', 'Appearance'), value: L('无色透明液体', 'Colourless transparent liquid') },
                { label: L('含量 %', 'Content %'), value: '≥ 99.5' },
                { label: L('馏程 (℃ @ 760mmHg)', 'Distillation range (°C @ 760 mmHg)'), value: '169–172' },
                { label: L('水分 (卡氏法) %', 'Water (Karl Fischer) %'), value: '≤ 0.10' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.901 ± 0.002' },
                { label: L('色度 (铂-钴)', 'Colour (Pt-Co)'), value: '≤ 10' }
              ],
              applications: {
                zh: [
                  '水性涂料的重要成膜助剂与共溶剂，可改善流平性与光泽。',
                  '用于金属脱脂清洗剂、电子元器件的清洗以及硬表面清洗。',
                  '作为油墨、橡胶、染料、树脂的优良溶剂。'
                ],
                en: [
                  'A core coalescent and co-solvent for water-borne coatings, improving flow, levelling and gloss.',
                  'Used in metal-degreasing cleaners, electronics cleaning and hard-surface cleaning.',
                  'An excellent solvent for inks, rubber, dyes and synthetic resins.'
                ]
              },
              packaging: L('200 KG/桶', '200 KG / drum'),
              transport: L('非危险品', 'Normal goods')
            }
          },
          {
            id: '5',
            nameZh: '乙二醇丙醚系列',
            nameEn: 'Ethylene Glycol Propyl Ether Series',
            shortCode: 'EP, DEP',
            cas: '2807-30-9',
            formula: 'C5H12O2',
            msdsUrl: 'https://www.dynai.com/Uploads/6751604642276.pdf',
            msdsSize: '271 KB',
            msdsLang: 'EN/ZH'
          },
          {
            id: '6',
            nameZh: '丙二醇单甲醚系列',
            nameEn: 'Propylene Glycol Monomethyl Ether Series',
            shortCode: 'PM, DPM',
            cas: '107-98-2',
            formula: 'C4H10O2',
            msdsUrl: 'https://www.dynai.com/Uploads/675161787b4f3.pdf',
            msdsSize: '308 KB',
            msdsLang: 'EN/ZH',
            details: {
              summary: L(
                '最主流的丙二醇醚溶剂，生殖毒性低、环保替代首选。',
                'The most widely-used PG ether solvent — low reprotoxicity, first-choice eco-friendly replacement.'
              ),
              formula: 'C4H10O2',
              cas: '107-98-2',
              molecularWeight: '90.12',
              appearance: L('无色透明液体，略带醚味', 'Colourless transparent liquid with mild ether odour'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '107-98-2' },
                { label: L('分子式', 'Molecular formula'), value: 'C4H10O2' },
                { label: L('外观', 'Appearance'), value: L('无色透明液体', 'Colourless transparent liquid') },
                { label: L('含量 %', 'Content %'), value: '≥ 99.5' },
                { label: L('馏程 (℃ @ 760mmHg)', 'Distillation range (°C @ 760 mmHg)'), value: '118–121' },
                { label: L('水分 (卡氏法) %', 'Water (Karl Fischer) %'), value: '≤ 0.10' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.921 ± 0.002' },
                { label: L('色度 (铂-钴)', 'Colour (Pt-Co)'), value: '≤ 10' }
              ],
              applications: {
                zh: [
                  '绿色环保溶剂，广泛用于涂料、油墨、清洗剂、医药与电子化学品。',
                  '可作为丙二醇甲醚醋酸酯 (PMA) 的上游原料。',
                  '在半导体清洗和光刻工艺中作为清洗及剥离溶剂使用。'
                ],
                en: [
                  'A green, low-toxicity solvent broadly used in coatings, inks, cleaners, pharmaceuticals and electronic chemicals.',
                  'Upstream feedstock for propylene glycol methyl ether acetate (PMA).',
                  'Used as a cleaning and stripping solvent in semiconductor wet-process cleaning and photolithography.'
                ]
              },
              packaging: L('200 KG/桶 · 1000 KG/IBC', '200 KG / drum · 1000 KG / IBC'),
              transport: L('非危险品', 'Normal goods')
            }
          },
          {
            id: '7',
            nameZh: '丙二醇单乙醚系列',
            nameEn: 'Propylene Glycol Monoethyl Ether Series',
            shortCode: 'PE, DPE',
            cas: '1569-02-4',
            formula: 'C5H12O2',
            msdsUrl: 'https://www.dynai.com/Uploads/67516241b6201.pdf',
            msdsSize: '278 KB',
            msdsLang: 'EN/ZH'
          },
          {
            id: '8',
            nameZh: '丙二醇丁醚系列',
            nameEn: 'Propylene Glycol Butyl Ether Series',
            shortCode: 'PNB, DPNB',
            cas: '5131-66-8',
            formula: 'C7H16O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '9',
            nameZh: '丙二醇丙醚系列',
            nameEn: 'Propylene Glycol Propyl Ether Series',
            shortCode: 'PP, DPP',
            cas: '1569-01-3',
            formula: 'C6H14O2',
            msdsUrl: 'https://www.dynai.com/Uploads/6751643f9f1ec.pdf',
            msdsSize: '286 KB',
            msdsLang: 'EN/ZH'
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
            nameEn: 'Ethylene Glycol Ethyl Ether Acetate',
            shortCode: 'CAC, DCAC',
            cas: '111-15-9',
            formula: 'C6H12O3',
            msdsUrl: 'https://www.dynai.com/Uploads/675164f2282af.pdf',
            msdsSize: '262 KB',
            msdsLang: 'EN/ZH'
          },
          {
            id: '11',
            nameZh: '乙二醇丁醚醋酸酯系列',
            nameEn: 'Ethylene Glycol Butyl Ether Acetate',
            shortCode: 'BAC, DBAC',
            cas: '112-07-2',
            formula: 'C8H16O3',
            msdsUrl: 'https://www.dynai.com/Uploads/675166507e254.pdf',
            msdsSize: '294 KB',
            msdsLang: 'EN/ZH'
          },
          {
            id: '12',
            nameZh: '丙二醇甲醚醋酸酯系列',
            nameEn: 'Propylene Glycol Methyl Ether Acetate',
            shortCode: 'PMA, DPMA',
            cas: '108-65-6',
            formula: 'C6H12O3',
            msdsUrl: 'https://www.dynai.com/Uploads/6751670d4952f.pdf',
            msdsSize: '301 KB',
            msdsLang: 'EN/ZH',
            details: {
              summary: L(
                '半导体、电子、油墨行业最核心的环保溶剂之一。',
                'One of the most important green solvents for semiconductor, electronic and ink industries.'
              ),
              formula: 'C6H12O3',
              cas: '108-65-6',
              molecularWeight: '132.16',
              appearance: L('无色澄清液体', 'Colourless clear liquid'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '108-65-6' },
                { label: L('分子式', 'Molecular formula'), value: 'C6H12O3' },
                { label: L('外观', 'Appearance'), value: L('无色澄清液体', 'Colourless clear liquid') },
                { label: L('含量 %', 'Content %'), value: '≥ 99.5' },
                { label: L('馏程 (℃ @ 760mmHg)', 'Distillation range (°C @ 760 mmHg)'), value: '144–148' },
                { label: L('水分 (卡氏法) %', 'Water (Karl Fischer) %'), value: '≤ 0.10' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.966 ± 0.002' },
                { label: L('色度 (铂-钴)', 'Colour (Pt-Co)'), value: '≤ 5' }
              ],
              applications: {
                zh: [
                  '半导体晶圆制造中光刻胶、剥离液的主要溶剂。',
                  'PU 涂料、油墨、丝印用优良溶剂，具有优异的溶解性和流平性。',
                  '可作 VOC 法规豁免溶剂使用，替代传统二元醇醚酯。'
                ],
                en: [
                  'Primary solvent for photoresist and stripper formulations in semiconductor wafer manufacturing.',
                  'An excellent solvent for PU coatings, inks and screen-printing, with outstanding dissolving and levelling performance.',
                  'Exempt solvent under many VOC regulations — a replacement for traditional glycol-ether acetates.'
                ]
              },
              packaging: L('200 KG/桶 · 1000 KG/IBC', '200 KG / drum · 1000 KG / IBC'),
              transport: L('非危险品', 'Normal goods')
            }
          },
          {
            id: '13a',
            nameZh: '乙二醇乙醚丙酸酯',
            nameEn: 'Ethylene Glycol Ethyl Ether Propionate',
            shortCode: 'ECP',
            cas: '763-69-9',
            formula: 'C7H14O3'
          },
          {
            id: '14',
            nameZh: '丙二醇甲醚丙酸酯、丙二醇乙醚醋酸酯',
            nameEn: 'PG Methyl Ether Propionate (PMP), PG Ethyl Ether Acetate (PEA)',
            shortCode: 'PMP, PEA',
            cas: '148462-57-1',
            formula: 'C7H14O3',
            msdsUrl: 'https://www.dynai.com/Uploads/675168498ce46.pdf',
            msdsSize: '246 KB',
            msdsLang: 'EN/ZH'
          },
          {
            id: '15',
            nameZh: '乙二醇二醋酸酯 · 丙二醇二醋酸酯',
            nameEn: 'Ethylene / Propylene Glycol Diacetate',
            shortCode: 'EGDA, PGDA',
            cas: '111-55-7',
            formula: 'C6H10O4'
          }
        ]
      }
    ]
  },

  '14': {
    slug: '14',
    heroImage:
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1920&q=85',
    keywords: ['electronic', 'semiconductor', 'wafer', 'high purity', 'photolithography'],
    overview: {
      zh: '湿电子化学品是集成电路、显示器件及太阳能光伏制造中不可或缺的超高纯化学品，用于晶圆清洗、光刻、显影、蚀刻等关键湿法工艺。德纳湿电子化学品经多级精制与洁净灌装，可达 G3–G5 级别，支持 28 nm 及以下节点。',
      en: 'Wet electronic chemicals are indispensable ultra-high-purity chemicals for integrated-circuit, display and photovoltaic manufacturing — used in wafer cleaning, photolithography, developing and etching. Dynai wet chemicals are refined through multi-stage purification and clean filling to grades G3–G5, supporting 28 nm and finer process nodes.'
    },
    applications: {
      zh: ['集成电路 (IC)', '显示面板 (LCD/OLED)', '太阳能光伏', '光刻与显影', '湿法清洗与蚀刻'],
      en: [
        'Integrated circuits (IC)',
        'Display panels (LCD / OLED)',
        'Solar photovoltaics',
        'Photolithography & developing',
        'Wet cleaning & etching'
      ]
    },
    series: [
      {
        titleZh: '超高纯溶剂 (G3–G5)',
        titleEn: 'Ultra-high Purity Solvents (G3–G5)',
        products: [
          {
            id: '14-pm',
            nameZh: '电子级丙二醇甲醚',
            nameEn: 'Electronic-grade Propylene Glycol Methyl Ether',
            shortCode: 'PM',
            cas: '107-98-2',
            formula: 'C4H10O2',
            msdsLang: 'EN/ZH',
            msdsSize: '312 KB',
            details: {
              summary: L('G5 级 PM，金属离子 ≤ 10 ppb。', 'G5-grade PM, metal ions ≤ 10 ppb.'),
              formula: 'C4H10O2',
              cas: '107-98-2',
              molecularWeight: '90.12',
              appearance: L('无色透明液体', 'Colourless transparent liquid'),
              spec: [
                { label: L('CAS 号', 'CAS No.'), value: '107-98-2' },
                { label: L('纯度 %', 'Purity %'), value: '≥ 99.99' },
                { label: L('颗粒 (≥0.2 μm/mL)', 'Particles (≥0.2 μm / mL)'), value: '≤ 50' },
                { label: L('金属离子 ppb', 'Metal ions (ppb)'), value: '≤ 10' },
                { label: L('水分 %', 'Water %'), value: '≤ 0.05' },
                { label: L('包装', 'Packaging'), value: L('200 L 不锈钢桶 · 1000 L IBC', '200 L stainless drum · 1000 L IBC') }
              ],
              applications: {
                zh: [
                  '用于 28 nm 以下集成电路光刻胶稀释及边缘清洗 (EBR)。',
                  '显示面板制造的光刻、清洗及蚀刻湿法工艺。',
                  '高端锂电池正极材料制备中的反应溶剂。'
                ],
                en: [
                  'Used for photoresist thinning and edge-bead removal (EBR) at 28 nm and below.',
                  'Photolithography, cleaning and etching wet processes for display-panel manufacturing.',
                  'Reaction solvent in high-end lithium-battery cathode-material preparation.'
                ]
              }
            }
          },
          {
            id: '14-pma',
            nameZh: '电子级丙二醇甲醚醋酸酯',
            nameEn: 'Electronic-grade Propylene Glycol Methyl Ether Acetate',
            shortCode: 'PMA',
            cas: '108-65-6',
            formula: 'C6H12O3',
            msdsLang: 'EN/ZH',
            msdsSize: '298 KB'
          },
          {
            id: '14-em',
            nameZh: '电子级乙二醇单甲醚系列',
            nameEn: 'Electronic-grade Ethylene Glycol Monomethyl Ether Series',
            shortCode: 'EM, DEM, TEM',
            cas: '109-86-4',
            formula: 'C3H8O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-ee',
            nameZh: '电子级乙二醇单乙醚、乙二醇单乙醚二',
            nameEn: 'Electronic-grade Ethylene Glycol Monoethyl Ether Series',
            shortCode: 'EE, DE',
            cas: '110-80-5',
            formula: 'C4H10O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-eb',
            nameZh: '电子级乙二醇单丁醚、乙二醇单丁醚二',
            nameEn: 'Electronic-grade Ethylene Glycol Monobutyl Ether Series',
            shortCode: 'EB, DEB',
            cas: '111-76-2',
            formula: 'C6H14O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-edm',
            nameZh: '电子级乙二醇二甲醚系列',
            nameEn: 'Electronic-grade Ethylene Glycol Dimethyl Ether Series',
            shortCode: 'EDM, DEDM',
            cas: '110-71-4',
            formula: 'C4H10O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-demee',
            nameZh: '电子级二乙二醇甲乙醚',
            nameEn: 'Electronic-grade Diethylene Glycol Methyl Ethyl Ether',
            shortCode: 'DEMEE',
            cas: '1002-67-1',
            formula: 'C7H16O3',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-dcac',
            nameZh: '电子级乙二醇醚醋酸酯二',
            nameEn: 'Electronic-grade Diethylene Glycol Ethyl Ether Acetate',
            shortCode: 'DCAC',
            cas: '112-15-2',
            formula: 'C8H16O4',
            msdsLang: 'EN/ZH'
          },
          {
            id: '14-eep',
            nameZh: '3-乙氧基丙酸乙酯',
            nameEn: 'Ethyl 3-Ethoxypropionate',
            shortCode: 'EEP',
            cas: '763-69-9',
            formula: 'C7H14O3',
            msdsLang: 'EN/ZH'
          }
        ]
      }
    ]
  },

  '15': {
    slug: '15',
    heroImage:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=85',
    keywords: ['polyether', 'silicone', 'foam', 'polyurethane', 'defoamer'],
    overview: {
      zh: '双封端聚醚以两端封端的结构赋予产品优异的热稳定性与低起泡性，广泛用于有机硅油改性、聚氨酯泡沫整泡、农药湿润剂、纺织品后整理、消泡剂、大棚防雾剂、化妆品保湿等领域。',
      en: 'Double-capped polyethers combine excellent thermal stability with low foaming — widely used in silicone-oil modification, polyurethane foam levelling, pesticide wetting, textile finishing, defoamers, greenhouse anti-fog agents and cosmetics moisturising.'
    },
    applications: {
      zh: ['有机硅油改性', '聚氨酯泡沫整泡', '农药湿润剂', '消泡剂', '纺织品后整理', '化妆品保湿'],
      en: [
        'Silicone oil modification',
        'PU foam levelling',
        'Pesticide wetting agents',
        'Defoamers',
        'Textile finishing',
        'Cosmetic moisturising'
      ]
    },
    series: [
      {
        titleZh: '不饱和双封端聚醚',
        titleEn: 'Unsaturated Double-Capped Polyethers',
        products: [
          {
            id: '15-mappn',
            nameZh: '甲基烯丙基聚醚',
            nameEn: 'Methyl-Allyl Double-Capped Polyether',
            shortCode: 'MAPPN',
            msdsLang: 'EN/ZH'
          },
          {
            id: '15-appn',
            nameZh: '烯丙基双封端聚醚',
            nameEn: 'Allyl Double-Capped Polyether',
            shortCode: 'APPN',
            msdsLang: 'EN/ZH'
          }
        ]
      },
      {
        titleZh: '饱和双封端聚醚',
        titleEn: 'Saturated Double-Capped Polyethers',
        products: [
          {
            id: '15-edm',
            nameZh: '乙二醇二甲醚系列',
            nameEn: 'Ethylene Glycol Dimethyl Ether Series',
            shortCode: 'EDM, DEDM, TEDM, TETREDM',
            cas: '110-71-4',
            formula: 'C4H10O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '15-ede',
            nameZh: '乙二醇二乙醚系列',
            nameEn: 'Ethylene Glycol Diethyl Ether Series',
            shortCode: 'EDE, DEDE',
            cas: '629-14-1',
            formula: 'C6H14O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '15-edb',
            nameZh: '乙二醇二丁醚系列',
            nameEn: 'Ethylene Glycol Dibutyl Ether Series',
            shortCode: 'EDB, DEDB',
            cas: '112-48-1',
            formula: 'C10H22O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '15-demee',
            nameZh: '二乙二醇甲乙醚、二丙二醇二甲醚',
            nameEn: 'Diethylene Glycol Methyl Ethyl Ether / Dipropylene Glycol Dimethyl Ether',
            shortCode: 'DEMEE, DPDM',
            cas: '1002-67-1'
          },
          {
            id: '15-nhd',
            nameZh: '聚乙二醇二甲醚系列 (NHD)',
            nameEn: 'Polyethylene Glycol Dimethyl Ether Series',
            shortCode: 'NHD-250, NHD-500',
            msdsLang: 'EN/ZH'
          }
        ]
      }
    ]
  },

  '16': {
    slug: '16',
    heroImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=85',
    keywords: ['ethylene oxide', 'EO', 'MEG', 'admixture', 'concrete', 'TPEG', 'HPEG'],
    overview: {
      zh: '环氧乙烷是重要的有机合成原料，能与醇、酸、胺、硫醇等反应生成多种衍生物。除消毒、熏蒸、火箭燃料外，德纳基于 EO 开发出一系列聚羧酸减水剂单体，广泛用于高速公路、桥梁、水坝、隧道和高层建筑。',
      en: 'Ethylene oxide is a core organic-synthesis feedstock, reacting with alcohols, acids, amines and thiols to form a wide range of derivatives. Beyond disinfection, fumigation and rocket-fuel uses, Dynai produces a family of polycarboxylate water-reducer macromonomers for highways, bridges, dams, tunnels and high-rise construction.'
    },
    applications: {
      zh: ['聚羧酸减水剂', '基础设施与高层建筑', '医药消毒', '表活中间体', '石化衍生物'],
      en: [
        'Polycarboxylate water reducers',
        'Infrastructure & high-rise',
        'Pharma sterilisation',
        'Surfactant intermediates',
        'Petrochemical derivatives'
      ]
    },
    series: [
      {
        titleZh: '环氧乙烷及基础原料',
        titleEn: 'Ethylene Oxide & Base Feedstocks',
        products: [
          {
            id: '16-eo',
            nameZh: '环氧乙烷',
            nameEn: 'Ethylene Oxide',
            shortCode: 'EO',
            cas: '75-21-8',
            formula: 'C2H4O',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-meg',
            nameZh: '乙二醇',
            nameEn: 'Monoethylene Glycol',
            shortCode: 'MEG',
            cas: '107-21-1',
            formula: 'C2H6O2',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-deg',
            nameZh: '二乙二醇',
            nameEn: 'Diethylene Glycol',
            shortCode: 'DEG',
            cas: '111-46-6',
            formula: 'C4H10O3',
            msdsLang: 'EN/ZH'
          }
        ]
      },
      {
        titleZh: '减水剂大单体',
        titleEn: 'Water-Reducer Macromonomers',
        products: [
          {
            id: '16-mpeg',
            nameZh: '甲氧基聚乙二醇系列',
            nameEn: 'Methoxy Polyethylene Glycol Series',
            shortCode: 'MPEG',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-apeg',
            nameZh: '烯丙基醇聚氧乙烯醚',
            nameEn: 'Allyl Alcohol Polyethylene Glycol',
            shortCode: 'APEG',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-hpeg',
            nameZh: '甲基烯丙基醇聚氧乙烯醚',
            nameEn: 'Methallyl Alcohol Polyethylene Glycol',
            shortCode: 'HPEG',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-tpeg',
            nameZh: '异戊烯醇聚氧乙烯醚',
            nameEn: 'Isopentenyl Polyethylene Glycol',
            shortCode: 'TPEG',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-vpeg',
            nameZh: '乙烯基聚乙二醇',
            nameEn: 'Vinyl Polyethylene Glycol',
            shortCode: 'VPEG',
            msdsLang: 'EN/ZH'
          },
          {
            id: '16-epeg',
            nameZh: '环氧基聚乙二醇',
            nameEn: 'Epoxy Polyethylene Glycol',
            shortCode: 'EPEG',
            msdsLang: 'EN/ZH'
          }
        ]
      }
    ]
  },

  '17': {
    slug: '17',
    heroImage:
      'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=85',
    keywords: ['surfactant', 'emulsifier', 'penetrant', 'PEG', 'PPG', 'AEO', 'NP'],
    overview: {
      zh: '表面活性剂是现代工业不可或缺的功能性化学品，广泛用于洗涤、化妆品、农药、印染助剂、石油开采及食品乳化。德纳基于自有 EO/PO 产能，提供定制化的表活产品与功能性性能解决方案。',
      en: 'Surfactants are indispensable functional chemicals — widely used in detergents, cosmetics, pesticides, textile dyeing aids, oil-extraction and food emulsifiers. Dynai leverages its EO / PO capacity to deliver bespoke surfactants and functional-performance solutions.'
    },
    applications: {
      zh: ['洗涤与日化', '化妆品', '农药助剂', '印染助剂', '石油开采', '食品乳化'],
      en: [
        'Detergents & household',
        'Cosmetics',
        'Pesticide adjuvants',
        'Dyeing aids',
        'Oil extraction',
        'Food emulsifiers'
      ]
    },
    series: [
      {
        titleZh: '乳化剂',
        titleEn: 'Emulsifiers',
        products: [
          { id: '17-np', nameZh: 'NP 系列', nameEn: 'NP Series (Nonylphenol Ethoxylates)', shortCode: 'NP', msdsLang: 'EN/ZH' },
          { id: '17-aeo', nameZh: 'AEO 系列', nameEn: 'AEO Series (Fatty Alcohol Ethoxylates)', shortCode: 'AEO', msdsLang: 'EN/ZH' },
          { id: '17-el', nameZh: 'EL / HEL 系列', nameEn: 'EL / HEL Series (Castor Oil Ethoxylates)', shortCode: 'EL, HEL', msdsLang: 'EN/ZH' },
          { id: '17-fae', nameZh: '脂肪酸聚氧乙烯酯系列', nameEn: 'Fatty Acid PEG Ester Series', msdsLang: 'EN/ZH' },
          { id: '17-tam', nameZh: '牛油胺聚氧乙烯醚', nameEn: 'Tallow Amine Polyoxyethylene Ether', msdsLang: 'EN/ZH' }
        ]
      },
      {
        titleZh: '渗透剂',
        titleEn: 'Penetrants',
        products: [
          { id: '17-jfc', nameZh: '渗透剂 JFC', nameEn: 'Penetrant JFC', shortCode: 'JFC', msdsLang: 'EN/ZH' },
          { id: '17-ot', nameZh: '渗透剂 OT', nameEn: 'Penetrant OT', shortCode: 'OT', msdsLang: 'EN/ZH' }
        ]
      },
      {
        titleZh: '流平剂 / 聚乙二醇系列',
        titleEn: 'Levelling Agents & PEG / PPG',
        products: [
          { id: '17-level', nameZh: '烷基聚氧乙烯醚流平剂', nameEn: 'Alkyl Polyoxyethylene Ether Levelling Agent', msdsLang: 'EN/ZH' },
          { id: '17-peg', nameZh: 'PEG 系列', nameEn: 'Polyethylene Glycol Series', shortCode: 'PEG', msdsLang: 'EN/ZH' },
          { id: '17-ppg', nameZh: 'PPG 系列', nameEn: 'Polypropylene Glycol Series', shortCode: 'PPG', msdsLang: 'EN/ZH' }
        ]
      }
    ]
  },

  '18': {
    slug: '18',
    heroImage:
      'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1920&q=85',
    keywords: ['plasticizer', 'TBC', 'ATBC', 'DOTP', 'DNTXIB', 'DEGDB', 'food grade'],
    overview: {
      zh: '无毒增塑剂以可再生资源为原料，替代传统邻苯类增塑剂，具备良好的环保性能与加工性能，广泛用于食品包装、医疗器械、电子电器和汽车工业。',
      en: 'Non-toxic plasticisers are derived from renewable resources and replace traditional phthalate plasticisers — delivering excellent eco-performance and processability for food packaging, medical devices, electronics and the automotive industry.'
    },
    applications: {
      zh: ['食品包装', '医疗器械', '电子电器', '汽车内饰', '玩具', '人造革'],
      en: [
        'Food packaging',
        'Medical devices',
        'Electrical appliances',
        'Automotive interiors',
        'Toys',
        'Synthetic leather'
      ]
    },
    series: [
      {
        titleZh: '无毒增塑剂',
        titleEn: 'Non-toxic Plasticisers',
        products: [
          { id: '18-tbc', nameZh: '柠檬酸三丁酯', nameEn: 'Tributyl Citrate', shortCode: 'TBC', cas: '77-94-1', formula: 'C18H32O7', msdsLang: 'EN/ZH', msdsSize: '284 KB' },
          { id: '18-atbc', nameZh: '乙酰柠檬酸三丁酯', nameEn: 'Acetyl Tributyl Citrate', shortCode: 'ATBC', cas: '77-90-7', formula: 'C20H34O8', msdsLang: 'EN/ZH', msdsSize: '298 KB' },
          {
            id: '18-dntxib',
            nameZh: '2,2,4-三甲基-1,3-戊二醇二异丁酸酯',
            nameEn: '2,2,4-Trimethyl-1,3-Pentanediol Diisobutyrate',
            shortCode: 'DNTXIB',
            cas: '6846-50-0',
            formula: 'C16H30O4',
            msdsLang: 'EN/ZH'
          },
          {
            id: '18-dotp',
            nameZh: '对苯二甲酸二辛酯',
            nameEn: 'Dioctyl Terephthalate',
            shortCode: 'DOTP',
            cas: '6422-86-2',
            formula: 'C24H38O4',
            msdsLang: 'EN/ZH',
            msdsSize: '276 KB'
          },
          {
            id: '18-degdb',
            nameZh: '二乙二醇二苯甲酸酯',
            nameEn: 'Diethylene Glycol Dibenzoate',
            shortCode: 'DEGDB',
            cas: '120-55-8',
            formula: 'C18H18O5',
            msdsLang: 'EN/ZH'
          }
        ]
      }
    ]
  },

  '19': {
    slug: '19',
    heroImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    keywords: ['brake fluid', 'HZY', 'borate', 'boiling point', 'dot'],
    overview: {
      zh: '机动车制动液和基础液具备高干/湿平衡回流沸点、低温粘度低且不溶胀橡胶的特点。德纳基于自有原料生产醇醚硼酸酯和制动液基础液，产品通过 HZY-3/HZY-4/HZY-5 标准认证。',
      en: 'Motor-vehicle brake fluids and base fluids feature high dry / wet equilibrium reflux boiling points, low low-temperature viscosity and resistance to rubber swelling. Dynai leverages its upstream raw materials to produce alcohol-ether borate esters and brake-fluid base stocks certified to HZY-3 / HZY-4 / HZY-5.'
    },
    applications: {
      zh: ['乘用车制动', '商用车制动', '赛车用品', '高温高湿环境'],
      en: ['Passenger-car brakes', 'Commercial-vehicle brakes', 'Motorsport', 'Hot & humid environments']
    },
    series: [
      {
        titleZh: '原料',
        titleEn: 'Raw Materials',
        products: [
          { id: '19-dem', nameZh: '二乙二醇单甲醚 (DEM)', nameEn: 'Diethylene Glycol Monomethyl Ether (DEM)', shortCode: 'DEM', cas: '111-77-3', formula: 'C5H12O3', msdsLang: 'EN/ZH' },
          { id: '19-tem', nameZh: '三乙二醇单甲醚 (TEM)', nameEn: 'Triethylene Glycol Monomethyl Ether (TEM)', shortCode: 'TEM', cas: '112-35-6', formula: 'C7H16O4', msdsLang: 'EN/ZH' },
          { id: '19-de', nameZh: '二乙二醇单乙醚 (DE)', nameEn: 'Diethylene Glycol Monoethyl Ether (DE)', shortCode: 'DE', cas: '111-90-0', formula: 'C6H14O3', msdsLang: 'EN/ZH' },
          { id: '19-tee', nameZh: '三乙二醇单乙醚 (TEE)', nameEn: 'Triethylene Glycol Monoethyl Ether (TEE)', shortCode: 'TEE', cas: '112-50-5', formula: 'C8H18O4', msdsLang: 'EN/ZH' }
        ]
      },
      {
        titleZh: '醇醚硼酸酯',
        titleEn: 'Alcohol-Ether Borate Esters',
        products: [
          { id: '19-mh106', nameZh: '醇醚硼酸酯 MH-106', nameEn: 'Alcohol-Ether Borate Ester MH-106', shortCode: 'MH-106', msdsLang: 'EN/ZH' },
          { id: '19-mh510', nameZh: '醇醚硼酸酯 MH-510', nameEn: 'Alcohol-Ether Borate Ester MH-510', shortCode: 'MH-510', msdsLang: 'EN/ZH' },
          { id: '19-mb610', nameZh: '醇醚硼酸酯 MB-610', nameEn: 'Alcohol-Ether Borate Ester MB-610', shortCode: 'MB-610', msdsLang: 'EN/ZH' }
        ]
      },
      {
        titleZh: '制动液基础液',
        titleEn: 'Brake Fluid Base Stocks',
        products: [
          {
            id: '19-hzy3',
            nameZh: 'HZY-3 制动液基础液',
            nameEn: 'HZY-3 Brake Fluid Base Stock',
            shortCode: 'HZY-3',
            msdsLang: 'EN/ZH',
            msdsSize: '312 KB',
            details: {
              summary: L('符合 GB 12981 HZY-3 标准的制动液基础液。', 'Brake-fluid base stock conforming to GB 12981 HZY-3.'),
              appearance: L('无色至淡黄色液体', 'Colourless to pale yellow liquid'),
              spec: [
                { label: L('干平衡回流沸点 (℃)', 'Dry equilibrium reflux boiling point (°C)'), value: '≥ 205' },
                { label: L('湿平衡回流沸点 (℃)', 'Wet equilibrium reflux boiling point (°C)'), value: '≥ 140' },
                { label: L('运动粘度 (100℃ cSt)', 'Kinematic viscosity (100 °C, cSt)'), value: '≥ 1.5' },
                { label: L('运动粘度 (-40℃ cSt)', 'Kinematic viscosity (−40 °C, cSt)'), value: '≤ 1500' },
                { label: L('pH 值', 'pH'), value: '7.0 – 11.5' },
                { label: L('包装', 'Packaging'), value: L('200 KG/桶', '200 KG / drum') }
              ],
              applications: {
                zh: [
                  '适用于普通乘用车及商用车液压制动系统。',
                  '具有优异的低温流动性与橡胶相容性，冷态启动仍保持灵敏度。'
                ],
                en: [
                  'Suitable for hydraulic braking systems of passenger cars and commercial vehicles.',
                  'Excellent low-temperature flow and rubber compatibility — retains sensitivity at cold start.'
                ]
              }
            }
          },
          { id: '19-hzy4', nameZh: 'HZY-4 制动液基础液', nameEn: 'HZY-4 Brake Fluid Base Stock', shortCode: 'HZY-4', msdsLang: 'EN/ZH' },
          { id: '19-hzy5', nameZh: 'HZY-5 制动液基础液', nameEn: 'HZY-5 Brake Fluid Base Stock', shortCode: 'HZY-5', msdsLang: 'EN/ZH' }
        ]
      }
    ]
  },

  '20': {
    slug: '20',
    heroImage:
      'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=1920&q=85',
    keywords: ['water-based', 'resin', 'acrylic', 'emulsion', 'DN-12', 'DN-300', 'low odour'],
    overview: {
      zh: '水性树脂及环保净味成膜助剂用于涂料、油墨、胶黏剂、织物涂层、皮革涂饰、纸张与纤维表面处理。德纳水性产品具有极低 VOC 与气味，满足日益严格的环保法规。',
      en: 'Water-based resins and eco-friendly low-odour film-forming aids are used in coatings, inks, adhesives, fabric coatings, leather finishes and paper / fibre surface treatment. Dynai water-based products deliver ultra-low VOC and odour to meet ever-stricter environmental regulations.'
    },
    applications: {
      zh: ['水性涂料', '水性油墨', '胶黏剂', '织物涂层', '皮革涂饰', '纸张处理'],
      en: [
        'Water-based coatings',
        'Water-based inks',
        'Adhesives',
        'Fabric coatings',
        'Leather finishes',
        'Paper / fibre treatment'
      ]
    },
    series: [
      {
        titleZh: '水性树脂系列 (提供 COA)',
        titleEn: 'Water-based Resin Series (COA available)',
        products: [
          { id: '20-ar', nameZh: '醇溶性丙烯酸树脂', nameEn: 'Alcohol-soluble Acrylic Resin', msdsLang: 'EN/ZH' },
          { id: '20-cure', nameZh: '固化剂', nameEn: 'Curing Agent', msdsLang: 'EN/ZH' },
          { id: '20-disp', nameZh: '水性丙烯酸分散体', nameEn: 'Water-based Acrylic Dispersion', msdsLang: 'EN/ZH' },
          { id: '20-emul', nameZh: '水性丙烯酸乳液', nameEn: 'Water-based Acrylic Emulsion', msdsLang: 'EN/ZH' },
          { id: '20-epoxy', nameZh: '水性环氧乳液', nameEn: 'Water-based Epoxy Emulsion', msdsLang: 'EN/ZH' },
          { id: '20-ins', nameZh: '水性绝缘树脂', nameEn: 'Water-based Insulating Resin', msdsLang: 'EN/ZH' }
        ]
      },
      {
        titleZh: '成膜助剂',
        titleEn: 'Film-Forming Aids',
        products: [
          {
            id: '20-dn12',
            nameZh: 'DN-12 环保型成膜助剂',
            nameEn: 'DN-12 Eco Film-Forming Aid',
            shortCode: 'DN-12',
            msdsLang: 'EN/ZH',
            details: {
              summary: L('低 VOC 环保成膜助剂，推荐替代醇酯十二。', 'Low-VOC eco film-forming aid — replacement for Texanol®.'),
              appearance: L('无色至淡黄色透明液体', 'Colourless to pale yellow transparent liquid'),
              spec: [
                { label: L('外观', 'Appearance'), value: L('无色至淡黄色透明液体', 'Colourless to pale yellow transparent liquid') },
                { label: L('气味', 'Odour'), value: L('微弱', 'Faint') },
                { label: L('沸程 (℃)', 'Boiling range (°C)'), value: '244–260' },
                { label: L('闪点 (℃)', 'Flash point (°C)'), value: '≥ 104' },
                { label: L('比重 (d₂₀⁴)', 'Specific gravity (d₂₀⁴)'), value: '0.946 ± 0.005' },
                { label: L('水分 %', 'Water %'), value: '≤ 0.15' },
                { label: L('包装', 'Packaging'), value: L('200 KG/桶', '200 KG / drum') }
              ],
              applications: {
                zh: [
                  '水性丙烯酸乳液涂料最常用的成膜助剂。',
                  '对低温成膜性能与耐擦洗性能有明显提升。',
                  '可应用于弹性涂料、质感涂料、单组份木器漆等。'
                ],
                en: [
                  'The most widely-used coalescent for water-based acrylic-emulsion coatings.',
                  'Significantly improves low-temperature film-formation and scrub resistance.',
                  'Suitable for elastic coatings, textured coatings and 1K water-based wood finishes.'
                ]
              }
            }
          },
          { id: '20-dn300', nameZh: 'DN-300 净味成膜助剂', nameEn: 'DN-300 Odour-Free Film-Forming Aid', shortCode: 'DN-300', msdsLang: 'EN/ZH' }
        ]
      }
    ]
  }
};

// =============================================================================
// Helpers
// =============================================================================

export function getAllProducts() {
  const rows: Array<{
    category: string;
    seriesTitle: BilingualText;
    product: ProductItem;
  }> = [];
  for (const cat of Object.values(productData)) {
    for (const series of cat.series) {
      for (const product of series.products) {
        rows.push({
          category: cat.slug,
          seriesTitle: { zh: series.titleZh, en: series.titleEn },
          product
        });
      }
    }
  }
  return rows;
}

export function findProduct(categorySlug: string, productId: string) {
  const cat = productData[categorySlug];
  if (!cat) return null;
  for (const series of cat.series) {
    const p = series.products.find((x) => x.id === productId);
    if (p) return { category: cat, series, product: p };
  }
  return null;
}

export function relatedProducts(categorySlug: string, productId: string, limit = 4) {
  const cat = productData[categorySlug];
  if (!cat) return [];
  const pool: ProductItem[] = [];
  for (const series of cat.series) {
    for (const p of series.products) if (p.id !== productId) pool.push(p);
  }
  return pool.slice(0, limit);
}
