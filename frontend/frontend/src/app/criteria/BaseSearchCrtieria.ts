import { SearchOrder } from "./SearchOrder";

export class BaseSearchCriteria{
    pageNumber: number;
    maxResults: number;
    sortOrder: SearchOrder;
}
