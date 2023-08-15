import React, { useState } from 'react';
import { SERVER_URL } from '../util/config';
import { StyledLink } from '../styles/Router';
import { PostImageCarouselProps } from './Posts.types';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import styled from 'styled-components';

function Carousel(props: PostImageCarouselProps) {
  const [currentSlideIndex, setSlideImageIndex] = useState(0);
  const numberOfSlides = props.images?.length;
  function nextSlideImage() {
    setSlideImageIndex((currentSlideIndex + 1) % numberOfSlides);
  }
  function previousSlideImage() {
    setSlideImageIndex((currentSlideIndex - 1) % numberOfSlides);
  }

  return (
    <StyledCarouselContainer>
      <StyledCarouselSlide>
        {props.images && (
          <StyledLink to={props.link}>
            <StyledCarouselSlideImage
              src={`${SERVER_URL}/${props.images[Math.abs(currentSlideIndex)]}`}
            />
          </StyledLink>
        )}
      </StyledCarouselSlide>
      {/* Control Side Buttons */}
      <StyledControlButtonPrevious
        $isHidden={numberOfSlides <= 1 ? true : false}
        onClick={() => previousSlideImage()}
      >
        <HiOutlineChevronLeft color='white' />
      </StyledControlButtonPrevious>
      <StyledControlButtonNext
        $isHidden={numberOfSlides <= 1 ? true : false}
        onClick={() => nextSlideImage()}
      >
        <HiOutlineChevronRight color='white' />
      </StyledControlButtonNext>
      <div>{currentSlideIndex}</div>
    </StyledCarouselContainer>
  );
}

const StyledControlButtonPrevious = styled.div<{
  $isHidden: boolean;
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
`;
const StyledControlButtonNext = styled(StyledControlButtonPrevious)`
  right: 0;
`;
const StyledCarouselContainer = styled('div')`
  position: relative;
  width: 400px;
`;
const StyledCarouselSlideImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledCarouselSlide = styled('figure')`
  height: 500px;
  overflow: hidden;
`;
export default Carousel;

