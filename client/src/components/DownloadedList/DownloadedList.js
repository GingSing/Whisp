import React, { Component } from 'react';
import { connect } from 'react-redux';

class DownloadedList extends Component{
    render(){
        return(
            <div className="downloadedListWrapper">
                <ul className="downloadedList">
                    {

                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    downloaded: state.youtube.downloaded
})

export default connect(mapStateToProps)(DownloadedList);