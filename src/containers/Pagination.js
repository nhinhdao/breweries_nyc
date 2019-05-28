import React, {Component} from 'react';
import times from 'lodash.times';
import {Menu, Icon} from 'semantic-ui-react';

function pagination(WrappedComponent, perPage){
  return class extends Component {
    state = {
      page: 0 // pagination start at index 0
    }

    //set page index when user click on page number
    setPage = (page) => {
      return () => {
        this.setState({page});
      };
    }

    // page decrement
    decrementPage = () => {
      const {page} = this.state;
      this.setState({
        page: page - 1
      });
    }

    // page increment
    incrementPage = () => {
      const {page} = this.state;
      this.setState({
        page: page + 1
      });
    }

    render() {
      const {page} = this.state;
      const {breweries} = this.props;
      const startIndex = page * perPage;
      const totalPages = Math.ceil(breweries.length / perPage);
      return (
        <div>
          <WrappedComponent breweries={breweries} startIndex={startIndex} perPage={perPage}/>
          {/* display pagination */}
          {breweries.length > perPage &&
            <Menu floated='right' pagination size='tiny'>
              {page !== 0 &&
                <Menu.Item as="a" icon onClick={this.decrementPage}>
                  <Icon name="left chevron" />
                </Menu.Item>
              }
              {times(totalPages, n =>
                (<Menu.Item as="a" key={n} active={n === page} onClick={this.setPage(n)}>
                  {n + 1}
                </Menu.Item>),
              )}
              {page !== (totalPages - 1) &&
                <Menu.Item as="a" icon onClick={this.incrementPage}>
                  <Icon name="right chevron" />
                </Menu.Item>
              }
            </Menu>
          }
        </div>
      )
    }
  }

}

export default pagination;
