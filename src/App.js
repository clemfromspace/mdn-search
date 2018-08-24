import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  HierarchicalMenu,
  PoweredBy,
  RefinementList,
  Highlight
} from 'react-instantsearch/dom';

import logo from './logo.svg';
import './App.css';

const flags_icons = {
  deprecated: 'thumbs-o-down',
  experimental: 'flask',
  nonstandard: 'exclamation-triangle',
  obsolete: 'trash'
};

class HitComponent extends Component {
  render() {
    let hit = this.props.hit;
    return (
      <div className="hit">
        <h2>
          {hit.flags.map((flag, i) =>
            <i className={'fa fa-' + flags_icons[flag]} key={i} title={flag} />
          )}
          {hit.parent &&
            <span className="parent">
                [<code><Highlight attribute="parent" hit={hit} tagName="mark" />]</code>
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
        {hit.tags.map((tag, i) =>
          <span className="label" key={i}>{tag}</span>
        )}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <InstantSearch
        appId="QUWPJO7TEL"
        apiKey="fb3f639514e7e384f21494eb685eec61"
        indexName="dev_MDN"
      >
        <div className="container">
          <div className="header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Algolia MDN web docs</h1>
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
              <Hits hitComponent={HitComponent}/>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

export default App;
