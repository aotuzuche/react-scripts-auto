export interface ModelNS {
  index: any;
}

export interface DemoPageListItem {
  foo: string;
  bar: string;
}

export interface DemoPageState {
  skip: number;
  limit: number;
  count: number;
  list: DemoPageListItem[];
}
