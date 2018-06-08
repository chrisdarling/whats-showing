import React, { Component, Fragment } from 'react';
import { InfiniteLoader, AutoSizer, WindowScroller, Grid } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { ImageComponent } from 'shared';
import { POSTER_IMG_URL, TINY_POSTER_URL } from '../../constants';
import ResultFilter from './ResultFilter';

const STATUS_LOADING = 1;
export default class MovieResults extends Component {
    state = {
        results: [],
        list: [],
        loadedRowsMap: [],
        columnSize:5,
        sortBy: 'popularity.desc',
        genre: 'All',
        decade: 'All',
    };

    static getDerivedStateFromProps(props, state) {
        const { results: list = [], sortBy, genre, decade } = props;
        let results = [];
        let newList = Array.from(list);
        while(newList.length) {
            results.push(newList.splice(0, state.columnSize));
        }
        if (sortBy !== state.sortBy || genre !== state.genre || decade !== state.decade) {
            return {
                ...state,
                loadedRowsMap: [],
                results,
                list,
                sortBy,
                genre,
            };
        }
        return {
            ...state,
            results,
            list,
            sortBy,
            genre,
        };
    }

    componentDidMount() {
        this.resizeGrid();
        window.addEventListener("resize", this.resizeGrid);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeGrid);
    }

    resizeGrid = () => {
        if (window.innerWidth <= 480) {
            this.setState(state => ({
                ...state, 
                columnSize: 3, 
                loadedRowsMap: state.columnSize === 3 ? state.loadedRowsMap : [],
            }));
        } else if (window.innerWidth <= 768) {
            this.setState(state => ({
                ...state, 
                columnSize: 4, 
                loadedRowsMap: state.columnSize === 4 ? state.loadedRowsMap : [],
            }));
        } else {
            this.setState(state => ({
                ...state, 
                columnSize: 5, 
                loadedRowsMap: state.columnSize === 5 ? state.loadedRowsMap : [],
            }));
        }
    }

    render() {
        const { className, sortBy, genre, decade } = this.props;
        const { list } = this.state;
        const filterProps = { sortBy, genre, decade };

        return (
            <div className={`${className}-results`}>
                <ResultFilter {...this.props} />
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={list.length}
                    minimumBatchSize={19}
                    threshold={20}
                    filterProps={filterProps}
                >
                    {this._infiniteLoaderChildFunction}
                </InfiniteLoader>
            </div>
        );
    }

    _infiniteLoaderChildFunction = ({ onRowsRendered, registerChild }) => {
        this._onRowsRendered = onRowsRendered;
        const { results = [], columnSize } = this.state;
        const { sortBy, genre, decade } = this.props;
        const filterProps = { sortBy, genre, decade };
    
        return (
            <WindowScroller>
                {({ height, isScrolling, scrollTop, onChildScroll }) => (
                    <AutoSizer className="result-items" disableHeight>
                        {({ width }) => (
                            <div ref={registerChild}>
                                <Grid
                                    filterProps={filterProps}
                                    onRowsRendered={onRowsRendered}
                                    cellRenderer={this.cellRenderer}
                                    columnCount={columnSize}
                                    columnWidth={(width/columnSize) - 1}
                                    width={width}
                                    height={height}
                                    autoHeight
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    onScroll={onChildScroll}
                                    rowCount={results.length}
                                    rowHeight={(width/columnSize)*1.5}
                                    onSectionRendered={this._onSectionRendered}
                                />
                            </div>
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        )
    }

    cellRenderer = ({
        columnIndex, // Horizontal (column) index of cell
        isScrolling, // The Grid is currently being scrolled
        isVisible,   // This cell is visible within the grid (eg it is not an overscanned cell)
        key,         // Unique key within array of cells
        parent,      // Reference to the parent Grid (instance)
        rowIndex,    // Vertical (row) index of cell
        style,      // Style object to be applied to cell (to position it);
                     // This must be passed through to the rendered cell element.
      }) => {
        const { results } = this.state;
        const credit = results[rowIndex][columnIndex] || {};
        const { poster_path, loading, id } = credit;

        return (
            <Link key={key} to={`/movies/movie/${id}`}>
                <picture style={style} className="credit">
                    <ImageComponent
                        imagePath={poster_path}
                        placeholderURL="/assets/placeholder.jpg"
                        loading={loading}
                        defaultURL={POSTER_IMG_URL}
                        mobileURL={TINY_POSTER_URL}
                    >
                        {
                            ({ onError, onLoad, source }) => (
                                <Fragment>
                                    {isVisible ?
                                    <img src={source} className="poster-image" onError={onError} onLoad={onLoad} alt="poster" />
                                    : <div className="credit-placeholder"></div>}
                                </Fragment>
                            )
                        }
                    </ImageComponent>
                </picture>
            </Link>
        )
    }

    isRowLoaded = ({ index }) =>{
        const { loadedRowsMap } = this.state;
        return !!loadedRowsMap[index];
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        const { loadedRowsMap } = this.state;

        for (var i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap[i] = STATUS_LOADING;
        }

        const { page, onPageChange, total_pages } = this.props;
        const currentPage = parseInt(page, 10);

        if (currentPage >= total_pages) return;

        const nextPage = currentPage + 1;
        onPageChange(nextPage);
    }

    _onSectionRendered = ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }) => {
        const { columnSize } = this.state;
        const startIndex = rowStartIndex * columnSize + columnStartIndex;
        const stopIndex = rowStopIndex * columnSize + columnStopIndex;

        this._onRowsRendered({
          startIndex,
          stopIndex,
        });
    }
}