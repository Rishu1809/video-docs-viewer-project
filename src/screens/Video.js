import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';

const SOURCE_URI =
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function Videos() {
  const playerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState('Ready');

  const togglePlay = () => setPaused(p => !p);
  const toggleMute = () => setMuted(m => !m);

  const enterFullscreen = () => {
    playerRef.current?.presentFullscreenPlayer?.();
  };

  const enterPiP = () => {
    if (Platform.OS === 'ios') {
      // iOS PiP button appears in native controls when pictureInPicture prop is true.
      // Use the native controls PiP button.
      setStatus('Use PiP from iOS player controls');
    }  else {
      setStatus('Android PiP helper not installed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Single Video Screen</Text>

      <Video
        ref={playerRef}
        source={{ uri: SOURCE_URI }}
        style={styles.video}
        resizeMode="contain"
        controls
        paused={paused}
        muted={muted}
        pictureInPicture={Platform.OS === 'ios'} // enables iOS PiP in native controls
        onLoad={() => setStatus('Loaded')}
        onBuffer={() => setStatus('Buffering…')}
        onError={e => setStatus(`Error: ${e?.error?.message ?? 'Playback error'}`)}
        onEnd={() => setStatus('Ended')}
      />

      <View style={styles.controlsRow}>
        <Button onPress={togglePlay} label={paused ? 'Play' : 'Pause'} />
        <Button onPress={toggleMute} label={muted ? 'Unmute' : 'Mute'} />
        <Button onPress={enterFullscreen} label="Full Screen" />
        <Button onPress={enterPiP} label="PiP" />
      </View>

      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

function Button({ onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 24,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  video: {
    width: '100%',
    height: 260,
    backgroundColor: '#000',
  },
  controlsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    padding: 12,
  },
  btn: {
    backgroundColor: '#222',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  status: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 8,
  },
});
