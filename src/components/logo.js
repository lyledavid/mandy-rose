import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import rose from "../../content/rose.svg"

import { siteShortTitle } from "../../config"

const StyledLogo = styled.div`
  position: relative;
  z-index: 9;

  font-family: "Gloock", serif;
  font-size: ${({ size }) => (size ? size : "1.75rem")};
  font-weight: 600;
  color: ${({ theme, color }) => theme.colors[color] || color};

  /* Disable effects when sidebar is open */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
`

const Logo = ({ size, color }) => (
  <StyledLogo color={color} size={size}>
    {/* {siteShortTitle} */}
    Mandy
    <img src={rose} alt="Your SVG" height={40} style={{ marginBottom: -2 }} />
    Rose
  </StyledLogo>
)

Logo.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
}

export default Logo
