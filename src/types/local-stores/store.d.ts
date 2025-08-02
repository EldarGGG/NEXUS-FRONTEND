export interface IStore {
  name: string;
  summary: string;
  BIN: string;
  is_visible: boolean;
  color: string;
  id: string;
  owner: string;
}

export interface IStoreCreate {
  name: string;
  summary: string;
  BIN: string;
  is_visible: boolean;
  color: string;
}
