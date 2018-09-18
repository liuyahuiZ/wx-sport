import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import { getAds, getSubjects } from '../api/index';

const {
    Row,
    Col,
    Icon,
    Buttons,
    Item,
    Header,
    Carousel,
    Modal,
    Loade,
    Toaster
  } = Components;
  
class HomeDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
          status: this.props.status,
          productList: [],
          bannerList: [],
          loadText: '加载中'
      };
    }

    _viewAppear(){
      const self = this;
      getAds({}).then((res) => {
        // console.log(data);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); }
        let data = res.result;
        const list = [];
        for(let i=0;i<data.length;i++){
          list.push({
            tabName: `ban-${data[i].id}`,
            content: (<img alt="text" src={data[i].imgUrl} />),
            isActive:  i==0 ? true : false
          })
        }
        // const dem = [{ tabName: 'first', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/14/1522133980415_375x375.jpg" />), isActive: true },
        // { tabName: 'second', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/15/1522134154187_750x700.jpg" />), isActive: false },
        // { tabName: 'thired', content: (<img alt="text" src="https://static1.keepcdn.com/2018/02/24/14/1519455021015_750x700.jpg" />), isActive: false }];
        self.setState({
          show: true,
          bannerList: list
        })
      }).catch((e)=>{
        console.log(e)
      })
      Loade.show();
      getSubjects({}).then((res)=>{
        Loade.hide();
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); }
        let data = res.result;
        // console.log(data);
        if(data.length > 0){
          self.setState({
            productList: data
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

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    loadFunc(){
      setTimeout(() => {
        this.setState({
          refreshed: true,
        })
      }, 3000);
    }

    goLinks(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
        });
      }
    }
  
    render() {
        const {productList, bannerList, loadText} = this.state;
        // let imgArr = ['http://47.88.2.72:2016/getphotoPal/2018-7-23/15323156729698.png',
        // 'https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg',
        // 'https://static1.keepcdn.com/2018/03/01/15/1519888737768_315x315.png']
        const productListDom = productList.length > 0 ? productList.map((itm, idx)=>{
          return (
          <Row className="margin-top-2 margin-bottom-3 border-radius-5f heighr-13 overflow-hide relative"  key={`${idx}-itm`} 
          onClick={()=>{this.goLinks('/ClassDetail', {
            subjectId : itm.id,
            price: itm.price
          })}}>
            <Col><img alt="text" src={ itm.imgUrl} /></Col>
            <Col className="absolute bottom-5 left-5">
              <Row>
                  <Col span={19}>
                    <Row>
                      <Col className="font-size-12 textclolor-white">{itm.title}</Col>
                      <Col className="font-size-8 textclolor-white">{itm.smallTitle}</Col>
                    </Row>
                  </Col>
              </Row>
            </Col>
          </Row>)
        }) : <Row ><Col className="text-align-center font-size-8 textclolor-white line-height-2r">{loadText}</Col></Row>;
      return(
          <section className="padding-all bg-000">
              <Carousel options={bannerList} containerStyle={{borderRadius: '0.5rem', height:'5rem', backgroundColor: '#333'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              <Row justify='center'>
              <Col>{productListDom}</Col>
            </Row>
        </section>
        );
    }
}
export default HomeDoc;