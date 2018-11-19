import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import moment from 'moment';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import formate from '../utils/formate';
import { coursePlanRecords, coursePlanRecordsDetail} from '../api/classes';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Carousel,
    TimeRunner,
    Loade,
    Collapse,
    Panel,
    ActionSheet
} = Components;
const { sessions, storage } = utils;

class MyPlanRecode extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          status: false,
          itmStatus: true,
          detailData: {
            coursePlanDetails: {}
          },
          recodes: [],
          selectRecode: {},
          coursePlan: {},
          feedback: {},
          userId: storage.getStorage('userId'),
      };
    }
    _viewAppear(){
      this.getRecodes();
    }

    getRecodes(){
      let obg = UrlSearch();
      Loade.show();
      const self = this;
      coursePlanRecords({
        userId: storage.getStorage('userId'),
        courseId: obg.courseId
      }).then((res)=>{
        Loade.hide();
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.getCoursePlan(res.result[0]);
        self.setState({
          recodes: res.result,
          selectRecode: {text: `第一天 ${res.result[0].date}`, obg:res.result[0]}
        })
      }).catch((err)=>{
        Loade.hide();
      })
    }
    getCoursePlan(itm){
      const self = this;
      coursePlanRecordsDetail({
        userId: storage.getStorage('userId'),
        planId: itm.planId,
        feedbackId: itm.id,
        courseId: itm.courseId
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          detailData: data.coursePlan || {},
          feedback: data.feedback
        })
      }).catch((e)=>{
        console.log(e)
      })
    }
    setValue(key,val){
        this.setState({[key]: val});
    }

    goLink(link, itm){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: itm || ''
        });
      }
    }

    doSheet(){
      const {recodes, selectRecode } = this.state;
      const self = this;
      let days = ['一','二','三','四','五','六','七','八','九','十', '十一'];
      let selected = { text: `第${days[0]}天 ${selectRecode.date}`, value: selectRecode.id};
      let optionsArr = recodes&&recodes.length>0 ? recodes.map((itm, idx)=>{
      return { text: (<div>第{days[idx]}天 {itm.date}{itm.readed == false ? <Icon  iconName={'record'} size={'0.1rem'} iconColor={'#ea3a3a'} /> :  ''}</div>), value: itm.id, obg: itm}
      }) : [];
      ActionSheet.formConfirm({
        content: 'this is a warning',
        defaultValue: selected,
        options: optionsArr,
        type: 'top',
        showIcon: true,
        showCancleBtn: false,
        containerStyle: { top: '0rem'},
        cancleCallback: (val) => {

        },
        successCallback: (val) => {
          console.log(val);
          self.setState({
            selectRecode: {
              date: val.obg.date,
              id: val.value,
              value: val.value,
              ...val
            },
          });
          self.getCoursePlan(val.obg)
        }
      });
    }

    render() {
        const {selectRecode, recodes, detailData, status, itmStatus, feedback} = this.state;
        const self = this;
        console.log(feedback.doubtImageUrl);
        const carouselMap = feedback&&feedback.doubtImageUrl ?  
         [{ tabName: 'idx', content: (<img alt="text" src={feedback.doubtImageUrl} />), isActive: false }]
        : [
          {
            tabName: 1,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg' />),
          }
        ];
        
        const coursePlanActionsDom = detailData&&detailData.coursePlanActions ? detailData.coursePlanActions.map((itm, idx)=>{
          const itmDom = itm.detailList&&itm.detailList.length > 0 ? itm.detailList.map((itme, idxs)=>{
            return (<Row key={`${idxs}-st`} className="padding-top-1r padding-bottom-1r border-bottom border-color-333 text-align-center">
              <Col className="textclolor-white" span={8}>
                <Row><Col>{itme.name}</Col><Col className={"font-size-small textclolor-black-low"}>{itme.intension}分强度</Col></Row>
              </Col>
              <Col className="textclolor-white" span={4}>
                <Row>
                  <Col className={"font-size-small textclolor-black-low"}>重量kg</Col>
                  <Col className={"padding-all-2 font-size-normal border-radius-5f textcolor-8EBF66"}>{itme.weight}</Col>
                </Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-small textclolor-black-low"}>组数</Col>
                <Col className={"padding-all-2 font-size-normal border-radius-5f textcolor-8EBF66"}>{itme.groupNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-small textclolor-black-low"}>次数</Col>
                <Col className={"padding-all-2 font-size-normal border-radius-5f textcolor-8EBF66"}>{itme.cycleNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={6}>
                <Row>
                  <Col className={"font-size-small textclolor-black-low"}>持续时间</Col>
                  <Col className={"padding-all-2 font-size-normal border-radius-5f textcolor-8EBF66"}>{formate.minutes(itme.time)}</Col></Row>
              </Col>
            </Row>)
          }) : <div />;
          return (<Row key={`${idx}-stps`} className="padding-all bg-1B1B1B margin-top-2 border-radius-5f">
          <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
            <Row >
              <Col className="text-align-center heighr-5 line-height-5r overflow-hide relative">
               <span className="zindex-10 textclolor-white relative margin-top-2">{itm.name} {itm.cycleNum}轮</span>
               <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
               <img src={itm.bg} className={'width-100 absolute-left zindex-6'} />
              </Col>
              {itm.restTime !==0 ? <Col className="bg-000 line-height-3r"> 
                  <Icon iconName={'android-time '} size={'130%'} iconColor={'#fff'} /> 
                  <span className="textclolor-333 font-size-normal margin-right-1 bg-8EBF66 border-radius-5f">{parseInt((itm&&itm.restTime)/60)||0}:{parseInt((itm&&itm.restTime)%60)||0}</span>
                  <span className="textclolor-black-low">每个动作之间休息时间</span>
                  </Col> : ''}
            </Row>
          </Col>
          <Col>{itmDom}</Col>
      </Row>)
        }) : <div />
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="border-radius-5f overflow-hide bg-1B1B1B" onClick={()=>{self.doSheet()}}>
                <Row className="textclolor-white padding-all" gutter={16}>
                  <Col span={16} className="text-align-right">{selectRecode.text}</Col>
                  <Col span={8} className="text-align-left">
                    <Icon iconName={'chevron-down '} size={'100%'} iconColor={'#fff'} />
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-2">
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>
              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row className="" content="flex-start">
                  <Col className="bg-1B1B1B">
                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <Collapse >
                          <Panel title={<span className="font-weight-700">计划要点</span>}>
                            <div>{detailData.kernel}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                      <Col>
                        <Collapse >
                          <Panel title={<span className="font-weight-700">训练提示</span>}>
                            <div>{detailData.tips}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row className="padding-all">
                  <Col span={4} className={"textclolor-black-low text-align-center font-size-small"}>动作总数</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-small"}>训练时间</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-small"}>有氧运动</Col>
                  <Col span={4} className={"textcolor-9eea6a text-align-center font-size-normal"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseMoveNum||0}</Col>
                  <Col span={10} className={"textcolor-9eea6a text-align-center font-size-normal"}>{formate.minute(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseTime||0)}</Col>
                  <Col span={10} className={"textcolor-9eea6a text-align-center font-size-normal"}>{formate.minute(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.aerobicsExerciseTime||0)}</Col>
                </Row>
              </Col>
              <Col>{coursePlanActionsDom}</Col>
              { feedback&&feedback.doubtMvUrl ? <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                src={feedback.doubtMvUrl} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
              </Col>: <div />}
              { feedback&&feedback.doubtMvUrl ? <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }} />
              </Col> : <div />}

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-2r bg-0C0C0C padding-left-3 ">疑问动作描述:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low padding-all ">{feedback.doubtText}</Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white padding-left-3 line-height-2r bg-0C0C0C">训练反馈:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low padding-all">{feedback.feel}</Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-2r bg-0C0C0C padding-left-3">教练反馈:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low padding-all">{feedback.revert}</Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    hashHistory.goBack();
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default MyPlanRecode;
