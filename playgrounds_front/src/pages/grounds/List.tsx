import {FormEvent, useEffect, useRef, useState} from 'react'
import useToken from '../../hooks/useToken'
import {useNavigate, useSearchParams} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './List.css' // 필요한 스타일을 위한 별도 CSS 파일
import Calendar from '../../components/Calendar' // Calendar 컴포넌트를 import

// Grounds 데이터 구조 정의
interface Grounds {
  gno: number
  gtitle: string
  gphotosDTOList: {path: string}[]
  greviewsCnt: number
  nowpeople: number
  maxpeople: number
  price: number
  groundsTime: string // 시간 필드 (HH:mm 또는 HH:mm:ss 형식 가정)
  location: string
  sports: string
  regDate: string
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
  const [pageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)

  const options = [
    {value: '', label: '선택하세요'},
    {value: 't', label: 'title'},
    {value: 'c', label: 'sports'},
    {value: 'w', label: 'location'}
  ]

  useEffect(() => {
    // API 호출 및 데이터 설정 로직
    let url = 'http://localhost:8080/api/grounds/list'
    const queryParams = []
    const page = query.get('page') || '1'
    const type = query.get('type') || ''
    const keyword = query.get('keyword') || ''

    if (type) queryParams.push(`type=${type}`)
    if (page) queryParams.push(`page=${page}`)
    if (keyword) queryParams.push(`keyword=${keyword}`)

    if (queryParams.length > 0) url += '?' + queryParams.join('&')

    if (token) {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          // groundsTime으로 데이터 정렬
          const sortedData = data.pageResultDTO.dtoList.sort((a: Grounds, b: Grounds) => {
            const timeA = a.groundsTime.split(':').map(Number) // [HH, mm, ss]
            const timeB = b.groundsTime.split(':').map(Number) // [HH, mm, ss]

            // 시간순으로 비교
            for (let i = 0; i < timeA.length; i++) {
              if (timeA[i] !== timeB[i]) {
                return timeA[i] - timeB[i]
              }
            }
            return 0
          })

          setPageRequestDTO(data.pageRequestDTO)
          setPageResultDTO({
            ...data.pageResultDTO,
            dtoList: sortedData
          })
        })
        .catch(err => console.log('Error:', err))
    }
  }, [query, token])

  const getSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const keyword = refKeyword.current?.value
    const type = refType.current?.value
    navigate(`/grounds/list?type=${type}&keyword=${keyword}&page=1`)
  }

  // React Slick 설정
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
      {/* 상단 캐러셀 */}
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

      {/* 현재 시간 달력 - 캐러셀 밑으로 이동 */}
      <Calendar />

      {/* 검색 폼 */}
      <form className="search-form">
        <select ref={refType} className="search-select">
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          ref={refKeyword}
          className="search-input"
          placeholder="검색어를 입력하세요"
        />
        <button onClick={getSearch} className="search-button">
          검색
        </button>
      </form>

      {/* 카드 리스트 */}
      <div className="card-list">
        {pageResultDTO?.dtoList.map(ground => (
          <div key={ground.gno} className="card-row">
            <div className="ground-time">{ground.groundsTime}</div>
            <div
              className="card-info"
              onClick={() => navigate(`/grounds/read?gno=${ground.gno}`)}>
              <div className="card-content">
                <span className="location-info">위치: {ground.location}</span>
                <span className="sports-info">종목: {ground.sports}</span>
                <span className="game-info">경기명: {ground.gtitle}</span>
              </div>
              <div className="card-button">
                <button>마감여부</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
