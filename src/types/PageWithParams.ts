export type Param = string | string[] | undefined;

export interface PageWithParams {
  searchParams: {
    [key: string]: Param;
  };
}
