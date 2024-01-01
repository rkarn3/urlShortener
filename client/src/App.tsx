import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface IUrlData {
  url: string;
  shortUrl: string;
  urlId: string;
  clicks: number;
  isSingleUse: boolean;
  createdAt: string;
}
let baseUrl = import.meta.env.VITE_BASE_URL


function App() {
  const [url, setUrl] = useState<string>('')
  const [shortUrl, setShortUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isSingleUse, setIsSingleUse] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setShortUrl('')
    setUrl(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
      setError('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [copied, error]);

  const handleLinkConversion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res: { data: IUrlData } = await axios.post(`${baseUrl}/create-short-url`, {
        "longUrl": url,
        isSingleUse
      })
      setError('')
      setShortUrl(res.data.shortUrl)
    }
    catch (e) {
      setError(e.response.data)
      setUrl('')
      console.error(e)
    }
  }

  return (
    <>
      <h2 className='mb-4 text-xl'>
        Shorten Your Long Links
      </h2>
      <form onSubmit={(e) => handleLinkConversion(e)}>
        <div className="form-group row">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={url}
              placeholder="Enter URL"
              aria-label="Enter URL"
              aria-describedby="basic-addon2"
              onChange={(e) => handleChange(e)} />
            <div className="input-group-append">
              <button className="btn  btn-primary" type="submit">Submit</button>
            </div>
          </div>
        </div>
        <div className='form-check text-md-left mt-0 '>
          <input
            className="form-check-input"
            type="checkbox"
            checked={isSingleUse}
            id="singleUse"
            onChange={() => setIsSingleUse(!isSingleUse)} />
          <label className="form-check-label" htmlFor="singleUse">
            Single Use
          </label>
        </div>
      </form>
      {
        error && <div className="alert alert-danger mt-5">{error}</div>
      }
      {shortUrl &&
        <div className="shortener__viewShot">
          {shortUrl}
          <CopyToClipboard text={shortUrl}>
            <button onClick={() => setCopied(true)}>copy</button>
          </CopyToClipboard>
        </div>
      }
      {
        copied && <div className="alert alert-info mt-5">The link has been copied</div>
      }
    </>
  )
}

export default App
