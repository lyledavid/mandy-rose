import React, { useRef, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks/"
import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"
import mandy from "../../../content/mandy1.jpg"
import mapBackground from "../../../content/map.png"

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
      font-size: 18px;
      margin-top: 50px;
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
    .circle-image{
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      width: 200px;
      height: 200px;
      min-width: 200px;
      margin-top: 10px;
    }
    .circle-image img{
      width:100%;
      height:100%;
      object-fit: cover;
    }
    .image-wrapper {
      display: flex;
      justify-content: center;
    }
    .text-wrapper {
      display: flex;
      flex-direction: column;
    }
    .t-head {
      font-weight: 800;
      width: 100px;
      vertical-align: top;
    }
    td {
      padding: 10px 0;
    }
    .m-0 {
      margin: 0;
    }
    .subtext {
      font-size: 16px;
      text-align: end;
    }
  }
`

const Launch = ({ content }) => {
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
    <StyledSection id="launch">
      <StyledContentWrapper style={{ backgroundImage: `url(${mapBackground})`, paddingBottom: 40, marginTop: 40 }}>
      <motion.div
          className="header-wrapper"
          ref={iRef}
          initial={{ opacity: 0, x: 20 }}
          animate={iControls}
        >
        <h3 className="section-title">{frontmatter.title}</h3>
        <div className="image-wrapper">
          <div className="circle-image">
            <img src={mandy} alt="Mandy Rose" height={300} />
          </div>
        </div>
        </motion.div>
        <motion.div
          className="text-wrapper"
          ref={tRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tControls}
        >
          <div className="text-content">
            <p>Meet me at my official book launch!</p>
            <table>
              <tbody>
                <tr>
                  <td className="t-head">Date</td>
                  <td>5 March</td>
                </tr>
                <tr>
                  <td className="t-head">Time</td>
                  <td>14h00 to 16h00</td>
                </tr>
                <tr>
                  <td className="t-head">Venue</td>
                  <td><p className="m-0">27 Meridian Drive</p><p className="m-0">Umhlanga Rocks</p><p className="m-0">Opposite Zebbies Lighting</p></td>
                </tr>
              </tbody>
            </table>
            <p className="subtext">Light snacks will be served</p>
          </div>
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Launch.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Launch
