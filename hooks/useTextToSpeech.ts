// This hook has been removed as the text-to-speech feature is no longer in use.
const useTextToSpeech = () => ({
  isPlaying: false,
  isPaused: false,
  isSupported: false,
  play: () => {},
  pause: () => {},
  resume: () => {},
  stop: () => {},
});
export default useTextToSpeech;