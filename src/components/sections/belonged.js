import React, { useRef, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks"
import Context from "../../context"
import ContentWrapper from "../../styles/contentWrapper"
import belonged from "../../../content/belonged.jpg"

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
    blockquote {
      margin: 0 auto;
      padding: 1em;
      border-left: 3px solid #ddd;
    }
    blockquote:before {
      display: none;
    }
    blockquote:not(:first-of-type) {
      margin-top: .5em;
    }
    blockquote p {
      color: #555;
      font-size: 12pt;
      line-height: 1.4;
      font-family: 'PT Serif', Cambria, 'Hoefler Text', Utopia, 'Liberation Serif', 'Nimbus Roman No9 L Regular', Times, 'Times New Roman', serif;
    }
    blockquote footer {
      margin-top: .5em;
      padding: 0;
      color: #777;
      font-size: 12pt;
      text-align: left;
      font-style: italic;
    }
    blockquote footer:before {
      content: '— ';
    }
    blockquote:nth-of-type(even) {
      text-align: right;
      border-left: none;
      border-right: 3px solid #ddd;
    }
    blockquote:nth-of-type(even) footer {
      text-align: right;
    }
    blockquote:nth-of-type(even) footer:before {
      content: '';
    }
    blockquote:nth-of-type(even) footer:after {
      content: ' —';
    }
    @element 'blockquote' and (min-width: 300px) {
      blockquote {
        padding: 1em 20% 1em 1em;
      }
      blockquote p {
        font-size: 14pt;
      }
      blockquote:nth-of-type(even) {
        padding: 1em 1em 1em 20%;
      }
    }
  }
`

const Belonged = ({ content }) => {
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
    <StyledSection id="belonged">
      <StyledContentWrapper>
      <motion.div
          className="image-content"
          ref={iRef}
          initial={{ opacity: 0, x: 20 }}
          animate={iControls}
        >
        <div className="image-content">
          <img className="about-author" src={belonged} alt="Belonged" height={300} />
        </div>
        </motion.div>
        <motion.div
          className="inner-wrapper"
          ref={tRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tControls}
        >
          <h3 className="section-title">{frontmatter.title}</h3>
          <div className="text-content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <blockquote>
          <p><q>Captivating and compelling, a book with twists and turns.</q></p>
          <footer>Melisha Francis</footer>
        </blockquote>
        <blockquote>
          <p><q>Page turner, intriguing and deftly written...</q></p>
          <footer>Beverly Gengiah</footer>
        </blockquote>
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Belonged.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Belonged
