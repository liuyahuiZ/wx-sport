import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import computed from '../utils/computed'
import { UrlSearch } from '../utils';
import moment from 'moment';
import { teacherStudents } from '../api/subject';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    ProgressCircle,
    Tab,
    Progress,
    ProgressDrag,
    Loade
  } = Components;
const { sessions, storage } = utils;
//"https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%2F%23%2FTab"
const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html";
const appId = 'wx9a7768b6cd7f33d0';
class TeacherStudent extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          status: this.props.status,
          resourceKey: '1',
          userInfo: storage.getStorage('userInfo') ||{},
          myClassList:[],
          ratioList: [],
          loadText: '加载中',
          userId: storage.getStorage('userId') ||{},
          studentList: [
            {
                "id": 9,
                "name": "James",
                "courseTypeId": 1,
                "date": "2018-10-23",
                "trainingDays": 4,
                "trainingMinutes": 756,
                "completePercent": 0.4,
                "userId": 106,
                "userImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcS8JFW5URGUbYPbSDibkSQiauvwsBU8sFvFu3zmS3cz4ZslANmc70fbEu7QbicNLZxckhSrDHoGvqg/132"
            },
            {
                "id": 10,
                "name": "会飞的猫",
                "courseTypeId": 2,
                "date": "2018-10-23",
                "trainingDays": 1,
                "trainingMinutes": 0,
                "completePercent": 0.1,
                "userId": 106,
                "userImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcS8JFW5URGUbYPbSDibkSQiauvwsBU8sFvFu3zmS3cz4ZslANmc70fbEu7QbicNLZxckhSrDHoGvqg/132"
            }
        ]
      };
    }

    componentDidMount(){
      this.getMyClass();
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    getMyClass(){
      const self = this;
      let obg = UrlSearch();
      Loade.show();
      teacherStudents({teacherId: obg.teacherId, courseTypeId: obg.courseTypeId }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(data && data.length > 0){
          self.setState({
            teacherInfos: data
          })
        } else {
          self.setState({
            loadText: '暂无数据'
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }

    checkUser(){
      console.log(storage.getStorage('userInfo'));
      if (storage.getStorage('userInfo')) {
        this.goLink('/PersonalFiles');
      } else {
        window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
      }
    }
    
    goLink(link, itm){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: itm || ''
        });
      }
    }

    render() {
        const { loadText, studentList, userId } = this.state;
        const self = this;
        let courseTypesDom = studentList&&studentList.length > 0 ?
        studentList.map((itm, idx)=>{
          return (<div key={`${idx}-train`}  className="overflow-hide relative heighr-8 textclolor-white padding-all margin-bottom-3"
          onClick={()=>{self.goLink('/MyPlanRecode', {courseId: itm.id})}}>
              <Row>
                  <Col span={12} className="zindex-10 font-size-normal text-align-left">{itm.name}</Col>
                  <Col span={12} className="zindex-10 font-size-small text-align-right line-height-2r">{itm.date}</Col>
              </Row>
              <Row className="">
                  <Col span={8} className="zindex-10 text-align-right margin-top-2">
                    <div className="middle-round overflow-hide border-radius-9r">
                        <img className='middle-round'
                        src={itm.userImage}
                      />
                    </div>
                  </Col>
                  <Col span={8} className="zindex-10 text-align-left margin-top-1r">
                      <Row>
                          <Col className="font-size-small">训练天数</Col>
                          <Col className="font-size-large">{itm.trainingDays}</Col>
                      </Row>
                  </Col>
                  <Col span={8} className="zindex-10 text-align-center margin-top-1r">
                      <Row>
                          <Col className="font-size-small">完成比例</Col>
                          <Col className="font-size-large">{computed.accMul(itm.completePercent||0, 100)}%</Col>
                      </Row>
                  </Col>
              </Row>
              <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
              <div className="width-100 absolute-left heightp-100 zindex-6 bg bg3" />
          </div>)
        }) : ''
        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col className="margin-top-1r padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                {courseTypesDom}
              </Col>
            </Row>
          </section>
        );
    }
}
export default TeacherStudent;
