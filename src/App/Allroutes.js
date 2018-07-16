import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import LayOut from './core/LayOut';
import ListDoc from './page/list';
import Home from './page/home';

const DomeDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/demo').default)
  },'DomeDoc')
};

const OcrDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/ocr').default)
  },'OcrDoc')
};

const OcrLiveDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/ocrLive').default)
  },'OcrLiveDoc')
};

const AccessAuthor = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/accessAuthor').default)
  },'AccessAuthor')
};

const TabDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/tab').default)
  },'TabDoc')
};

const CreateArticleDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/createArticle').default)
  },'CreateArticleDoc')
};

const ArticleDetail = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/articleDetail').default)
  },'ArticleDetail')
};

const Pictures = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/pictures').default)
  },'Pictures')
};

const Trans = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/trans').default)
  },'Trans')
};

class MyRouter extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Router history={hashHistory}>
      <Route path={'/'} component={LayOut} >
        {/* <IndexRoute component={ListDoc} /> */}
        <IndexRedirect to="/Home"/>
        <Route path={'Home'} component={Home} />
        <Route path={'Lists'} component={ListDoc} />
        <Route path={'Demo'} getComponent={DomeDoc} />
        <Route path={'Ocr'} getComponent={OcrDoc} />
        <Route path={'OcrLive'} getComponent={OcrLiveDoc} />
        <Route path={'AccessAuthor'} getComponent={AccessAuthor} />
        <Route path={'Tab'} getComponent={TabDoc} />
        <Route path={'CreateArticle'} getComponent={CreateArticleDoc} />
        <Route path={'ArticleDetail'} getComponent={ArticleDetail} />
        <Route path={'Pictures'} getComponent={Pictures} />
        <Route path={'Trans'} getComponent={Trans} />
      </Route>
    </Router>
    )
  }
}
export default MyRouter
