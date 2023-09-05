import { TablePipe } from "./table-pipe.enum";

export interface TableColumn {
  field: string;
  header_name: string;
  sort: boolean;
  pipe?: TablePipe;
}
