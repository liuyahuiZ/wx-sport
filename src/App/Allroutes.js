import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import LayOut from './core/LayOut';
import ListDoc from './page/list';
import Home from './page/home';
import PicturePoster from './page/picturePoster';

const DomeDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/demo').default)
  },'DomeDoc')
};

const ServiceTitle = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/serviceTitle').default)
  },'ServiceTitle')
};

const About = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/about').default)
  },'About')
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

const MyClassAppointment = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myClassAppointment').default)
  },'MyClassAppointment')
};

const TrainResult = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/trainResult').default)
  },'TrainResult')
};

const UserSign = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/userSign').default)
  },'UserSign')
};

const TeacherPersonal = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/teacherPersonal').default)
  },'TeacherPersonal')
};

const Registor = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/registor').default)
  },'Registor')
};

const SuccessPage = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/successPage').default)
  },'SuccessPage')
};

const MyPlan = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myPlan').default)
  },'MyPlan')
};

const TrainResultOver = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/trainResultOver').default)
  },'TrainResultOver')
};

const MyPlanRecode = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myPlanRecode').default)
  },'MyPlanRecode')
};

const TeachersPage = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/teachersPage').default)
  },'TeachersPage')
};

const TeacherStudent = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/teacherStudent').default)
  },'TeacherStudent')
};

const ParqPage = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/parqPage').default)
  },'ParqPage')
};

const AllPicturePoster = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/allPicturePoster').default)
  },'AllPicturePoster')
};

const StudentPlanRecode = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/studentPlanRecode').default)
  },'StudentPlanRecode')
};

const Recharge = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/recharge').default)
  },'Recharge')
};

// const PicturePoster = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/picturePoster').default)
//   },'PicturePoster')
// };

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
        <Route path={'About'} getComponent={About} />
        <Route path={'ServiceTitle'} getComponent={ServiceTitle} />
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
        <Route path={'UserSign'} getComponent={UserSign} />
        <Route path={'PicturePoster'} component={PicturePoster} />
        <Route path={'TeacherPersonal'} getComponent={TeacherPersonal} />
        <Route path={'Registor'} getComponent={Registor} />
        <Route path={'Success'} getComponent={SuccessPage} />
        <Route path={'MyClassAppointment'} getComponent={MyClassAppointment} />
        <Route path={'MyPlan'} getComponent={MyPlan} />
        <Route path={'TrainResultOver'} getComponent={TrainResultOver} />
        <Route path={'MyPlanRecode'} getComponent={MyPlanRecode} />
        <Route path={'Teachers'} getComponent={TeachersPage} />
        <Route path={'TeacherStudent'} getComponent={TeacherStudent} />
        <Route path={'ParqPage'} getComponent={ParqPage} />
        <Route path={'AllPicturePoster'} getComponent={AllPicturePoster} />
        <Route path={'StudentPlanRecode'} getComponent={StudentPlanRecode} />
        <Route path={'Recharge'} getComponent={Recharge} />
      </Route>
    </Router>
    )
  }
}
export default MyRouter
