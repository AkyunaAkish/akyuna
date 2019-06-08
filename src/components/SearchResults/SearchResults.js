import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class SearchResults extends PureComponent {
    renderContent = () => {
        console.log('with router stuff', this.props.match.params.searchText)
        return (
			<Fragment>
				<h1>Search Text: <u>{ this.props.match.params.searchText }</u></h1>
				<h4>Search results will go here</h4>
			</Fragment>
        );
    };

    render = () => {
        return (
            <div className='search-results'>
                { this.renderContent() }
            </div>
        );
    };
}

export default withRouter(SearchResults);