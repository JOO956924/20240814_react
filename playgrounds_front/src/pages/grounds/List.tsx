import {FormEvent, useEffect, useRef, useState} from 'react'
import useToken from '../../hooks/useToken'
import {useNavigate, useSearchParams} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './List.css'
import Calendar from '../../components/Calendar'

// Grounds 데이터 구조 정의
interface Grounds {
  gno: number
  title: string
  gphotosDTOList: {path: string}[]
  reviewsCnt: number
  likes: number
  regDate: string
  groundsTime: string
  location: string
  sports: string
  maxpeople: number
}

// PageRequestDTO 구조 정의
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

// PageResultDTO 구조 정의
interface PageResultDTO {
  dtoList: Grounds[]
  page: number
  start: number
  end: number
  pageList: number[]
  prev: boolean
  next: boolean
}

export default function List() {
  const token = useToken()
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const refType = useRef<HTMLSelectElement | null>(null)
  const refKeyword = useRef<HTMLInputElement | null>(null)
  const refBtnSrch = useRef<HTMLButtonElement | null>(null)

  const [pageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)
  const [inverted, setInverted] = useState(true)
  const [keywords, setKeywords] = useState('')
  const [types, setTypes] = useState('')

  const options = [
    {value: '', label: '선택하세요'},
    {value: 't', label: '제목'},
    {value: 'c', label: '내용'},
    {value: 'w', label: '작성자'},
    {value: 'tc', label: '제목 + 내용'},
    {value: 'tcw', label: '제목 + 내용 + 작성자'}
  ]

  useEffect(() => {
    let compare = query.get('page')
    const page = compare === 'null' || compare == null ? '1' : compare
    compare = query.get('type')
    const type = compare === 'null' || compare == null ? '' : compare
    compare = query.get('keyword')
    const keyword = compare === 'null' || compare == null ? '' : compare

    let url = 'http://localhost:8080/api/grounds/list'
    const queryParams = []

    if (type) {
      setTypes(type)
      setInverted(false)
      queryParams.push(`type=${type}`)
    }
    if (page) queryParams.push(`page=${page}`)
    if (keyword) {
      setInverted(false)
      queryParams.push(`keyword=${keyword}`)
    }
    if (queryParams.length > 0) url += '?' + queryParams.join('&')

    if (token) {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          setPageRequestDTO(data.pageRequestDTO)
          setPageResultDTO(data.pageResultDTO)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [query, types, token])

  const url = `/grounds`

  const getSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const keywordw = refKeyword.current?.value
    const typew = refType.current?.value

    if (!keywordw) {
      refKeyword.current?.focus()
      return
    }

    navigate(url + `/list?type=${typew}&keyword=${keywordw}&page=1`)
    setKeywords('')
    setTypes('')
  }

  const goRead = (gno: number, page: number, type: string, keyword: string) => {
    location.href = url + `/read?gno=${gno}&page=${page}&type=${type}&keyword=${keyword}`
  }
  const goRegister = () => {
    location.href =
      url +
      `/register?page=${pageRequestDTO.page}&type=${pageRequestDTO.type}&keyword=${pageRequestDTO.keyword}`
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  return (
    <div className="container">
      <Slider {...sliderSettings}>
        <div className="carousel-slide">
          <img
            src="/sisul_01_04_01.jpg"
            alt="슬라이드 이미지 1"
            style={{width: '100%', height: 'auto', objectFit: 'cover'}}
          />
        </div>
        <div className="carousel-slide">
          <img
            src="/sisul_01_04_02.jpg"
            alt="슬라이드 이미지 2"
            style={{width: '100%', height: 'auto', objectFit: 'cover'}}
          />
        </div>
      </Slider>

      <Calendar />

      <form method="GET" className="search-form">
        <div className="input-group">
          <div className="input-group-prepend" style={{marginRight: '10px'}}>
            <select
              className="form-control"
              style={{fontSize: '22px'}}
              ref={refType}
              name="type"
              value={types}
              onChange={e => {
                if (e) {
                  setTypes(refType.current?.value ?? '')
                  if (e.target.selectedIndex === 0) {
                    if (!keywords) setKeywords('')
                    setInverted(true)
                    if (refKeyword.current?.value) {
                      setKeywords('')
                    }
                    navigate(`/`)
                  } else if (e.target.value !== types) {
                    if (!keywords) {
                      setKeywords('')
                    }
                    setInverted(false)
                    if (refKeyword.current?.value) {
                      setKeywords('')
                    }
                    navigate(`/`)
                    refKeyword.current?.focus()
                  } else {
                    setInverted(false)
                  }
                }
                setTypes(e.target.value)
              }}>
              {options.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            name="keyword"
            style={{borderRadius: '5px', fontSize: '22px'}}
            ref={refKeyword}
            disabled={inverted}
            onChange={e => {
              setKeywords(e.target.value)
            }}
            value={keywords}
          />
          <div className="input-group-append" style={{marginLeft: '10px'}}>
            <button
              type="button"
              style={{fontSize: '30px'}}
              className="btn btn-outline-primary btnSearch"
              onClick={getSearch}
              ref={refBtnSrch}
              disabled={inverted}>
              Search
            </button>
            <button
              type="button"
              style={{
                fontSize: '30px',
                marginLeft: '10px',
                background: 'white',
                color: '#bd5d38',
                border: '1px solid #bd5d38'
              }}
              className="btn btn-outline-secondary"
              onClick={goRegister}>
              Register
            </button>
          </div>
        </div>
      </form>

      <div className="card-list">
        {pageResultDTO?.dtoList.map(ground => (
          <div key={ground.gno} className="card-row">
            <div className="ground-time">{ground.groundsTime}</div>
            <div
              className="card-info"
              onClick={() =>
                goRead(
                  ground.gno,
                  pageResultDTO.page,
                  pageRequestDTO.type,
                  pageRequestDTO.keyword
                )
              }>
              <div className="card-content">
                <span className="location-info">위치: {ground.location}</span>
                <span className="sports-info">종목: {ground.sports}</span>
                <span className="game-info">경기명: {ground.title}</span>
              </div>
              <div className="card-button">
                <span className="people-info">모집 인원: {ground.maxpeople}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="pagination h-100 justify-content-center align-items-center">
        {pageResultDTO?.prev && (
          <li className="page-item">
            <a
              className="page-link"
              href={`/grounds/list?page=${Math.max(1, pageResultDTO.start - 1)}`}>
              Prev
            </a>
          </li>
        )}
        {pageResultDTO?.pageList.map(page => (
          <li
            key={page}
            className={`page-item ${pageResultDTO?.page === page ? 'active' : ''}`}>
            <a
              className="page-link"
              href={`/grounds/list?page=${page}&type=${query.get(
                'type'
              )}&keyword=${query.get('keyword')}`}>
              {page}
            </a>
          </li>
        ))}
        {pageResultDTO?.next && (
          <li className="page-item">
            <a className="page-link" href={`/grounds/list?page=${pageResultDTO.end + 1}`}>
              Next
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
