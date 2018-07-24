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

const ClassDetail = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/classDetail').default)
  },'ClassDetail')
};

const TeacherRate = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/teacherRate').default)
  },'TeacherRate')
};

const Ranking = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/ranking').default)
  },'Ranking')
};

const PersonalFiles = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/personalFiles').default)
  },'PersonalFiles')
};

const MyClassDetail = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myClassDetail').default)
  },'MyClassDetail')
};

const ClassList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/classList').default)
  },'ClassList')
};

const ClassAppointment = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/classAppointment').default)
  },'ClassAppointment')
};

const TrainResult = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/trainResult').default)
  },'TrainResult')
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
        <IndexRedirect to="/Tab"/>
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
        <Route path={'ClassList'} getComponent={ClassList} />
        <Route path={'ClassDetail'} getComponent={ClassDetail} />
        <Route path={'TeacherRate'} getComponent={TeacherRate} />
        <Route path={'Ranking'} getComponent={Ranking} />
        <Route path={'PersonalFiles'} getComponent={PersonalFiles} />
        <Route path={'MyClassDetail'} getComponent={MyClassDetail} />
        <Route path={'ClassAppointment'} getComponent={ClassAppointment} />
        <Route path={'TrainResult'} getComponent={TrainResult} />
      </Route>
    </Router>
    )
  }
}
export default MyRouter
