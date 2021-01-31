import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { Carousel, Progress } from 'antd';
import Card from '../Card';

import {donateItems} from '../../actions/ShelterActions';
import React, {useState} from 'react';
import foodPNG from '../../assets/food.png';
import donationPNG from '../../assets/donation.png';
import shelterPNG from '../../assets/shelter.png';
import mobilePNG from '../../assets/mobile.png';

import './style.scss';

const settings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  centerMode: true,
  slidesToShow: 1,
  centerPadding: '0',
};

const SideBar = (props) => {
  const left = props.sideBarVis ? '0' : '-30vw';

  const [shelterName, setShelterName] = useState('');
  const [index, setIndex] = useState(0);
  const [address, setAddress] = useState('');
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [item3, setItem3] = useState('');
  const [need1, setNeed1] = useState('');
  const [need2, setNeed2] = useState('');
  const [need3, setNeed3] = useState('');
  const [totalPercent, setTotalPercent] = useState(0);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [percent3, setPercent3] = useState(0);

  const confirmDonation = () => {
    props.donateItems(shelterName, props.items);
    props.toggleThankYouModal();
  }

  const carouselChange = (from, to) => {
    const name = props.ranking[to][0];
    setShelterName(name);
    setIndex(to);
    console.log(props.shelters);
    console.log(name);
    window.map.flyTo({
      center: [
        props.shelters[name].long,
        props.shelters[name].lat,
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      })
      if (props.shelters[name].address) {
    setAddress(props.shelters[name].address.slice(0,25));
      }
      else {
        setAddress('');
      }
      const donations = props.shelters[name].donations;
      console.log(donations);
      setItem1(donations[0][0]);
      setItem2(donations[1][0]);
      setItem3(donations[2][0]);
      setNeed1(donations[0][1])
      setNeed2(donations[1][1])
      setNeed3(donations[2][1])
      const need1Int = parseInt(donations[0][1]);
      const need1Have = parseInt(donations[0][2]);
      setPercent1(Math.floor((need1Have / need1Int) * 100))
      const need2Int = parseInt(donations[1][1]);
      const need2Have = parseInt(donations[1][2]);
      setPercent2(Math.floor((need2Have / need2Int) * 100))
      const need3Int = parseInt(donations[2][1]);
      const need3Have = parseInt(donations[2][2]);
      setPercent3(Math.floor((need3Have / need3Int) * 100))
      const totalInt = need1Int + need2Int + need3Int;
      const totalHave = need1Have + need2Have + need3Have;
      setTotalPercent(Math.floor((totalHave / totalInt) * 100))
      
  }

  return (
    <div className="side-bar" style={{ left: left }}>
      <div className="bar-1">
        <MenuOutlined
          onClick={() => {
            props.toggleSideBar(false);
          }}
        />
      </div>
      <div className="bar-2">
        <div className="title">
          <h1>Recommended Centers</h1>
          <p>{index + 1} of {props.ranking.length}</p>
        </div>
        <Carousel {...settings} beforeChange={carouselChange}>
          {props.ranking.map(shelter => {
            let src;
            if (shelter[1] == 'donation-shelter') {
              src = donationPNG;
            }
            if (shelter[1] == 'food-bank') {
              src = foodPNG;
            }
            if (shelter[1] == 'mobile-pantry') {
              src = mobilePNG;
            }
            if (shelter[1] == 'homeless-shelter') {
              src = shelterPNG;
            }
            return (
            <div className="bcontainer">
              <img
                src={src}
                alt="building"
                className="buildingtype"
              />
            </div>)
          })}
        </Carousel>
        <div className="location">
          <h1>{shelterName.slice(0,25)}</h1>
        <h2>{address}</h2>
        </div>
      </div>
      <div className="bar-3">
        <h1>Resources Needed</h1>
        <Progress
          percent={totalPercent}
          strokeColor="linear-gradient(90deg, #A643F4 0%, rgba(249, 89, 166, 0.9) 100%)"
          strokeWidth={20}
        />
        <div className="cards">
          <Card percent={percent1} units={need1}item={item1}/>
          <Card percent={percent2} units={need2}item={item2}/>
          <Card percent={percent3} units={need3}item={item3}/>
        </div>
        <div className="side-button" onClick={confirmDonation}>Confirm Donation</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ranking: state.shelters.ranking,
  shelters: state.shelters.shelters,
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { donateItems }
)(SideBar);
