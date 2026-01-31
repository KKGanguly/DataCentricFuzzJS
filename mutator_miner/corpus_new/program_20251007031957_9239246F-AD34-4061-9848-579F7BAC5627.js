let v1;
try { v1 = new AudioContext(); } catch (e) {}
oAudioContext = v1;
oAudioContext?.listener;
try { document.addEventListener(0, oAudioContext); } catch (e) {}
