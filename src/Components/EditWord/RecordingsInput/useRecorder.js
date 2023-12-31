import React, { useEffect, useState, useRef } from 'react'
// TODO: extricate recording logic out of here
const mimeType = 'audio/mp3'
const useRecorder = (cb = () => null) => {
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [stream, setStream] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [audio, setAudio] = useState(null)
  const [base64, setBase64] = useState(null)
  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
        setPermission(true)
        setStream(streamData)
      } catch (err) {
        alert(err.message)
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }
  const startRecording = async () => {
    setRecordingStatus('recording')
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType })
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media
    //invokes the start method to start the recording process
    mediaRecorder.current.start()
    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return
      localAudioChunks.push(event.data)
    }
    setAudioChunks(localAudioChunks)
  }
  const stopRecording = () => {
    setRecordingStatus('inactive')
    //stops the recording instance
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob)
      let fileReader = new FileReader()
      fileReader.readAsDataURL(audioBlob)
      fileReader.onloadend = () => {
        setBase64(fileReader.result)
        setAudio(audioUrl)
        setAudioChunks([])
        cb({ audio: audioUrl, base64: fileReader.result })
      }
    }
  }
  return {
    permission,
    getMicrophonePermission,
    startRecording,
    stopRecording,
    recordingStatus,
  }
}

export default useRecorder
