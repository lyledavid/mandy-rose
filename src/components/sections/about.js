import React, { useRef, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks/"
import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"
import mandy from "../../../content/mandy2.jpg"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: row;
      justify-content: space-between;
    }
    .section-title {
      margin-bottom: 2rem;
    }
    .inner-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-content {
      width: 100%;
      max-width: 31.25rem;
    }
    .image-content {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 18rem;
      margin-top: 4rem;
      margin-left: 0;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 2rem;
      }
    }
    .about-author {
      border-radius: ${({ theme }) => theme.borderRadius};
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      transition: all 0.3s ease-out;
      &:hover {
        transform: translate3d(0px, -0.125rem, 0px);
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
      }
    }
  }
`

const About = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone } = useContext(Context).state
  const tControls = useAnimation()
  const iControls = useAnimation()

  // Required for animating the text content
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)

  // Required for animating the image
  const iRef = useRef()
  const iOnScreen = useOnScreen(iRef)

  // Only trigger animations if the intro is done or disabled
  useEffect(() => {
    if (isIntroDone) {
      if (tOnScreen) tControls.start({ opacity: 1, y: 0 })
      if (iOnScreen) iControls.start({ opacity: 1, x: 0 })
    }
  }, [isIntroDone, tControls, iControls, tOnScreen, iOnScreen])

  return (
    <StyledSection id="about">
      <StyledContentWrapper>
        <div className="image-content">
          <img className="about-author" src={mandy} alt="Mandy Rose" height={300} />
        </div>
        <div>
          <h3 className="section-title">{frontmatter.title}</h3>
          <div className="text-content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

About.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default About
