/** Dados comerciais por unidade (área em m²). Fonte: planilha / JSON do empreendimento. */
export type PlantaUnidadeCatalogRow = {
  unit: string
  type: string
  internal_area_m2: number
  terrace_area_m2?: number
  total_area_m2: number
}

export const PLANTAS_UNIDADES_CATALOG: readonly PlantaUnidadeCatalogRow[] = [
  { unit: '101', type: 'Garden', internal_area_m2: 20.6, terrace_area_m2: 22.94, total_area_m2: 43.54 },
  { unit: '102', type: 'Garden', internal_area_m2: 17.14, terrace_area_m2: 14.71, total_area_m2: 31.85 },
  { unit: '103', type: 'Garden', internal_area_m2: 22.69, terrace_area_m2: 36.91, total_area_m2: 59.6 },
  {
    unit: '201',
    type: 'Garden Superior',
    internal_area_m2: 23.25,
    terrace_area_m2: 3.78,
    total_area_m2: 27.03,
  },
  { unit: '202', type: 'Studio', internal_area_m2: 18.98, total_area_m2: 18.98 },
  { unit: '203', type: 'Studio', internal_area_m2: 23.0, total_area_m2: 23.0 },
  { unit: '204', type: 'Studio', internal_area_m2: 21.92, total_area_m2: 21.92 },
  {
    unit: '205',
    type: 'Garden Superior',
    internal_area_m2: 24.37,
    terrace_area_m2: 3.4,
    total_area_m2: 27.77,
  },
  {
    unit: '206',
    type: 'Garden Superior',
    internal_area_m2: 24.37,
    terrace_area_m2: 10.38,
    total_area_m2: 34.75,
  },
  { unit: '207', type: 'Studio', internal_area_m2: 20.23, total_area_m2: 20.23 },
  { unit: '208', type: 'Studio', internal_area_m2: 20.2, total_area_m2: 20.2 },
  {
    unit: '209',
    type: 'Garden Superior',
    internal_area_m2: 22.49,
    terrace_area_m2: 3.6,
    total_area_m2: 26.09,
  },
  { unit: '301', type: 'Studio', internal_area_m2: 23.25, total_area_m2: 23.25 },
  { unit: '302', type: 'Studio', internal_area_m2: 18.98, total_area_m2: 18.98 },
  { unit: '303', type: 'Studio', internal_area_m2: 23.0, total_area_m2: 23.0 },
  { unit: '304', type: 'Studio', internal_area_m2: 21.92, total_area_m2: 21.92 },
  { unit: '305', type: 'Studio', internal_area_m2: 24.37, total_area_m2: 24.37 },
  { unit: '306', type: 'Studio', internal_area_m2: 22.5, total_area_m2: 22.5 },
  { unit: '307', type: 'Studio', internal_area_m2: 20.23, total_area_m2: 20.23 },
  { unit: '308', type: 'Studio', internal_area_m2: 20.2, total_area_m2: 20.2 },
  { unit: '309', type: 'Studio', internal_area_m2: 22.49, total_area_m2: 22.49 },
  { unit: '401', type: 'Studio', internal_area_m2: 23.25, total_area_m2: 23.25 },
  { unit: '402', type: 'Studio', internal_area_m2: 18.98, total_area_m2: 18.98 },
  { unit: '403', type: 'Studio', internal_area_m2: 23.0, total_area_m2: 23.0 },
  { unit: '404', type: 'Studio', internal_area_m2: 21.92, total_area_m2: 21.92 },
  { unit: '405', type: 'Studio', internal_area_m2: 24.37, total_area_m2: 24.37 },
  { unit: '406', type: 'Studio', internal_area_m2: 22.5, total_area_m2: 22.5 },
  { unit: '407', type: 'Studio', internal_area_m2: 20.23, total_area_m2: 20.23 },
  { unit: '408', type: 'Studio', internal_area_m2: 20.2, total_area_m2: 20.2 },
  { unit: '409', type: 'Studio', internal_area_m2: 22.49, total_area_m2: 22.49 },
  {
    unit: '501',
    type: 'Garden Superior',
    internal_area_m2: 25.28,
    terrace_area_m2: 25.66,
    total_area_m2: 50.94,
  },
  {
    unit: '502',
    type: 'Garden Superior',
    internal_area_m2: 23.98,
    terrace_area_m2: 21.73,
    total_area_m2: 45.71,
  },
  {
    unit: '503',
    type: 'Garden Superior',
    internal_area_m2: 22.11,
    terrace_area_m2: 7.22,
    total_area_m2: 29.33,
  },
  { unit: '504', type: 'Studio', internal_area_m2: 21.98, total_area_m2: 21.98 },
  { unit: '505', type: 'Studio', internal_area_m2: 21.98, total_area_m2: 21.98 },
  {
    unit: '506',
    type: 'Garden Superior',
    internal_area_m2: 22.12,
    terrace_area_m2: 7.21,
    total_area_m2: 29.33,
  },
  { unit: '601', type: 'Studio', internal_area_m2: 25.28, total_area_m2: 25.28 },
  { unit: '602', type: 'Studio', internal_area_m2: 23.98, total_area_m2: 23.98 },
  { unit: '603', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '604', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '605', type: 'Studio', internal_area_m2: 21.98, total_area_m2: 21.98 },
  { unit: '606', type: 'Studio', internal_area_m2: 22.12, total_area_m2: 22.12 },
  { unit: '701', type: 'Studio', internal_area_m2: 25.28, total_area_m2: 25.28 },
  { unit: '702', type: 'Studio', internal_area_m2: 23.98, total_area_m2: 23.98 },
  { unit: '703', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '704', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '705', type: 'Studio', internal_area_m2: 21.98, total_area_m2: 21.98 },
  { unit: '706', type: 'Studio', internal_area_m2: 22.12, total_area_m2: 22.12 },
  { unit: '801', type: 'Studio', internal_area_m2: 25.28, total_area_m2: 25.28 },
  { unit: '802', type: 'Studio', internal_area_m2: 23.98, total_area_m2: 23.98 },
  { unit: '803', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '804', type: 'Studio', internal_area_m2: 22.11, total_area_m2: 22.11 },
  { unit: '805', type: 'Studio', internal_area_m2: 21.98, total_area_m2: 21.98 },
  { unit: '806', type: 'Studio', internal_area_m2: 22.12, total_area_m2: 22.12 },
] as const

const byUnit: ReadonlyMap<string, PlantaUnidadeCatalogRow> = new Map(
  PLANTAS_UNIDADES_CATALOG.map((r) => [r.unit, r]),
)

/** Área privativa (m²) no formato brasileiro usado na UI. */
export function formatAreaPrivativaM2(m2: number): string {
  return m2.toFixed(2).replace('.', ',')
}

export function getPlantaUnidadeCatalogRow(unit: string): PlantaUnidadeCatalogRow | undefined {
  return byUnit.get(unit)
}
