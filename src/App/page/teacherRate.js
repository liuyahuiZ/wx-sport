import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import BaseView from '../core/app';
import moment from 'moment';
import { UrlSearch } from '../utils';
import { userMark, userInfo, courseDetail } from '../api/classes';
import { teacherMark } from '../api/subject';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Rate,
    Loade,
    TagRadio
} = Components;
const { sessions, storage } = utils;

class TeacherRate extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          resourceKey: '1',
          kcnd: { value: 1, text: '简单', checked: true },
          jjwt: { value: 1, text: '不清晰', checked: true },
          ywjd: { value: 1, text: '能', checked: true },
          selectDay: {},
          detailData: {}
      };
    }

    _viewAppear(){
      this.getUserInfo();
      this.initClander();
      this.getClassDetail();
    }

    getClassDetail(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseDetail({id: obg.courseId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          self.setState({
            detailData: res.result
          })
        }
      }).catch((err)=>{
        Loade.hide();
      })
    }

    initClander(){
      const self = this;
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
      
      let weekOfday = moment().format('dddd');
      var today = moment().format('YYYY-MM-DD');
      let dataArr=[];
      let length = 8;
      for(let i=1;i<length;i++){
        let Name = moment().add('days', i).format('dddd')
        if(i===0){ Name = '今天'} else if(i===1) {Name = '明天'}
        dataArr.push({
          dateName: Name,
          date: moment().add('days', i).format('DD'),
          dateTime: moment().add('days', i).format('YYYY-MM-DD')
        })
      }
      this.setState({
        dateArr: dataArr,
        selectDay: dataArr[0]
      });

    }

    setValue(key,val){
        this.setState({[key]: val});
    }

    getUserInfo(){
      let obg = UrlSearch();
      const self = this;
      userInfo({userId: obg.teacherId}).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let info = res.result;
        self.setState({
          userInfo: info || {}
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '获取教练信息失败', time: 3000 });
      })
    }

    goLink(link, itm){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: itm || ''
        });
      }
    }

    submitMark(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      const self = this;
      const {kcnd, jjwt, ywjd, selectDay} = this.state;
      Loade.show();
      teacherMark({
        teacherId: obg.teacherId,
        userId: userId,
        kcnd: kcnd.value,
        jjwt: jjwt.value,
        ywjd: ywjd.value,
        courseId: obg.courseId,
        onlineDate: selectDay.dateTime
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { 
          Modal.alert({ title: '',
          content: "您已对该教练评分，请勿重复评分!",
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
          },
          () => { 
            self.goLink('/Tab')
          });
        }
          //Toaster.toaster({ type: 'error', content: '您已对该教练评分，请勿重复评分！', time: 3000 }); return; }
        if(res.code>0){
          Modal.alert({ title: '评分成功',
          content: "您对该教练评分成功!",
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
          },
          () => { 
            self.goLink('/Tab')
          });
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { userInfo, kcnd, jjwt, ywjd, dateArr, selectDay, detailData } = this.state;
        const self = this;

        const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7} onClick={()=>{ console.log(itm); self.setState({'selectDay': itm}); }}>
          <Row><Col className="font-size-small textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-small textclolor-black-low text-align-center">
          <div className={`${selectDay.dateName==itm.dateName ? 'bg-8EBF66 textclolor-333' :'' } display-inline-block font-size-small textclolor-white small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
        }) : <Col className="text-align-center font-size-small textclolor-white line-height-2r">{loadText}</Col>;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-000 border-radius-5f  overflow-hide relative">
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r  overflow-hide">
                        <img src={userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <span className="zindex-10 textclolor-white">{userInfo.nickName}</span>
                  </Col>
                  <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-small textclolor-white font-weight-700">{detailData.title || ''}</span>
                  </Col>
                  <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-small textclolor-white">{detailData.startDate || ''}</span>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bgx" />
                </Row>
                </TransAnimal>
              </Col>
             
              <Col span={24} className="bg-1B1B1B margin-top-2 padding-top-2r padding-bottom-2r border-radius-5f">
                <Row justify="center">
                  <Col className="text-align-center textclolor-black-low font-size-small">我们希望获得您的反馈，以持续改善</Col>
                  <Col className="text-align-center textclolor-black-low font-size-small">我们的计划内容</Col>
                  <Col span={22} className="border-bottom border-color-333 margin-top-1r padding-bottom-1r">
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r font-size-small textclolor-black-low text-align-center line-height-20">课程难度</div>
                      </Col>
                      <Col span={18} className="font-size-9">
                        <TagRadio options={[{ value: 1, text: '简单', checked: true }, { value: 5, text: '中等' }, { value: 10, text: '困难' } ]}
                        checkStyle={{"backgroundColor":"rgb(158, 234, 106)","color": '#000'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v, it)=>{
                          console.log(it)
                          self.setValue('kcnd', it)
                        }} />
                      </Col>
                    </Row>
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r  font-size-small textclolor-black-low text-align-center line-height-20">讲解问题</div>
                      </Col>
                      <Col span={18} className="font-size-9">
                      <TagRadio options={[{ value: 1, text: '不清晰', checked: true }, { value: 5, text: '模糊' }, { value: 10, text: '清晰' } ]}
                        checkStyle={{"backgroundColor":"rgb(158, 234, 106)","color": '#000'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v, it)=>{
                          console.log(it)
                          self.setValue('jjwt', it)
                        }} />
                      </Col>
                    </Row>
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r font-size-small textclolor-black-low text-align-center line-height-20">疑问解答</div>
                      </Col>
                      <Col span={18} className="font-size-9">
                        <TagRadio options={[{ value: 1, text: '能', checked: true }, { value: 5, text: '基本可以' }, { value: 10, text: '不能' } ]}
                        checkStyle={{"backgroundColor":"rgb(158, 234, 106)","color": '#000'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v, it)=>{
                          console.log(it)
                          self.setValue('ywjd', it)
                        }} />
                      </Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center textclolor-white margin-top-1r font-weight-700">选择开始课程的第一天</Col>
                  <Col className="text-align-center textclolor-black-low margin-top-1r">设定7天内开始</Col>
                </Row>
                <Row className="margin-top-1r">{clenderDom}</Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    this.submitMark()
                  }}
                />
              </Col>
        

            </Row>
          </section>
        );
    }
}
export default TeacherRate;
