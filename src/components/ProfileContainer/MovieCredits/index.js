import React, { Component, Fragment } from 'react';
import { Grid, AutoSizer, WindowScroller } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { ImageComponent } from 'shared';
import { sortHandler, decadeFilterHandler, POSTER_IMG_URL, TINY_POSTER_URL } from '../../../constants';
import './style.css';

const baseClass = 'whats-showing-profile-credits';
export default class MovieCredits extends Component {
    constructor() {
        super();
        this.scrollElement = null;
    }
    
    state = {
        results: [],
    }

    static getDerivedStateFromProps(props, state) {
        const { cast = [], crew = [], filter, sortFilter, decadeFilter, year } = props;
        let list = [];
        if (filter === 'Actor') {
            list = cast.filter(c => c.media_type === 'movie')
                .filter((item) => decadeFilterHandler(item, decadeFilter, year))
                .sort((a, b) => sortHandler(a, b, sortFilter));
        } else {
            list = crew.filter(c => c.media_type === 'movie' && c.job === filter)
                .filter((item) => decadeFilterHandler(item, decadeFilter, year))
                .sort((a, b) => sortHandler(a, b, sortFilter));
        }

        let results = [];
        while(list.length) {
            results.push(list.splice(0, 4));
        }

        return {
            results,
        };
    }

    render() {
        const { results } = this.state;
        return (
            <WindowScroller>
                {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
                    <AutoSizer className={baseClass} disableHeight>
                        {({ width }) => (
                            <div ref={registerChild}>
                                <Grid
                                    cellRenderer={this.cellRenderer}
                                    columnCount={4}
                                    columnWidth={(width/4) - 1}
                                    height={height}
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    autoHeight
                                    sortFilter={this.props.sortFilter}
                                    rowCount={results.length}
                                    rowHeight={(width/4)*1.5}
                                    width={width}
                                />
                            </div>
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        );
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
}