//I know I haven't covered all the table columns here but these ones look like the most important ones. I guess we can have all the properties
//as optional properties and
//and only show the ones with the actual data
export interface InterpolatedRow {
  [key: string]: number;
}

export interface YieldClass {
  yield_class: number;
  rows: InterpolatedRow[];
}

export interface YieldClasses {
  yield_classes: YieldClass[];
}

export const DefaultTableProperties = [
  "dbh",
  "dominant_height",
  "average_height",
  "trees_per_ha",
  "taper",
  "average_annual_age_increment",
] as const;

export interface YieldTableData {
  title: string;
  available_columns: string[];
  country_codes: string[];
  id: number;
  data: YieldClasses;
}
