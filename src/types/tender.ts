export interface Tender {
  id: number;
  title: string;
  description: string;
  [key: string]: any;
}

export interface TenderListResponse {
    page_count: number,
    page_number: number,
    page_size: number,
    total: number,
    data: Tender[],
}

export interface TenderDetailResponse extends Tender {}