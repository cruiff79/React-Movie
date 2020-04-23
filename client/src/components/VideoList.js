import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import star from '../images/star.png';

class VideoList extends React.Component {
    setVideoInfo = () => {
        this.props.getVideoInfo(this.props.id, this.props.title);
    }

    render() {
        let title = this.props.title;
        let type = this.props.types;
        console.log('title.length: ', title.length);
        if(title.length > 20) title = title.substring(0,23) + '...'; 
        if(type === 'series') type = 'tv';
        
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBView hover>
                                <Link to={`/${type}/${this.props.id}`} onClick={this.setVideoInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
                                <MDBMask className="flex-center" overlay="black-strong">
                                    <p className="white-text"><Image src={star} className="movie-info-icon" />{this.props.rating}</p>
                                </MDBMask>
                            </MDBView>
                        </MDBCol>
                    </MDBRow>
                    <div className="poster-title">
                        {title}
                    </div>
                    <div className="poster-year">
                        {this.props.year}
                    </div>
                </MDBContainer>
                {/* <div class="row">
                    <div class="view overlay">
                        <Link to={`/${type}/${this.props.id}`} onClick={this.setVideoInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
                        <div class="mask cloudy-knoxville-gradient"></div>
                    </div>
                </div>
                <div className="poster-title">
                    {title}
                </div>
                <div className="poster-year">
                    {this.props.year}
                </div> */}
            </div>
        );
    }
}

export default VideoList;