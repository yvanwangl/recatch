interface StoreState {
    orm: object;
    ui: { 
        dashboard: object,
        postPagination: { totalCount: number, currentPage: number}
    };
}

export default StoreState;