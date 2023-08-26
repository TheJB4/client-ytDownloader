import { useState } from 'react'
import formattFile from './Utils/formattingFileName'
import './App.css'

import axios from 'axios'

function App() {
  let [urlVideo, setUrlVideo] = useState('')
  let [videoInfo, setVideoInfo] = useState({})
  let [dataView, setDataView] = useState(false)
  let[loadingDownload,setLoadingDownload] = useState(false)

  let [loading, setLoading] = useState(false)

  return (
    <article className='w-full h-screen flex justify-center items-center flex-col'>
      <h1>Convert Youtube Video To Mp3 By Juan Mercado☻</h1>

      <form
        className='flex justify-center items-center w-full'
        onSubmit={(e) => {
          e.preventDefault()
          console.log(urlVideo)

          axios.get(`https://api-yt-downloader-9i4o.vercel.app/infoVideo/generateLink/mp3/?urlVideo=${urlVideo}`, { responseType: 'arraybuffer', headers: { 'Content-Type': 'application/json' } })
            .then(res => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'MauroComilon.mp3');
              document.body.appendChild(link);
              link.click();
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
        }}
      >
        <input type="text"
          className='w-4/5 h-14 border-2 border-blue-500 border-color2 text-center'
          placeholder='Busque o pegue el enlace de Youtube Aqui'
          onChange={(e) => {
            setUrlVideo(e.target.value)
          }}
        />
        <button
          className='w-32 h-14 bg-color1 text-white font-bold ml-5'
          onClick={(e) => {
            e.preventDefault()
            axios.get(`https://api-yt-downloader-9i4o.vercel.app/infoVideo/?urlVideo=${urlVideo}`, { headers: { 'Content-Type': 'application/json' } })
              .then(res => {
                return res
              }).then(data => {
                setVideoInfo({
                  titleVideo: data.data.title,
                  imageVideo: data.data.thumbnails,
                  minutesVideo: data.data.lengthSeconds,
                })
                setDataView(true)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >Convert</button>
        {loading &&
          <input
            className='w-32 h-12 bg-color1 text-white font-bold mt-2'
            type="submit"
            value="descargar"
          />
        }
      </form>
      <div className='w-full'>
        {dataView &&
          <article className='w-50 flex mt-1.5'>
            <div className='flex flex-col'>
              <img src={videoInfo.imageVideo[3].url} alt="" />
              <h4>{videoInfo.titleVideo}</h4>
              <p>Duration: {Number(videoInfo.minutesVideo / 60).toFixed(1)} Minutes</p>
            </div>
            <table className="border-collapse border border-color1 w-[40rem] h-80 ml-5">
              <thead>
                <tr>
                  <th>Quality</th>
                  <th>File Size(bitrate)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td className='border border-black'>.Mp3</td>
                <td className='border border-black'>2MB</td>
                <td className='border border-black'> 
                  <button 
                    className='w-24 h-14 bg-color1 text-white font-bold ml-5'
                    onClick={(e)=>{
                      setLoadingDownload(true)
                      e.preventDefault()
                      console.log(urlVideo)
                      axios.get(`https://api-yt-downloader-9i4o.vercel.app/generateLink/mp3/?urlVideo=${urlVideo}`, { responseType: 'arraybuffer'})
                        .then(res => {
                          const url = window.URL.createObjectURL(new Blob([res.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          link.setAttribute('download', `${formattFile(videoInfo.titleVideo)}.mp3`);
                          document.body.appendChild(link);
                          link.click();

                          if(res.status === 200){
                            setLoadingDownload(false)
                          }
                        }).catch(err => {
                          console.log(err)
                        })
                    }}
                  >Download</button> 
                </td>
              </tr>
              <tr>
                <td className='border border-black'>.Mp4 720p</td>
                <td className='border border-black'>4.53MB</td>
                <td className='border border-black'> 
                  <button 
                    className='w-24 h-14 bg-color1 text-white font-bold ml-5'
                    onClick={(e)=>{
                      setLoadingDownload(true)
                      e.preventDefault()
                      console.log(urlVideo)
                      axios.get(`http://localhost:3000/generateLink/Mp4/?urlVideo=${urlVideo}&quality=1080p`, { responseType: 'arraybuffer'})
                        .then(res => {
                          const url = window.URL.createObjectURL(new Blob([res.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          link.setAttribute('download', `${formattFile(videoInfo.titleVideo)}.mp4`);
                          document.body.appendChild(link);
                          link.click();
                          
                          console.log(res)
                          if(res.status === 200){
                            setLoadingDownload(false)
                          }
                        }).catch(err => {
                          console.log(err)
                        })
                    }}
                  >
                    Download
                  </button> 
                </td>
              </tr>
              </tbody>
            </table>
          </article>
        }
      </div>
      {loadingDownload && <p>Donwloading...</p>}
      {loading && <h1>CARGANDOOOOOOOOOOOOO....</h1>}
    </article>
  )
}

export default App
