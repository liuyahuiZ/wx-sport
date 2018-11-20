import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import wx from 'weixin-js-sdk';
import { subjectDetail, createOrder } from '../api/subject';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel,
    Loade,
    ProgressDrag,
    Checkbox,
    LabelGroup
} = Components;
const { sessions, storage } = utils;

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      this.state = {
          dataDetail: {},
          subjectId: obg.subjectId,
          chosePlanTypeId: '',
          difficulty: 0
      };
    }
    _viewAppear(){
      let obg = UrlSearch();
      console.log(obg)
      const self = this;
      Loade.show();
      subjectDetail(obg.subjectId).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(JSON.stringify(data)!=='{}'){
          self.setState({
            dataDetail: data || {},
            difficulty: data.difficuity
          })
          sessions.setStorage('nowSubject', data);
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
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
        });
      }
    }

    chosePlan(itm){
      this.setState({
        chosePlanTypeId: itm.id
      })
    }

    doPlan(){
      let obg = UrlSearch();
      const {chosePlanTypeId, difficulty} = this.state
      if(!chosePlanTypeId&&chosePlanTypeId==='') {
          Toaster.toaster({ type: 'error', position: 'top', content: '请选择计划', time: 3000 }, true);
          return false;
      }
      this.goLink('/ClassList', {
        subjectId : obg.subjectId,
        courseTypeId: chosePlanTypeId,
        difficulty: difficulty
        // orderId: res.orderId
      })
    }

    render() {
        const { dataDetail, chosePlanTypeId, difficulty } = this.state;
        let obg = UrlSearch();
        const self = this;
        const carouselMap = [];
        if(dataDetail&&dataDetail.slideImgUrlList) {
          for (let i=0; i< dataDetail.slideImgUrlList.length;i++){
            carouselMap.push({tabName: `f-${i}`, content: (<img alt="text" src={dataDetail.slideImgUrlList[i]} />), isActive: true })
          }
        }
        const stepArr = JSON.stringify(dataDetail)!=='{}'&&dataDetail ? dataDetail.step.split('|'): [];

        const stepDom = stepArr.length > 0 ? stepArr.map((itm, idx)=>{
          const botIcon = idx === (stepArr.length-1) ? '' : 
          (<Icon iconName={'android-arrow-dropdown '} className="nopadding" size={'150%'} iconColor={'#000'} />)
          return (<Row justify='center' key={`stp-${idx}`}>
          <Col span={18} className="bg-000 padding-all border-radius-6r overflow-hide">
              <div className="text-align-center">
                <span className="display-inline-block bg-8EBF66 font-size-small textclolor-333 small-round text-align-center border-radius-100">{idx+1}</span>
                <span className="display-inline-block font-size-small textclolor-black-low padding-left-3">{itm}</span>
              </div>
              {/* <Row justify='center'>
                <Col span={3} className="textclolor-white ">
                  <span className="bg-8EBF66 font-size-small textclolor-white small-round text-align-center border-radius-100">{idx+1}</span>
                </Col>
                <Col span={11} className="font-size-small textclolor-black-low text-align-left">{itm}</Col>
              </Row> */}
          </Col>
          <Col className="text-align-center heighr-1 line-height-1r margin-bottom-1">{botIcon} </Col>
        </Row>)
        }) : <div />;

        const bodyPlanDom = dataDetail&&dataDetail.courseTypes ? dataDetail.courseTypes.map((itm, idx)=>{
          return <Col span={12} key={`${idx}-plan`} className="relative heighr-6 overflow-hide padding-all" onClick={()=>{self.chosePlan(itm)}}>
            <Row className="heighr-6" justify="center" align="center">
              <Col span={13} className={`${itm.id==chosePlanTypeId ? 'textclolor-white': 'textclolor-black-low'} text-align-right zindex-10`}>{itm.name}</Col>
              <Col span={1} />
              <Col span={10} className="text-align-left zindex-10"><Icon iconName='checkmark-circled' className="nopadding" size={'150%'} iconColor={itm.id==chosePlanTypeId ? '#8EBF66': '#999'} /></Col>
            </Row>
            <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
            <img className="width-100 absolute-left zindex-6 " src={itm.bgiUrl.split(',')[0]}  />
          </Col>
        }) : <div />;
        
        const poepleFirst = dataDetail&&dataDetail.fitPeoples ? dataDetail.fitPeoples.map((itm, idx)=>{
          return {text: itm, styles: {background: '#9eea6a'}} 
          //<span key={`${idx}-sp`} className={"padding-all-2 bg-8EBF66 border-radius-5f margin-right-1 font-size-small"}>{itm}</span>
        }) : [];
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col span={2} className="line-height-4r "><Icon iconName={'android-list '} size={'150%'} iconColor={'#fff'} /> </Col>
                  <Col span={22} className="font-size-normal textclolor-white line-height-4r font-weight-700">训练计划简介</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      <Col span={24} className="font-size-small textclolor-black-low margin-bottom-3 ">
                      {/* {dataDetail.intro} */}
                      {dataDetail&&dataDetail.intro&&dataDetail.intro.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: `<p>${dataDetail.intro}</p>`}} /> : dataDetail.intro}
                      </Col>                    
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-default textclolor-white">适用人群</Col>
                          <Col span={24} className="font-size-small textclolor-333 padding-top-1r padding-bottom-1r line-height-2r">
                          <LabelGroup options={poepleFirst} /></Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-default textclolor-white">计划难度</Col>
                          <Col span={24} className="font-size-small textclolor-black-low padding-all">
                          <ProgressDrag percent={difficulty} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'}
                          bgColor={'#333'} style={{height: '5px'}} barRoundStyle={{ 'width': '1.1rem','height': '1.1rem','background': '#333','border': '3px solid #4CF6C7'}} radius={20}
                          onChange={(v)=>{ console.log(v); self.setState({difficulty: v})}} barWidthDisable enableDrag={false} />
                          </Col>
                          <Col span={8} className="text-align-left font-size-small textclolor-black-low">简单</Col>
                          <Col span={8} className="text-align-center font-size-small textclolor-black-low">一般</Col>
                          <Col span={8} className="text-align-right font-size-small textclolor-black-low">复杂</Col>
                        </Row>
                      </Col>
                      {/* <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-default textclolor-white">训练费用</Col>
                          <Col span={24} className="font-size-small textclolor-black-low ">￥{(obg.price/100).toFixed(2)}</Col>
                        </Row>
                      </Col> */}
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r ">
                  {/* <Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} />  */}
                    <span className="icon icon-focus-small margin-top-1fr"></span>
                  </Col>
                  <Col span={22} className="font-size-normal textclolor-white line-height-4r font-weight-700">注意事项</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row>
                      <Col className="font-size-small textclolor-black-low ">
                      {dataDetail&&dataDetail.ps&&dataDetail.ps.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: `<p>${dataDetail.ps}</p>`}} /> : dataDetail.ps}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r ">
                  <Icon iconName={'ios-heart-outline '} size={'150%'} iconColor={'#fff'} /> 
                      {/* <span className="icon icon-working-small margin-top-1fr"></span> */}
                  </Col>
                  <Col span={22} className="font-size-normal textclolor-white line-height-4r font-weight-700">养身计划</Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row gutter={8}>
                      {bodyPlanDom}
                    </Row>
                  </Col>
                  <Col span={2} className="line-height-4r ">
                   {/* <Icon iconName={'android-radio-button-on '} size={'150%'} iconColor={'#fff'} />  */}
                   <span className="icon icon-working-small margin-top-1fr"></span>
                  </Col>
                  <Col span={22} className="font-size-normal textclolor-white line-height-4r font-weight-700">健身步骤</Col>
                  <Col className="bg-1B1B1B padding-all">
                    { stepDom }
                    <Row>
                      <Col span={3}><Checkbox
                      options={[{ value: '1', text: '', checkStatus: 'checked' }]}
                      onChange={(data) => {
                        console.log(data);
                      }}
                      ref={(r) => { this.$$checkbox1 = r; }}
                      /></Col>
                      <Col span={21} className="textclolor-black-low line-height-2r font-size-small" onClick={()=>{
                        this.goLink('/ParqPage')
                      }}>购买训练计划前，需要执行阅读 风险PAR-Q 要求</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text={`立即预约`}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    // this.undefindOrder()
                    self.doPlan()
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
