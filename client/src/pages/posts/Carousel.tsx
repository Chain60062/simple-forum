import { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import styled from 'styled-components'
import { StyledLink } from '../../styles/Router'
import { SERVER_URL } from '../../util/config'
import type { PostImageCarouselProps } from './Posts.interfaces'

function Carousel({ images, link }: PostImageCarouselProps) {
	const [currentSlideIndex, setSlideImageIndex] = useState(0)
	const numberOfSlides = images?.length
	function nextSlideImage() {
		setSlideImageIndex((currentSlideIndex + 1) % numberOfSlides)
	}
	function previousSlideImage() {
		setSlideImageIndex((currentSlideIndex - 1) % numberOfSlides)
	}

	return (
		<StyledCarouselContainer>
			<StyledCarouselSlide>
				{images && (
					<StyledLink to={link}>
						<StyledCarouselSlideImage
							src={`${SERVER_URL}/${images[Math.abs(currentSlideIndex)]}`}
						/>
					</StyledLink>
				)}
			</StyledCarouselSlide>
			{/* Control Side Buttons */}
			<StyledControlButtonPrevious
				$isHidden={numberOfSlides <= 1}
				onClick={() => previousSlideImage()}
			>
				<HiOutlineChevronLeft color="white" />
			</StyledControlButtonPrevious>
			<StyledControlButtonNext
				$isHidden={numberOfSlides <= 1}
				onClick={() => nextSlideImage()}
			>
				<HiOutlineChevronRight color="white" />
			</StyledControlButtonNext>
		</StyledCarouselContainer>
	)
}

const StyledControlButtonPrevious = styled.div<{
	$isHidden: boolean
}>`
  cursor: pointer;
  position: absolute;
  background-color: ${(props) =>
		!props.$isHidden ? 'rgba(0, 0, 0, 0.8)' : 'auto'};
  top: 50%;
  margin: 0px 10px 0px 10px;
  padding: 14px;
  transition: 0.6s ease;
  border-radius: 50%;
  user-select: none;
  text-align: center;
  display: ${(props) => (props.$isHidden ? 'none' : 'block')};

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`
const StyledControlButtonNext = styled(StyledControlButtonPrevious)`
  right: 0;
`
const StyledCarouselContainer = styled('div')`
  position: relative;
  width: 400px;
`
const StyledCarouselSlideImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const StyledCarouselSlide = styled('figure')`
  height: 500px;
  overflow: hidden;
`
export default Carousel
