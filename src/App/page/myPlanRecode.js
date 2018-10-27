import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import moment from 'moment';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
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
          selectRecode: res.result[0]
        })
      }).catch((err)=>{
        Loade.hide();
      })
    }
    getCoursePlan(itm){
      const self = this;
      coursePlanRecordsDetail({
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
      let selected = { text: selectRecode.date, value: selectRecode.id};
      let optionsArr = recodes&&recodes.length>0 ? recodes.map((itm, idx)=>{
        return { text: itm.date, value: itm.id, obg: itm}
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
            selectRecode: val.obg,
          });
          self.getCoursePlan(val.obg)
        }
      });
    }

    render() {
        const {selectRecode, recodes, detailData, status, itmStatus, feedback} = this.state;
        const self = this;
        const carouselMap = detailData&&detailData.imgUrlList ?  
        detailData.imgUrlList.map((itm, idx)=>{
          return { tabName: idx, content: (<img alt="text" src={itm} />), isActive: false } 
        }): [
          {
            tabName: 1,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg' />),
          },{
            tabName: 2,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/01/15/1519888737768_315x315.png'/>)
          }
        ];
        
        const coursePlanActionsDom = detailData&&detailData.coursePlanActions ? detailData.coursePlanActions.map((itm, idx)=>{
          const itmDom = itm.detailList&&itm.detailList.length > 0 ? itm.detailList.map((itme, idxs)=>{
            return (<Row key={`${idxs}-st`} gutter={16} className="padding-top-1r padding-bottom-1r border-bottom border-color-333 text-align-center">
              <Col className="textclolor-white" span={8}>
                <Row><Col>{itme.name}</Col><Col className={"font-size-8 textclolor-black-low"}>{itme.intension}分强度</Col></Row>
              </Col>
              <Col className="textclolor-white" span={4}>
                <Row>
                  <Col className={"font-size-8 textclolor-black-low"}>重量kg</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.weight}</Col>
                </Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-8 textclolor-black-low"}>组数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.groupNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-8 textclolor-black-low"}>次数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.cycleNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={6}>
                <Row>
                  <Col className={"font-size-8 textclolor-black-low"}>持续时间</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.time}</Col></Row>
              </Col>
            </Row>)
          }) : <div />;
          return (<Row key={`${idx}-stps`} className="padding-all bg-1B1B1B margin-top-2 border-radius-5f">
          <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
            <Row >
              <Col className="text-align-center heighr-5 line-height-5r overflow-hide relative">
               <span className="zindex-10 textclolor-white relative margin-top-2">{itm.name} ({itm.cycleNum})</span>
               <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
               <img src={itm.bg} className={'width-100 absolute-left zindex-6'} />
              </Col>
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
                  <Col span={16} className="text-align-right">{selectRecode.date}</Col>
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
                          <Panel title={'计划要点'}>
                            <div>{detailData.kernel}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                      <Col>
                        <Collapse >
                          <Panel title={'训练提示'}>
                            <div>{detailData.tips}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col span={8} className={"textclolor-black-low text-align-center font-size-8"}>动作总数</Col>
                  <Col span={8} className={"textclolor-black-low text-align-center font-size-8"}>训练时间</Col>
                  <Col span={8} className={"textclolor-black-low text-align-center font-size-8"}>有氧运动</Col>
                  <Col span={8} className={"textcolor-79EF44 text-align-center font-size-16"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseMoveNum||0}</Col>
                  <Col span={8} className={"textcolor-79EF44 text-align-center font-size-16"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseTime||0}</Col>
                  <Col span={8} className={"textcolor-79EF44 text-align-center font-size-16"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.aerobicsExerciseTime||0}</Col>
                </Row>
              </Col>
              <Col>{coursePlanActionsDom}</Col>
              { detailData&&detailData.mvUrl ? <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                src={detailData.mvUrl} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
              </Col>: <div />}
              { detailData&&detailData.mvUrl ? <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }} />
              </Col> : <div />}

              <Col className="margin-top-2 padding-all relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">疑问动作描述:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low">{feedback.doubtText}</Col>
                </Row>
              </Col>
              <Col className="margin-top-2 padding-all relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">训练反馈:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low">{feedback.feel}</Col>
                </Row>
              </Col>
              <Col className="margin-top-2 padding-all relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">教练反馈:</Col>
                </Row>
                <Row>
                <Col className="textclolor-black-low">{feedback.revert}</Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
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
