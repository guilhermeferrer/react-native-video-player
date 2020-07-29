import React from 'react';
import { Container } from './styles';
import Video from 'react-native-video';

export default function VideoImage({ progress, length, paused, setLoading, end }) {

    const uri = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
    //const uri = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

    return (
        <Container>
            <Video
                source={{ uri }}
                resizeMode={"contain"}
                paused={paused}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                repeat={true}
                style={{ flex: 1 }}
                onProgress={event => {
                    length.value = event.seekableDuration;
                    if (progress.value + 0.25 < event.seekableDuration)
                        return progress.value = event.currentTime;

                    end();
                }}
            />
        </Container>
    )
}