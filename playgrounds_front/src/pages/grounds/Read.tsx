import {FormEvent, useEffect, useRef, useState} from 'react'
import useToken from '../../hooks/useToken'
import {useNavigate, useSearchParams} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Calendar from '../../components/Calendar'
import './Read.css' // 스타일을 위한 CSS 파일

// Grounds 데이터 구조 정의
interface GroundsDTO {
  gphotosDTOList: {path: string}[]
  gno: number
  reviewsCnt: number
  gtitle: string
  location: string
  sports: string
  reservation: string
  groundstime: string
  email: string | null
  name: string | null
  info: string
  price: number
  maxpeople: number
  nowpeople: number
  regDate: string
  modDate: string
}

// PageRequestDTO 구조 정의
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

export default function Read() {
  const [searchParams] = useSearchParams() // 쿼리 파라미터를 사용하기 위해 useSearchParams 훅 사용
  const gno = searchParams.get('gno') // 쿼리 파라미터에서 gno 값을 추출
  const token = useToken()
  const [groundsDTO, setGroundsDTO] = useState<GroundsDTO | null>(null)
  useEffect(() => {
    if (token && gno) {
      // token과 gno가 존재할 때만 API 호출
      fetch(`http://localhost:8080/api/grounds/read/${gno}`, {
        // gno를 경로 파라미터로 사용하여 API 호출
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
          setGroundsDTO(data.groundsDTO)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [gno, token]) // gno와 token이 변경될 때마다 useEffect 실행

  if (!groundsDTO) {
    return <div>Loading...</div>
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
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {groundsDTO.gphotosDTOList.map((photo, idx) => (
            <div key={idx} className="carousel-slide">
              <img
                src={photo.path}
                alt={`슬라이드 이미지 ${idx + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 경기장 정보 */}
      <div className="card">
        <div className="card-header">
          <div className="ground-title">{groundsDTO.gtitle}</div>
          <button className="favorite-button">즐겨찾기</button>
        </div>
        <div className="card-body">
          <div className="ground-details">
            <div className="detail-row">
              <span>위치: {groundsDTO.location}</span>
              <span>가격: {groundsDTO.price}원/시간</span>
            </div>
            <div className="detail-row">
              <span>종목: {groundsDTO.sports}</span>
              <span>평점: {groundsDTO.reviewsCnt}</span>
            </div>
            <div className="detail-row">
              <span>예약 상태: {groundsDTO.reservation}</span>
              <span>경기 시간: {groundsDTO.groundstime}</span>
            </div>
            <div className="detail-row">
              <span>경기장 설명: {groundsDTO.info}</span>
            </div>
            <div className="detail-row">
              <span>최대 인원: {groundsDTO.maxpeople}명</span>
              <span>현재 인원: {groundsDTO.nowpeople}명</span>
            </div>
            <div className="detail-row">
              <span>등록일: {new Date(groundsDTO.regDate).toLocaleString()}</span>
              <span>수정일: {new Date(groundsDTO.modDate).toLocaleString()}</span>
            </div>
          </div>
          <div className="card-description">경기장 설명 및 대여 규정</div>
          <div className="reservation-input">예약 일정 입력</div>
        </div>
      </div>
    </div>
  )
}
