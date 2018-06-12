import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
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
        columnSize: 4,
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
            results.push(list.splice(0, state.columnSize));
        }

        return {
            results,
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
            }));
        } else {
            this.setState(state => ({
                ...state, 
                columnSize: 4, 
            }));
        }
    }

    render() {
        const { results, columnSize } = this.state;
        const { sortFilter, filter, decadeFilter, year } = this.props;
        const filterProps = { sortFilter, filter, decadeFilter, year };
        return (
            <WindowScroller>
                {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
                    <AutoSizer className={baseClass} disableHeight>
                        {({ width }) => (
                            <div ref={registerChild}>
                                <Grid
                                    cellRenderer={this.cellRenderer}
                                    columnCount={columnSize}
                                    columnWidth={(width/columnSize) - 1}
                                    height={height}
                                    isScrolling={isScrolling}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    autoHeight
                                    rowCount={results.length}
                                    rowHeight={(width/columnSize)*1.5}
                                    width={width}
                                    filterProps={filterProps}
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
        const { poster_path, loading, id, title } = credit;
        const cn = placeholder =>  classnames('poster-image', { 'placeholder': placeholder });
        let content = null;
        if (id) {
            content = (
                <ImageComponent
                    imagePath={poster_path}
                    placeholderURL="/assets/placeholder.jpg"
                    loading={loading}
                    defaultURL={POSTER_IMG_URL}
                    mobileURL={TINY_POSTER_URL}
                >
                    {
                        ({ onError, onLoad, source, placeholder }) => (
                            <Fragment>
                                {isVisible ?
                                <Fragment>
                                    <img src={source} className={cn(placeholder)} onError={onError} onLoad={onLoad} alt="poster" />
                                    { placeholder && <div className="title" style={{ height: style.height / 2, width: style.width - 25}}>{title}</div>}
                                </Fragment>
                                : <div className="credit-placeholder"></div>}
                            </Fragment>
                        )
                    }
                </ImageComponent>
            );
        }


        return (
            <Fragment key={key} >
                { id ?
                <Link to={`/movies/movie/${id}`}>
                    <picture style={style} title={title} className="credit">
                        {content}
                    </picture>
                </Link> :
                <div style={style}></div>}
            </Fragment>
        )
    }
}