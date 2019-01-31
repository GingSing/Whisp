import React, { Component } from 'react';
import { connect } from 'react-redux';

class DownloadedList extends Component{
    render(){
        return(
            <div className="downloadedListWrapper">
                <ul className="downloadedList">
                    {
                        this.props.downloaded  && this.props.downloaded.map((downloads) => {
                            return (
                                <li>
                                    <DownloadedListCard />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

const DownloadedListCard = () => {
    return(
        <div className="downloadedListCard">
            
        </div>
    );
}

const mapStateToProps = state => ({
    downloaded: state.youtube.downloaded
})

export default connect(mapStateToProps)(DownloadedList);