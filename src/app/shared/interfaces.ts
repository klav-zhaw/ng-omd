

export interface Author {
  firstName?: string;
  lastName?: string;
  affiliation?: string;
  orcId?: string;
}

export interface Dataset {
  id: number | null;
  title?: string;
  description?: string;
  owner?: Author;
  authors?: Author;
  microstructures?: MicroStructure[];
  thumbnail?: string;
  material?: string;
  date?: string;
}

export interface DatasetResolved {
  dataset?: Dataset;
  error?: any;
}

export interface MicroStructure {
  id: number;
  isReal: boolean;
  files: string[];
}
