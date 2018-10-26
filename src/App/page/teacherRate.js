import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import BaseView from '../core/app';
import moment from 'moment';
import { UrlSearch } from '../utils';
import { userMark, userInfo } from '../api/classes';

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
          js: 5,
          bd: 5,
          wg: 5
      };
    }

    _viewAppear(){
      this.getUserInfo();
      this.initClander();
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
      let length = 7;
      for(let i=0;i<length;i++){
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
          userInfo: info
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '获取教练信息失败', time: 3000 });
      })
    }

    submitMark(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      const {js, bd, wg} = this.state;
      Loade.show();
      userMark({
        userId: obg.teacherId,
        js: js,
        bd: bd,
        wg: wg
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        Modal.alert({ title: '评分成功',
          content: "您对该教练评分成功!",
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { userInfo, js, bd, wg, dateArr, selectDay } = this.state;
        const self = this;

        const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7} onClick={()=>{ console.log(itm); self.setState({'selectDay': itm}); }}>
          <Row><Col className="font-size-8 textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-8 textclolor-black-low text-align-center">
          <div className={`${selectDay.dateName==itm.dateName ? 'bg-8EBF66 ' :'' } display-inline-block font-size-8 textclolor-white small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
        }) : <Col className="text-align-center font-size-8 textclolor-white line-height-2r">{loadText}</Col>;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-8EBF66 border-radius-5f  overflow-hide relative">
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
                    <span className="zindex-10 font-size-8 textclolor-white">{userInfo.describe || '牛油果体适能训练营36期'}</span>
                  </Col>
                  <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-8 textclolor-white">{userInfo.describe || 'xxx'}</span>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bg1" />
                </Row>
                </TransAnimal>
              </Col>
             
              <Col span={24} className="bg-1B1B1B margin-top-2 padding-top-2r padding-bottom-2r border-radius-5f">
                <Row justify="center">
                  <Col className="text-align-center textclolor-black-low font-size-8">我们希望获得您的反馈，以持续改善我们的计划内容</Col>
                  <Col span={22} className="border-bottom border-color-333 padding-bottom-1r">
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r font-size-8 textclolor-black-low text-align-center line-height-20">课程难度</div>
                      </Col>
                      <Col span={18}>
                        <TagRadio options={[{ value: 1, text: 'js', checked: true }, { value: 2, text: 'Jquery' }, { value: 4, text: 'react' } ]}
                        checkStyle={{"backgroundColor":"#5AA134","color": '#fff'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v)=>{
                          console.log(v)
                          // self.setValue('bd', v)
                        }} />
                      </Col>
                    </Row>
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r  font-size-8 textclolor-black-low text-align-center line-height-20">讲解问题</div>
                      </Col>
                      <Col span={18}>
                      <TagRadio options={[{ value: 1, text: 'js', checked: true }, { value: 2, text: 'Jquery' }, { value: 4, text: 'react' } ]}
                        checkStyle={{"backgroundColor":"#5AA134","color": '#fff'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v)=>{
                          console.log(v)
                          // self.setValue('bd', v)
                        }} />
                      </Col>
                    </Row>
                    <Row justify="center" className="margin-top-2">
                      <Col span={6}>
                        <div className="margin-top-p4r font-size-8 textclolor-black-low text-align-center line-height-20">疑问解答</div>
                      </Col>
                      <Col span={18}>
                        <TagRadio options={[{ value: 1, text: 'js', checked: true }, { value: 2, text: 'Jquery' }, { value: 4, text: 'react' } ]}
                        checkStyle={{"backgroundColor":"#5AA134","color": '#fff'}} normalStyle={{"backgroundColor":"#333","color": '#1a1a1a'}}
                        onChange={(v)=>{
                          console.log(v)
                          // self.setValue('bd', v)
                        }} />
                        {/* <Rate value={wg} allCode={5} fontSize={'1.6rem'} normalColor={'#464646'} activeColor={'#8EBE64'}
                        onChange={(v)=>{
                          console.log(v)
                          self.setValue('wg', v)
                        }} /> */}
                      </Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center textclolor-white margin-top-1r">选择开始课程的第一天</Col>
                  <Col className="text-align-center textclolor-black-low margin-top-1r">设定7天内开始</Col>
                </Row>
                <Row className="margin-top-1r">{clenderDom}</Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
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
