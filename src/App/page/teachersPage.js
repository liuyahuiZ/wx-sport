import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import moment from 'moment';
import { teacherInfo } from '../api/subject';

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
const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%2F%23%2FTeachers";
const appId = 'wx9a7768b6cd7f33d0';
class Teachers extends BaseView {
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
          teacherInfos: {}
      };
    }
    componentDidMount(){
      let obg = UrlSearch();
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        if(userInfo&&userInfo!==''&&obg.clean){
          storage.removeStorage('userInfo');
          storage.removeStorage('userId');
        }
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          this.getUserinfo(obg.code);
        }
      }else{
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
        }
      }
      if((userId&&userId!=='')){
        // this.getMyClass(userId);
        this.getMyClass(userId);
        // this.getCourseRatio(userId);
      }
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    getUserinfo(code){
      const self = this;
      getToken({code: code}).then((data)=>{
        console.log(data);
       if(JSON.stringify(data)!=='{}'){
          storage.setStorage('userInfo', data);
          storage.setStorage('userId', data.id);
          // self.getMyClass(data.id);
          // self.getCourseRatio(data.id);
          // self.registry();
          self.setState({
            userInfo: data,
            userId: data.id
          })
          self.getMyClass(data.id)
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: err, time: 3000 });
      })
    }

    getMyClass(userId){
      const self = this;
      Loade.show();
      teacherInfo({teacherId: userId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(data){
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
        const { teacherInfos, userInfo, loadText, ratioList, userId } = this.state;
        const self = this;
        let courseTypesDom = teacherInfos&&teacherInfos.courseTypes ?
        teacherInfos.courseTypes.map((itm, idx)=>{
          return (<Row key={`${idx}-type`} className="relative text-align-center margin-top-2" 
          onClick={()=>{self.goLink('/TeacherStudent', {teacherId: userId, courseTypeId:itm.id})}}>
            <Col className="relative text-align-center overflow-hide">
              <span className="line-height-6r  textclolor-white zindex-10 relative">{itm.name}</span>
              <div className="width-100 bg-000 opacity-5 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
              <img src={itm.bgiUrl.split(',')[1]} className="width-100 absolute-left zindex-6 bg" />
            </Col>
          </Row>)
        }) : ''
        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                  <Col className="margin-top-1r text-align-center zindex-10">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                        <img src={teacherInfos.img} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{teacherInfos.name || '请登陆'}</span>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bg1" />
                </Row>
                </TransAnimal>
              </Col>
              <Col className="margin-top-1r padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                <Row className="margin-top-1r">
                    <Col span={8} className="zindex-10 text-align-left">
                        <Row>
                            <Col className="font-size-small textclolor-white">解答次数</Col>
                            <Col >
                              <span className="font-size-large textcolor-9eea6a">{teacherInfos.answerNum||0}</span>
                              <span className="font-size-small textclolor-black-low">次</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} className="zindex-10 text-align-center">
                        <Row>
                            <Col className="font-size-small textclolor-white">完成课程</Col>
                            <Col className="">
                              <span className="font-size-large textcolor-9eea6a">{teacherInfos.courseNum||0}</span>
                              <span className="font-size-small textclolor-black-low">个</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} className="zindex-10 text-align-right">
                        <Row>
                            <Col className="font-size-small textclolor-white">总用户</Col>
                            <Col className="">
                              <span className="font-size-large textcolor-9eea6a">{teacherInfos.studentNum||0}</span>
                              <span className="font-size-small textclolor-black-low">人</span>
                            </Col>
                        </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-align-center relative margin-top-1r">
                      <span className="line-height-6r textclolor-white zindex-10 relative">自定义动作库</span>
                      <div className="width-100 bg-000 opacity-5 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                      <div className="width-100 absolute-left zindex-6 heightp-100 bg bg2" />
                    </Col>
                    <Col className="text-align-center relative margin-top-1r">
                      <span className="line-height-6r textclolor-white zindex-10 relative">编辑定制计划</span>
                      <div className="width-100 bg-000 opacity-5 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                      <div className="width-100 absolute-left zindex-6 heightp-100 bg bg3" />
                    </Col>
                  </Row>
              </Col>
              <Col className="margin-top-1r padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                {courseTypesDom}
              </Col>
            </Row>
          </section>
        );
    }
}
export default Teachers;
