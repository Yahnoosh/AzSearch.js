import * as React from "react";
import { PropsType } from "../containers/PagerContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class Pager extends React.PureComponent<PropsType, State> {
    render() {
        const { count, top, skip, loadedResultsCount, pageUp, pageDown, loadPage } = this.props;
        let css = objAssign({}, defaultCss, this.props.css);
        const showPager = loadedResultsCount > 0;
        const maxSkip = 100000;
        const maxPage = count > 0 ? Math.ceil(count / top) : Math.ceil(maxSkip / top) + 1;
        const activePage = skip / top + 1;
        const enablePrevious = activePage > 1;
        const enableNext = activePage < maxPage;
        let pagerButtons = [];
        // previous button
        let previousCss = enablePrevious ? css.pager__pageItem : css.pager__pageItemDisabled;
        let onPreviousClick = () => {
            return enablePrevious && pageDown();
        };
        pagerButtons.push(
            <li className={previousCss}>
                <a className={css.pager__pageLink} href="#" aria-label="Previous" onClick={onPreviousClick}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className={css.screenReaderOnly}>Previous</span>
                </a>
            </li>
        );

        let getCssClass = (page: number, isActive: boolean, isDisabled: boolean) => {
            let cssClass = isActive ? css.pager__pageItemActive : css.pager_pageItem;
            cssClass = isDisabled ? css.pager__pageItemDisabled : cssClass;
            return cssClass;
        };

        let generateButton = (page: number, isActive: boolean, isDisabled: boolean) => {
            let srItem = isActive ? <span className={css.screenReaderOnly}>(current)</span> : "";
            let cssClass = getCssClass(page, isActive, isDisabled);
            let onPageClick = () => {
                return loadPage(page);
            };
            return (
                <li className={cssClass}>
                    <a className={css.pager__pageLink} href="#" onClick={onPageClick}>{page} {srItem}</a>
                </li>
            );
        };

        let addElipsesAndMaxPage = (pagerButtons: any[]) => {
            pagerButtons.push(
                <li className={css.pager__pageItemDisabled}>
                    <a className={css.pager__pageLink} >...</a>
                </li>
            );
            pagerButtons.push(generateButton(maxPage, false, true));
        };
        // buttons will loos like << 1 2 3 ... max >>
        if (activePage < 4) {
            pagerButtons.push(generateButton(1, activePage === 1, false));
            2 <= maxPage ? pagerButtons.push(generateButton(2, activePage === 2, false)) : 0;
            3 <= maxPage ? pagerButtons.push(generateButton(3, activePage === 3, false)) : 0;
            if (maxPage > 3) {
                addElipsesAndMaxPage(pagerButtons);
            }
        }
        // else << 1 ... 4 5 ... pageMax >>
        else {
            pagerButtons.push(generateButton(1, false, false));
            pagerButtons.push(
                <li className={css.pager__pageItemDisabled}>
                    <a className={css.pager__pageLink} >...</a>
                </li>
            );
            pagerButtons.push(generateButton(activePage, true, false));
            if (activePage < maxPage) {
                pagerButtons.push(generateButton(activePage + 1, false, false));
                addElipsesAndMaxPage(pagerButtons);
            }
        }

        // next button
        let nextCss = enableNext ? css.pager__pageItem : css.pager__pageItemDisabled;
        let onNextClick = () => {
            return enableNext && pageUp();
        };
        pagerButtons.push(
            <li className={nextCss}>
                <a className={css.pager__pageLink} href="#" aria-label="Next" onClick={onNextClick}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className={css.screenReaderOnly}>Next</span>
                </a>
            </li>
        );
        if (!showPager) {
            return <div></div>;
        }

        return (
            <nav aria-label="Page navigation" className={css.pager__nav}>
                <ul className={css.pager__list}>
                    {pagerButtons}
                </ul>
            </nav>
        );
    }
}

export default Pager;


