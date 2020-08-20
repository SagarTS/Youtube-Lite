import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import youtube from '../apis/youtube';
import VideoDetails from './VideoDetails';

const KEY = 'YOUR_YOUTUBE_API';


class App extends React.Component {
    state = {
        videos: [],
        selectedVideo : null,
    }

    componentDidMount () {
        this.onTermSubmit('ironman')
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: KEY, 
                q: term,
            }
        });

        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render() {
        return ( 
            <div className='ui container'>
                <SearchBar onFormSubmit = {this.onTermSubmit} />
            {this.state.selectedVideo ?
                <div className='ui grid'>
                    <div className = 'ui row'>
                        <div className='eleven wide column'>
                            <VideoDetails video = {this.state.selectedVideo} />
                        </div>
                        <div className='five wide column'>
                            <VideoList 
                                onVideoSelect = {this.onVideoSelect} 
                                videos= {this.state.videos} 
                            />
                        </div>
                    </div>
                </div>
                : 
                <div>
                    <VideoDetails video = {this.state.selectedVideo} />
                    <VideoList 
                                    onVideoSelect = {this.onVideoSelect} 
                                    videos= {this.state.videos} 
                    />
                </div>
            }
            </div>
        );
    }
}

export default App;
