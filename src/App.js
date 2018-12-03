import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  HierarchicalMenu,
  PoweredBy,
  RefinementList,
  Highlight,
  Pagination
} from 'react-instantsearch/dom';

import './App.css';

const flags_icons = {
  deprecated: 'thumbs-o-down',
  experimental: 'flask',
  nonstandard: 'exclamation-triangle',
  obsolete: 'trash'
};

class HitComponent extends Component {

  categoryPath = () => {
    const { hit } = this.props;
    const categoryKeys = Object.keys(hit.categories);
    const categoryPath = categoryKeys[categoryKeys.length-1]
    return (
      <span className="breadcrumbs">{hit.categories[categoryPath]}</span>
    );
  }

  render() {
    let hit = this.props.hit;
    return (
      <div className="hit">
        {this.categoryPath()}
        <h2>
          {hit.flags.map((flag, i) =>
            <i className={'fa fa-' + flags_icons[flag]} key={i} title={flag} />
          )}
          {hit.parent &&
            <span className="parent">
                <code>[<Highlight attribute="parent" hit={hit} tagName="mark" />]</code>
            </span>
          }
          <a href={hit.link} target="_blank">
            <code>
              <Highlight attribute="name" hit={hit} tagName="mark" />
            </code>
          </a>
          {hit.child_type &&
            <span className="label">{hit.child_type}</span>
          }
        </h2>
        <p>
          <Highlight attribute="short_description" hit={hit} tagName="mark" />
        </p>
        {hit.syntax &&
          <pre className="syntaxbox">
            <Highlight attribute="syntax" hit={hit} tagName="mark" />
          </pre>
        }
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="BU16S1B9J9"
        apiKey="01cdd67acae098cf2fc908685b6aa9bc"
        indexName="MDN"
      >
        <div className="container">
          <div className="header">
            <h1>Search the MDN web docs</h1>
            <PoweredBy/>
          </div>
          <div className="row">
            <div className="col-3 filters">
              <div className="filters__item">
                <SearchBox/>
              </div>
              <div className="filters__item">
                <div className="filters__item__title">Categories</div>
                <HierarchicalMenu
                  id="categories"
                  key="categories"
                  attributes={[
                    'categories.lvl0',
                    'categories.lvl1'
                  ]}
                />
              </div>
              <div className="filters__item">
                <div className="filters__item__title">Flags</div>
                <RefinementList attribute="flags" limit={10}/>
              </div>
              <div className="filters__item filters__item--tags">
                <div className="filters__item__title">Tags</div>
                <RefinementList attribute="tags" searchable={true} limit={3} operator="and"/>
              </div>
            </div>
            <div className="col-9">
              <div className="hits-wrapper">
                <Hits hitComponent={HitComponent}/>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

export default App;
